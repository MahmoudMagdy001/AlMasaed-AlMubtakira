import React, { useState } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Phone, Globe } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Container } from '../ui/Container'
import { MobileNav } from './MobileNav'
import { siteConfig } from '@/lib/siteConfig'

export const Header: React.FC = () => {
  const { t } = useTranslation()
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const location = useLocation()

  const isEn = location.pathname.startsWith('/en')
  const prefix = isEn ? '/en' : ''

  const navItems = [
    { label: t('nav.home'), to: prefix || '/' },
    { label: t('nav.about'), to: `${prefix}/about` },
    { label: t('nav.services'), to: `${prefix}/services` },
    { label: t('nav.works'), to: `${prefix}/works` },
    { label: t('nav.blog'), to: `${prefix}/blog` },
    { label: t('nav.contact'), to: `${prefix}/contact` },
  ]

  // Toggle path between Arabic and English
  const targetLanguagePath = isEn
    ? location.pathname.replace(/^\/en/, '') || '/'
    : `/en${location.pathname === '/' ? '' : location.pathname}`

  return (
    <>
      <header className="sticky top-0 z-40 bg-brand-900 border-b border-brand-800 shadow-header select-none transition-shadow duration-200">
        <Container>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <Logo
                variant="horizontal"
                theme="dark"
                size="header"
                to={prefix || '/'}
              />
            </div>

            {/* Desktop Navigation */}
            <nav
              className="hidden lg:flex items-center gap-1 xl:gap-2"
              aria-label="القائمة الرئيسية"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/' || item.to === '/en'}
                  className={({ isActive }) =>
                    `px-3.5 py-2 rounded-control text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 ${
                      isActive
                        ? 'text-brand-400 font-bold bg-white/5'
                        : 'text-white/90 hover:text-white hover:bg-white/10'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Language Switcher */}
              <Link
                to={targetLanguagePath}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors border border-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                aria-label={t('actions.switchLanguage')}
              >
                <Globe
                  className="w-3.5 h-3.5 text-brand-400"
                  aria-hidden="true"
                />
                <span>{t('actions.switchLanguage')}</span>
              </Link>

              {/* Call CTA Button */}
              <a
                href={`tel:${siteConfig.contact.unifiedNumber}`}
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-control text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
              >
                <Phone className="w-4 h-4 text-brand-300" aria-hidden="true" />
                <span>{siteConfig.contact.unifiedDisplay}</span>
              </a>

              {/* Mobile Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-control text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                aria-label={t('actions.openMenu')}
              >
                <Menu className="w-6 h-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        isEn={isEn}
      />
    </>
  )
}
