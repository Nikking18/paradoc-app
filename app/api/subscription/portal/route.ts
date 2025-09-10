import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from '@/lib/middleware';
import { createPortalSession } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

// POST /api/subscription/portal - Create Stripe customer portal session
export const POST = withAuth(async (request: NextRequest, user) => {
    try {
      // Get user's Stripe customer ID
      const { data: userProfile } = await supabaseAdmin
        .from('users')
        .select('stripe_customer_id, subscription_status')
        .eq('id', user.id)
        .single();

      if (!userProfile) {
        return NextResponse.json(
          { error: 'User profile not found' },
          { status: 404 }
        );
      }

      if (!userProfile.stripe_customer_id) {
        return NextResponse.json(
          { error: 'No subscription found', message: 'Please create a subscription first' },
          { status: 400 }
        );
      }

      // Create portal session
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      const returnUrl = `${baseUrl}/dashboard`;

      const session = await createPortalSession(userProfile.stripe_customer_id, returnUrl);

      // Log audit event
      await supabaseAdmin
        .from('audit_logs')
        .insert({
          user_id: user.id,
          action: 'CUSTOMER_PORTAL_ACCESSED',
          description: 'Accessed Stripe customer portal',
          metadata: {
            sessionId: session.id,
          },
        });

      return NextResponse.json({
        success: true,
        data: {
          url: session.url,
        },
        message: 'Portal session created successfully',
      });
    } catch (error) {
      console.error('Customer portal error:', error);
      
      if (error instanceof Error && error.message.includes('creating portal session')) {
        return NextResponse.json(
          { error: 'Portal temporarily unavailable', message: 'Please try again in a few moments' },
          { status: 503 }
        );
      }

      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
});
