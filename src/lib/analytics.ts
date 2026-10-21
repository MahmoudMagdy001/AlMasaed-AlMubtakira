declare global {
  interface Window {
    dataLayer?: unknown[]
  }
}

/**
 * Initializes dataLayer safe array if not already present.
 */
export function initDataLayer() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
  }
}

export type AnalyticsEventName =
  | 'page_view'
  | 'contact_form_submit'
  | 'phone_click'
  | 'whatsapp_click'
  | 'email_click'
  | 'cta_click'
  | 'blog_share'
  | 'file_download'

export interface AnalyticsPayload {
  [key: string]: unknown
}

/**
 * Pushes a tracking event to window.dataLayer.
 * Works even when GTM is inactive so event history is preserved.
 */
export function trackEvent(event: AnalyticsEventName, payload?: AnalyticsPayload) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    timestamp: new Date().toISOString(),
    ...payload,
  })
}

/**
 * Updates Google Consent Mode v2 state
 */
export function updateConsentState(granted: boolean) {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  const state = granted ? 'granted' : 'denied'
  window.dataLayer.push({
    event: 'consent_update',
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  })
}
