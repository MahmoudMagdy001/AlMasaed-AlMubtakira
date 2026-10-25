import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, Link } from 'react-router-dom'
import {
  Wrench,
  Sparkles,
  Building2,
  PackageCheck,
  ArrowUpDown,
  ArrowLeft,
  ArrowRight,
} from 'lucide-react'
import {
  Container,
  Section,
  BrandPattern,
  Breadcrumbs,
} from '@/components/ui'
import { getServiceIncludedIcon } from './serviceIcons'
import type { ServiceKey } from './ServiceDetailPage'

import { CtaBand } from '@/components/layout/CtaBand'
import { Seo, getCollectionPageSchema } from '@/components/seo'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'
import { useScrollReveal } from '@/hooks/useScrollReveal'

export const ServicesPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const heroRef = useHeroAnimation()
  const servicesRevealRef = useScrollReveal({
    selector: '[data-service-card]',
    distance: 20,
    stagger: 0.08,
  })

  const prefix = isEn ? '/en' : ''

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: isEn ? '/en' : '/' },
    { label: t('nav.services') },
  ]

  const services = [
    {
      key: 'maintenance',
      icon: <Wrench className="w-7 h-7 text-brand-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />,
      badgeClass: 'bg-gradient-to-br from-brand-50 to-brand-100/80 border-brand-200/80',
      title: t('services.maintenance.title'),
      desc: t('services.maintenance.intro'),
      slug: 'elevator-maintenance',
      items: (t('services.maintenance.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
    {
      key: 'modernization',
      icon: <Sparkles className="w-7 h-7 text-indigo-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />,
      badgeClass: 'bg-gradient-to-br from-indigo-50 to-blue-100/70 border-indigo-200/80',
      title: t('services.modernization.title'),
      desc: t('services.modernization.intro'),
      slug: 'elevator-modernization',
      items: (t('services.modernization.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
    {
      key: 'installation',
      icon: <Building2 className="w-7 h-7 text-amber-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />,
      badgeClass: 'bg-gradient-to-br from-amber-50 to-orange-100/70 border-amber-200/80',
      title: t('services.installation.title'),
      desc: t('services.installation.intro'),
      slug: 'elevator-installation',
      items: (t('services.installation.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
    {
      key: 'spareParts',
      icon: <PackageCheck className="w-7 h-7 text-emerald-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />,
      badgeClass: 'bg-gradient-to-br from-emerald-50 to-teal-100/70 border-emerald-200/80',
      title: t('services.spareParts.title'),
      desc: t('services.spareParts.intro'),
      slug: 'elevator-spare-parts',
      items: (t('services.spareParts.included', {
        returnObjects: true,
      }) as string[]).slice(0, 4),
    },
    {
      key: 'escalators',
      icon: <ArrowUpDown className="w-7 h-7 text-purple-600 transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />,
      badgeClass: 'bg-gradient-to-br from-purple-50 to-indigo-100/70 border-purple-200/80',
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
        canonical={isEn ? '/en/services' : '/services'}
        hreflang={{
          ar: 'https://almubtakirah.com/services',
          en: 'https://almubtakirah.com/en/services',
          xDefault: 'https://almubtakirah.com/services',
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
        breadcrumbs={[
          { name: t('common.breadcrumbHome'), url: isEn ? '/en' : '/' },
          { name: t('nav.services'), url: isEn ? '/en/services' : '/services' },
        ]}
        jsonLd={[
          getCollectionPageSchema(
            t('services.pageTitle'),
            t('services.pageDescription'),
            isEn ? 'https://almubtakirah.com/en/services' : 'https://almubtakirah.com/services',
          ),
        ]}
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
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
            >
              {t('services.heading')}
            </h1>
            <p
              data-hero-element
              className="text-base sm:text-lg text-brand-100 leading-relaxed font-normal"
            >
              {t('services.intro')}
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Section variant="white">
        <Container>
          <div ref={servicesRevealRef} className="space-y-8">
            {services.map((service, index) => {
              const detailUrl = `${prefix}/services/${service.slug}`
              return (
                <article
                  key={service.key}
                  data-service-card
                  className="group card-hover bg-white rounded-card border border-surface-border p-8 md:p-10 hover:border-brand-300 flex flex-col lg:flex-row gap-8 items-start justify-between"
                >
                  <div className="lg:max-w-2xl flex-1">
                    <div className="flex items-center gap-4 mb-5">
                      <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs group-hover:shadow-sm transition-all duration-300 ${service.badgeClass}`}>
                        {service.icon}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-brand-600 uppercase tracking-wider block mb-1">
                          0{index + 1}
                        </span>
                        <h2 className="text-2xl font-bold text-content-heading group-hover:text-brand-600 transition-colors">
                          <Link
                            to={detailUrl}
                          >
                            {service.title}
                          </Link>
                        </h2>
                      </div>
                    </div>

                    <p className="text-content-body text-base leading-relaxed mb-6 font-normal">
                      {service.desc}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                      {service.items.map((item, i) => {
                        const ItemIcon = getServiceIncludedIcon(
                          service.key as ServiceKey,
                          i,
                        )
                        return (
                          <div
                            key={i}
                            className="flex items-center gap-2.5 text-sm text-content-body font-medium"
                          >
                            <div className="w-6 h-6 rounded-md bg-brand-50 border border-brand-200/80 flex items-center justify-center shrink-0 text-brand-600">
                              <ItemIcon className="w-3.5 h-3.5" />
                            </div>
                            <span>{item}</span>
                          </div>
                        )
                      })}
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
