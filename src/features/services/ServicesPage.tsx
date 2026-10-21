import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'
import {
  Wrench,
  Sparkles,
  Layers,
  Cpu,
  Compass,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'
import {
  Container,
  Section,
  BrandPattern,
  Breadcrumbs,
} from '@/components/ui'

import { CtaBand } from '@/components/layout/CtaBand'
import { Seo } from '@/components/seo/Seo'

export const ServicesPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const prefix = isEn ? '/en' : ''

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: isEn ? '/en' : '/' },
    { label: t('nav.services') },
  ]

  const services = [
    {
      key: 'maintenance',
      icon: <Wrench className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.maintenance.title'),
      desc: t('services.maintenance.intro'),
      slug: 'elevator-maintenance',
      items: (t('services.maintenance.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
    {
      key: 'modernization',
      icon: <Sparkles className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.modernization.title'),
      desc: t('services.modernization.intro'),
      slug: 'elevator-modernization',
      items: (t('services.modernization.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
    {
      key: 'installation',
      icon: <Layers className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.installation.title'),
      desc: t('services.installation.intro'),
      slug: 'elevator-installation',
      items: (t('services.installation.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
    {
      key: 'spareParts',
      icon: <Cpu className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.spareParts.title'),
      desc: t('services.spareParts.intro'),
      slug: 'elevator-spare-parts',
      items: (t('services.spareParts.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
    {
      key: 'escalators',
      icon: <Compass className="w-6 h-6 text-brand-600" aria-hidden="true" />,
      title: t('services.escalators.title'),
      desc: t('services.escalators.intro'),
      slug: 'escalators-moving-walkways',
      items: (t('services.escalators.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
  ]

  return (
    <>
      <Seo
        title={t('services.pageTitle')}
        description={t('services.pageDescription')}
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
              {t('services.eyebrow')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              {t('services.heading')}
            </h1>
            <p className="text-base sm:text-lg text-brand-100 leading-relaxed font-normal">
              {t('services.intro')}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Section variant="white">
        <Container>
          <div className="space-y-8">
            {services.map((service, index) => {
              const detailUrl = `${prefix}/services/${service.slug}`
              return (
                <article
                  key={service.key}
                  className="bg-white rounded-card border border-surface-border p-8 md:p-10 hover:shadow-card-hover transition-all duration-200 flex flex-col lg:flex-row gap-8 items-start justify-between"
                >
                  <div className="lg:max-w-2xl flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-control bg-brand-50 flex items-center justify-center flex-shrink-0">
                        {service.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block">
                          0{index + 1}
                        </span>
                        <h2 className="text-2xl font-bold text-content-heading">
                          <Link
                            to={detailUrl}
                            className="hover:text-brand-600 transition-colors"
                          >
                            {service.title}
                          </Link>
                        </h2>
                      </div>
                    </div>

                    <p className="text-content-body text-base leading-relaxed mb-6">
                      {service.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                      {service.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-content-body font-medium"
                        >
                          <CheckCircle2 className="w-4 h-4 text-brand-600 flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-auto lg:self-center flex flex-col sm:flex-row lg:flex-col gap-3">
                    <Link
                      to={detailUrl}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control text-sm font-semibold bg-brand-600 hover:bg-brand-500 text-white transition-colors shadow-sm"
                    >
                      <span>{t('services.cardLearnMore')}</span>
                      {isRtl ? (
                        <ArrowLeft className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                    </Link>

                    <Link
                      to={`${prefix}/contact`}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-control text-sm font-semibold bg-surface-subtle hover:bg-surface-border text-content-heading transition-colors border border-surface-border"
                    >
                      <span>{t('actions.requestQuote')}</span>
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* CTA Band */}
      <CtaBand />
    </>
  )
}
