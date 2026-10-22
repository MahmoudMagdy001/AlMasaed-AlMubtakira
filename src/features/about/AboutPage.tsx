import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Hexagon,
  Palette,
  Wrench,
  Cpu,
  Building2,
  MapPin,
  FileCheck,
} from 'lucide-react'
import {
  Container,
  Section,
  SectionHeading,
  BrandPattern,
  Breadcrumbs,
} from '@/components/ui'
import { CtaBand } from '@/components/layout/CtaBand'
import { Seo, getLocalBusinessSchema } from '@/components/seo'
import { usePartners } from '@/hooks/usePartners'
import { PartnersSection } from '@/features/home/components/PartnersSection'

export const AboutPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { data: partnersData } = usePartners()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: isEn ? '/en' : '/' },
    { label: t('nav.about') },
  ]

  const facts = (t('about.facts', { returnObjects: true }) as Array<{
    label: string
    value: string
  }>) || []

  const logoElements = (t('about.logoElements', {
    returnObjects: true,
  }) as Array<{
    title: string
    description: string
  }>) || []

  const logoIcons = [
    <TrendingUp key="0" className="w-6 h-6 text-brand-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />,
    <Hexagon key="1" className="w-6 h-6 text-brand-700 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />,
    <Palette key="2" className="w-6 h-6 text-brand-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />,
  ]

  const logoBadgeStyles = [
    'bg-gradient-to-br from-brand-50 to-brand-100/80 border-brand-200/60 text-brand-600',
    'bg-gradient-to-br from-blue-50 to-indigo-100/70 border-indigo-200/60 text-brand-700',
    'bg-gradient-to-br from-sky-50 to-cyan-100/70 border-sky-200/60 text-brand-600',
  ]

  const factIcons = [
    <FileCheck key="0" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
    <ShieldCheck key="1" className="w-5 h-5 text-feedback-success" aria-hidden="true" />,
    <Building2 key="2" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
    <Wrench key="3" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
    <CheckCircle2 key="4" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
    <MapPin key="5" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
  ]

  const factBadgeStyles = [
    'bg-brand-50 text-brand-600 border-brand-100',
    'bg-emerald-50 text-feedback-success border-emerald-100',
    'bg-brand-50 text-brand-600 border-brand-100',
    'bg-brand-50 text-brand-600 border-brand-100',
    'bg-brand-50 text-brand-600 border-brand-100',
    'bg-brand-50 text-brand-600 border-brand-100',
  ]

  return (
    <>
      <Seo
        title={t('about.pageTitle')}
        description={t('about.pageDescription')}
        canonical={isEn ? '/en/about' : '/about'}
        hreflang={{
          ar: 'https://almubtakirah.com/about',
          en: 'https://almubtakirah.com/en/about',
          xDefault: 'https://almubtakirah.com/about',
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
        breadcrumbs={[
          { name: t('common.breadcrumbHome'), url: isEn ? '/en' : '/' },
          { name: t('nav.about'), url: isEn ? '/en/about' : '/about' },
        ]}
        jsonLd={[getLocalBusinessSchema(isEn ? 'en' : 'ar')]}
      />

      {/* Header Banner */}
      <section className="bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden">
        <BrandPattern opacity={0.07} />
        <Container className="relative z-10">
          <Breadcrumbs items={breadcrumbsItems} className="mb-6 text-white/80" />
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2">
              {t('about.eyebrow')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {t('about.heading')}
            </h1>
            <p className="text-base sm:text-lg text-brand-100 leading-relaxed font-normal">
              {t('about.lead')}
            </p>
          </div>
        </Container>
      </section>

      {/* Pillars Section: Vision, Approach, Safety */}
      <Section variant="white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Vision */}
            <div className="p-8 rounded-card border border-surface-border bg-white flex flex-col justify-between shadow-xs hover:border-brand-300 hover:shadow-card transition-all duration-300">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-brand-600 shrink-0" />
                  {t('about.visionEyebrow')}
                </span>
                <h2 className="text-xl font-bold text-content-heading mb-4 leading-snug">
                  {t('about.visionHeading')}
                </h2>
                <p className="text-sm text-content-body leading-relaxed">
                  {t('about.visionText')}
                </p>
              </div>
            </div>

            {/* Approach */}
            <div className="p-8 rounded-card border border-surface-border bg-white flex flex-col justify-between shadow-xs hover:border-brand-300 hover:shadow-card transition-all duration-300">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-brand-600 shrink-0" />
                  {t('about.approachEyebrow')}
                </span>
                <h2 className="text-xl font-bold text-content-heading mb-4 leading-snug">
                  {t('about.approachHeading')}
                </h2>
                <p className="text-sm text-content-body leading-relaxed">
                  {t('about.approachText')}
                </p>
              </div>
            </div>

            {/* Safety Mission */}
            <div className="p-8 rounded-card border border-surface-border bg-brand-50/50 flex flex-col justify-between shadow-xs hover:border-brand-300 hover:shadow-card transition-all duration-300">
              <div>
                <span className="text-xs font-bold text-feedback-success uppercase tracking-wide mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-feedback-success shrink-0" />
                  {t('about.missionEyebrow')}
                </span>
                <h2 className="text-xl font-bold text-content-heading mb-4 leading-snug">
                  {t('about.missionHeading')}
                </h2>
                <p className="text-sm text-content-body leading-relaxed">
                  {t('about.missionText')}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Brand & Logo Meaning */}
      <Section variant="soft" className="border-t border-b border-surface-border">
        <Container>
          <SectionHeading
            kicker={isEn ? 'Visual Identity & Philosophy' : 'فلسفة الهوية الهندسية'}
            title={t('about.logoMeaningTitle')}
            intro={t('about.logoMeaningIntro')}
            className="max-w-3xl mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {logoElements.map((elem, idx) => (
              <div
                key={idx}
                className="group p-7 rounded-card bg-white border border-surface-border flex flex-col hover:border-brand-300 hover:shadow-card transition-all duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 shadow-xs group-hover:shadow-sm transition-all duration-300 ${
                    logoBadgeStyles[idx % logoBadgeStyles.length]
                  }`}
                >
                  {logoIcons[idx % logoIcons.length]}
                </div>
                <h3 className="text-lg font-bold text-content-heading mb-3 group-hover:text-brand-600 transition-colors duration-200">
                  {elem.title}
                </h3>
                <p className="text-sm text-content-body leading-relaxed">
                  {elem.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Corporate Facts Box */}
      <Section variant="white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <SectionHeading
              kicker={isEn ? 'Official Credentials & Facts' : 'اعتمادات رسمية وموثوقية'}
              title={t('about.factsTitle')}
              align="center"
              className="mb-10 max-w-2xl mx-auto"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-control bg-surface-subtle/50 border border-surface-border flex items-start gap-4 hover:border-brand-300 hover:shadow-xs hover:bg-white transition-all duration-300"
                >
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 shadow-xs ${
                      factBadgeStyles[idx % factBadgeStyles.length]
                    }`}
                  >
                    {factIcons[idx % factIcons.length]}
                  </div>
                  <div>
                    <span className="text-xs text-content-muted block mb-1 font-medium">
                      {fact.label}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-content-heading">
                      {fact.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Partners Section (hidden when empty) */}
      <PartnersSection partners={partnersData} variant="white" />

      {/* CTA Band */}
      <CtaBand />
    </>
  )
}
