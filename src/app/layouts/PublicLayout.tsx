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

  useEffect(() => {
    const lang = isEn ? 'en' : 'ar'
    const dir = isEn ? 'ltr' : 'rtl'

    if (i18n.language !== lang) {
      i18n.changeLanguage(lang)
    }

    document.documentElement.lang = lang
    document.documentElement.dir = dir
  }, [isEn, i18n])

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
