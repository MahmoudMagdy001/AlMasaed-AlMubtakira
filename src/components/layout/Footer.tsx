import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Container } from '../ui/Container'
import { BrandPattern } from '../ui/BrandPattern'
import { siteConfig } from '@/lib/siteConfig'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const prefix = isEn ? '/en' : ''
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { label: t('nav.home'), to: prefix || '/' },
    { label: t('nav.about'), to: `${prefix}/about` },
    { label: t('nav.services'), to: `${prefix}/services` },
    { label: t('nav.works'), to: `${prefix}/works` },
    { label: t('nav.blog'), to: `${prefix}/blog` },
    { label: t('nav.contact'), to: `${prefix}/contact` },
    {
      label: isEn ? 'Privacy Policy' : 'سياسة الخصوصية',
      to: `${prefix}/privacy`,
    },
  ]

  const serviceLinks = [
    {
      label: t('nav.servicesMenu.maintenance'),
      to: `${prefix}/services/elevator-maintenance`,
    },
    {
      label: t('nav.servicesMenu.modernization'),
      to: `${prefix}/services/elevator-modernization`,
    },
    {
      label: t('nav.servicesMenu.installation'),
      to: `${prefix}/services/elevator-installation`,
    },
    {
      label: t('nav.servicesMenu.spareParts'),
      to: `${prefix}/services/elevator-spare-parts`,
    },
    {
      label: t('nav.servicesMenu.escalators'),
      to: `${prefix}/services/escalators-moving-walkways`,
    },
  ]

  return (
    <footer className="relative bg-brand-900 text-white overflow-hidden border-t border-brand-800">
      {/* Brand Pattern Background */}
      <BrandPattern opacity={0.06} />

      <div className="relative z-10 py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Column 1: Brand Info (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Logo variant="horizontal" theme="dark" size="footer" />
              <p className="text-sm md:text-base text-brand-100 leading-relaxed max-w-sm">
                {t('footer.aboutText')}
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-brand-300">
                <span className="bg-white/5 px-3 py-1.5 rounded-control border border-white/10">
                  {siteConfig.company.accreditationAr}
                </span>
                <span className="bg-white/5 px-3 py-1.5 rounded-control border border-white/10">
                  {t('brand.city')}
                </span>
              </div>
            </div>

            {/* Column 2: Quick Links (2 cols) */}
            <div className="lg:col-span-2">
              <h3 className="text-base font-bold text-white mb-5">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3 text-sm text-brand-100">
                {quickLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="hover:text-brand-400 transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Services (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-base font-bold text-white mb-5">
                {t('footer.servicesTitle')}
              </h3>
              <ul className="space-y-3 text-sm text-brand-100">
                {serviceLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="hover:text-brand-400 transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact Info (3 cols) */}
            <div className="lg:col-span-3">
              <h3 className="text-base font-bold text-white mb-5">
                {t('footer.contactTitle')}
              </h3>
              <ul className="space-y-3.5 text-sm text-brand-100">
                <li>
                  <a
                    href={`tel:${siteConfig.contact.unifiedNumber}`}
                    className="flex items-center gap-2.5 hover:text-brand-400 transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <Phone
                      className="w-4 h-4 text-brand-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span dir="ltr">{siteConfig.contact.unifiedDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${siteConfig.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-whatsapp transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <MessageSquare
                      className="w-4 h-4 text-whatsapp shrink-0"
                      aria-hidden="true"
                    />
                    <span dir="ltr">{siteConfig.contact.whatsappDisplay}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="flex items-center gap-2.5 hover:text-brand-400 transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <Mail
                      className="w-4 h-4 text-brand-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>{siteConfig.contact.email}</span>
                  </a>
                </li>
                <li className="flex items-center gap-2.5 text-brand-200">
                  <MapPin
                    className="w-4 h-4 text-brand-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span>
                    {isEn
                      ? siteConfig.contact.cityEn
                      : siteConfig.contact.cityAr}
                    ، المملكة العربية السعودية
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Legal & Copyright */}
          <div className="mt-14 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-200">
            <div className="flex flex-wrap items-center gap-3 text-center sm:text-start">
              <span>
                {siteConfig.company.crNumber
                  ? `السجل التجاري رقم ${siteConfig.company.crNumber}`
                  : ''}
              </span>
              <span>•</span>
              <span>{siteConfig.company.accreditationAr}</span>
              <span>•</span>
              <Link
                to={`${prefix}/privacy`}
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {isEn ? 'Privacy Policy' : 'سياسة الخصوصية'}
              </Link>
            </div>
            <div className="text-center sm:text-end">
              <p>
                © {currentYear} {siteConfig.company.nameAr}.{' '}
                {t('footer.rights')}.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
