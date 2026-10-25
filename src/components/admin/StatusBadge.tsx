import React from 'react'

export type PostStatus = 'published' | 'draft' | 'archived'
export type MessageStatus = 'new' | 'contacted' | 'closed' | 'spam'
export type UserRole = 'admin' | 'editor' | 'none'

export interface StatusBadgeProps {
  status?: PostStatus | MessageStatus | UserRole | string
  seoScore?: number | null
  className?: string
}

const STATUS_CONFIG: Record<string, { label: string; dot?: string; classes: string }> = {
  published: { label: 'منشور', dot: 'bg-emerald-500', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  draft: { label: 'مسودة', dot: 'bg-amber-500', classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  archived: { label: 'مؤرشف', dot: 'bg-slate-400', classes: 'bg-slate-100 text-slate-700 border-slate-200' },
  new: { label: 'رسالة جديدة', dot: 'bg-blue-500', classes: 'bg-blue-50 text-blue-700 border-blue-200' },
  contacted: { label: 'تم التواصل', dot: 'bg-amber-500', classes: 'bg-amber-50 text-amber-700 border-amber-200' },
  closed: { label: 'مكتمل', dot: 'bg-emerald-500', classes: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  spam: { label: 'مزعج', dot: 'bg-rose-500', classes: 'bg-rose-50 text-rose-700 border-rose-200' },
  admin: { label: 'مدير عام', dot: 'bg-purple-500', classes: 'bg-purple-50 text-purple-700 border-purple-200' },
  editor: { label: 'محرر', dot: 'bg-indigo-500', classes: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  none: { label: 'بدون صلاحية', dot: 'bg-slate-300', classes: 'bg-slate-100 text-slate-500 border-slate-200' },
  ar: { label: 'العربية', classes: 'rounded-sm font-bold bg-brand-50 text-brand-800 border-brand-200' },
  en: { label: 'English', classes: 'rounded-sm font-bold bg-slate-100 text-slate-700 border-slate-200' },
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  seoScore,
  className = '',
}) => {
  if (seoScore !== undefined && seoScore !== null) {
    const colorClasses =
      seoScore >= 80
        ? 'bg-feedback-success/10 text-feedback-success border-feedback-success/20'
        : seoScore >= 50
          ? 'bg-feedback-warning/10 text-feedback-warning border-feedback-warning/20'
          : 'bg-feedback-error/10 text-feedback-error border-feedback-error/20'

    return (
      <span
        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${colorClasses} ${className}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
        <span>SEO: {seoScore}/100</span>
      </span>
    )
  }

  const config = status ? STATUS_CONFIG[status] : undefined

  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        config ? config.classes : 'bg-surface-soft text-content-body border-surface-border'
      } ${className}`}
    >
      {config?.dot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} aria-hidden="true" />}
      <span>{config?.label ?? status}</span>
    </span>
  )
}
