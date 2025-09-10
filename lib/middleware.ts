import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin } from './supabase';

export interface AuthenticatedUser {
  id: string;
  email: string;
  role: string;
  subscriptionStatus: string;
}

export function withAuth(
  handler: (request: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>
) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Create Supabase client for server-side auth
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll().map(cookie => ({
                name: cookie.name,
                value: cookie.value,
              }));
            },
            setAll() {
              // For API routes, we can't set cookies directly
              // The client will handle cookie management
            },
          },
        }
      );

      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        );
      }

      // Get user profile data from database
      const { data: profile, error: profileError } = await supabaseAdmin
        .from('users')
        .select('role, subscription_status')
        .eq('id', user.id)
        .single();

      if (profileError) {
        return NextResponse.json(
          { error: 'User profile not found' },
          { status: 404 }
        );
      }

      const authenticatedUser: AuthenticatedUser = {
        id: user.id,
        email: user.email!,
        role: profile.role || 'free',
        subscriptionStatus: profile.subscription_status || 'inactive',
      };

      return await handler(request, authenticatedUser);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return NextResponse.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
  };
}

export function withRoleAuth(
  allowedRoles: string[],
  handler: (request: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>
) {
  return withAuth(async (req, user) => {
    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { error: 'Forbidden - Insufficient permissions' },
        { status: 403 }
      );
    }
    return handler(req, user);
  });
}

export function withSubscriptionAuth(
  requiredSubscription: string[],
  handler: (request: NextRequest, user: AuthenticatedUser) => Promise<NextResponse>
) {
  return withAuth(async (req, user) => {
    if (!requiredSubscription.includes(user.subscriptionStatus)) {
      return NextResponse.json(
        { error: 'Subscription required - Please upgrade your plan' },
        { status: 402 }
      );
    }
    return handler(req, user);
  });
}