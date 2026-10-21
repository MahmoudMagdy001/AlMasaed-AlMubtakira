import React, { useMemo } from 'react'
import { useParams, useLocation, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Languages,
  CheckCircle2,
} from 'lucide-react'
import {
  Container,
  Section,
  Breadcrumbs,
  Badge,
  ResponsiveImage,
  Accordion,
  Button,
} from '@/components/ui'
import { CtaBand } from '@/components/layout/CtaBand'
import { Seo } from '@/components/seo/Seo'
import { processArticleHtml } from '@/lib/blogContent'
import {
  useBlogPost,
  useRelatedPosts,
  usePrevNextPosts,
  usePostTranslation,
} from '@/hooks/useBlog'
import { TableOfContents } from './components/TableOfContents'
import { ShareButtons } from './components/ShareButtons'
import { PostCard } from './components/PostCard'

export const BlogPostPage: React.FC = () => {
  const { t } = useTranslation()
  const { slug } = useParams<{ slug: string }>()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  const currentLang = isEn ? 'en' : 'ar'
  const targetLang = isEn ? 'ar' : 'en'
  const prefix = isEn ? '/en' : ''
  const targetPrefix = isEn ? '' : '/en'

  const { data: post, isLoading } = useBlogPost(currentLang, slug || '')

  const { data: translationTwin } = usePostTranslation(
    post?.translation_key,
    targetLang,
  )

  const { data: prevNext } = usePrevNextPosts(
    post?.published_at || null,
    currentLang,
  )

  const { data: relatedPosts } = useRelatedPosts({
    categoryId: post?.category_id || null,
    currentPostId: post?.id || '',
    lang: currentLang,
    limit: 3,
  })

  // Sanitize content and generate TOC anchors
  const { sanitizedHtml, toc } = useMemo(() => {
    if (!post?.content_html) {
      return { sanitizedHtml: '', toc: [] }
    }
    return processArticleHtml(post.content_html)
  }, [post?.content_html])

  if (!slug) {
    return <Navigate to={`${prefix}/blog`} replace />
  }

  if (!isLoading && !post) {
    return (
      <Section variant="white" className="py-20 text-center">
        <Container>
          <h1 className="text-2xl font-bold text-content-heading mb-4">
            {isEn ? 'Article Not Found' : 'المقال غير موجود'}
          </h1>
          <p className="text-content-body mb-8">
            {isEn
              ? 'The requested article could not be found or has not been published.'
              : 'المقال المطلوب غير موجود أو لم يتم نشره بعد.'}
          </p>
          <Button variant="primary" to={`${prefix}/blog`}>
            {t('blog.backToBlog')}
          </Button>
        </Container>
      </Section>
    )
  }

  if (isLoading || !post) {
    return (
      <Section variant="white" className="py-16">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
            <div className="h-6 bg-surface-border rounded w-1/4" />
            <div className="h-10 bg-surface-border rounded w-3/4" />
            <div className="h-4 bg-surface-border rounded w-1/2" />
            <div className="aspect-[16/9] bg-surface-border rounded-card" />
            <div className="space-y-4 pt-6">
              <div className="h-4 bg-surface-border rounded w-full" />
              <div className="h-4 bg-surface-border rounded w-5/6" />
              <div className="h-4 bg-surface-border rounded w-4/6" />
            </div>
          </div>
        </Container>
      </Section>
    )
  }

  const categoryName = post.category
    ? isEn && post.category.name_en
      ? post.category.name_en
      : post.category.name_ar
    : null

  const categoryUrl = post.category
    ? `${prefix}/blog/category/${post.category.slug}`
    : null

  const publishedDateFormatted = post.published_at
    ? new Date(post.published_at).toLocaleDateString(
        isEn ? 'en-US' : 'ar-SA',
        { year: 'numeric', month: 'long', day: 'numeric' },
      )
    : null

  const updatedDateFormatted =
    post.updated_at && post.published_at && post.updated_at !== post.published_at
      ? new Date(post.updated_at).toLocaleDateString(
          isEn ? 'en-US' : 'ar-SA',
          { year: 'numeric', month: 'long', day: 'numeric' },
        )
      : null

  const breadcrumbs = [
    { label: t('nav.home'), href: isEn ? '/en' : '/' },
    { label: t('nav.blog'), href: `${prefix}/blog` },
    ...(categoryName && categoryUrl
      ? [{ label: categoryName, href: categoryUrl }]
      : []),
    { label: post.title },
  ]

  const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Format FAQ items for accordion
  const faqAccordionItems =
    post.faq && Array.isArray(post.faq) && post.faq.length > 0
      ? post.faq.map((item, idx) => ({
          id: `faq-${idx}`,
          title: item.q,
          content: <p className="text-content-body leading-relaxed">{item.a}</p>,
        }))
      : []

  return (
    <>
      <Seo
        title={post.seo_title || `${post.title} | ${t('brand.name')}`}
        description={post.seo_description || post.excerpt || undefined}
        canonical={`${prefix}/blog/${post.slug}`}
        ogType="article"
      />


      <article className="pt-6 pb-16">
        <Container>
          <Breadcrumbs items={breadcrumbs} className="mb-8" />

          {/* Article Header */}
          <header className="max-w-4xl mx-auto mb-8 text-start">
            {/* Category Badge & Reading Time */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {categoryName && categoryUrl && (
                <Link to={categoryUrl}>
                  <Badge variant="brand" size="md">
                    {categoryName}
                  </Badge>
                </Link>
              )}
              <span className="text-xs text-content-muted flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
                <span>{t('blog.readTime', { count: post.reading_time_min || 5 })}</span>
              </span>
            </div>

            {/* H1 Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-content-heading mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Byline & Dates */}
            <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-surface-border text-xs sm:text-sm text-content-muted">
              <div className="flex items-center gap-4">
                {/* Author */}
                <div className="flex items-center gap-2">
                  {post.author?.avatar_url ? (
                    <img
                      src={post.author.avatar_url}
                      alt={post.author.full_name || ''}
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 flex items-center justify-center font-bold text-xs">
                      <User className="w-4 h-4" aria-hidden="true" />
                    </div>
                  )}
                  <span className="font-semibold text-content-heading">
                    {post.author?.full_name || t('brand.name')}
                  </span>
                </div>

                {/* Published Date */}
                {publishedDateFormatted && (
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-brand-600" aria-hidden="true" />
                    <time dateTime={post.published_at || undefined}>
                      {publishedDateFormatted}
                    </time>
                  </span>
                )}

                {/* Updated Date (if distinct) */}
                {updatedDateFormatted && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-content-muted">
                    <span>({t('blog.updatedAt')}</span>
                    <time dateTime={post.updated_at}>{updatedDateFormatted}</time>
                    <span>)</span>
                  </span>
                )}
              </div>

              {/* Share Header Buttons */}
              <ShareButtons url={currentUrl} title={post.title} />
            </div>

            {/* Bilingual Twin Alert (if translation twin exists) */}
            {translationTwin && (
              <div className="mt-4 p-4 rounded-card bg-brand-50 border border-brand-200 flex items-center justify-between gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-2 text-brand-900 font-medium">
                  <Languages className="w-4 h-4 text-brand-600 shrink-0" aria-hidden="true" />
                  <span>{t('blog.translationTwinNotice')}</span>
                </div>
                <Link
                  to={`${targetPrefix}/blog/${translationTwin.slug}`}
                  className="font-bold text-brand-600 hover:text-brand-700 hover:underline shrink-0"
                >
                  {t('blog.readInOtherLang')}
                </Link>
              </div>
            )}
          </header>

          {/* Featured Image (LCP with fetchpriority="high") */}
          {post.featured_image && (
            <figure className="max-w-4xl mx-auto mb-12">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-card border border-surface-border bg-brand-950 shadow-sm">
                <ResponsiveImage
                  media={post.featured_image}
                  alt={post.featured_image_alt || post.title}
                  priority={true}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
              {post.featured_image_alt && (
                <figcaption className="text-center text-xs text-content-muted mt-2">
                  {post.featured_image_alt}
                </figcaption>
              )}
            </figure>
          )}

          {/* Main Layout: Content and Sticky TOC Sidebar */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Post Body & Extras Column */}
            <div className="lg:col-span-8 space-y-10">
              {/* Sanitized Article Body */}
              <div
                className="prose-article"
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              />

              {/* FAQ Section (if present) */}
              {faqAccordionItems.length > 0 && (
                <section
                  className="pt-8 border-t border-surface-border"
                  aria-labelledby="post-faq-heading"
                >
                  <div className="flex items-center gap-2 mb-6">
                    <HelpCircle className="w-5 h-5 text-brand-600" aria-hidden="true" />
                    <h2
                      id="post-faq-heading"
                      className="text-xl font-bold text-content-heading"
                    >
                      {t('blog.faqTitle')}
                    </h2>
                  </div>
                  <Accordion items={faqAccordionItems} />
                </section>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t border-surface-border flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-content-muted flex items-center gap-1 me-2">
                    <Tag className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{t('blog.tags')}</span>
                  </span>
                  {post.tags.map((tag) => {
                    const tagName = isEn && tag.name_en ? tag.name_en : tag.name_ar
                    return (
                      <span
                        key={tag.id}
                        className="px-3 py-1 bg-surface-soft border border-surface-border rounded-full text-xs text-content-body font-medium"
                      >
                        #{tagName}
                      </span>
                    )
                  })}
                </div>
              )}

              {/* Bottom Share Row */}
              <div className="pt-6 border-t border-surface-border">
                <ShareButtons url={currentUrl} title={post.title} />
              </div>

              {/* In-article CTA Card */}
              <div className="p-8 rounded-card bg-gradient-brand-dark text-white shadow-elevated">
                <span className="text-xs font-bold text-brand-300 uppercase tracking-wider block mb-2">
                  {t('brand.slogan')}
                </span>
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {t('blog.ctaTitle')}
                </h3>
                <p className="text-brand-100 text-sm leading-relaxed mb-6 max-w-lg">
                  {t('blog.ctaText')}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Button
                    variant="primary"
                    to={`${prefix}/contact`}
                    className="bg-brand-400 hover:bg-brand-300 text-brand-900 font-bold"
                  >
                    {t('blog.ctaButton')}
                  </Button>
                  <span className="text-xs text-brand-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-400" aria-hidden="true" />
                    <span>{t('brand.accreditation')}</span>
                  </span>
                </div>
              </div>

              {/* Prev / Next Post Navigation */}
              {(prevNext?.prev || prevNext?.next) && (
                <nav
                  aria-label="Article navigation"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-surface-border"
                >
                  {prevNext.prev ? (
                    <Link
                      to={`${prefix}/blog/${prevNext.prev.slug}`}
                      className="group p-4 rounded-card border border-surface-border bg-white hover:border-brand-400 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <span className="text-xs font-semibold text-content-muted flex items-center gap-1 mb-2">
                        {isRtl ? (
                          <ArrowRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowLeft className="w-3.5 h-3.5" />
                        )}
                        <span>{t('blog.prevPost')}</span>
                      </span>
                      <span className="text-sm font-bold text-content-heading group-hover:text-brand-600 transition-colors line-clamp-2">
                        {prevNext.prev.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {prevNext.next ? (
                    <Link
                      to={`${prefix}/blog/${prevNext.next.slug}`}
                      className="group p-4 rounded-card border border-surface-border bg-white hover:border-brand-400 hover:shadow-xs transition-all flex flex-col justify-between text-end"
                    >
                      <span className="text-xs font-semibold text-content-muted flex items-center justify-end gap-1 mb-2">
                        <span>{t('blog.nextPost')}</span>
                        {isRtl ? (
                          <ArrowLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </span>
                      <span className="text-sm font-bold text-content-heading group-hover:text-brand-600 transition-colors line-clamp-2">
                        {prevNext.next.title}
                      </span>
                    </Link>
                  ) : (
                    <div />
                  )}
                </nav>
              )}
            </div>

            {/* Sidebar Column: Sticky Table of Contents */}
            <aside className="lg:col-span-4 w-full space-y-6">
              {toc.length > 0 && <TableOfContents items={toc} />}

              {/* Author / Company Info Box */}
              <div className="bg-white border border-surface-border rounded-card p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-sm">
                    {isEn ? 'AM' : 'م'}
                  </div>
                  <div>
                    <h4 className="font-bold text-content-heading text-sm">
                      {t('brand.name')}
                    </h4>
                    <p className="text-xs text-content-muted">
                      {t('brand.accreditation')}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-content-body leading-relaxed mb-4">
                  {isEn
                    ? 'Expert elevator engineering, maintenance, and modernization certified by Civil Defense in Jeddah.'
                    : 'شركة سعودية متخصصة في توريد وتركيب وتحديث وصيانة المصاعد والسلالم الكهربائية في جدة، معتمدين في الدفاع المدني.'}
                </p>
                <Button
                  variant="secondary"
                  size="sm"
                  to={`${prefix}/about`}
                  className="w-full text-xs"
                >
                  {t('nav.about')}
                </Button>

              </div>
            </aside>
          </div>
        </Container>
      </article>

      {/* Related Posts Section */}
      {relatedPosts && relatedPosts.length > 0 && (
        <Section variant="soft" className="py-16 border-t border-surface-border">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-content-heading">
                {t('blog.relatedPosts')}
              </h2>
              <Link
                to={`${prefix}/blog`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-500"
              >
                <span>{t('blog.backToBlog')}</span>
                {isRtl ? (
                  <ArrowLeft className="w-3.5 h-3.5" />
                ) : (
                  <ArrowRight className="w-3.5 h-3.5" />
                )}
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <PostCard key={relatedPost.id} post={relatedPost} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Global CTA Band */}
      <CtaBand />
    </>
  )
}
