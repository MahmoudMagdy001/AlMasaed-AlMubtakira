import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams } from 'react-router-dom'
import { Briefcase, ArrowRight, ArrowLeft } from 'lucide-react'
import {
  Container,
  Section,
  BrandPattern,
  Breadcrumbs,
  Button,
  Pagination,
} from '@/components/ui'
import { Seo, getCollectionPageSchema } from '@/components/seo'
import { CtaBand } from '@/components/layout/CtaBand'
import { useWorks } from '@/hooks/useWorks'
import { WorkCard } from './components/WorkCard'

const ITEMS_PER_PAGE = 12

export const WorksPage: React.FC = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const currentServiceFilter = searchParams.get('service') || 'all'
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isLoading } = useWorks({
    serviceType: currentServiceFilter,
    limit: ITEMS_PER_PAGE,
    offset: (currentPage - 1) * ITEMS_PER_PAGE,
  })

  const works = data?.works || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / ITEMS_PER_PAGE)

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: isEn ? '/en' : '/' },
    { label: t('works.heading') },
  ]

  const filterOptions = [
    { id: 'all', label: t('works.filters.all') },
    { id: 'maintenance', label: t('works.filters.maintenance') },
    { id: 'modernization', label: t('works.filters.modernization') },
    { id: 'installation', label: t('works.filters.installation') },
    { id: 'spare-parts', label: t('works.filters.spareParts') },
    { id: 'escalators', label: t('works.filters.escalators') },
  ]

  const handleFilterChange = (serviceId: string) => {
    setCurrentPage(1)
    if (serviceId === 'all') {
      searchParams.delete('service')
      setSearchParams(searchParams)
    } else {
      searchParams.set('service', serviceId)
      setSearchParams(searchParams)
    }
  }

  // Canonical URL always points to base route without query parameters
  const canonicalUrl = `https://almubtakirah.com${isEn ? '/en/works' : '/works'}`

  return (
    <>
      <Seo
        title={t('works.pageTitle')}
        description={t('works.pageDescription')}
        canonical={canonicalUrl}
        hreflang={{
          ar: 'https://almubtakirah.com/works',
          en: 'https://almubtakirah.com/en/works',
          xDefault: 'https://almubtakirah.com/works',
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
        breadcrumbs={[
          { name: t('common.breadcrumbHome'), url: isEn ? '/en' : '/' },
          { name: t('works.heading'), url: isEn ? '/en/works' : '/works' },
        ]}
        jsonLd={[
          getCollectionPageSchema(
            t('works.pageTitle'),
            t('works.pageDescription'),
            canonicalUrl,
          ),
        ]}
        noindex={total === 0} // Mandated: noindex while there are zero published works
      />

      {/* Hero Banner */}
      <section className="bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden">
        <BrandPattern opacity={0.07} />
        <Container className="relative z-10">
          <Breadcrumbs items={breadcrumbsItems} className="mb-6 text-white/80" />
          <div className="max-w-3xl">
            <span className="text-xs font-semibold text-brand-300 uppercase tracking-wider block mb-2">
              {t('works.eyebrow')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
              {t('works.heading')}
            </h1>
            <p className="text-base sm:text-lg text-brand-100 leading-relaxed">
              {t('works.intro')}
            </p>
          </div>
        </Container>
      </section>

      {/* Main Works Grid Section */}
      <Section variant="soft">
        <Container>
          {/* Service Filters */}
          <div className="mb-10 flex flex-wrap items-center gap-2" role="region" aria-label={t('works.filterLabel')}>
            {filterOptions.map((opt) => {
              const isActive = currentServiceFilter === opt.id
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleFilterChange(opt.id)}
                  className={`px-4 py-2 rounded-control text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    isActive
                      ? 'bg-brand-900 text-white shadow-xs'
                      : 'bg-white text-content-body hover:bg-surface-border/50 border border-surface-border'
                  }`}
                  aria-pressed={isActive}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-card border border-surface-border overflow-hidden h-96 animate-pulse"
                >
                  <div className="aspect-[16/10] bg-surface-border" />
                  <div className="p-6 space-y-4">
                    <div className="h-4 bg-surface-border rounded-xs w-1/3" />
                    <div className="h-6 bg-surface-border rounded-xs w-3/4" />
                    <div className="h-4 bg-surface-border rounded-xs w-full" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && works.length === 0 && (
            <div className="bg-white rounded-card border border-surface-border p-12 text-center max-w-2xl mx-auto my-6 shadow-xs">
              <div className="w-16 h-16 rounded-full bg-brand-50 border border-brand-100 flex items-center justify-center mx-auto mb-5 text-brand-600">
                <Briefcase className="w-8 h-8" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-content-heading mb-3">
                {t('works.emptyHeading')}
              </h2>
              <p className="text-sm sm:text-base text-content-body leading-relaxed mb-8">
                {t('works.emptyMessage')}
              </p>
              <Button
                variant="primary"
                size="lg"
                to={isEn ? '/en/contact' : '/contact'}
                rightIcon={isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              >
                {t('works.emptyCta')}
              </Button>
            </div>
          )}

          {/* Works Grid */}
          {!isLoading && works.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {works.map((work, index) => (
                  <WorkCard key={work.id} work={work} priority={index < 3} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => {
                      setCurrentPage(page)
                      window.scrollTo({ top: 400, behavior: 'smooth' })
                    }}
                  />
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      {/* Inquiry CTA Band */}
      <CtaBand />
    </>
  )
}
