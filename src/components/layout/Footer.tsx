import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, ShieldCheck, Check, Copy, ExternalLink, FileText } from 'lucide-react'
import { Logo } from '../ui/Logo'
import { Container } from '../ui/Container'
import { BrandPattern } from '../ui/BrandPattern'
import { Dialog } from '../ui/Dialog'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import crBadgeImg from '@/assets/cr-badge-transparent.png'
import nationalAddressImg from '@/assets/national-address-transparent.png'

export const Footer: React.FC = () => {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const prefix = isEn ? '/en' : ''
  const currentYear = new Date().getFullYear()

  const [isCrModalOpen, setIsCrModalOpen] = useState(false)
  const [copiedCr, setCopiedCr] = useState(false)

  const quickLinks = [
    { label: t('nav.home'), to: prefix || '/' },
    { label: t('nav.about'), to: `${prefix}/about` },
    { label: t('nav.services'), to: `${prefix}/services` },
    { label: t('nav.works'), to: `${prefix}/works` },
    { label: t('nav.blog'), to: `${prefix}/blog` },
    { label: t('nav.contact'), to: `${prefix}/contact` },
    { label: isEn ? 'Privacy Policy' : 'سياسة الخصوصية', to: `${prefix}/privacy` },
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

  const socialLinks = [
    settings.contact.whatsapp && {
      name: 'WhatsApp',
      label: t('footer.social.whatsapp') || 'WhatsApp',
      href: `https://wa.me/${settings.contact.whatsapp}`,
      icon: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      ),
      hoverClasses: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]',
    },
    settings.social.tiktok && {
      name: 'TikTok',
      label: t('footer.social.tiktok'),
      href: settings.social.tiktok,
      icon: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.86-4.49V8.59a8.27 8.27 0 0 0 4.84 1.56V6.69z" />
        </svg>
      ),
      hoverClasses: 'hover:bg-black hover:text-[#00f2fe] hover:border-[#fe2c55]',
    },
    settings.social.instagram && {
      name: 'Instagram',
      label: t('footer.social.instagram'),
      href: settings.social.instagram,
      icon: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      hoverClasses:
        'hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent',
    },
    settings.social.snapchat && {
      name: 'Snapchat',
      label: t('footer.social.snapchat'),
      href: settings.social.snapchat,
      icon: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.002 2c-3.93 0-6.002 2.72-6.002 5.58 0 .84.28 1.83.69 2.58.11.2.14.3.06.49-.1.25-.56.93-.89 1.34-.35.43-.72.63-1.12.63-.3 0-.58-.1-.83-.28-.24-.18-.38-.25-.54-.25-.26 0-.5.22-.5.53 0 .7.81 1.42 1.63 1.83.47.23.94.36 1.4.38-.07.24-.1.49-.1.74 0 .37.1.72.29 1.05.3.52.84.86 1.47.93.38.04.77-.02 1.15-.17.38-.15.75-.36 1.14-.54.67-.32 1.25-.49 1.84-.49.58 0 1.17.17 1.84.49.39.18.76.39 1.14.54.38.15.77.21 1.15.17.63-.07 1.17-.41 1.47-.93.19-.33.29-.68.29-1.05 0-.25-.03-.5-.1-.74.46-.02.93-.15 1.4-.38.82-.41 1.63-1.13 1.63-1.83 0-.31-.24-.53-.5-.53-.16 0-.3.07-.54.25-.25.18-.53.28-.83.28-.4 0-.77-.2-1.12-.63-.33-.41-.79-1.09-.89-1.34-.08-.19-.05-.29.06-.49.41-.75.69-1.74.69-2.58 0-2.86-2.07-5.58-6-5.58z" />
        </svg>
      ),
      hoverClasses: 'hover:bg-[#FFFC00] hover:text-black hover:border-[#FFFC00]',
    },
    settings.social.x && {
      name: 'X',
      label: t('footer.social.x'),
      href: settings.social.x,
      icon: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      hoverClasses: 'hover:bg-black hover:text-white hover:border-black',
    },
    settings.social.linkedin && {
      name: 'LinkedIn',
      label: t('footer.social.linkedin'),
      href: settings.social.linkedin,
      icon: (
        <svg
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      ),
      hoverClasses: 'hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]',
    },
  ].filter(Boolean) as Array<{
    name: string
    label: string
    href: string
    icon: React.ReactNode
    hoverClasses: string
  }>

  const handleCopyCr = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(settings.company.crNumber)
      }
      setCopiedCr(true)
      setTimeout(() => setCopiedCr(false), 2000)
    } catch {
      // ignore
    }
  }

  return (
    <footer className="relative bg-brand-900 text-white overflow-hidden border-t border-brand-800">
      {/* Brand Pattern Background */}
      <BrandPattern opacity={0.05} />

      <div className="relative z-10 py-14 md:py-16">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
            
            {/* Column 1 (RTL Rightmost): Logo, Slogan, and Circular Social Media Icons */}
            <div className="lg:col-span-4 flex flex-col gap-5">
              <Logo variant="horizontal" theme="dark" size="footer" />
              <p className="text-sm text-brand-100/90 leading-relaxed max-w-sm">
                {t('footer.aboutText')}
              </p>

              {/* Circular Social Media Icons in a row */}
              {socialLinks.length > 0 && (
                <div className="flex flex-wrap items-center gap-2.5 pt-1">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      className={`w-9 h-9 rounded-full bg-brand-800/80 border border-brand-700/60 text-brand-200 flex items-center justify-center transition-all duration-200 shadow-2xs hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${item.hoverClasses}`}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Column 2: روابط سريعة */}
            <div className="lg:col-span-2">
              <h3 className="text-base font-bold text-amber-400 mb-5">
                {t('footer.quickLinks')}
              </h3>
              <ul className="space-y-3 text-sm text-brand-100/90">
                {quickLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="hover:text-white transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: خدماتنا */}
            <div className="lg:col-span-3">
              <h3 className="text-base font-bold text-amber-400 mb-5">
                {t('footer.servicesTitle')}
              </h3>
              <ul className="space-y-3 text-sm text-brand-100/90">
                {serviceLinks.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="hover:text-white transition-colors inline-block focus-visible:outline-none focus-visible:underline"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4 (RTL Leftmost): تواصل معنا + Badges */}
            <div className="lg:col-span-3 flex flex-col">
              <h3 className="text-base font-bold text-amber-400 mb-5">
                {t('footer.contactTitle')}
              </h3>

              <ul className="space-y-3.5 text-sm text-brand-100/90">
                {/* Email */}
                <li>
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="group flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-amber-400 group-hover:bg-amber-400 group-hover:text-brand-950 transition-all duration-200">
                      <Mail className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span className="font-medium group-hover:text-white transition-colors text-xs sm:text-sm">
                      {settings.contact.email}
                    </span>
                  </a>
                </li>

                {/* Unified Phone */}
                <li>
                  <a
                    href={`tel:${settings.contact.unifiedNumber}`}
                    className="group flex items-center gap-3 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-amber-400 group-hover:bg-amber-400 group-hover:text-brand-950 transition-all duration-200">
                      <Phone className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <span dir="ltr" className="font-medium group-hover:text-white transition-colors">
                      {settings.contact.unifiedDisplay}
                    </span>
                  </a>
                </li>

                {/* Address */}
                <li className="flex items-center gap-3 text-brand-100/90">
                  <div className="w-8 h-8 rounded-full bg-brand-800/90 border border-brand-700/60 flex items-center justify-center shrink-0 text-amber-400">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <span className="font-medium text-xs sm:text-sm leading-relaxed">
                    {isEn
                      ? 'Jeddah - As Salamah Dist. - Nahdah East St.'
                      : 'جدة - حي السلامة - شارع نهضة الشرق'}
                  </span>
                </li>
              </ul>

              {/* Badges: السجل التجاري & العنوان الوطني */}
              <div className="pt-6 mt-6 border-t border-brand-800/60 flex items-center gap-6">
                
                {/* 1. السجل التجاري */}
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <button
                    type="button"
                    onClick={() => setIsCrModalOpen(true)}
                    className="w-12 h-12 rounded-full bg-white shadow-md border border-white/80 p-1.5 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group/cr overflow-hidden"
                    aria-label={t('footer.crLabel')}
                    title={`${t('footer.crLabel')}: ${settings.company.crNumber}`}
                  >
                    <img
                      src={crBadgeImg}
                      alt={t('footer.crLabel')}
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain filter group-hover/cr:scale-105 transition-transform"
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCrModalOpen(true)}
                    className="text-xs text-brand-100 hover:text-white transition-colors font-medium text-center focus-visible:outline-none"
                  >
                    {t('footer.crLabel')}
                  </button>
                </div>

                {/* 2. العنوان الوطني (Converts to & opens PDF) */}
                <div className="flex flex-col items-center gap-1.5 text-center">
                  <a
                    href="/documents/national-address.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white shadow-md border border-white/80 p-1.5 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group/pdf overflow-hidden"
                    aria-label={t('footer.viewNationalAddressPdf')}
                    title={`${t('footer.viewNationalAddressPdf')} (${settings.contact.shortAddress || 'JESA2523'})`}
                  >
                    <img
                      src={nationalAddressImg}
                      alt={t('footer.nationalAddress')}
                      width={44}
                      height={44}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain filter group-hover/pdf:scale-105 transition-transform"
                    />
                  </a>
                  <a
                    href="/documents/national-address.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-brand-100 hover:text-white transition-colors font-medium text-center focus-visible:outline-none"
                  >
                    {t('footer.nationalAddress')}
                  </a>
                </div>

              </div>
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
              <a
                href="/documents/national-address.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors underline-offset-4 hover:underline"
              >
                {t('footer.nationalAddress')}: {settings.contact.shortAddress || 'JESA2523'}
              </a>
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

      {/* Commercial Registration Modal */}
      <Dialog
        isOpen={isCrModalOpen}
        onClose={() => setIsCrModalOpen(false)}
        maxWidth="md"
        showCloseButton={true}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-3.5 pb-4 border-b border-surface-border">
            <div className="w-12 h-12 rounded-xl bg-white border border-surface-border p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
              <img
                src={crBadgeImg}
                alt={isEn ? 'Ministry of Commerce' : 'وزارة التجارة'}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h4 className="text-lg font-bold text-content-heading">
                {t('footer.crModalTitle')}
              </h4>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isEn ? 'Active & Verified' : 'سجل تجاري موثق وقائم'}</span>
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-3.5 text-sm">
            <p className="text-xs text-content-body leading-relaxed">
              {t('footer.crModalDesc')}
            </p>

            <div className="p-3.5 rounded-xl bg-surface-soft border border-surface-border flex items-center justify-between">
              <div>
                <span className="text-[11px] text-content-muted block font-medium">
                  {t('footer.crLabel')}
                </span>
                <span dir="ltr" className="font-mono text-base font-bold text-content-heading">
                  {settings.company.crNumber}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCr}
                className="px-3 py-1.5 rounded-lg border border-surface-border bg-white text-xs font-semibold text-content-heading hover:bg-surface-soft transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                {copiedCr ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">{t('footer.copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{isEn ? 'Copy' : 'نسخ'}</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-soft border border-surface-border space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-content-muted">{isEn ? 'Company' : 'اسم المنشأة'}:</span>
                <span className="font-bold text-content-heading">{isEn ? settings.company.nameEn : settings.company.nameAr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-content-muted">{isEn ? 'Accreditation' : 'الاعتماد الحكومي'}:</span>
                <span className="font-bold text-emerald-700">{isEn ? settings.company.accreditationEn : settings.company.accreditationAr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-content-muted">{isEn ? 'Headquarters' : 'المركز الرئيسي'}:</span>
                <span className="font-semibold text-content-heading">{isEn ? settings.contact.cityEn : settings.contact.cityAr}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-content-muted">{isEn ? 'National Address' : 'العنوان الوطني'}:</span>
                <a
                  href="/documents/national-address.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono font-bold text-brand-600 hover:underline flex items-center gap-1.5"
                >
                  <img
                    src={nationalAddressImg}
                    alt=""
                    className="w-4 h-4 object-contain inline-block"
                  />
                  <span>{settings.contact.shortAddress || 'JESA2523'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-4 border-t border-surface-border flex items-center justify-between gap-3">
            <a
              href="/documents/national-address.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 underline underline-offset-2"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{t('footer.viewNationalAddressPdf')}</span>
            </a>
            <button
              type="button"
              onClick={() => setIsCrModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-brand-900 text-white text-xs font-semibold hover:bg-brand-800 transition-colors cursor-pointer"
            >
              {isEn ? 'Close' : 'إغلاق'}
            </button>
          </div>
        </div>
      </Dialog>
    </footer>
  )
}
