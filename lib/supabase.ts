import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client for browser/frontend use with SSR support
export function createClientSupabaseClient() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

// Legacy client for backward compatibility
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper function to log audit events
export async function logAuditEvent(
  userId: string,
  action: string,
  description: string,
  metadata: Record<string, unknown> = {}
) {
  try {
    await supabaseAdmin
      .from('audit_logs')
      .insert({
        user_id: userId,
        action,
        description,
        metadata,
      });
  } catch (error) {
    console.error('Failed to log audit event:', error);
  }
}

// Database types
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'free' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'inactive' | 'trial' | 'canceled';
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  plan: 'pro' | 'enterprise';
  status: 'active' | 'inactive' | 'trial' | 'canceled' | 'past_due';
  trial_ends_at?: string;
  current_period_start?: string;
  current_period_end?: string;
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  title: string;
  content: string;
  type: 'contract' | 'agreement' | 'brief' | 'template' | 'other';
  jurisdiction: 'US' | 'CA';
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  description: string;
  metadata?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}
