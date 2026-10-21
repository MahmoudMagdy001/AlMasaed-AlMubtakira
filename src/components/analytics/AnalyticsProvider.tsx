import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { initDataLayer, trackEvent } from '@/lib/analytics'
import { CookieConsent } from './CookieConsent'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const location = useLocation()
  const { i18n } = useTranslation()

  // Always initialize dataLayer in browser
  useEffect(() => {
    initDataLayer()
  }, [])

  // Never activate GTM on admin routes
  const isAdmin = location.pathname.startsWith('/admin')

  // GTM ID from env var
  const gtmId = !isAdmin ? (import.meta.env.VITE_GTM_ID ?? '') : ''

  // Inject GTM script when gtmId is provided
  useEffect(() => {
    if (!gtmId || isAdmin || typeof window === 'undefined') return

    const scriptId = 'google-tag-manager-script'
    if (document.getElementById(scriptId)) return

    // Inject GTM script
    const script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`
    document.head.appendChild(script)

    // Inject noscript fallback iframe
    const noscriptId = 'google-tag-manager-noscript'
    if (!document.getElementById(noscriptId)) {
      const noscript = document.createElement('noscript')
      noscript.id = noscriptId
      const iframe = document.createElement('iframe')
      iframe.src = `https://www.googletagmanager.com/ns.html?id=${encodeURIComponent(gtmId)}`
      iframe.height = '0'
      iframe.width = '0'
      iframe.style.display = 'none'
      iframe.style.visibility = 'hidden'
      noscript.appendChild(iframe)
      document.body.insertAdjacentElement('afterbegin', noscript)
    }
  }, [gtmId, isAdmin])

  // Track SPA route changes
  useEffect(() => {
    if (isAdmin || typeof window === 'undefined') return

    // Allow title to update before firing page_view
    const rafId = requestAnimationFrame(() => {
      trackEvent('page_view', {
        page_path: location.pathname,
        page_title: document.title,
        page_language: i18n.language,
      })
    })

    return () => cancelAnimationFrame(rafId)
  }, [location.pathname, i18n.language, isAdmin])

  return (
    <>
      {children}
      <CookieConsent isActive={Boolean(gtmId)} />
    </>
  )
}
