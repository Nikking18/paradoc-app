import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin, logAuditEvent } from '@/lib/supabase';

// POST /api/auth - Handle authentication (sign up, sign in, sign out)
export async function POST(request: NextRequest) {
  try {
    const { action, email, password, name, company, location } = await request.json();

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
            // Handle cookie setting for server-side
          },
        },
      }
    );

    switch (action) {
      case 'signup':
        if (!email || !password) {
          return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
          );
        }

        // Sign up user with Supabase Auth
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name || '',
              company: company || '',
              location: location || ''
            },
          },
        });

        if (signUpError) {
          return NextResponse.json(
            { error: signUpError.message },
            { status: 400 }
          );
        }

        if (signUpData.user) {
          // Create user profile in database
          await supabaseAdmin
            .from('users')
            .insert({
              id: signUpData.user.id,
              email: signUpData.user.email!,
              name: name || '',
              company: company || '',
              location: location || '',
              role: 'free',
              subscription_status: 'inactive',
            });

          // Log audit event
          await logAuditEvent(
            signUpData.user.id,
            'USER_SIGNUP',
            'User signed up successfully'
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Sign up successful. Please check your email for verification.',
          user: signUpData.user,
        });

      case 'signin':
        if (!email || !password) {
          return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
          );
        }

        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) {
          return NextResponse.json(
            { error: signInError.message },
            { status: 400 }
          );
        }

        if (signInData.user) {
          // Log audit event
          await logAuditEvent(
            signInData.user.id,
            'USER_SIGNIN',
            'User signed in successfully'
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Sign in successful',
          user: signInData.user,
          session: signInData.session,
        });

      case 'signout':
        const { error: signOutError } = await supabase.auth.signOut();

        if (signOutError) {
          return NextResponse.json(
            { error: signOutError.message },
            { status: 400 }
          );
        }

        return NextResponse.json({
          success: true,
          message: 'Sign out successful',
        });

      case 'oauth':
        const { provider } = await request.json();
        
        if (!provider) {
          return NextResponse.json(
            { error: 'Provider is required' },
            { status: 400 }
          );
        }

        const { data: oauthData, error: oauthError } = await supabase.auth.signInWithOAuth({
          provider,
          options: {
            redirectTo: `${request.nextUrl.origin}/auth/callback`,
          },
        });

        if (oauthError) {
          return NextResponse.json(
            { error: oauthError.message },
            { status: 400 }
          );
        }

        return NextResponse.json({
          success: true,
          url: oauthData.url,
        });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Auth API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/auth - Get current user session
export async function GET(request: NextRequest) {
  try {
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
            // Handle cookie setting for server-side
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get user profile from database
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: 'Profile not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        ...profile,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
