import type { ProcessedImageResult, ProcessedVariant, MediaVariantInfo } from './types'

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024 // 10 MB
const MAX_LONG_EDGE_PX = 2400
const VARIANT_WIDTHS = [480, 960, 1600]
const WEBP_QUALITY = 0.82

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/svg+xml',
  'application/pdf',
])

export class MediaValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MediaValidationError'
  }
}

/**
 * Converts a raw filename into a clean, URL-safe slug preserving context
 */
export function slugifyFileName(fileName: string): string {
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '')
  const safe = nameWithoutExt
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')

  return safe || 'media-asset'
}

/**
 * Calculates SHA-256 hash of an ArrayBuffer
 */
export async function calculateBufferHash(buffer: ArrayBuffer): Promise<string> {
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  }
  // Fallback hash for test environments where crypto.subtle may not be available
  let hash = 0
  const view = new Uint8Array(buffer)
  for (let i = 0; i < view.length; i++) {
    hash = (hash * 31 + view[i]) >>> 0
  }
  return hash.toString(16).padStart(8, '0')
}

/**
 * Loads an image file into an HTMLImageElement or ImageBitmap
 */
function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new MediaValidationError('فشل في قراءة بيانات ملف الصورة. يرجى التأكد من سلامة الملف.'))
    }
    img.src = url
  })
}

/**
 * Validates a file against allowed MIME types and max size limit (10 MB)
 */
export function validateMediaFile(file: File): void {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new MediaValidationError(
      `نوع الملف (${file.type || 'غير معروف'}) غير مدعوم. الصيغ المدعومة هي JPG، PNG، WebP، AVIF، SVG، و PDF فقط.`,
    )
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1)
    throw new MediaValidationError(
      `حجم الملف (${sizeMb} ميجابايت) يتجاوز الحد الأقصى المسموح به وهو 10 ميجابايت.`,
    )
  }
}

/**
 * Draws an image on canvas and converts it to a WebP blob
 */
function renderCanvasToWebp(
  img: HTMLImageElement,
  targetWidth: number,
  targetHeight: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    canvas.width = targetWidth
    canvas.height = targetHeight
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Canvas 2D context not available'))
      return
    }

    // High quality scaling
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('فشل في توليد صورة WebP من Canvas'))
          return
        }
        resolve(blob)
      },
      'image/webp',
      WEBP_QUALITY,
    )
  })
}

/**
 * Main processing pipeline: validates, calculates hash, resizes, generates WebP variants
 */
export async function processMediaFile(file: File): Promise<ProcessedImageResult> {
  validateMediaFile(file)

  const arrayBuffer = await file.arrayBuffer()
  const fullHash = await calculateBufferHash(arrayBuffer)
  const shortHash = fullHash.slice(0, 8)

  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const datePrefix = `${year}/${month}`

  const slug = slugifyFileName(file.name)

  // 1. Non-raster files: SVG and PDF uploaded as-is
  if (file.type === 'application/pdf' || file.type === 'image/svg+xml') {
    const ext = file.type === 'application/pdf' ? 'pdf' : 'svg'
    const storagePath = `${datePrefix}/${slug}-${shortHash}.${ext}`

    return {
      originalFileName: file.name,
      slug,
      mimeType: file.type,
      width: 0,
      height: 0,
      sizeBytes: file.size,
      hash: fullHash,
      storagePath,
      variants: [],
      variantBlobs: [
        {
          blob: file,
          width: 0,
          height: 0,
          sizeBytes: file.size,
          storagePath,
        },
      ],
    }
  }

  // 2. Raster images: JPG, PNG, WebP, AVIF
  const img = await loadImageElement(file)
  const origWidth = img.naturalWidth || img.width
  const origHeight = img.naturalHeight || img.height

  if (origWidth <= 0 || origHeight <= 0) {
    throw new MediaValidationError('أبعاد الصورة غير صالحة أو تعذر قراءتها.')
  }

  // Downscale if longest side exceeds MAX_LONG_EDGE_PX (2400px)
  let masterWidth = origWidth
  let masterHeight = origHeight
  const longestEdge = Math.max(origWidth, origHeight)

  if (longestEdge > MAX_LONG_EDGE_PX) {
    const ratio = MAX_LONG_EDGE_PX / longestEdge
    masterWidth = Math.round(origWidth * ratio)
    masterHeight = Math.round(origHeight * ratio)
  }

  // Determine variant widths to generate (never upscale above masterWidth)
  const candidateWidths = VARIANT_WIDTHS.filter((w) => w < masterWidth)
  const targetWidths = Array.from(new Set([...candidateWidths, masterWidth])).sort((a, b) => a - b)

  const variantBlobs: ProcessedVariant[] = []
  const variantsInfo: MediaVariantInfo[] = []

  for (const w of targetWidths) {
    const h = Math.round((w / masterWidth) * masterHeight)
    const blob = await renderCanvasToWebp(img, w, h)
    const variantPath = `${datePrefix}/${slug}-${shortHash}-${w}.webp`

    variantBlobs.push({
      blob,
      width: w,
      height: h,
      sizeBytes: blob.size,
      storagePath: variantPath,
    })

    variantsInfo.push({
      w,
      h,
      path: variantPath,
      size: blob.size,
    })
  }

  // Default primary storage_path points to 1600w variant or the largest available
  const primaryVariant =
    variantBlobs.find((v) => v.width === 1600) || variantBlobs[variantBlobs.length - 1]

  return {
    originalFileName: file.name,
    slug,
    mimeType: 'image/webp',
    width: masterWidth,
    height: masterHeight,
    sizeBytes: primaryVariant.sizeBytes,
    hash: fullHash,
    storagePath: primaryVariant.storagePath,
    variants: variantsInfo,
    variantBlobs,
  }
}
