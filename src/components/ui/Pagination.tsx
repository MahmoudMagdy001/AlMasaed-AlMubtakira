import React from 'react'
import { ChevronRight, ChevronLeft } from 'lucide-react'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  isRtl?: boolean
  className?: string
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isRtl = true,
  className = '',
}) => {
  if (totalPages <= 1) return null

  // In RTL: Previous page arrow points right (forward in Arabic), Next page arrow points left
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft
  const NextIcon = isRtl ? ChevronLeft : ChevronRight

  const pages: (number | 'ellipsis')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis')
    }
  }

  return (
    <nav
      className={`flex items-center justify-center gap-1.5 ${className}`}
      aria-label="صفحات التنقل"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none"
        aria-label="الصفحة السابقة"
      >
        <PrevIcon className="w-5 h-5" aria-hidden="true" />
      </button>

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
        return (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={isCurrent ? 'page' : undefined}
            className={`inline-flex items-center justify-center min-w-[40px] h-10 px-3 rounded-control text-sm font-semibold transition-colors focus-visible:outline-none ${
              isCurrent
                ? 'bg-brand-900 text-white'
                : 'bg-white border border-surface-border text-content-body hover:bg-surface-soft hover:text-brand-900'
            }`}
          >
            {p}
          </button>
        )
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center w-10 h-10 rounded-control border border-surface-border bg-white text-content-body hover:bg-surface-soft hover:text-brand-900 disabled:opacity-40 disabled:cursor-not-allowed transition-colors focus-visible:outline-none"
        aria-label="الصفحة التالية"
      >
        <NextIcon className="w-5 h-5" aria-hidden="true" />
      </button>
    </nav>
  )
}
