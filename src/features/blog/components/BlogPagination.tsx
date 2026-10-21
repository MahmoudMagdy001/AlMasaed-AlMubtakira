import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export interface BlogPaginationProps {
  currentPage: number
  totalPages: number
  basePath: string // e.g. "/blog" or "/blog/category/maintenance" or "/en/blog"
}

export const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
}) => {
  const { t } = useTranslation()
  const location = useLocation()
  const isEn = location.pathname.startsWith('/en')
  const isRtl = !isEn

  if (totalPages <= 1) {
    return null
  }

  const getPageUrl = (page: number) => {
    if (page === 1) {
      return basePath
    }
    return `${basePath}/page/${page}`
  }

  // Generate pagination items with ellipsis if many pages
  const pages: (number | 'ellipsis')[] = []
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (currentPage > 3) {
      pages.push('ellipsis')
    }

    const start = Math.max(2, currentPage - 1)
    const end = Math.min(totalPages - 1, currentPage + 1)

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    if (currentPage < totalPages - 2) {
      pages.push('ellipsis')
    }
    pages.push(totalPages)
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-surface-border"
    >
      {/* Previous Page Button */}
      {currentPage > 1 ? (
        <Link
          to={getPageUrl(currentPage - 1)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-control border border-surface-border text-sm font-semibold text-content-body hover:bg-surface-soft hover:text-brand-600 transition-colors focus-visible:outline-none"
          aria-label={t('common.previous')}
        >
          {isRtl ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <ArrowLeft className="w-4 h-4" />
          )}
          <span>{t('common.previous')}</span>
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-control border border-surface-border text-sm font-semibold text-content-muted opacity-50 cursor-not-allowed"
          aria-disabled="true"
        >
          {isRtl ? (
            <ArrowRight className="w-4 h-4" />
          ) : (
            <ArrowLeft className="w-4 h-4" />
          )}
          <span>{t('common.previous')}</span>
        </span>
      )}

      {/* Numbered Page Buttons */}
      <div className="flex items-center gap-1">
        {pages.map((item, index) => {
          if (item === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-9 h-9 flex items-center justify-center text-content-muted text-sm"
              >
                ...
              </span>
            )
          }

          const isCurrent = item === currentPage
          return (
            <Link
              key={item}
              to={getPageUrl(item)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`w-9 h-9 flex items-center justify-center rounded-control text-sm font-semibold transition-colors focus-visible:outline-none ${
                isCurrent
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'text-content-body hover:bg-surface-soft hover:text-brand-600 border border-transparent'
              }`}
            >
              {item}
            </Link>
          )
        })}
      </div>

      {/* Next Page Button */}
      {currentPage < totalPages ? (
        <Link
          to={getPageUrl(currentPage + 1)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-control border border-surface-border text-sm font-semibold text-content-body hover:bg-surface-soft hover:text-brand-600 transition-colors focus-visible:outline-none"
          aria-label={t('common.next')}
        >
          <span>{t('common.next')}</span>
          {isRtl ? (
            <ArrowLeft className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </Link>
      ) : (
        <span
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-control border border-surface-border text-sm font-semibold text-content-muted opacity-50 cursor-not-allowed"
          aria-disabled="true"
        >
          <span>{t('common.next')}</span>
          {isRtl ? (
            <ArrowLeft className="w-4 h-4" />
          ) : (
            <ArrowRight className="w-4 h-4" />
          )}
        </span>
      )}
    </nav>
  )
}
