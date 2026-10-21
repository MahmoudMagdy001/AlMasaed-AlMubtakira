import React from 'react'

export interface SectionHeadingProps {
  kicker?: string
  title: string
  intro?: string
  align?: 'start' | 'center'
  theme?: 'light' | 'dark'
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  intro,
  align = 'start',
  theme = 'light',
  className = '',
}) => {
  const isCenter = align === 'center'
  const isDark = theme === 'dark'

  return (
    <div
      className={`max-w-3xl mb-10 md:mb-14 ${
        isCenter ? 'mx-auto text-center' : 'text-start'
      } ${className}`}
    >
      {kicker && (
        <span
          className={`inline-block text-xs md:text-sm font-semibold tracking-wider uppercase mb-2 ${
            isDark ? 'text-brand-400' : 'text-brand-600'
          }`}
        >
          {kicker}
        </span>
      )}
      <h2
        className={`text-2xl md:text-4xl font-bold tracking-tight mb-4 ${
          isDark ? 'text-white' : 'text-content-heading'
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={`text-base md:text-lg leading-relaxed ${
            isDark ? 'text-brand-100' : 'text-content-body'
          }`}
        >
          {intro}
        </p>
      )}
    </div>
  )
}
