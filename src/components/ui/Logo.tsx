import React from 'react'
import { Link } from 'react-router-dom'

// Import pre-optimized WebP assets
import whiteHeader1x from '@/assets/brand/logo-white-header.webp'
import whiteHeader2x from '@/assets/brand/logo-white-header@2x.webp'
import whiteFooter1x from '@/assets/brand/logo-white-footer.webp'
import whiteFooter2x from '@/assets/brand/logo-white-footer@2x.webp'
import whiteHorizontal from '@/assets/brand/logo-white-horizontal.webp'
import whiteSquare from '@/assets/brand/logo-white-square.webp'
import darkHorizontal from '@/assets/brand/logo-dark-horizontal.webp'
import darkSquare from '@/assets/brand/logo-dark-square.webp'

export interface LogoProps {
  variant?: 'horizontal' | 'square'
  theme?: 'dark' | 'light' // 'dark' = white logo for dark background, 'light' = dark blue logo for light background
  size?: 'header' | 'footer' | 'md' | 'lg'
  asLink?: boolean
  to?: string
  className?: string
  alt?: string
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'header',
  asLink = true,
  to = '/',
  className = '',
  alt = 'شركة المصاعد المبتكرة',
}) => {
  let src = whiteHorizontal
  let srcSet: string | undefined
  let width = 160
  let height = 50

  if (variant === 'horizontal') {
    if (theme === 'dark') {
      if (size === 'header') {
        src = whiteHeader1x
        srcSet = `${whiteHeader1x} 1x, ${whiteHeader2x} 2x`
        width = 160
        height = 50
      } else if (size === 'footer') {
        src = whiteFooter1x
        srcSet = `${whiteFooter1x} 1x, ${whiteFooter2x} 2x`
        width = 220
        height = 69
      } else if (size === 'lg') {
        src = whiteHorizontal
        width = 300
        height = 94
      } else {
        src = whiteHorizontal
        width = 200
        height = 63
      }
    } else {
      src = darkHorizontal
      width = size === 'header' ? 160 : size === 'footer' ? 220 : 200
      height = Math.round(width * 0.31)
    }
  } else {
    // Square variant
    if (theme === 'dark') {
      src = whiteSquare
    } else {
      src = darkSquare
    }
    width = size === 'lg' ? 160 : size === 'footer' ? 120 : 80
    height = width
  }

  const image = (
    <img
      src={src}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      className={`object-contain transition-opacity duration-200 ${className}`}
      loading={size === 'header' ? 'eager' : 'lazy'}
      decoding="async"
    />
  )

  if (asLink) {
    return (
      <Link
        to={to}
        className="inline-flex items-center focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:outline-none rounded-control p-1"
        aria-label={alt}
      >
        {image}
      </Link>
    )
  }

  return image
}
