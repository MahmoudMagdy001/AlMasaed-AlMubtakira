import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, MapPin, ArrowLeft, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge, ResponsiveImage } from '@/components/ui'
import type { WorkWithCover } from '@/services/worksService'

interface WorkCardProps {
  work: WorkWithCover
  priority?: boolean
}

export const WorkCard: React.FC<WorkCardProps> = ({ work, priority = false }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const title = (isEn && work.title_en) ? work.title_en : work.title_ar
  const description = (isEn && work.description_en) ? work.description_en : work.description_ar
  const locationText = (isEn && work.location_en) ? work.location_en : work.location_ar
  const detailUrl = isEn ? `/en/works/${work.slug}` : `/works/${work.slug}`

  const serviceLabelMap: Record<string, string> = {
    installation: t('works.filters.installation'),
    maintenance: t('works.filters.maintenance'),
    modernization: t('works.filters.modernization'),
    'spare-parts': t('works.filters.spareParts'),
    escalators: t('works.filters.escalators'),
  }

  const serviceLabel = serviceLabelMap[work.service_type] || work.service_type

  return (
    <article className="group card-hover bg-white rounded-card border border-surface-border overflow-hidden shadow-xs flex flex-col h-full">
      {/* Cover Image */}
      <Link to={detailUrl} className="block relative aspect-[16/10] overflow-hidden bg-brand-950">
        {work.cover_media ? (
          <ResponsiveImage
            media={work.cover_media}
            alt={title}
            priority={priority}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-brand-900 to-brand-950 text-white">
            <span className="text-brand-300 text-xs font-semibold tracking-wider uppercase mb-1">
              {serviceLabel}
            </span>
            <p className="text-white font-bold text-sm line-clamp-2">{title}</p>
          </div>
        )}

        <div className="absolute top-3 start-3 z-10">
          <Badge variant="brand" size="sm" className="bg-brand-900/90 backdrop-blur-xs text-white border-none shadow-xs">
            {serviceLabel}
          </Badge>
        </div>
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta badges: Year & Location */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-content-muted mb-3">
          {work.completed_year && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
              <span>{work.completed_year}</span>
            </span>
          )}
          {locationText && (
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
              <span>{locationText}</span>
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-content-heading group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">
          <Link to={detailUrl} className="focus-visible:outline-none focus-visible:underline">
            {title}
          </Link>
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-content-body line-clamp-2 leading-relaxed mb-6 flex-1">
            {description}
          </p>
        )}

        {/* CTA Link */}
        <div className="mt-auto pt-4 border-t border-surface-border">
          <Link
            to={detailUrl}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-500 transition-colors focus-visible:outline-none"
          >
            <span>{t('works.cardViewDetails')}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            ) : (
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            )}
          </Link>
        </div>
      </div>
    </article>
  )
}
