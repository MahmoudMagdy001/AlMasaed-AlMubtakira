import React from 'react'
import { Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'whatsapp'
  | 'inverse'
  | 'hero'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  href?: string
  to?: string
  target?: string
  rel?: string
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  href,
  to,
  target,
  rel,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-control transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 select-none'

  const sizeClasses = {
    sm: 'text-sm px-3.5 py-1.5 gap-1.5 min-h-[36px]',
    md: 'text-base px-5 py-2.5 gap-2 min-h-[44px]',
    lg: 'text-lg px-7 py-3.5 gap-2.5 min-h-[52px]',
  }[size]

  const hasCustomBg = /\bbg-/.test(className)

  const variantClasses = {
    primary: hasCustomBg
      ? 'text-white border border-transparent shadow-sm'
      : 'bg-brand-900 text-white hover:bg-brand-800 active:bg-brand-900 border border-transparent shadow-sm',
    secondary:
      'bg-transparent text-brand-600 border border-brand-600 hover:bg-brand-50 active:bg-brand-100',
    ghost:
      'bg-transparent text-content-body hover:bg-surface-soft hover:text-brand-900 active:bg-surface-border',
    whatsapp:
      'bg-whatsapp text-white hover:bg-whatsapp-hover active:bg-whatsapp shadow-sm border border-transparent',
    inverse:
      'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/35 active:bg-white/25 shadow-xs font-semibold',
    hero:
      'bg-brand-500 text-white hover:bg-brand-400 active:bg-brand-600 border border-brand-400/30 shadow-md font-semibold',
  }[variant]

  const widthClass = fullWidth ? 'w-full' : ''
  const combinedClasses =
    `${baseClasses} ${sizeClasses} ${variantClasses} ${widthClass} ${className}`.trim()

  const content = (
    <>
      {isLoading ? (
        <Loader2
          className="w-4 h-4 animate-spin text-current"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)}
        className={combinedClasses}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={combinedClasses}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {content}
    </button>
  )
}
