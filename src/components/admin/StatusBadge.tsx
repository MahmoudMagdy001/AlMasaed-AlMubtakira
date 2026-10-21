import React from 'react'

export type PostStatus = 'published' | 'draft' | 'archived'
export type MessageStatus = 'new' | 'contacted' | 'closed' | 'spam'
export type UserRole = 'admin' | 'editor' | 'none'

export interface StatusBadgeProps {
  status?: PostStatus | MessageStatus | UserRole | string
  seoScore?: number | null
  className?: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  seoScore,
  className = '',
}) => {
  // If rendering SEO Score
  if (seoScore !== undefined && seoScore !== null) {
    let colorClasses = 'bg-feedback-error/10 text-feedback-error border-feedback-error/20'
    const label = `${seoScore}/100`


    if (seoScore >= 80) {
      colorClasses = 'bg-feedback-success/10 text-feedback-success border-feedback-success/20'
    } else if (seoScore >= 50) {
      colorClasses = 'bg-feedback-warning/10 text-feedback-warning border-feedback-warning/20'
    }

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${colorClasses} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
        <span>SEO: {label}</span>
      </span>
    )
  }

  // Common status definitions
  switch (status) {
    // Post statuses
    case 'published':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>منشور</span>
        </span>
      )

    case 'draft':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>مسودة</span>
        </span>
      )

    case 'archived':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span>مؤرشف</span>
        </span>
      )

    // Message / Contact Submission statuses
    case 'new':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>رسالة جديدة</span>
        </span>
      )

    case 'contacted':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>تم التواصل</span>
        </span>
      )

    case 'closed':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>مكتمل</span>
        </span>
      )

    case 'spam':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span>مزعج</span>
        </span>
      )

    // User Roles
    case 'admin':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
          <span>مدير عام</span>
        </span>
      )

    case 'editor':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span>محرر</span>
        </span>
      )

    case 'none':
      return (
        <span
          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500 border border-slate-200 ${className}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          <span>بدون صلاحية</span>
        </span>
      )

    // Language badges
    case 'ar':
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold bg-brand-50 text-brand-800 border border-brand-200 ${className}`}
        >
          العربية
        </span>
      )

    case 'en':
      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200 ${className}`}
        >
          English
        </span>
      )

    default:
      return (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-soft text-content-body border border-surface-border ${className}`}
        >
          {status}
        </span>
      )
  }
}
