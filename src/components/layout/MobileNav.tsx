import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Globe } from 'lucide-react'
import { Drawer } from '../ui/Drawer'
import { Logo } from '../ui/Logo'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
  isEn?: boolean
}

export const MobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  onClose,
  isEn = false,
}) => {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const prefix = isEn ? '/en' : ''

  const navItems = [
    { label: t('nav.home'), to: prefix || '/' },
    { label: t('nav.about'), to: `${prefix}/about` },
    { label: t('nav.services'), to: `${prefix}/services` },
    { label: t('nav.works'), to: `${prefix}/works` },
    { label: t('nav.blog'), to: `${prefix}/blog` },
    { label: t('nav.contact'), to: `${prefix}/contact` },
  ]

  const switchLanguagePath = isEn ? '/' : '/en'

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="start">
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-6">
          <div className="bg-brand-900 p-4 rounded-control flex items-center justify-center">
            <Logo size="header" theme="dark" />
          </div>

          <nav aria-label="قائمة الجوال">
            <ul className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-control text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-900 font-bold'
                          : 'text-content-body hover:bg-surface-soft hover:text-brand-900'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="pt-6 border-t border-surface-border flex flex-col gap-3">
          <a
            href={`tel:${settings.contact.unifiedNumber}`}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-control bg-brand-900 text-white font-semibold text-sm hover:bg-brand-800 transition-colors"
          >
            <Phone className="w-4 h-4 text-brand-400" aria-hidden="true" />
            <span>{settings.contact.unifiedDisplay}</span>
          </a>

          <a
            href={`https://wa.me/${settings.contact.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-control bg-whatsapp text-white font-semibold text-sm hover:bg-whatsapp-hover transition-colors"
          >
            <span>WhatsApp</span>
          </a>

          <Link
            to={switchLanguagePath}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-control border border-surface-border text-content-body text-sm font-medium hover:bg-surface-soft transition-colors mt-2"
          >
            <Globe className="w-4 h-4 text-brand-600" aria-hidden="true" />
            <span>{t('actions.switchLanguage')}</span>
          </Link>
        </div>
      </div>
    </Drawer>
  )
}
