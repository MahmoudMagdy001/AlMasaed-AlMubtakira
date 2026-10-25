import React, { useEffect, useRef } from 'react'
import { Outlet, useLocation, ScrollRestoration } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppProviders } from '../providers'
import {
  Header,
  Footer,
  FloatingContact,
  SkipToContent,
  ScrollToTop,
} from '@/components/layout'
import { ToastProvider } from '@/components/ui'
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider'
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap'

const PublicLayoutContent: React.FC = () => {
  const { i18n } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const currentLang = isEn ? 'en' : 'ar'
  const mainRef = useRef<HTMLElement>(null)

  // Synchronously switch language so all child components render with correct translations during SSR
  if (i18n.language !== currentLang) {
    i18n.changeLanguage(currentLang)
  }

  useEffect(() => {
    const dir = isEn ? 'ltr' : 'rtl'
    document.documentElement.lang = currentLang
    document.documentElement.dir = dir
  }, [isEn, currentLang])

  // Subtle, non-blocking page transition on route change
  useGSAP(
    () => {
      if (typeof window === 'undefined') return
      if (prefersReducedMotion()) return

      gsap.fromTo(
        mainRef.current,
        { opacity: 0.88, y: 8 },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        },
      )
    },
    { scope: mainRef, dependencies: [location.pathname] },
  )

  return (
    <div className="min-h-screen flex flex-col bg-white text-content-body font-sans antialiased selection:bg-brand-400 selection:text-brand-900">
      <ScrollRestoration />
      <SkipToContent />
      <Header />
      <main id="main-content" ref={mainRef} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </div>
  )
}

export const PublicLayout: React.FC = () => {
  return (
    <AppProviders>
      <AnalyticsProvider>
        <ToastProvider>
          <PublicLayoutContent />
        </ToastProvider>
      </AnalyticsProvider>
    </AppProviders>
  )
}
