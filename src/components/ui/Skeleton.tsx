import React from 'react'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text'
  width?: string | number
  height?: string | number
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantClasses = {
    rectangular: 'rounded-control',
    circular: 'rounded-full',
    text: 'rounded-control h-4 w-full',
  }[variant]

  return (
    <div
      className={`animate-pulse bg-surface-border/70 select-none ${variantClasses} ${className}`}
      style={{
        width,
        height,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  )
}
