// Supabase Edge Function: trigger-rebuild
// Deployed in Phase 11 to trigger Vercel deploy hook when content changes.
// Verifies caller has staff role (admin or editor).
// Safe fallback if VERCEL_DEPLOY_HOOK_URL is not set yet.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Missing Authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') || ''

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    })

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid authentication session' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // Verify staff role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle()

    if (profileError || !profile || !['admin', 'editor'].includes(profile.role)) {
      return new Response(
        JSON.stringify({ error: 'Forbidden: staff role required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    let body: { reason?: string } = {}
    try {
      body = await req.json()
    } catch {
      body = {}
    }

    // 60-second debounce check via site_settings
    const { data: debounceSetting } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'last_rebuild_at')
      .maybeSingle()

    const now = Date.now()
    const lastRebuildTime = debounceSetting?.value ? Number(debounceSetting.value) : 0
    if (now - lastRebuildTime < 60000) {
      return new Response(
        JSON.stringify({
          success: true,
          triggered: false,
          debounced: true,
          message: 'Rebuild requested within 60s debounce window. Skipped duplicate trigger.',
          reason: body.reason || 'content-update',
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    const vercelHookUrl = Deno.env.get('VERCEL_DEPLOY_HOOK_URL')

    if (!vercelHookUrl) {
      // Record timestamp to honor debounce even in local/preview environments
      await supabase.from('site_settings').upsert({
        key: 'last_rebuild_at',
        value: now,
        updated_at: new Date().toISOString(),
      })

      // Safe no-op until deploy hook is provisioned in Phase 11
      return new Response(
        JSON.stringify({
          success: true,
          triggered: false,
          message: 'Vercel deploy hook not configured yet (safe no-op). Changes saved.',
          reason: body.reason || 'content-update',
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // Trigger Vercel rebuild
    const response = await fetch(vercelHookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        source: 'supabase-edge-function:trigger-rebuild',
        triggered_by: user.email,
        reason: body.reason || 'content-update',
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      return new Response(
        JSON.stringify({
          success: false,
          error: `Failed to trigger Vercel rebuild: ${errText}`,
        }),
        { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // Record last rebuild timestamp on successful dispatch
    await supabase.from('site_settings').upsert({
      key: 'last_rebuild_at',
      value: now,
      updated_at: new Date().toISOString(),
    })

    return new Response(
      JSON.stringify({
        success: true,
        triggered: true,
        message: 'Rebuild triggered successfully',
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err)
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
