import { supabase } from '@/lib/supabase'
import type { Json } from '@/types/database.types'

export interface MediaVariant {
  w: number
  path: string
  size?: number
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

export interface ImagePropsResult {
  src: string
  srcSet?: string
  width?: number
  height?: number
  alt: string
}

export function getImageProps(
  media: MediaItem | string | null | undefined,
  fallbackAlt = '',
): ImagePropsResult | null {
  if (!media) return null

  if (typeof media === 'string') {
    return {
      src: getStoragePublicUrl(media),
      alt: fallbackAlt,
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
    const validVariants = parsedVariants.filter((v) => typeof v.w === 'number' && v.path)
    if (validVariants.length > 0) {
      srcSet = validVariants
        .map((v) => `${getStoragePublicUrl(v.path)} ${v.w}w`)
        .join(', ')
    }
  }

  return {
    src,
    srcSet,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
    alt,
  }
}
