import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import {
  CheckCircle2,
  Layers,
  ArrowLeft,
  ArrowRight,
  Phone,
} from 'lucide-react'
import {
  Container,
  Section,
  SectionHeading,
  BrandPattern,
  Breadcrumbs,
  Accordion,
  Button,
} from '@/components/ui'
import { CtaBand } from '@/components/layout/CtaBand'
import { Seo } from '@/components/seo/Seo'
import { siteConfig } from '@/lib/siteConfig'

export type ServiceKey =
  | 'maintenance'
  | 'modernization'
  | 'installation'
  | 'spareParts'
  | 'escalators'

interface ServiceDetailPageProps {
  serviceKey: ServiceKey
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  serviceKey,
}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const prefix = isEn ? '/en' : ''

  const serviceData = {
    title: t(`services.${serviceKey}.title`),
    h1: t(`services.${serviceKey}.h1`),
    intro: t(`services.${serviceKey}.intro`),
    included: (t(`services.${serviceKey}.included`, {
      returnObjects: true,
    }) as string[]) || [],
    process: (t(`services.${serviceKey}.process`, {
      returnObjects: true,
    }) as Array<{ step: string; title: string; desc: string }>) || [],
    equipment: (t(`services.${serviceKey}.equipment`, {
      returnObjects: true,
    }) as string[]) || [],
    faqs: (t(`services.${serviceKey}.faqs`, {
      returnObjects: true,
    }) as Array<{ q: string; a: string }>) || [],
  }

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: prefix || '/' },
    { label: t('common.breadcrumbServices'), to: `${prefix}/services` },
    { label: serviceData.title },
  ]

  // Construct JSON-LD FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: serviceData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const accordionItems = serviceData.faqs.map((faq, idx) => ({
    id: `faq-${idx}`,
    title: faq.q,
    content: (
      <p className="text-sm text-content-body leading-relaxed py-2">
        {faq.a}
      </p>
    ),
  }))

  return (
    <>
      <Seo
        title={`${serviceData.title} | ${t('brand.name')}`}
        description={serviceData.intro.slice(0, 160)}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
      >
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Seo>

      {/* Header Banner */}
      <section className="bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden">
        <BrandPattern opacity={0.07} />
        <Container className="relative z-10">
          <Breadcrumbs items={breadcrumbsItems} className="mb-6 text-white/80" />
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2">
              {t('services.eyebrow')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
              {serviceData.h1}
            </h1>
            <p className="text-base sm:text-lg text-brand-100 leading-relaxed font-normal mb-8">
              {serviceData.intro}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                to={`${prefix}/contact`}
                className="bg-brand-600 hover:bg-brand-500 font-semibold"
                rightIcon={
                  isRtl ? (
                    <ArrowLeft className="w-5 h-5" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )
                }
              >
                {t('actions.requestQuote')}
              </Button>
              <Button
                variant="inverse"
                size="lg"
                href={`tel:${siteConfig.contact.unifiedNumber}`}
                leftIcon={<Phone className="w-5 h-5 text-brand-400" />}
                className="font-semibold"
              >
                {t('actions.callNow')}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What is Included */}
      <Section variant="white" className="border-b border-surface-border">
        <Container>
          <div className="max-w-4xl">
            <SectionHeading
              kicker={isEn ? 'Scope of Service' : 'نطاق العمل'}
              title={t('services.includedTitle')}
              className="mb-8"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceData.included.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-control border border-surface-border bg-surface-subtle/50 flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-content-body">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Process Steps */}
      <Section variant="soft" className="border-b border-surface-border">
        <Container>
          <SectionHeading
            kicker={isEn ? 'Methodology' : 'آلية العمل'}
            title={t('services.processTitle')}
            align="center"
            className="max-w-2xl mx-auto mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceData.process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-card bg-white border border-surface-border flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="text-2xl font-black text-brand-300 block mb-3 font-mono">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-content-heading mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-content-body leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Equipment Covered */}
      <Section variant="white" className="border-b border-surface-border">
        <Container>
          <div className="max-w-3xl">
            <SectionHeading
              kicker={isEn ? 'Covered Systems' : 'الأنظمة المشمولة'}
              title={t('services.equipmentTitle')}
              className="mb-8"
            />
            <div className="space-y-3">
              {serviceData.equipment.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-4 bg-white rounded-control border border-surface-border text-sm font-medium text-content-heading"
                >
                  <Layers className="w-4 h-4 text-brand-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Accordion */}
      {accordionItems.length > 0 && (
        <Section variant="soft" className="border-b border-surface-border">
          <Container>
            <div className="max-w-3xl mx-auto">
              <SectionHeading
                kicker={isEn ? 'Knowledge Base' : 'إجابات وتوضيحات'}
                title={t('services.faqTitle')}
                align="center"
                className="mb-10"
              />

              <Accordion items={accordionItems} />
            </div>
          </Container>
        </Section>
      )}

      {/* CTA Band */}
      <CtaBand
        title={t('services.ctaTitle')}
        subtitle={t('services.ctaText')}
      />
    </>
  )
}
