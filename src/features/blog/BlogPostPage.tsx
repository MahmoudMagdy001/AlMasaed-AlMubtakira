import React, { useMemo } from 'react'
import { useParams, useLocation, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Languages,
} from 'lucide-react'
import {
  Container,
  Section,
  Breadcrumbs,
  Badge,
  ResponsiveImage,
  Accordion,
  BrandPattern,
  Button,
  getStoragePublicUrl,
} from '@/components/ui'
import { Seo, getBlogPostingSchema, getFaqSchema } from '@/components/seo'
import { processArticleHtml } from '@/lib/blogContent'
import {
  useBlogPost,
  useRelatedPosts,
  usePrevNextPosts,
  usePostTranslation,
} from '@/hooks/useBlog'
import { ShareButtons } from './components/ShareButtons'
import { PostCard } from './components/PostCard'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import logoDarkSquare from '@/assets/brand/logo-dark-square.webp'

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

  const heroRef = useHeroAnimation({ dependencies: [post?.id] })
  const relatedRevealRef = useScrollReveal({
    selector: '[data-related-card]',
    distance: 20,
    stagger: 0.08,
    dependencies: [relatedPosts],
  })

  // Sanitize content and generate anchors
  const { sanitizedHtml } = useMemo(() => {
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
      <>
        {/* Skeleton Header Banner */}
        <section className="bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden">
          <BrandPattern opacity={0.07} />
          <Container className="relative z-10">
            <div className="max-w-4xl space-y-4 animate-pulse">
              <div className="h-4 bg-white/20 rounded w-1/4" />
              <div className="h-10 bg-white/20 rounded w-3/4" />
              <div className="h-4 bg-white/20 rounded w-1/2" />
            </div>
          </Container>
        </section>
        <Section variant="white" className="py-12">
          <Container>
            <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
              <div className="aspect-[16/9] bg-surface-border rounded-card" />
              <div className="space-y-4 pt-6">
                <div className="h-4 bg-surface-border rounded w-full" />
                <div className="h-4 bg-surface-border rounded w-5/6" />
                <div className="h-4 bg-surface-border rounded w-4/6" />
              </div>
            </div>
          </Container>
        </Section>
      </>
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

  const postCanonical = `https://almubtakirah.com${prefix}/blog/${post.slug}`
  const coverImageUrl = post.featured_image?.storage_path
    ? getStoragePublicUrl(post.featured_image.storage_path)
    : undefined

  const hreflang = {
    ar: isEn
      ? (translationTwin ? `https://almubtakirah.com/blog/${translationTwin.slug}` : undefined)
      : postCanonical,
    en: isEn
      ? postCanonical
      : (translationTwin ? `https://almubtakirah.com/en/blog/${translationTwin.slug}` : undefined),
    xDefault: isEn
      ? (translationTwin ? `https://almubtakirah.com/blog/${translationTwin.slug}` : postCanonical)
      : postCanonical,
  }

  const tagNames = (post.tags || []).map((tg) => (isEn && tg.name_en ? tg.name_en : tg.name_ar))

  const blogPostingSchema = getBlogPostingSchema({
    schemaType: post.schema_type,
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    url: postCanonical,
    imageUrl: coverImageUrl,
    datePublished: post.published_at,
    dateModified: post.updated_at || post.published_at,
    authorName: post.author?.full_name || 'شركة المصاعد المبتكرة',
    lang: currentLang,
  })

  const faqSchema = getFaqSchema(post.faq || [])

  return (
    <>
      <Seo
        title={post.seo_title || `${post.title} | ${t('brand.name')}`}
        description={post.seo_description || post.excerpt || undefined}
        canonical={postCanonical}
        ogImage={coverImageUrl}
        ogType="article"
        hreflang={hreflang}
        lang={currentLang}
        dir={isRtl ? 'rtl' : 'ltr'}
        article={{
          publishedTime: post.published_at,
          modifiedTime: post.updated_at || post.published_at,
          section: categoryName || undefined,
          tags: tagNames,
          author: post.author?.full_name || 'شركة المصاعد المبتكرة',
        }}
        breadcrumbs={[
          { name: t('nav.home'), url: isEn ? '/en' : '/' },
          { name: t('nav.blog'), url: `${prefix}/blog` },
          ...(categoryName && categoryUrl ? [{ name: categoryName, url: categoryUrl }] : []),
          { name: post.title, url: postCanonical },
        ]}
        jsonLd={[blogPostingSchema, faqSchema].filter(Boolean) as Array<Record<string, unknown>>}
      />


      <article>
        {/* Header Banner */}
        <header ref={heroRef} className="bg-brand-900 text-white py-14 md:py-20 relative overflow-hidden">
          <BrandPattern opacity={0.07} />
          <Container className="relative z-10">
            <div data-hero-element>
              <Breadcrumbs items={breadcrumbs} className="mb-6 text-white/80" />
            </div>
            <div className="max-w-4xl">
              {/* Category Badge & Reading Time */}
              <div data-hero-element className="flex flex-wrap items-center gap-3 mb-4">
                {categoryName && categoryUrl && (
                  <Link to={categoryUrl}>
                    <Badge
                      variant="brand"
                      size="md"
                      className="bg-brand-800 text-brand-100 border-brand-700 hover:bg-brand-700 transition-colors"
                    >
                      {categoryName}
                    </Badge>
                  </Link>
                )}
                <span className="text-xs text-brand-200 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-brand-300" aria-hidden="true" />
                  <span>{t('blog.readTime', { count: post.reading_time_min || 5 })}</span>
                </span>
              </div>

              {/* H1 Heading */}
              <h1 data-hero-element className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt if present */}
              {post.excerpt && (
                <p data-hero-element className="text-base sm:text-lg text-brand-100 leading-relaxed font-normal max-w-3xl mb-4">
                  {post.excerpt}
                </p>
              )}

              {/* Bilingual Twin Alert (if translation twin exists) */}
              {translationTwin && (
                <div data-hero-element className="mt-6 p-4 rounded-card bg-brand-800/80 border border-brand-700/80 flex items-center justify-between gap-4 text-xs sm:text-sm text-white">
                  <div className="flex items-center gap-2 font-medium text-brand-100">
                    <Languages className="w-4 h-4 text-brand-300 shrink-0" aria-hidden="true" />
                    <span>{t('blog.translationTwinNotice')}</span>
                  </div>
                  <Link
                    to={`${targetPrefix}/blog/${translationTwin.slug}`}
                    className="font-bold text-accent-400 hover:text-accent-300 underline shrink-0 transition-colors"
                  >
                    {t('blog.readInOtherLang')}
                  </Link>
                </div>
              )}
            </div>
          </Container>
        </header>

        {/* Article Body Section */}
        <div className="py-12 sm:py-16">
          <Container>

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

          {/* Main Layout: Centered Content */}
          <div className="max-w-4xl mx-auto space-y-10">
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

            {/* Author / Company Info Box */}
            <div className="bg-white border border-surface-border rounded-card p-6 shadow-xs flex flex-col sm:flex-row items-center gap-6">
              <Link
                to={`${prefix}/about`}
                className="w-14 h-14 rounded-full overflow-hidden bg-brand-900 flex items-center justify-center p-1 shrink-0 shadow-xs border border-brand-800 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600"
                aria-label={t('brand.name')}
              >
                <img
                  src={logoDarkSquare}
                  alt={t('brand.name')}
                  className="w-full h-full object-contain"
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <div className="flex-1 text-center sm:text-start space-y-1">
                <h4 className="font-bold text-content-heading text-sm">
                  {t('brand.name')}
                </h4>
                <p className="text-xs text-brand-600 font-medium">
                  {t('brand.accreditation')}
                </p>
                <p className="text-xs text-content-body leading-relaxed">
                  {isEn
                    ? 'Expert elevator engineering, maintenance, and modernization certified by Civil Defense in Jeddah.'
                    : 'شركة سعودية متخصصة في توريد وتركيب وتحديث وصيانة المصاعد والسلالم الكهربائية في جدة، معتمدين في الدفاع المدني.'}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                to={`${prefix}/about`}
                className="text-xs shrink-0 whitespace-nowrap"
              >
                {t('nav.about')}
              </Button>
            </div>

            {/* CTA Card (matching Home Screen CtaBand design) */}
            <div className="relative overflow-hidden rounded-card bg-brand-900 text-white p-8 sm:p-12 text-center shadow-card border border-brand-800">
              <BrandPattern opacity={0.07} />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-4">
                  {t('home.ctaBandHeading')}
                </h3>
                <p className="text-base text-brand-100 max-w-xl mx-auto mb-8 font-normal leading-relaxed">
                  {t('home.ctaBandSubtitle')}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
                  <Button
                    variant="hero"
                    size="lg"
                    to={`${prefix}/contact`}
                    rightIcon={
                      isRtl ? (
                        <ArrowLeft className="w-5 h-5" />
                      ) : (
                        <ArrowRight className="w-5 h-5" />
                      )
                    }
                  >
                    {t('actions.requestQuote')}
                  </Button>

                  <Button
                    variant="inverse"
                    size="lg"
                    to={`${prefix}/contact?service=consultation`}
                    leftIcon={<Calendar className="w-5 h-5 text-brand-300" />}
                    className="font-semibold"
                  >
                    {t('actions.bookConsultation')}
                  </Button>
                </div>
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
        </Container>
      </div>
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

            <div ref={relatedRevealRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <div key={relatedPost.id} data-related-card className="h-full">
                  <PostCard post={relatedPost} />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}


    </>
  )
}
