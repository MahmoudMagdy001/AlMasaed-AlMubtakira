import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { Container, Section, SectionHeading } from '@/components/ui'
import type { Tables } from '@/types/database.types'

interface WorksSectionProps {
  works?: Tables<'works'>[] | null
}

export const WorksSection: React.FC<WorksSectionProps> = ({ works }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  // If no published works, omit the section completely (as mandated in docs/02 and docs/10)
  if (!works || works.length === 0) {
    return null
  }

  const prefix = isEn ? '/en' : ''

  return (
    <Section variant="white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            kicker={t('nav.works')}
            title={isEn ? 'Selected Projects' : 'أعمال ومشاريع مختارة'}
            intro={
              isEn
                ? 'A selection of our elevator installations and modernization projects in Jeddah.'
                : 'نماذج من مشاريعنا في تركيب وتحديث المصاعد في مختلف قطاعات مدينة جدة.'
            }
          />
          <Link
            to={`${prefix}/works`}
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-500 font-semibold text-sm mt-4 md:mt-0 transition-colors"
          >
            <span>{t('actions.viewWorks')}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.slice(0, 6).map((work) => {
            const title = isEn && work.title_en ? work.title_en : work.title_ar
            const locationText =
              isEn && work.location_en ? work.location_en : work.location_ar

            return (
              <article
                key={work.id}
                className="bg-white rounded-card border border-surface-border overflow-hidden hover:shadow-card-hover transition-shadow group flex flex-col"
              >
                <div className="aspect-[16/10] bg-surface-subtle relative flex items-center justify-center border-b border-surface-border">
                  <span className="text-content-muted text-xs">
                    {title}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-brand-600 uppercase tracking-wide block mb-1">
                      {work.service_type}
                    </span>
                    <h3 className="text-lg font-bold text-content-heading group-hover:text-brand-600 transition-colors mb-2">
                      <Link to={`${prefix}/works/${work.slug}`}>
                        {title}
                      </Link>
                    </h3>
                    {locationText && (
                      <p className="text-xs text-content-muted mb-4">
                        {locationText} {work.completed_year ? `• ${work.completed_year}` : ''}
                      </p>
                    )}
                  </div>
                  <Link
                    to={`${prefix}/works/${work.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <span>{t('actions.readMore')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
