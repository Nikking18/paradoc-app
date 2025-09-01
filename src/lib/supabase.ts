import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || "https://dummy.supabase.co"
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "dummy-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
