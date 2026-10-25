import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight, BookOpen } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge, ResponsiveImage } from '@/components/ui'
import type { PostListItem } from '@/services/blogService'

export interface PostCardProps {
  post: PostListItem
  priority?: boolean
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  priority = false,
}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const prefix = isEn ? '/en' : ''
  const postUrl = `${prefix}/blog/${post.slug}`

  const categoryName = post.category
    ? isEn && post.category.name_en
      ? post.category.name_en
      : post.category.name_ar
    : null

  const categoryUrl = post.category
    ? `${prefix}/blog/category/${post.category.slug}`
    : null

  const formattedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString(
        isEn ? 'en-US' : 'ar-SA',
        { year: 'numeric', month: 'long', day: 'numeric' },
      )
    : null

  return (
    <article className="group card-hover bg-white rounded-card border border-surface-border overflow-hidden shadow-xs flex flex-col h-full">
      {/* Featured Image or Gradient Fallback */}
      <Link
        to={postUrl}
        className="block relative aspect-[16/10] overflow-hidden bg-brand-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        tabIndex={-1}
        aria-hidden="true"
      >
        {post.featured_image ? (
          <ResponsiveImage
            media={post.featured_image}
            alt={post.featured_image_alt || post.title}
            priority={priority}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-brand-900 to-brand-950 text-white">
            <BookOpen
              className="w-8 h-8 text-brand-300 mb-2 opacity-80"
              aria-hidden="true"
            />
            {categoryName && (
              <span className="text-brand-300 text-xs font-semibold tracking-wider uppercase mb-1">
                {categoryName}
              </span>
            )}
            <p className="text-white font-bold text-sm line-clamp-2 px-4">
              {post.title}
            </p>
          </div>
        )}

        {categoryName && categoryUrl && (
          <div className="absolute top-3 start-3 z-10">
            <span
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <Link to={categoryUrl} tabIndex={0}>
                <Badge
                  variant="brand"
                  size="sm"
                  className="bg-brand-900/90 backdrop-blur-xs text-white border-none shadow-xs hover:bg-brand-800 transition-colors"
                >
                  {categoryName}
                </Badge>
              </Link>
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Meta: Published Date & Reading Time */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-content-muted mb-3">
          {formattedDate && (
            <span className="inline-flex items-center gap-1.5">
              <Calendar
                className="w-3.5 h-3.5 text-brand-600"
                aria-hidden="true"
              />
              <time dateTime={post.published_at || undefined}>
                {formattedDate}
              </time>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
            <span>
              {t('blog.readTime', { count: post.reading_time_min || 5 })}
            </span>
          </span>
        </div>

        {/* Heading */}
        <h3 className="text-lg font-bold text-content-heading group-hover:text-brand-600 transition-colors line-clamp-2 mb-3 leading-snug">
          <Link
            to={postUrl}
            className="focus-visible:outline-none focus-visible:underline"
          >
            {post.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-sm text-content-body line-clamp-3 leading-relaxed mb-6 flex-1">
            {post.excerpt}
          </p>
        )}

        {/* Action Link */}
        <div className="mt-auto pt-4 border-t border-surface-border">
          <Link
            to={postUrl}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 group-hover:text-brand-500 transition-colors focus-visible:outline-none"
          >
            <span>{t('actions.readMore')}</span>
            {isRtl ? (
              <ArrowLeft
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                aria-hidden="true"
              />
            ) : (
              <ArrowRight
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            )}
          </Link>
        </div>
      </div>
    </article>
  )
}
