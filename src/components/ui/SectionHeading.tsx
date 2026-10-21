import React from 'react'

export interface SectionHeadingProps {
  kicker?: string
  title: string
  intro?: string
  align?: 'start' | 'center'
  theme?: 'light' | 'dark'
  level?: 'h1' | 'h2'
  className?: string
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  intro,
  align = 'start',
  theme = 'light',
  level = 'h2',
  className = '',
}) => {
  const isCenter = align === 'center'
  const isDark = theme === 'dark'
  const HeadingTag = level === 'h1' ? 'h1' : 'h2'

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
      <HeadingTag
        className={`text-2xl md:text-4xl font-bold tracking-tight mb-4 ${
          isDark ? 'text-white' : 'text-content-heading'
        }`}
      >
        {title}
      </HeadingTag>
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
