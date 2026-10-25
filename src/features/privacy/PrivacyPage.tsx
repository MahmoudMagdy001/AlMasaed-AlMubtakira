import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { Info, Mail } from 'lucide-react'
import {
  Container,
  Section,
  BrandPattern,
  Breadcrumbs,
} from '@/components/ui'
import { Seo } from '@/components/seo'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export const PrivacyPage: React.FC = () => {
  const { t } = useTranslation()
  const settings = useSiteSettings()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const heroRef = useHeroAnimation()
  const contentRevealRef = useScrollReveal({
    selector: '[data-privacy-reveal]',
    distance: 20,
    stagger: 0.1,
  })

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: isEn ? '/en' : '/' },
    { label: t('privacy.heading') },
  ]

  const sections = (t('privacy.sections', { returnObjects: true }) as Array<{
    title: string
    content: string
  }>) || []

  return (
    <>
      <Seo
        title={t('privacy.pageTitle')}
        description={t('privacy.pageDescription')}
        canonical={isEn ? '/en/privacy' : '/privacy'}
        hreflang={{
          ar: 'https://almubtakirah.com/privacy',
          en: 'https://almubtakirah.com/en/privacy',
          xDefault: 'https://almubtakirah.com/privacy',
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
        breadcrumbs={[
          { name: t('common.breadcrumbHome'), url: isEn ? '/en' : '/' },
          { name: t('privacy.heading'), url: isEn ? '/en/privacy' : '/privacy' },
        ]}
      />

      {/* Header Banner */}
      <section ref={heroRef} className="bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden">
        <BrandPattern opacity={0.07} />
        <Container className="relative z-10">
          <div data-hero-element>
            <Breadcrumbs items={breadcrumbsItems} className="mb-6 text-white/80" />
          </div>
          <div className="max-w-3xl">
            <span data-hero-element className="text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2">
              {t('privacy.eyebrow')}
            </span>
            <h1 data-hero-element className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {t('privacy.heading')}
            </h1>
            <p data-hero-element className="text-sm text-brand-200">
              {t('privacy.lastUpdated')}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content */}
      <Section variant="white">
        <Container>
          <div ref={contentRevealRef} className="max-w-4xl mx-auto">
            {/* Owner Review Notice (as specified in phase-03 and 02) */}
            <div
              data-privacy-reveal
              className="p-5 rounded-control bg-brand-50 border border-brand-200 flex items-start gap-3.5 mb-10 text-xs sm:text-sm text-brand-900 leading-relaxed"
              role="note"
            >
              <Info className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
              <div>{t('privacy.reviewNotice')}</div>
            </div>

            <div data-privacy-reveal className="space-y-8 bg-white p-8 sm:p-12 rounded-card border border-surface-border">
              {sections.map((sec, idx) => (
                <section key={idx} className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-content-heading">
                    {sec.title}
                  </h2>
                  <p className="text-sm sm:text-base text-content-body leading-relaxed">
                    {sec.content}
                  </p>
                </section>
              ))}

              <div className="pt-8 border-t border-surface-border flex items-center gap-3 text-sm text-content-muted">
                <Mail className="w-4 h-4 text-brand-600 flex-shrink-0" />
                <span>
                  {isEn ? 'Official privacy inquiries:' : 'للاستفسارات والطلبات المتعلقة بالخصوصية:'}{' '}
                  <a
                    href={`mailto:${settings.contact.email}`}
                    className="font-bold text-brand-600 hover:underline"
                  >
                    {settings.contact.email}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
