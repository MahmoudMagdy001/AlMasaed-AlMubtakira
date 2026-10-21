import React from 'react'

export type BadgeVariant =
  'default' | 'success' | 'error' | 'warning' | 'neutral' | 'brand'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
  size?: BadgeSize
  icon?: React.ReactNode
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  icon,
  children,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  }[size]

  const variantClasses = {
    default: 'bg-brand-50 text-brand-900 border border-brand-200',
    brand: 'bg-brand-900 text-white border border-brand-800',
    success: 'bg-green-50 text-feedback-success border border-green-200',
    error: 'bg-red-50 text-feedback-error border border-red-200',
    warning: 'bg-amber-50 text-feedback-warning border border-amber-200',
    neutral: 'bg-surface-soft text-content-body border border-surface-border',
  }[variant]

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full select-none ${sizeClasses} ${variantClasses} ${className}`.trim()}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  )
}
