import { supabase } from './supabase'

export const REBUILD_NOTICE =
  'سيتم تطبيق التعديلات على الموقع العام خلال 1-2 دقيقة (عند اكتمال إعادة البناء تلقائياً).'

export interface RebuildResponse {
  success: boolean
  triggered: boolean
  message: string
}

/**
 * Requests an automatic site rebuild via Supabase Edge Function `trigger-rebuild`.
 * Safe no-op if the Edge Function or deploy hook is not yet active.
 */
export async function requestRebuild(reason = 'content-update'): Promise<RebuildResponse> {
  try {
    const { data, error } = await supabase.functions.invoke('trigger-rebuild', {
      body: { reason },
    })

    if (error) {
      // Safe graceful degradation: Edge function might not be deployed yet in local dev or before Phase 11
      return {
        success: true,
        triggered: false,
        message: REBUILD_NOTICE,
      }
    }

    return {
      success: true,
      triggered: Boolean(data?.triggered),
      message: REBUILD_NOTICE,
    }
  } catch {
    return {
      success: true,
      triggered: false,
      message: REBUILD_NOTICE,
    }
  }
}
