import React from 'react'
import { BrandPattern } from './BrandPattern'

export type SectionVariant = 'white' | 'soft' | 'dark'

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: SectionVariant
  withPattern?: boolean
  patternOpacity?: number
}

export const Section: React.FC<SectionProps> = ({
  variant = 'white',
  withPattern = false,
  patternOpacity,
  children,
  className = '',
  ...props
}) => {
  const variantClasses = {
    white: 'bg-white text-content-body',
    soft: 'bg-surface-soft text-content-body',
    dark: 'bg-brand-900 text-white relative overflow-hidden',
  }[variant]

  const showPattern =
    withPattern || (variant === 'dark' && withPattern !== false)

  return (
    <section
      className={`py-16 md:py-28 relative ${variantClasses} ${className}`}
      {...props}
    >
      {showPattern && <BrandPattern opacity={patternOpacity} />}
      <div className="relative z-10">{children}</div>
    </section>
  )
}
