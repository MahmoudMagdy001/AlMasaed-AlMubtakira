import React, { useState } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Calendar, MapPin, Wrench, ArrowLeft, ArrowRight, Eye } from 'lucide-react'
import {
  Container,
  Section,
  BrandPattern,
  Breadcrumbs,
  ResponsiveImage,
  Lightbox,
  Badge,
  getStoragePublicUrl,
} from '@/components/ui'
import { Seo, getWorkSchema } from '@/components/seo'
import { CtaBand } from '@/components/layout/CtaBand'
import { NotFoundPage } from '@/features/home/NotFoundPage'
import { useWorkDetail, useRelatedWorks } from '@/hooks/useWorks'
import { WorkCard } from './components/WorkCard'
import { fallbackWorks, fallbackMedia } from '@/data/seedData'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'

export const WorkDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const heroRef = useHeroAnimation()

  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const fallbackItem = fallbackWorks.find((w) => w.slug === slug)
  const initialWork = fallbackItem
    ? {
        ...fallbackItem,
        gallery_media: [fallbackMedia.gallery1, fallbackMedia.gallery2],
      }
    : undefined

  const { data: workQuery, isLoading } = useWorkDetail(slug || '')
  const work = workQuery || initialWork

  const { data: relatedWorks = [] } = useRelatedWorks({
    currentWorkId: work?.id || '',
    serviceType: work?.service_type || '',
    limit: 3,
  })

  if (isLoading && !work) {
    return (
      <div className="py-24 text-center">
        <Container>
          <div className="max-w-xl mx-auto space-y-4 animate-pulse">
            <div className="h-8 bg-surface-border rounded-xs w-3/4 mx-auto" />
            <div className="h-4 bg-surface-border rounded-xs w-1/2 mx-auto" />
            <div className="aspect-[16/9] bg-surface-border rounded-card mt-8" />
          </div>
        </Container>
      </div>
    )
  }

  if (!work) {
    return <NotFoundPage />
  }

  const title = (isEn && work.title_en) ? work.title_en : work.title_ar
  const description = (isEn && work.description_en) ? work.description_en : work.description_ar
  const locationText = (isEn && work.location_en) ? work.location_en : work.location_ar

  const serviceLabelMap: Record<string, string> = {
    installation: t('works.filters.installation'),
    maintenance: t('works.filters.maintenance'),
    modernization: t('works.filters.modernization'),
    'spare-parts': t('works.filters.spareParts'),
    escalators: t('works.filters.escalators'),
  }

  const serviceLabel = serviceLabelMap[work.service_type] || work.service_type

  const breadcrumbsItems = [
    { label: t('common.breadcrumbHome'), to: isEn ? '/en' : '/' },
    { label: t('works.heading'), to: isEn ? '/en/works' : '/works' },
    { label: title },
  ]

  // Prepare images list for lightbox: cover + gallery items
  const allImages = [
    ...(work.cover_media
      ? [
          {
            src: getStoragePublicUrl(work.cover_media.storage_path),
            alt: work.cover_media.alt_text || title,
            width: work.cover_media.width ?? undefined,
            height: work.cover_media.height ?? undefined,
          },
        ]
      : []),
    ...(work.gallery_media || []).map((m) => ({
      src: getStoragePublicUrl(m.storage_path),
      alt: m.alt_text || title,
      width: m.width ?? undefined,
      height: m.height ?? undefined,
    })),
  ]

  const openLightboxAt = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const canonicalUrl = `https://almubtakirah.com${isEn ? `/en/works/${work.slug}` : `/works/${work.slug}`}`
  const coverUrl = work.cover_media ? getStoragePublicUrl(work.cover_media.storage_path) : undefined

  return (
    <>
      <Seo
        title={`${title} | ${t('brand.name')}`}
        description={work.seo_description || description || t('works.pageDescription')}
        canonical={canonicalUrl}
        ogImage={coverUrl}
        ogType="article"
        hreflang={{
          ar: `https://almubtakirah.com/works/${work.slug}`,
          en: `https://almubtakirah.com/en/works/${work.slug}`,
          xDefault: `https://almubtakirah.com/works/${work.slug}`,
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isRtl ? 'rtl' : 'ltr'}
        breadcrumbs={[
          { name: t('common.breadcrumbHome'), url: isEn ? '/en' : '/' },
          { name: t('works.heading'), url: isEn ? '/en/works' : '/works' },
          { name: title, url: canonicalUrl },
        ]}
        jsonLd={[
          getWorkSchema(
            title,
            work.seo_description || description || '',
            canonicalUrl,
            coverUrl,
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
          <div className="max-w-4xl">
            <div data-hero-element className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="brand" size="md">
                {serviceLabel}
              </Badge>
              {work.completed_year && (
                <span className="text-sm text-brand-200 inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-brand-300" aria-hidden="true" />
                  <span>{work.completed_year}</span>
                </span>
              )}
              {locationText && (
                <span className="text-sm text-brand-200 inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-brand-300" aria-hidden="true" />
                  <span>{locationText}</span>
                </span>
              )}
            </div>

            <h1
              data-hero-element
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4"
            >
              {title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Main Details Section */}
      <Section variant="white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Cover & Gallery */}
            <div className="lg:col-span-8 space-y-8">
              {/* Featured Cover Image */}
              {work.cover_media && (
                <div
                  className="group relative aspect-[16/10] bg-brand-950 rounded-card overflow-hidden cursor-pointer shadow-md"
                  onClick={() => openLightboxAt(0)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      openLightboxAt(0)
                    }
                  }}
                  aria-label={isRtl ? 'فتح الصورة بالحجم الكامل' : 'Open full image'}
                >
                  <ResponsiveImage
                    media={work.cover_media}
                    alt={title}
                    priority
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-control bg-black/60 backdrop-blur-xs text-sm font-medium">
                      <Eye className="w-4 h-4" />
                      <span>{isRtl ? 'تكبير الصورة' : 'View full size'}</span>
                    </span>
                  </div>
                </div>
              )}

              {/* Description Content */}
              {description && (
                <div className="bg-surface-subtle p-8 sm:p-10 rounded-card border border-surface-border">
                  <h2 className="text-xl font-bold text-content-heading mb-4">
                    {t('works.details.descriptionHeading')}
                  </h2>
                  <p className="text-base text-content-body leading-relaxed whitespace-pre-line">
                    {description}
                  </p>
                </div>
              )}

              {/* Gallery Grid */}
              {work.gallery_media && work.gallery_media.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-content-heading mb-6">
                    {t('works.details.galleryHeading')}
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {work.gallery_media.map((mediaItem, gIdx) => {
                      const imageIndex = (work.cover_media ? 1 : 0) + gIdx
                      return (
                        <div
                          key={mediaItem.id || gIdx}
                          className="group relative aspect-[4/3] bg-brand-950 rounded-control overflow-hidden cursor-pointer shadow-xs hover:shadow-md transition-all duration-300"
                          onClick={() => openLightboxAt(imageIndex)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault()
                              openLightboxAt(imageIndex)
                            }
                          }}
                          aria-label={`${title} - image ${gIdx + 1}`}
                        >
                          <ResponsiveImage
                            media={mediaItem}
                            alt={`${title} - ${gIdx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center text-white">
                            <Eye className="w-5 h-5" />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Project Facts Panel */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-card border border-surface-border shadow-xs space-y-6">
                <h3 className="text-lg font-bold text-content-heading border-b border-surface-border pb-4">
                  {isRtl ? 'بيانات المشروع' : 'Project Facts'}
                </h3>

                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-xs text-content-muted font-medium mb-1">
                      {t('works.details.serviceType')}
                    </dt>
                    <dd className="font-bold text-content-heading flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-brand-600" />
                      <span>{serviceLabel}</span>
                    </dd>
                  </div>

                  {work.completed_year && (
                    <div>
                      <dt className="text-xs text-content-muted font-medium mb-1">
                        {t('works.details.completedYear')}
                      </dt>
                      <dd className="font-bold text-content-heading flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-600" />
                        <span>{work.completed_year}</span>
                      </dd>
                    </div>
                  )}

                  {locationText && (
                    <div>
                      <dt className="text-xs text-content-muted font-medium mb-1">
                        {t('works.details.location')}
                      </dt>
                      <dd className="font-bold text-content-heading flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-brand-600" />
                        <span>{locationText}</span>
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="pt-4 border-t border-surface-border">
                  <Link
                    to={isEn ? '/en/works' : '/works'}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-500 transition-colors"
                  >
                    {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                    <span>{t('works.details.backToWorks')}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Works */}
      {relatedWorks.length > 0 && (
        <Section variant="soft">
          <Container>
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-2xl sm:text-3xl font-bold text-content-heading">
                {t('works.details.relatedHeading')}
              </h2>
              <Link
                to={isEn ? '/en/works' : '/works'}
                className="text-sm font-semibold text-brand-600 hover:text-brand-500 inline-flex items-center gap-1"
              >
                <span>{t('works.details.backToWorks')}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedWorks.map((relWork) => (
                <WorkCard key={relWork.id} work={relWork} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Inquiry CTA */}
      <CtaBand />

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        images={allImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </>
  )
}
