import React, { useId } from 'react'

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
          width="120"
          height="120"
          patternUnits="userSpaceOnUse"
        >
          {/* Ascending Arrow Lines */}
          <path
            d="M20 70 L40 40 L60 70"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M30 85 L40 70 L50 85"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Innovation Cube */}
          <g transform="translate(80, 25)">
            {/* Top face */}
            <polygon
              points="15,0 30,8 15,16 0,8"
              fill="currentColor"
              fillOpacity="0.4"
            />
            {/* Left face */}
            <polygon
              points="0,8 15,16 15,32 0,24"
              fill="currentColor"
              fillOpacity="0.25"
            />
            {/* Right face */}
            <polygon
              points="15,16 30,8 30,24 15,32"
              fill="currentColor"
              fillOpacity="0.6"
            />
          </g>

          {/* Subtle secondary upward accent */}
          <line
            x1="95"
            y1="90"
            x2="95"
            y2="110"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="2 4"
          />
          <path
            d="M90 95 L95 90 L100 95"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  )
}
