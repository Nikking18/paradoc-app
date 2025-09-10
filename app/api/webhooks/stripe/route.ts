import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { updateSubscriptionStatus } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// POST /api/webhooks/stripe - Handle Stripe webhook events
export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    if (!sig) {
      console.error('Missing Stripe signature');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    console.log(`Received webhook event: ${event.type}`);

    // Handle the event
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;

      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;

      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(event.data.object);
        break;

      case 'invoice.payment_succeeded':
        await handlePaymentSucceeded(event.data.object);
        break;

      case 'invoice.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'customer.subscription.trial_will_end':
        await handleTrialWillEnd(event.data.object);
        break;

      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Handle subscription created
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionCreated(subscription: any) {
  try {
    console.log('Handling subscription created:', subscription.id);
    
    await updateSubscriptionStatus(
      subscription.id,
      subscription.status,
      subscription.current_period_start,
      subscription.current_period_end
    );

    // If subscription starts with a trial
    if (subscription.status === 'trialing') {
      const userId = subscription.metadata.userId;
      if (userId) {
        await supabaseAdmin
          .from('users')
          .update({
            trial_ends_at: new Date(subscription.trial_end * 1000).toISOString(),
            subscription_status: 'trial',
          })
          .eq('id', userId);
      }
    }
  } catch (error) {
    console.error('Error handling subscription created:', error);
    throw error;
  }
}

// Handle subscription updated
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionUpdated(subscription: any) {
  try {
    console.log('Handling subscription updated:', subscription.id);
    
    await updateSubscriptionStatus(
      subscription.id,
      subscription.status,
      subscription.current_period_start,
      subscription.current_period_end
    );
  } catch (error) {
    console.error('Error handling subscription updated:', error);
    throw error;
  }
}

// Handle subscription deleted/canceled
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleSubscriptionDeleted(subscription: any) {
  try {
    console.log('Handling subscription deleted:', subscription.id);
    
    const userId = subscription.metadata.userId;
    if (!userId) {
      console.error('No user ID found in subscription metadata');
      return;
    }

    // Update user to free tier
    await supabaseAdmin
      .from('users')
      .update({
        role: 'free',
        subscription_status: 'canceled',
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    // Update subscription record
    await supabaseAdmin
      .from('subscriptions')
      .update({
        status: 'canceled',
        updated_at: new Date().toISOString(),
      })
      .eq('stripe_subscription_id', subscription.id);

    // Log audit event
    await supabaseAdmin
      .from('audit_logs')
      .insert({
        user_id: userId,
        action: 'SUBSCRIPTION_CANCELED',
        description: 'Subscription was canceled',
        metadata: {
          subscriptionId: subscription.id,
          canceledAt: new Date().toISOString(),
        },
      });
  } catch (error) {
    console.error('Error handling subscription deleted:', error);
    throw error;
  }
}

// Handle successful payment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentSucceeded(invoice: any) {
  try {
    console.log('Handling payment succeeded:', invoice.id);
    
    const subscriptionId = invoice.subscription;
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const userId = subscription.metadata.userId;

      if (userId) {
        // Log successful payment
        await supabaseAdmin
          .from('audit_logs')
          .insert({
            user_id: userId,
            action: 'PAYMENT_SUCCEEDED',
            description: `Payment succeeded for invoice ${invoice.id}`,
            metadata: {
              invoiceId: invoice.id,
              amount: invoice.amount_paid,
              currency: invoice.currency,
              subscriptionId,
            },
          });

        // Update subscription status to active if it was past due
        if (subscription.status === 'active') {
          await supabaseAdmin
            .from('users')
            .update({
              subscription_status: 'active',
              updated_at: new Date().toISOString(),
            })
            .eq('id', userId);
        }
      }
    }
  } catch (error) {
    console.error('Error handling payment succeeded:', error);
    throw error;
  }
}

// Handle failed payment
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handlePaymentFailed(invoice: any) {
  try {
    console.log('Handling payment failed:', invoice.id);
    
    const subscriptionId = invoice.subscription;
    if (subscriptionId) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const userId = subscription.metadata.userId;

      if (userId) {
        // Update user status to past due
        await supabaseAdmin
          .from('users')
          .update({
            subscription_status: 'past_due',
            updated_at: new Date().toISOString(),
          })
          .eq('id', userId);

        // Log failed payment
        await supabaseAdmin
          .from('audit_logs')
          .insert({
            user_id: userId,
            action: 'PAYMENT_FAILED',
            description: `Payment failed for invoice ${invoice.id}`,
            metadata: {
              invoiceId: invoice.id,
              amount: invoice.amount_due,
              currency: invoice.currency,
              subscriptionId,
              attemptCount: invoice.attempt_count,
            },
          });
      }
    }
  } catch (error) {
    console.error('Error handling payment failed:', error);
    throw error;
  }
}

// Handle trial ending soon
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleTrialWillEnd(subscription: any) {
  try {
    console.log('Handling trial will end:', subscription.id);
    
    const userId = subscription.metadata.userId;
    if (userId) {
      // Log trial ending notification
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: userId,
          action: 'TRIAL_ENDING_SOON',
          description: 'Trial period ending in 3 days',
          metadata: {
            subscriptionId: subscription.id,
            trialEndsAt: new Date(subscription.trial_end * 1000).toISOString(),
          },
        });

      // Here you could send an email notification to the user
      // await sendTrialEndingEmail(userId);
    }
  } catch (error) {
    console.error('Error handling trial will end:', error);
    throw error;
  }
}

// Handle checkout session completed
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function handleCheckoutCompleted(session: any) {
  try {
    console.log('Handling checkout completed:', session.id);
    
    const userId = session.metadata?.userId;
    if (userId) {
      // Log successful checkout
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: userId,
          action: 'CHECKOUT_COMPLETED',
          description: 'Checkout session completed successfully',
          metadata: {
            sessionId: session.id,
            amount: session.amount_total,
            currency: session.currency,
            subscriptionId: session.subscription,
          },
        });
    }
  } catch (error) {
    console.error('Error handling checkout completed:', error);
    throw error;
  }
}
