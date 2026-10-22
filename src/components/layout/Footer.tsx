import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Container } from '../ui/Container'
import { BrandPattern } from '../ui/BrandPattern'
import { useSiteSettings } from '@/hooks/useSiteSettings'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const settings = useSiteSettings()
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
                    href={`tel:${settings.contact.unifiedNumber}`}
                    className="group flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-brand-400 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-200">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span dir="ltr" className="font-medium group-hover:text-brand-300 transition-colors">
                      {settings.contact.unifiedDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${settings.contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white group-hover:border-[#25D366] transition-all duration-200">
                      <svg
                        className="w-4 h-4 fill-current"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </div>
                    <span dir="ltr" className="font-medium group-hover:text-[#25D366] transition-colors">
                      {settings.contact.whatsappDisplay}
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="group flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-brand-400 group-hover:bg-brand-500 group-hover:text-white group-hover:border-brand-500 transition-all duration-200">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="font-medium group-hover:text-brand-300 transition-colors">
                      {settings.contact.email}
                    </span>
                  </a>
                </li>
                <li className="flex items-center gap-3 text-brand-200">
                  <div className="w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-brand-400">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="font-medium">
                    {isEn ? settings.contact.cityEn : settings.contact.cityAr}، المملكة العربية السعودية
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar: Legal & Copyright */}
          <div className="mt-14 pt-8 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-200">
            <div className="flex flex-wrap items-center gap-3 text-center sm:text-start">
              <span>
                {settings.company.crNumber
                  ? `السجل التجاري رقم ${settings.company.crNumber}`
                  : ''}
              </span>
              <span>•</span>
              <span>{isEn ? settings.company.accreditationEn : settings.company.accreditationAr}</span>
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
                © {currentYear} {isEn ? settings.company.nameEn : settings.company.nameAr}.{' '}
                {t('footer.rights')}.
              </p>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  )
}
