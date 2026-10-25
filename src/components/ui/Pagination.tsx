import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange?: (page: number) => void
  getPageUrl?: (page: number) => string
  isRtl?: boolean
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  getPageUrl,
  isRtl = true,
  className = '',
}) => {
  if (totalPages <= 1) return null

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft
  const NextIcon = isRtl ? ChevronLeft : ChevronRight

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

  const prevDisabled = currentPage === 1
  const nextDisabled = currentPage === totalPages

  return (
    <nav
      className={`flex items-center justify-center gap-1.5 ${className}`}
      aria-label="صفحات التنقل"
    >
      {/* Prev */}
      {getPageUrl && !prevDisabled ? (
        <Link
          to={getPageUrl(currentPage - 1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 transition-colors focus-visible:outline-none"
          aria-label="الصفحة السابقة"
        >
          <PrevIcon className="w-5 h-5" aria-hidden="true" />
        </Link>
      ) : (
        <button
          onClick={() => onPageChange?.(currentPage - 1)}
          disabled={prevDisabled}
          className="inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none"
          aria-label="الصفحة السابقة"
        >
          <PrevIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      )}

      {/* Pages */}
      {pages.map((p, idx) => {
        if (p === 'ellipsis') {
          return (
            <span
              key={`ellipsis-${idx}`}
              className="inline-flex items-center justify-center w-8 h-10 text-content-muted"
            >
              …
            </span>
          )
        }

        const isCurrent = p === currentPage
        const itemClass = `inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-control text-sm font-semibold transition-colors focus-visible:outline-none ${
          isCurrent
            ? 'bg-brand-900 text-white'
            : 'bg-white border border-surface-border text-content-body hover:bg-surface-soft hover:text-brand-900'
        }`

        if (getPageUrl) {
          return (
            <Link
              key={p}
              to={getPageUrl(p)}
              aria-current={isCurrent ? 'page' : undefined}
              className={itemClass}
            >
              {p}
            </Link>
          )
        }

        return (
          <button
            key={p}
            onClick={() => onPageChange?.(p)}
            aria-current={isCurrent ? 'page' : undefined}
            className={itemClass}
          >
            {p}
          </button>
        )
      })}

      {/* Next */}
      {getPageUrl && !nextDisabled ? (
        <Link
          to={getPageUrl(currentPage + 1)}
          className="inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 transition-colors focus-visible:outline-none"
          aria-label="الصفحة التالية"
        >
          <NextIcon className="w-5 h-5" aria-hidden="true" />
        </Link>
      ) : (
        <button
          onClick={() => onPageChange?.(currentPage + 1)}
          disabled={nextDisabled}
          className="inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none"
          aria-label="الصفحة التالية"
        >
          <NextIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      )}
    </nav>
  )
}
