import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { validateRequestBody, subscriptionCreateSchema } from '@/lib/validations';
import { createCheckoutSession } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/subscription/create - Create Stripe checkout session
export const POST = withAuth(async (request: NextRequest, user) => {
    try {
      const body = await request.json();
      const validatedData = validateRequestBody(subscriptionCreateSchema, body);

      // Get user profile for email
      const { data: userProfile } = await supabaseAdmin
        .from('users')
        .select('name, email, stripe_customer_id, subscription_status')
        .eq('id', user.id)
        .single();

      if (!userProfile) {
        return NextResponse.json(
          { error: 'User profile not found' },
          { status: 404 }
        );
      }

      // Check if user already has an active subscription
      if (userProfile.subscription_status === 'active') {
        return NextResponse.json(
          { error: 'User already has an active subscription' },
          { status: 400 }
        );
      }

      // Create checkout session URLs
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const successUrl = `${baseUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&success=true`;
      const cancelUrl = `${baseUrl}/pricing?canceled=true`;

      // Create Stripe checkout session
      const session = await createCheckoutSession(
        user.id,
        userProfile.email,
        validatedData.plan,
        successUrl,
        cancelUrl
      );

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'SUBSCRIPTION_CHECKOUT_CREATED',
          description: `Created checkout session for ${validatedData.plan} plan`,
          metadata: {
            plan: validatedData.plan,
            sessionId: session.id,
            amount: session.amount_total,
          },
        });

      return NextResponse.json({
        success: true,
        data: {
          sessionId: session.id,
          url: session.url,
          plan: validatedData.plan,
        },
        message: 'Checkout session created successfully',
      });
    } catch (error) {
      console.error('Subscription creation error:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Validation error')) {
          return NextResponse.json(
            { error: 'Invalid input data', details: error.message },
            { status: 400 }
          );
        }
        
        if (error.message.includes('creating checkout session')) {
          return NextResponse.json(
            { error: 'Payment processing temporarily unavailable', message: 'Please try again in a few moments' },
            { status: 503 }
          );
        }
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
});
