import { createClient } from '@supabase/supabase-js'
import type { Database } from '../types/database.types'

const env = typeof import.meta !== 'undefined' ? import.meta.env : undefined
const nodeEnv =
  typeof globalThis !== 'undefined' && 'process' in globalThis
    ? (globalThis as { process?: { env?: Record<string, string> } }).process?.env
    : undefined

const supabaseUrl =
  env?.VITE_SUPABASE_URL ||
  nodeEnv?.VITE_SUPABASE_URL ||
  'https://flkydlhewzezfomfjrvi.supabase.co'

const supabaseAnonKey =
  env?.VITE_SUPABASE_ANON_KEY ||
  env?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  nodeEnv?.VITE_SUPABASE_ANON_KEY ||
  nodeEnv?.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_JZDI75TO1VvM67UieEvAjw_iMKGDR6i'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})
