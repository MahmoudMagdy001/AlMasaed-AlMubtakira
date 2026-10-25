import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Phone,
} from 'lucide-react'
import {
  getServiceIncludedIcon,
  getEquipmentIcon,
  getServiceProcessIcon,
} from './serviceIcons'
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
import { Seo, getServiceSchema, getFaqSchema } from '@/components/seo'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { useWorks } from '@/hooks/useWorks'
import { WorkCard } from '@/features/works/components/WorkCard'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'
import { useScrollReveal } from '@/hooks/useScrollReveal'

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
  const settings = useSiteSettings()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const heroRef = useHeroAnimation()
  const includedRef = useScrollReveal({
    selector: '[data-included-item]',
    distance: 16,
    stagger: 0.05,
    dependencies: [serviceKey],
  })
  const processRef = useScrollReveal({
    selector: '[data-process-step]',
    distance: 20,
    stagger: 0.08,
    dependencies: [serviceKey],
  })
  const equipmentRef = useScrollReveal({
    selector: '[data-equipment-card]',
    distance: 16,
    stagger: 0.06,
    dependencies: [serviceKey],
  })
  const relatedWorksRef = useScrollReveal({
    selector: '[data-related-work]',
    distance: 20,
    stagger: 0.08,
  })

  const dbServiceTypeMap: Record<ServiceKey, string> = {
    maintenance: 'maintenance',
    modernization: 'modernization',
    installation: 'installation',
    spareParts: 'spare-parts',
    escalators: 'escalators',
  }

  const { data: relatedWorksData } = useWorks({
    serviceType: dbServiceTypeMap[serviceKey],
    limit: 3,
  })

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
    }) as Array<string | { title: string; desc: string; tag?: string }>) || [],
    faqs: (t(`services.${serviceKey}.faqs`, {
      returnObjects: true,
    }) as Array<{ q: string; a: string }>) || [],
  }

  const serviceSlugMap: Record<ServiceKey, string> = {
    maintenance: 'elevator-maintenance',
    modernization: 'elevator-modernization',
    installation: 'elevator-installation',
    spareParts: 'elevator-spare-parts',
    escalators: 'escalators-moving-walkways',
  }

  const serviceSlug = serviceSlugMap[serviceKey]
  const canonicalUrl = `https://almubtakirah.com${prefix}/services/${serviceSlug}`

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: prefix || '/' },
    { label: t('common.breadcrumbServices'), to: `${prefix}/services` },
    { label: serviceData.title },
  ]

  const serviceSchema = getServiceSchema(
    serviceData.title,
    serviceData.intro,
    canonicalUrl,
  )
  const faqSchema = getFaqSchema(serviceData.faqs)

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
        canonical={canonicalUrl}
        hreflang={{
          ar: `https://almubtakirah.com/services/${serviceSlug}`,
          en: `https://almubtakirah.com/en/services/${serviceSlug}`,
          xDefault: `https://almubtakirah.com/services/${serviceSlug}`,
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
        breadcrumbs={[
          { name: t('common.breadcrumbHome'), url: isEn ? '/en' : '/' },
          { name: t('common.breadcrumbServices'), url: isEn ? '/en/services' : '/services' },
          { name: serviceData.title, url: canonicalUrl },
        ]}
        jsonLd={[serviceSchema, faqSchema].filter(Boolean) as Array<Record<string, unknown>>}
      />

      {/* Header Banner */}
      <section
        ref={heroRef}
        className="bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden"
      >
        <BrandPattern opacity={0.07} />
        <Container className="relative z-10">
          <Breadcrumbs items={breadcrumbsItems} className="mb-6 text-white/80" />
          <div className="max-w-3xl">
            <span
              data-hero-element
              className="text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2"
            >
              {t('services.eyebrow')}
            </span>
            <h1
              data-hero-element
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight"
            >
              {serviceData.h1}
            </h1>
            <p
              data-hero-element
              className="text-base sm:text-lg text-brand-100 leading-relaxed font-normal mb-8"
            >
              {serviceData.intro}
            </p>

            <div data-hero-element className="flex flex-wrap items-center gap-4">
              <Button
                variant="hero"
                size="lg"
                to={`${prefix}/contact`}
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
                href={`tel:${settings.contact.unifiedNumber}`}
                leftIcon={<Phone className="w-5 h-5 text-brand-300" />}
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
            <div ref={includedRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceData.included.map((item, idx) => {
                const IconComponent = getServiceIncludedIcon(serviceKey, idx)
                return (
                  <div
                    key={idx}
                    data-included-item
                    className="group card-hover p-4 md:p-5 rounded-card border border-surface-border bg-white hover:border-brand-300 flex items-start gap-3.5"
                  >
                    <div className="w-10 h-10 rounded-control bg-brand-50 border border-brand-100 flex items-center justify-center shrink-0 text-brand-600 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-200 mt-0.5 shadow-xs">
                      <IconComponent className="w-5 h-5 transition-transform duration-200 group-hover:scale-105" />
                    </div>
                    <span className="text-sm md:text-[0.925rem] font-semibold text-content-heading leading-relaxed pt-1 group-hover:text-brand-900 transition-colors">
                      {item}
                    </span>
                  </div>
                )
              })}
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

          <div ref={processRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {serviceData.process.map((step, idx) => {
              const StepIcon = getServiceProcessIcon(serviceKey, idx)
              return (
                <div
                  key={step.step}
                  data-process-step
                  className="card-hover p-6 md:p-7 rounded-card bg-white border border-surface-border flex flex-col justify-between shadow-xs hover:border-brand-300 group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100/80 flex items-center justify-center text-brand-600 group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs">
                        <StepIcon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold font-mono tracking-wider px-2.5 py-1 rounded-full bg-brand-50 border border-brand-200/60 text-brand-700 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                        {isEn ? `Step ${step.step}` : `مرحلة ${step.step}`}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-content-heading mb-2.5 group-hover:text-brand-900 transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-sm text-content-body leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>

                  <div className="h-1 w-10 group-hover:w-full bg-brand-100 group-hover:bg-brand-500 rounded-full transition-all duration-300 mt-6" />
                </div>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Equipment Covered */}
      <Section variant="white" className="border-b border-surface-border">
        <Container>
          <div className="max-w-5xl">
            <SectionHeading
              kicker={isEn ? 'Covered Systems' : 'الأنظمة المشمولة'}
              title={t('services.equipmentTitle')}
              intro={
                isEn
                  ? 'Comprehensive engineering coverage tailored to every elevator system and architectural requirement across Jeddah.'
                  : 'تغطية هندسية متخصصة لكافة أنواع المصاعد ومنظومات النقل العمودي في مختلف منشآت ومباني جدة.'
              }
              className="mb-10"
            />
            <div ref={equipmentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {serviceData.equipment.map((rawItem, idx) => {
                const item =
                  typeof rawItem === 'string'
                    ? { title: rawItem, desc: '', tag: undefined }
                    : rawItem
                const EquipIcon = getEquipmentIcon(serviceKey, idx)

                return (
                  <div
                    key={idx}
                    data-equipment-card
                    className="card-hover p-5 md:p-6 rounded-card border border-surface-border bg-white hover:border-brand-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-brand-50 border border-brand-100/80 flex items-center justify-center shrink-0 text-brand-600 group-hover:bg-brand-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-xs">
                          <EquipIcon className="w-5 h-5" />
                        </div>
                        {item.tag && (
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-50/70 border border-brand-100 text-brand-700">
                            {item.tag}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base md:text-lg font-bold text-content-heading mb-2 group-hover:text-brand-900 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      {item.desc && (
                        <p className="text-xs md:text-sm text-content-body leading-relaxed font-normal">
                          {item.desc}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Works (DB-driven, hides gracefully when empty) */}
      {relatedWorksData?.works && relatedWorksData.works.length > 0 && (
        <Section variant="white" className="border-b border-surface-border">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
              <SectionHeading
                kicker={isEn ? 'Our Portfolio' : 'سابقة أعمالنا'}
                title={isEn ? 'Selected Projects' : 'مشاريع منفذة في هذه الخدمة'}
                intro={
                  isEn
                    ? 'Explore completed projects and engineering implementations in Jeddah.'
                    : 'نماذج من أعمالنا ومشاريعنا المنجزة في جدة وفق أعلى معايير السلامة.'
                }
              />
              <Link
                to={
                  isEn
                    ? `/en/works?service=${dbServiceTypeMap[serviceKey]}`
                    : `/works?service=${dbServiceTypeMap[serviceKey]}`
                }
                className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-500 font-semibold text-sm mt-4 md:mt-0 transition-colors"
              >
                <span>{t('actions.viewWorks')}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>

            <div ref={relatedWorksRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedWorksData.works.map((w) => (
                <div key={w.id} data-related-work>
                  <WorkCard work={w} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

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
