import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { supabaseAdmin } from './supabase';

// Types for authentication
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  image?: string;
  role: string;
  subscription_status: string;
  trial_ends_at?: string;
  stripe_customer_id?: string;
}

export interface AuthSession {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  expires_at: number;
}

// Helper function to log audit events
export async function logAuditEvent(userId: string, action: string, description: string, metadata: Record<string, unknown> = {}) {
  try {
    await supabaseAdmin
      .from('audit_logs')
      .insert({
        user_id: userId,
        action,
        description,
        metadata
      });
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
}

// Create Supabase client for server-side operations
export async function createServerSupabaseClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
}

// Get current user session
export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return null;
    }

    // Get user profile data from database
    const { data: profile, error: profileError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      return null;
    }

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      image: profile.image,
      role: profile.role || 'free',
      subscription_status: profile.subscription_status || 'inactive',
      trial_ends_at: profile.trial_ends_at,
      stripe_customer_id: profile.stripe_customer_id,
    };
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
}

// Check if user has required role
export async function hasRole(requiredRole: string): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const roleHierarchy = { free: 0, pro: 1, enterprise: 2 };
  const userLevel = roleHierarchy[user.role as keyof typeof roleHierarchy] || 0;
  const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;

  return userLevel >= requiredLevel;
}

// Check if user has active subscription
export async function hasActiveSubscription(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  return ['active', 'trial'].includes(user.subscription_status);
}

// Update user profile in database
export async function updateUserProfile(userId: string, updates: Partial<AuthUser>) {
  try {
    const { error } = await supabaseAdmin
      .from('users')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) throw error;

    await logAuditEvent(userId, 'profile_update', 'User profile updated', updates);
    return { success: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { success: false, error };
  }
}