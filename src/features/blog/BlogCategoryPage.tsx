import React from 'react'
import { useParams, useLocation, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BookOpen } from 'lucide-react'
import { Container, Section, SectionHeading, Breadcrumbs, Button } from '@/components/ui'
import { Seo, getCollectionPageSchema } from '@/components/seo'
import { useBlogPosts, useBlogCategories, useBlogCategory } from '@/hooks/useBlog'
import { PostCard } from './components/PostCard'
import { BlogPagination } from './components/BlogPagination'
import { useHeroAnimation } from '@/hooks/useHeroAnimation'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const POSTS_PER_PAGE = 9

export const BlogCategoryPage: React.FC = () => {
  const { t } = useTranslation()
  const { slug, page } = useParams<{ slug: string; page?: string }>()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')

  const heroRef = useHeroAnimation()

  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)
  const offset = (currentPage - 1) * POSTS_PER_PAGE
  const currentLang = isEn ? 'en' : 'ar'
  const prefix = isEn ? '/en' : ''

  const { data: category, isLoading: isCategoryLoading } = useBlogCategory(
    slug || '',
  )
  const { data: categories } = useBlogCategories()

  const { data: postsData, isLoading: isPostsLoading } = useBlogPosts({
    lang: currentLang,
    categorySlug: slug,
    limit: POSTS_PER_PAGE,
    offset,
  })

  const posts = postsData?.posts || []
  const total = postsData?.total || 0
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  const postsRevealRef = useScrollReveal({
    selector: '[data-post-card]',
    distance: 20,
    stagger: 0.08,
    dependencies: [posts, currentPage],
  })

  if (!slug) {
    return <Navigate to={`${prefix}/blog`} replace />
  }

  const categoryName = category
    ? isEn && category.name_en
      ? category.name_en
      : category.name_ar
    : slug

  const categoryDescription = category
    ? isEn && category.description_en
      ? category.description_en
      : category.description_ar
    : undefined

  const defaultTitle = isEn
    ? `${categoryName} | Innovative Elevators Co. Blog`
    : `${categoryName} | مدونة المصاعد المبتكرة`

  const seoTitle = category?.seo_title ? category.seo_title : defaultTitle

  const pageTitle =
    currentPage > 1
      ? `${seoTitle} - ${t('common.page')} ${currentPage}`
      : seoTitle

  const fallbackDesc = isEn
    ? `Browse articles, case studies, and engineering guides about ${categoryName} from Innovative Elevators Co. in Jeddah.`
    : `استكشف المقالات والدراسات الهندسية المتخصصة في ${categoryName} من شركة المصاعد المبتكرة في جدة.`

  const seoDescription =
    category?.seo_description || categoryDescription || fallbackDesc

  const breadcrumbs = [
    { label: t('nav.home'), href: isEn ? '/en' : '/' },
    { label: t('nav.blog'), href: `${prefix}/blog` },
    { label: categoryName },
  ]

  const basePath = `${prefix}/blog/category/${slug}`

  const canonicalPath =
    currentPage > 1 ? `${basePath}/page/${currentPage}` : basePath
  const canonicalUrl = `https://almubtakirah.com${canonicalPath}`

  return (
    <>
      <Seo
        title={pageTitle}
        description={seoDescription}
        canonical={canonicalUrl}
        hreflang={{
          ar: currentPage > 1 ? `https://almubtakirah.com/blog/category/${slug}/page/${currentPage}` : `https://almubtakirah.com/blog/category/${slug}`,
          en: currentPage > 1 ? `https://almubtakirah.com/en/blog/category/${slug}/page/${currentPage}` : `https://almubtakirah.com/en/blog/category/${slug}`,
          xDefault: currentPage > 1 ? `https://almubtakirah.com/blog/category/${slug}/page/${currentPage}` : `https://almubtakirah.com/blog/category/${slug}`,
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isEn ? 'ltr' : 'rtl'}
        breadcrumbs={[
          { name: t('nav.home'), url: isEn ? '/en' : '/' },
          { name: t('nav.blog'), url: `${prefix}/blog` },
          { name: categoryName, url: canonicalUrl },
        ]}
        jsonLd={[
          getCollectionPageSchema(
            pageTitle,
            seoDescription,
            canonicalUrl,
          ),
        ]}
      />

      <Section variant="white" className="pt-6 pb-16">
        <Container>
          <div ref={heroRef} className="max-w-3xl mb-10">
            <div data-hero-element className="mb-8">
              <Breadcrumbs items={breadcrumbs} />
            </div>

            <div data-hero-element>
              <SectionHeading
                level="h1"
                kicker={t('blog.eyebrow')}
                title={categoryName}
                intro={categoryDescription || undefined}
              />
            </div>
          </div>

          {/* Category Filter Chips */}
          {categories && categories.length > 0 && (
            <div
              className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none"
              role="navigation"
              aria-label={t('blog.filterLabel')}
            >
              <Link
                to={`${prefix}/blog`}
                className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-surface-soft text-content-body hover:bg-brand-50 hover:text-brand-600 border border-surface-border transition-colors focus-visible:outline-none"
              >
                {t('blog.allCategories')}
              </Link>

              {categories.map((cat) => {
                const name =
                  isEn && cat.name_en ? cat.name_en : cat.name_ar
                const isCurrentCategory = cat.slug === slug

                return (
                  <Link
                    key={cat.id}
                    to={`${prefix}/blog/category/${cat.slug}`}
                    className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none ${
                      isCurrentCategory
                        ? 'bg-brand-600 text-white shadow-xs'
                        : 'bg-surface-soft text-content-body hover:bg-brand-50 hover:text-brand-600 border border-surface-border'
                    }`}
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Posts Grid or Loading or Empty State */}
          {isPostsLoading || isCategoryLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-card border border-surface-border overflow-hidden animate-pulse h-96 flex flex-col"
                >
                  <div className="aspect-[16/10] bg-surface-border" />
                  <div className="p-6 flex-1 space-y-4">
                    <div className="h-4 bg-surface-border rounded w-1/3" />
                    <div className="h-6 bg-surface-border rounded w-3/4" />
                    <div className="h-4 bg-surface-border rounded w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length > 0 ? (
            <>
              <div ref={postsRevealRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <div key={post.id} data-post-card className="h-full">
                    <PostCard
                      post={post}
                      priority={index < 3 && currentPage === 1}
                    />
                  </div>
                ))}
              </div>

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={basePath}
              />
            </>
          ) : (
            <div className="text-center py-16 px-6 bg-surface-soft border border-surface-border rounded-card max-w-2xl mx-auto my-8">
              <div className="w-16 h-16 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-content-heading mb-2">
                {t('blog.emptyHeading')}
              </h3>
              <p className="text-sm text-content-body leading-relaxed max-w-md mx-auto mb-6">
                {t('blog.emptyMessage')}
              </p>
              <Button variant="secondary" to={`${prefix}/blog`}>
                {t('blog.backToBlog')}
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
