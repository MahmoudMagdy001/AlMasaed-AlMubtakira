import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
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
import { Seo } from '@/components/seo/Seo'
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
    <TrendingUp key="0" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
    <Cpu key="1" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
    <Layers key="2" className="w-6 h-6 text-brand-600" aria-hidden="true" />,
  ]

  const factIcons = [
    <FileCheck key="0" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
    <ShieldCheck key="1" className="w-5 h-5 text-feedback-success" aria-hidden="true" />,
    <MapPin key="2" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
    <Building2 key="3" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
    <CheckCircle2 key="4" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
    <MapPin key="5" className="w-5 h-5 text-brand-600" aria-hidden="true" />,
  ]

  return (
    <>
      <Seo
        title={t('about.pageTitle')}
        description={t('about.pageDescription')}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
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
            <div className="p-8 rounded-card border border-surface-border bg-white flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wide block mb-3">
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
            <div className="p-8 rounded-card border border-surface-border bg-white flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wide block mb-3">
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
            <div className="p-8 rounded-card border border-surface-border bg-brand-50/50 flex flex-col justify-between shadow-xs">
              <div>
                <span className="text-xs font-bold text-feedback-success uppercase tracking-wide block mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
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
            kicker={isEn ? 'Visual Identity' : 'الهوية البصرية'}
            title={t('about.logoMeaningTitle')}
            intro={t('about.logoMeaningIntro')}
            className="max-w-3xl mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {logoElements.map((elem, idx) => (
              <div
                key={idx}
                className="p-6 rounded-card bg-white border border-surface-border flex flex-col"
              >
                <div className="w-12 h-12 rounded-control bg-brand-50 flex items-center justify-center mb-5">
                  {logoIcons[idx % logoIcons.length]}
                </div>
                <h3 className="text-lg font-bold text-content-heading mb-3">
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
              kicker={isEn ? 'Verified Facts' : 'حقائق وبيانات رسمية'}
              title={t('about.factsTitle')}
              align="center"
              className="mb-10"
            />


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {facts.map((fact, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-control bg-surface-subtle/60 border border-surface-border flex items-start gap-4"
                >
                  <div className="mt-0.5 flex-shrink-0">
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
