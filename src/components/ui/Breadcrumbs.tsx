import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
  to?: string
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  isRtl?: boolean
  className?: string
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  items,
  isRtl = true,
  className = '',
}) => {
  const Separator = isRtl ? ChevronLeft : ChevronRight
  const isDarkBanner = className.includes('text-white')

  return (
    <nav aria-label="مسار التنقل" className={`text-sm ${className}`}>
      <ol
        className={`flex flex-wrap items-center gap-1.5 ${
          isDarkBanner ? 'text-white/80' : 'text-content-muted'
        }`}
      >
        <li>
          <Link
            to={isRtl ? '/' : '/en'}
            className={`flex items-center transition-colors focus-visible:outline-none ${
              isDarkBanner
                ? 'text-white/80 hover:text-white'
                : 'text-content-muted hover:text-brand-900'
            }`}
            aria-label="الرئيسية"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const targetUrl = item.to || item.href

          return (
            <React.Fragment key={index}>
              <li
                aria-hidden="true"
                className={`select-none ${
                  isDarkBanner ? 'text-white/40' : 'text-surface-border'
                }`}
              >
                <Separator className="w-3.5 h-3.5" />
              </li>
              <li>
                {isLast || !targetUrl ? (
                  <span
                    className={`font-semibold ${
                      isDarkBanner ? 'text-brand-300' : 'text-content-heading'
                    }`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={targetUrl}
                    className={`transition-colors focus-visible:outline-none ${
                      isDarkBanner
                        ? 'text-white/80 hover:text-white hover:underline'
                        : 'hover:text-brand-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
