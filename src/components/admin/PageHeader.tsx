import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export interface PageHeaderProps {
  title: string
  description?: string
  backTo?: string
  backLabel?: string
  actions?: React.ReactNode
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  backTo,
  backLabel = 'الرجوع',
  actions,
}) => {
  return (
    <div className="mb-8">
      {backTo && (
        <div className="mb-3">
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-content-muted hover:text-brand-600 transition-colors"
          >
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{backLabel}</span>
          </Link>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-content-heading tracking-tight">
            {title}
          </h1>
          {description && (
            <p className="text-xs text-content-muted mt-1 leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
      </div>
    </div>
  )
}
