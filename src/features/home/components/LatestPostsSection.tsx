import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Container, Section, SectionHeading } from '@/components/ui'
import { PostCard } from '@/features/blog/components/PostCard'
import type { Tables } from '@/types/database.types'
import type { PostListItem } from '@/services/blogService'

interface LatestPostsSectionProps {
  posts?: (PostListItem | Tables<'posts'>)[] | null
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
            kicker={t('home.blogEyebrow')}
            title={t('home.blogHeading')}
            intro={t('home.blogSubtitle')}
            className="mb-0"
          />
          <Link
            to={`${prefix}/blog`}
            className="inline-flex items-center gap-1.5 text-brand-600 hover:text-brand-500 font-semibold text-sm mt-4 md:mt-0 transition-colors flex-shrink-0"
          >
            <span>{t('home.blogViewAll')}</span>
            {isRtl ? (
              <ArrowLeft className="w-4 h-4" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.slice(0, 3).map((post, idx) => (
            <PostCard
              key={post.id}
              post={post as PostListItem}
              priority={idx === 0}
            />
          ))}
        </div>
      </Container>
    </Section>
  )
}

