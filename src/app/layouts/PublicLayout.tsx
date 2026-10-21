import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppProviders } from '../providers'
import {
  Header,
  Footer,
  FloatingContact,
  SkipToContent,
  ScrollRestoration,
} from '@/components/layout'
import { ToastProvider } from '@/components/ui'

const PublicLayoutContent: React.FC = () => {
  const { i18n } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const currentLang = isEn ? 'en' : 'ar'

  // Synchronously switch language so all child components render with correct translations during SSR
  if (i18n.language !== currentLang) {
    i18n.changeLanguage(currentLang)
  }

  useEffect(() => {
    const dir = isEn ? 'ltr' : 'rtl'
    document.documentElement.lang = currentLang
    document.documentElement.dir = dir
  }, [isEn, currentLang])

  return (
    <div className="min-h-screen flex flex-col bg-white text-content-body font-sans antialiased selection:bg-brand-400 selection:text-brand-900">
      <ScrollRestoration />
      <SkipToContent />
      <Header />
      <main id="main-content" className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  )
}

export const PublicLayout: React.FC = () => {
  return (
    <AppProviders>
      <ToastProvider>
        <PublicLayoutContent />
      </ToastProvider>
    </AppProviders>
  )
}
