import { supabase } from '@/lib/supabase'
import type { Json } from '@/types/database.types'

export interface MediaVariant {
  w: number
  path: string
  size?: number
  h?: number
}

export interface MediaItem {
  id?: string
  storage_path: string
  width?: number | null
  height?: number | null
  alt_text?: string | null
  title?: string | null
  variants?: MediaVariant[] | Json | null
}

export function getStoragePublicUrl(storagePath: string): string {
  if (
    storagePath.startsWith('http://') ||
    storagePath.startsWith('https://') ||
    storagePath.startsWith('/')
  ) {
    return storagePath
  }
  return supabase.storage.from('media').getPublicUrl(storagePath).data.publicUrl
}

export interface GetImagePropsOptions {
  fallbackAlt?: string
  sizes?: string
}

export interface ImagePropsResult {
  src: string
  srcSet?: string
  sizes?: string
  width?: number
  height?: number
  alt: string
}

/**
 * Returns complete responsive image props (src, srcSet, sizes, width, height, alt)
 * for use in public <img> and <ResponsiveImage> components.
 */
export function getImageProps(
  media: MediaItem | string | null | undefined,
  optionsOrAlt?: string | GetImagePropsOptions,
): ImagePropsResult | null {
  if (!media) return null

  let fallbackAlt = ''
  let customSizes: string | undefined = undefined

  if (typeof optionsOrAlt === 'string') {
    fallbackAlt = optionsOrAlt
  } else if (optionsOrAlt && typeof optionsOrAlt === 'object') {
    fallbackAlt = optionsOrAlt.fallbackAlt ?? ''
    customSizes = optionsOrAlt.sizes
  }

  if (typeof media === 'string') {
    return {
      src: getStoragePublicUrl(media),
      alt: fallbackAlt,
      sizes: customSizes,
    }
  }

  const src = getStoragePublicUrl(media.storage_path)
  const alt = media.alt_text || fallbackAlt

  let srcSet: string | undefined = undefined
  let parsedVariants: MediaVariant[] = []

  if (Array.isArray(media.variants)) {
    parsedVariants = media.variants as unknown as MediaVariant[]
  } else if (typeof media.variants === 'string') {
    try {
      parsedVariants = JSON.parse(media.variants)
    } catch {
      parsedVariants = []
    }
  }

  if (parsedVariants.length > 0) {
    const validVariants = parsedVariants.filter(
      (v) => typeof v.w === 'number' && v.w > 0 && Boolean(v.path),
    )
    if (validVariants.length > 0) {
      // Sort variants by width ascending for clean srcset order
      const sorted = [...validVariants].sort((a, b) => a.w - b.w)
      srcSet = sorted
        .map((v) => `${getStoragePublicUrl(v.path)} ${v.w}w`)
        .join(', ')
    }
  }

  return {
    src,
    srcSet,
    sizes: customSizes,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
    alt,
  }
}
