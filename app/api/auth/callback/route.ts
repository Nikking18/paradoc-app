import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { supabaseAdmin, logAuditEvent } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';

  if (code) {
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
            // Handle cookie setting
          },
        },
      }
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      // Check if user profile exists, create if not
      const { data: existingProfile } = await supabaseAdmin
        .from('users')
        .select('id')
        .eq('id', data.user.id)
        .single();

      if (!existingProfile) {
        // Create user profile for OAuth users
        await supabaseAdmin
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || '',
            image: data.user.user_metadata?.avatar_url || null,
            role: 'free',
            subscription_status: 'inactive',
          });

        // Log audit event for new OAuth user
        await logAuditEvent(
          data.user.id,
          'USER_OAUTH_SIGNUP',
          'User signed up via OAuth'
        );
      } else {
        // Log audit event for returning OAuth user
        await logAuditEvent(
          data.user.id,
          'USER_OAUTH_SIGNIN',
          'User signed in via OAuth'
        );
      }

      // Redirect to the next page or dashboard
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/auth-code-error', request.url));
}
