import React from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Home } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
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

  return (
    <nav aria-label="مسار التنقل" className={`text-sm ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-content-muted">
        <li>
          <Link
            to={isRtl ? '/' : '/en'}
            className="flex items-center hover:text-brand-900 transition-colors focus-visible:outline-none"
            aria-label="الرئيسية"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <React.Fragment key={index}>
              <li
                aria-hidden="true"
                className="select-none text-surface-border"
              >
                <Separator className="w-3.5 h-3.5" />
              </li>
              <li>
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-content-heading"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className="hover:text-brand-900 transition-colors focus-visible:outline-none"
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
