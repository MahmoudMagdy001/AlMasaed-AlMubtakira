import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react'
import { Container, Section, SectionHeading } from '@/components/ui'
import type { Tables } from '@/types/database.types'

interface LatestPostsSectionProps {
  posts?: Tables<'posts'>[] | null
}

export const LatestPostsSection: React.FC<LatestPostsSectionProps> = ({ posts }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  // Hidden when empty as mandated in docs/02 and docs/10
  if (!posts || posts.length === 0) {
    return null
  }

  const prefix = isEn ? '/en' : ''

  return (
    <Section variant="white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            kicker={t('nav.blog')}
            title={isEn ? 'Latest Insights & Articles' : 'أحدث المقالات والمعلومات الهندسية'}
            intro={
              isEn
                ? 'Practical guidelines on elevator maintenance, safety standards, and modernization.'
                : 'إرشادات عملية ومعلومات تقنية حول صيانة وتحديث ومعايير سلامة المصاعد.'
            }
          />
          <Link
            to={`${prefix}/blog`}
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-500 font-semibold text-sm mt-4 md:mt-0 transition-colors"
          >
            <span>{isEn ? 'View all articles' : 'استعراض كافة المقالات'}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post) => {
            const formattedDate = post.published_at
              ? new Date(post.published_at).toLocaleDateString(
                  isEn ? 'en-US' : 'ar-SA',
                  { year: 'numeric', month: 'short', day: 'numeric' }
                )
              : null

            return (
              <article
                key={post.id}
                className="bg-white rounded-card border border-surface-border overflow-hidden hover:shadow-card-hover transition-shadow flex flex-col group"
              >
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-content-muted mb-3">
                      {formattedDate && (
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <time dateTime={post.published_at || undefined}>
                            {formattedDate}
                          </time>
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>
                          {post.reading_time_min} {isEn ? 'min' : 'دقائق'}
                        </span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-content-heading group-hover:text-brand-600 transition-colors mb-3 leading-snug">
                      <Link to={`${prefix}/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    {post.excerpt && (
                      <p className="text-content-body text-sm leading-relaxed mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}
                  </div>

                  <Link
                    to={`${prefix}/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:text-brand-700 pt-3 border-t border-surface-border"
                  >
                    <span>{t('actions.readMore')}</span>
                    {isRtl ? (
                      <ArrowLeft className="w-3.5 h-3.5" />
                    ) : (
                      <ArrowRight className="w-3.5 h-3.5" />
                    )}
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
