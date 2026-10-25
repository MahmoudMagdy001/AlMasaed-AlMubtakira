import React, { useId } from 'react'
import logoIconWhite from '@/assets/brand/logo-icon-white.webp'

interface BrandPatternProps {
  className?: string
  opacity?: number
}

export const BrandPattern: React.FC<BrandPatternProps> = ({
  className = '',
  opacity = 0.08,
}) => {
  const patternId = useId()

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={patternId}
          width="140"
          height="140"
          patternUnits="userSpaceOnUse"
        >
          {/* Staggered Logo Pattern (Row 1) */}
          <image
            href={logoIconWhite}
            x="20"
            y="14"
            width="40"
            height="51"
            preserveAspectRatio="xMidYMid meet"
          />
          {/* Staggered Logo Pattern (Row 2 - Offset) */}
          <image
            href={logoIconWhite}
            x="90"
            y="84"
            width="40"
            height="51"
            preserveAspectRatio="xMidYMid meet"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}

