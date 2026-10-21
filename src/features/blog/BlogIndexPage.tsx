import React from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BookOpen } from 'lucide-react'
import { Container, Section, SectionHeading, Breadcrumbs, Button } from '@/components/ui'
import { Seo, getCollectionPageSchema } from '@/components/seo'
import { useBlogPosts, useBlogCategories } from '@/hooks/useBlog'
import { PostCard } from './components/PostCard'
import { BlogPagination } from './components/BlogPagination'

const POSTS_PER_PAGE = 9

export const BlogIndexPage: React.FC = () => {
  const { t } = useTranslation()
  const { page } = useParams<{ page?: string }>()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')

  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1)
  const offset = (currentPage - 1) * POSTS_PER_PAGE
  const currentLang = isEn ? 'en' : 'ar'
  const prefix = isEn ? '/en' : ''

  const { data: postsData, isLoading } = useBlogPosts({
    lang: currentLang,
    limit: POSTS_PER_PAGE,
    offset,
  })

  const { data: categories } = useBlogCategories()

  const posts = postsData?.posts || []
  const total = postsData?.total || 0
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)

  const breadcrumbs = [
    { label: t('nav.home'), href: isEn ? '/en' : '/' },
    { label: t('nav.blog') },
  ]

  const pageTitle =
    currentPage > 1
      ? `${t('blog.pageTitle')} - ${t('common.page')} ${currentPage}`
      : t('blog.pageTitle')

  const canonicalPath =
    currentPage > 1
      ? `${prefix}/blog/page/${currentPage}`
      : `${prefix}/blog`
  const canonicalUrl = `https://almubtakirah.com${canonicalPath}`

  return (
    <>
      <Seo
        title={pageTitle}
        description={t('blog.pageDescription')}
        canonical={canonicalUrl}
        hreflang={{
          ar: currentPage > 1 ? `https://almubtakirah.com/blog/page/${currentPage}` : 'https://almubtakirah.com/blog',
          en: currentPage > 1 ? `https://almubtakirah.com/en/blog/page/${currentPage}` : 'https://almubtakirah.com/en/blog',
          xDefault: currentPage > 1 ? `https://almubtakirah.com/blog/page/${currentPage}` : 'https://almubtakirah.com/blog',
        }}
        lang={isEn ? 'en' : 'ar'}
        dir={isEn ? 'ltr' : 'rtl'}
        breadcrumbs={[
          { name: t('nav.home'), url: isEn ? '/en' : '/' },
          { name: t('nav.blog'), url: canonicalUrl },
        ]}
        jsonLd={[
          getCollectionPageSchema(
            pageTitle,
            t('blog.pageDescription'),
            canonicalUrl,
          ),
        ]}
      />


      <Section variant="white" className="pt-6 pb-16">
        <Container>
          <Breadcrumbs items={breadcrumbs} className="mb-8" />

          <div className="max-w-3xl mb-10">
            <SectionHeading
              level="h1"
              kicker={t('blog.eyebrow')}
              title={t('blog.heading')}
              intro={t('blog.intro')}
            />
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
                className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-brand-600 text-white shadow-xs focus-visible:outline-none"
              >
                {t('blog.allCategories')}
              </Link>

              {categories.map((cat) => {
                const name =
                  isEn && cat.name_en ? cat.name_en : cat.name_ar
                return (
                  <Link
                    key={cat.id}
                    to={`${prefix}/blog/category/${cat.slug}`}
                    className="px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap bg-surface-soft text-content-body hover:bg-brand-50 hover:text-brand-600 border border-surface-border transition-colors focus-visible:outline-none"
                  >
                    {name}
                  </Link>
                )
              })}
            </div>
          )}

          {/* Posts Grid or Empty State */}
          {isLoading ? (
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    priority={index < 3 && currentPage === 1}
                  />
                ))}
              </div>

              <BlogPagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath={`${prefix}/blog`}
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
              <Button variant="secondary" to={`${prefix}/contact`}>
                {t('actions.contactUs')}
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  )
}
