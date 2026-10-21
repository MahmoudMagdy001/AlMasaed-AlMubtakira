import type { Database } from '@/types/database.types'

export type MediaRow = Database['public']['Tables']['media']['Row']
export type MediaInsert = Database['public']['Tables']['media']['Insert']
export type MediaUpdate = Database['public']['Tables']['media']['Update']

export type MediaFolder = 'general' | 'blog' | 'works' | 'partners' | 'branding'

export interface MediaVariantInfo {
  w: number
  h: number
  path: string
  size: number
}

export interface MediaVariantsMap {
  [width: string]: MediaVariantInfo
}

export type MediaTypeFilter = 'all' | 'image' | 'pdf'

export type MediaSortOption =
  | 'newest'
  | 'oldest'
  | 'name_asc'
  | 'name_desc'
  | 'size_desc'
  | 'size_asc'

export interface MediaFilterState {
  search: string
  folder: MediaFolder | 'all'
  type: MediaTypeFilter
  sort: MediaSortOption
}

export interface MediaUsageItem {
  id: string
  type: 'post' | 'work' | 'partner' | 'setting'
  title: string
  field: string
  url?: string
}

export interface MediaUsageReport {
  isUsed: boolean
  items: MediaUsageItem[]
}

export interface ProcessedVariant {
  blob: Blob
  width: number
  height: number
  sizeBytes: number
  storagePath: string
}

export interface ProcessedImageResult {
  originalFileName: string
  slug: string
  mimeType: string
  width: number
  height: number
  sizeBytes: number
  hash: string
  storagePath: string
  variants: MediaVariantInfo[]
  variantBlobs: ProcessedVariant[]
}

export interface UploadQueueItem {
  id: string
  file: File
  progress: number
  status: 'pending' | 'processing' | 'uploading' | 'done' | 'error' | 'cancelled'
  errorMessage?: string
  result?: MediaRow
  altText: string
  title: string
  folder: MediaFolder
  isDuplicate?: boolean
}
