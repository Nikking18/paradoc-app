import Stripe from 'stripe';
import { supabaseAdmin } from './supabase';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
  typescript: true,
});

// Stripe pricing configuration
export const STRIPE_PLANS = {
  pro: {
    name: 'Pro Plan',
    price: 5000, // $50.00 in cents
    interval: 'month',
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_monthly',
    features: [
      'Unlimited document generations',
      'Unlimited chatbot interactions',
      'Export to PDF, DOCX, Google Docs',
      'AI summarizer and risk scanner',
      'Smart legal document lookup',
      '6-month encrypted storage',
      'Email support',
      'US & Canada legal compliance'
    ]
  },
  enterprise: {
    name: 'Enterprise Plan',
    price: 0, // Custom pricing
    interval: 'month',
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise_monthly',
    features: [
      'All Pro features',
      'Bulk ZIP + CSV/JSON document upload',
      'Custom AI model tuning',
      'API embedding for law firm systems',
      'Team access with shared folders',
      'Unlimited encrypted storage',
      'Priority support',
      'Advanced analytics & reporting'
    ]
  }
} as const;

// Create or retrieve Stripe customer
export async function createOrRetrieveCustomer(userId: string, email: string, name?: string) {
  try {
    // Check if user already has a Stripe customer ID
    const { data: user } = await supabaseAdmin
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (user?.stripe_customer_id) {
      return user.stripe_customer_id;
    }

    // Create new Stripe customer
    const customer = await stripe.customers.create({
      email,
      name: name || undefined,
      metadata: {
        userId,
      },
    });

    // Update user with Stripe customer ID
    await supabaseAdmin
      .from('users')
      .update({ stripe_customer_id: customer.id })
      .eq('id', userId);

    return customer.id;
  } catch (error) {
    console.error('Error creating/retrieving Stripe customer:', error);
    throw error;
  }
}

// Create subscription checkout session
export async function createCheckoutSession(
  userId: string,
  email: string,
  plan: 'pro' | 'enterprise',
  successUrl: string,
  cancelUrl: string
) {
  try {
    const customerId = await createOrRetrieveCustomer(userId, email);
    const planConfig = STRIPE_PLANS[plan];

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: planConfig.priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        trial_period_days: 7, // 7-day free trial
        metadata: {
          userId,
          plan,
        },
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        plan,
      },
    });

    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Create customer portal session
export async function createPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return session;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
}

// Handle subscription status updates
export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: string,
  currentPeriodStart?: number,
  currentPeriodEnd?: number
) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const userId = subscription.metadata.userId;

    if (!userId) {
      throw new Error('User ID not found in subscription metadata');
    }

    // Update subscription in database
    await supabaseAdmin
      .from('subscriptions')
      .upsert({
        user_id: userId,
        stripe_subscription_id: subscriptionId,
        stripe_customer_id: subscription.customer as string,
        plan: subscription.metadata.plan as 'pro' | 'enterprise',
        status: mapStripeStatusToInternal(status),
        current_period_start: currentPeriodStart ? new Date(currentPeriodStart * 1000).toISOString() : null,
        current_period_end: currentPeriodEnd ? new Date(currentPeriodEnd * 1000).toISOString() : null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'stripe_subscription_id'
      });

    // Update user role and subscription status
    const userRole = subscription.metadata.plan === 'enterprise' ? 'enterprise' : 'pro';
    const subscriptionStatus = mapStripeStatusToInternal(status);

    await supabaseAdmin
      .from('users')
      .update({
        role: userRole,
        subscription_status: subscriptionStatus,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    // Log audit event
    await supabaseAdmin
      .from('audit_logs')
      .insert({
        user_id: userId,
        action: 'SUBSCRIPTION_UPDATED',
        description: `Subscription status updated to ${status}`,
        metadata: {
          subscriptionId,
          status,
          plan: subscription.metadata.plan,
        },
      });

  } catch (error) {
    console.error('Error updating subscription status:', error);
    throw error;
  }
}

// Handle trial ending
export async function handleTrialEnd(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const userId = subscription.metadata.userId;

    if (!userId) {
      throw new Error('User ID not found in subscription metadata');
    }

    // Update user to free tier if subscription is not active
    if (subscription.status !== 'active') {
      await supabaseAdmin
        .from('users')
        .update({
          role: 'free',
          subscription_status: 'inactive',
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);
    }

    // Log audit event
    await supabaseAdmin
      .from('audit_logs')
      .insert({
        user_id: userId,
        action: 'TRIAL_ENDED',
        description: 'Free trial period ended',
        metadata: {
          subscriptionId,
          status: subscription.status,
        },
      });

  } catch (error) {
    console.error('Error handling trial end:', error);
    throw error;
  }
}

// Map Stripe subscription status to internal status
function mapStripeStatusToInternal(stripeStatus: string): string {
  const statusMap: Record<string, string> = {
    'active': 'active',
    'canceled': 'canceled',
    'incomplete': 'inactive',
    'incomplete_expired': 'inactive',
    'past_due': 'past_due',
    'trialing': 'trial',
    'unpaid': 'inactive',
  };

  return statusMap[stripeStatus] || 'inactive';
}

// Get subscription details
export async function getSubscriptionDetails(userId: string) {
  try {
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!subscription?.stripe_subscription_id) {
      return null;
    }

    const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
    
    return {
      ...subscription,
      stripe_details: stripeSubscription,
    };
  } catch (error) {
    console.error('Error getting subscription details:', error);
    return null;
  }
}
