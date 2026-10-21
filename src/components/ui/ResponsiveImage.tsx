import React, { useState } from 'react'
import {
  type MediaItem,
  type ImagePropsResult,
  getImageProps,
} from '@/lib/media'

export interface ResponsiveImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'alt'> {
  media?: MediaItem | string | null
  src?: string
  srcSet?: string
  alt?: string
  priority?: boolean
  fallbackComponent?: React.ReactNode
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  media,
  src: directSrc,
  srcSet: directSrcSet,
  alt: directAlt = '',
  priority = false,
  width,
  height,
  className = '',
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  fallbackComponent,
  onError,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false)

  const derived: ImagePropsResult | null = media ? getImageProps(media, directAlt) : null
  const src = derived?.src || directSrc
  const srcSet = derived?.srcSet || directSrcSet
  const alt = derived?.alt ?? directAlt
  const imgWidth = width ?? derived?.width
  const imgHeight = height ?? derived?.height

  if (!src || hasError) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>
    }
    return (
      <div
        className={`bg-surface-subtle flex items-center justify-center text-content-muted ${className}`}
        aria-hidden="true"
      >
        <span className="text-xs">Image unavailable</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      width={imgWidth}
      height={imgHeight}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      onError={(e) => {
        setHasError(true)
        onError?.(e)
      }}
      className={className}
      {...rest}
    />
  )
}
