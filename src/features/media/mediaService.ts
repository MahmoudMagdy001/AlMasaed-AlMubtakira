import { supabase } from '@/lib/supabase'
import type {
  MediaRow,
  MediaInsert,
  MediaUpdate,
  MediaFolder,
  MediaFilterState,
  MediaUsageReport,
  MediaUsageItem,
  MediaVariantInfo,
} from './types'
import { processMediaFile } from './imagePipeline'

export interface GetMediaParams {
  page?: number
  pageSize?: number
  filter?: Partial<MediaFilterState>
}

export interface MediaListResult {
  items: MediaRow[]
  totalCount: number
  page: number
  pageSize: number
  totalPages: number
}

/**
 * Fetches paginated media items with search, folder, type, and sort filters
 */
export async function getMediaList(params: GetMediaParams = {}): Promise<MediaListResult> {
  const page = Math.max(1, params.page ?? 1)
  const pageSize = Math.max(1, params.pageSize ?? 40)
  const filter = params.filter ?? {}

  let query = supabase.from('media').select('*', { count: 'exact' })

  // 1. Folder filter
  if (filter.folder && filter.folder !== 'all') {
    query = query.eq('folder', filter.folder)
  }

  // 2. MIME type filter
  if (filter.type === 'image') {
    query = query.ilike('mime_type', 'image/%')
  } else if (filter.type === 'pdf') {
    query = query.eq('mime_type', 'application/pdf')
  }

  // 3. Search query (matches file_name, title, or alt_text)
  if (filter.search && filter.search.trim()) {
    const term = filter.search.trim()
    query = query.or(
      `file_name.ilike.%${term}%,title.ilike.%${term}%,alt_text.ilike.%${term}%`,
    )
  }

  // 4. Sorting
  switch (filter.sort) {
    case 'oldest':
      query = query.order('created_at', { ascending: true })
      break
    case 'name_asc':
      query = query.order('file_name', { ascending: true })
      break
    case 'name_desc':
      query = query.order('file_name', { ascending: false })
      break
    case 'size_desc':
      query = query.order('size_bytes', { ascending: false })
      break
    case 'size_asc':
      query = query.order('size_bytes', { ascending: true })
      break
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false })
      break
  }

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1
  query = query.range(from, to)

  const { data, count, error } = await query

  if (error) {
    throw new Error(`خطأ أثناء جلب ملفات الوسائط: ${error.message}`)
  }

  const totalCount = count ?? 0
  const totalPages = Math.ceil(totalCount / pageSize) || 1

  return {
    items: (data as MediaRow[]) || [],
    totalCount,
    page,
    pageSize,
    totalPages,
  }
}

/**
 * Fetches a single media record by ID
 */
export async function getMediaById(id: string): Promise<MediaRow | null> {
  const { data, error } = await supabase
    .from('media')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) {
    throw new Error(`خطأ أثناء جلب تفاصيل الملف: ${error.message}`)
  }

  return (data as MediaRow) || null
}

/**
 * Checks if a duplicate file already exists by matching file name or path
 */
export async function checkDuplicateMedia(
  fileName: string,
  sizeBytes: number,
): Promise<{ isDuplicate: boolean; existingMedia?: MediaRow }> {
  const { data } = await supabase
    .from('media')
    .select('*')
    .eq('file_name', fileName)
    .eq('size_bytes', sizeBytes)
    .limit(1)

  if (data && data.length > 0) {
    return { isDuplicate: true, existingMedia: data[0] as MediaRow }
  }

  return { isDuplicate: false }
}

export interface UploadMediaOptions {
  folder?: MediaFolder
  altText?: string
  title?: string
  onProgress?: (percent: number) => void
}

/**
 * Uploads a file through the processing pipeline and saves to Supabase Storage & DB
 */
export async function uploadMedia(
  file: File,
  options: UploadMediaOptions = {},
): Promise<MediaRow> {
  const { folder = 'general', altText, title, onProgress } = options

  onProgress?.(10)

  // 1. Client-side processing (Canvas scaling, WebP conversion, variants generation)
  const processed = await processMediaFile(file)
  onProgress?.(30)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // 2. Upload all generated variant blobs to Supabase Storage
  const totalBlobs = processed.variantBlobs.length
  let uploadedCount = 0

  for (const variant of processed.variantBlobs) {
    const { error: storageError } = await supabase.storage
      .from('media')
      .upload(variant.storagePath, variant.blob, {
        contentType: processed.mimeType,
        upsert: true,
      })

    if (storageError) {
      throw new Error(`فشل رفع الملف إلى وحدة التخزين: ${storageError.message}`)
    }

    uploadedCount++
    const progressPercent = 30 + Math.round((uploadedCount / totalBlobs) * 50)
    onProgress?.(progressPercent)
  }

  // 3. Insert record into public.media table
  const insertPayload: MediaInsert = {
    file_name: processed.originalFileName,
    storage_path: processed.storagePath,
    mime_type: processed.mimeType,
    size_bytes: processed.sizeBytes,
    width: processed.width > 0 ? processed.width : null,
    height: processed.height > 0 ? processed.height : null,
    variants: processed.variants as unknown as MediaInsert['variants'],
    alt_text: altText?.trim() || null,
    title: title?.trim() || processed.originalFileName.replace(/\.[^/.]+$/, ''),
    folder,
    uploaded_by: user?.id || null,
  }

  const { data: inserted, error: dbError } = await supabase
    .from('media')
    .insert(insertPayload)
    .select('*')
    .single()

  if (dbError) {
    // Attempt cleanup of uploaded storage files on DB insert failure
    const pathsToRemove = processed.variantBlobs.map((v) => v.storagePath)
    await supabase.storage.from('media').remove(pathsToRemove)
    throw new Error(`فشل تسجيل بيانات الوسائط في قاعدة البيانات: ${dbError.message}`)
  }

  onProgress?.(100)
  return inserted as MediaRow
}

/**
 * Updates metadata (alt text, title, folder) of a media item
 */
export async function updateMedia(
  id: string,
  updates: { alt_text?: string | null; title?: string | null; folder?: MediaFolder },
): Promise<MediaRow> {
  const updatePayload: MediaUpdate = {
    ...updates,
    updated_at: new Date().toISOString(),
  }

  const { data, error } = await supabase
    .from('media')
    .update(updatePayload)
    .eq('id', id)
    .select('*')
    .single()

  if (error) {
    throw new Error(`فشل تحديث بيانات الملف: ${error.message}`)
  }

  return data as MediaRow
}

/**
 * Replaces a media item's file while retaining its database ID
 */
export async function replaceMediaFile(
  id: string,
  newFile: File,
  onProgress?: (percent: number) => void,
): Promise<MediaRow> {
  const current = await getMediaById(id)
  if (!current) {
    throw new Error('الملف المطلوب استبداله غير موجود')
  }

  onProgress?.(15)

  // 1. Process new file
  const processed = await processMediaFile(newFile)
  onProgress?.(35)

  // 2. Upload new variants
  for (const variant of processed.variantBlobs) {
    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(variant.storagePath, variant.blob, {
        contentType: processed.mimeType,
        upsert: true,
      })

    if (uploadError) {
      throw new Error(`فشل رفع الملف الجديد: ${uploadError.message}`)
    }
  }

  onProgress?.(70)

  // 3. Update DB record
  const updatePayload: MediaUpdate = {
    file_name: processed.originalFileName,
    storage_path: processed.storagePath,
    mime_type: processed.mimeType,
    size_bytes: processed.sizeBytes,
    width: processed.width > 0 ? processed.width : null,
    height: processed.height > 0 ? processed.height : null,
    variants: processed.variants as unknown as MediaUpdate['variants'],
    updated_at: new Date().toISOString(),
  }

  const { data: updated, error: updateError } = await supabase
    .from('media')
    .update(updatePayload)
    .eq('id', id)
    .select('*')
    .single()

  if (updateError) {
    throw new Error(`فشل تحديث سجل الملف: ${updateError.message}`)
  }

  // 4. Clean up old storage files if paths changed
  const oldPaths: string[] = [current.storage_path]
  if (Array.isArray(current.variants)) {
    for (const v of current.variants as unknown as MediaVariantInfo[]) {
      if (v?.path && !oldPaths.includes(v.path)) {
        oldPaths.push(v.path)
      }
    }
  }

  const newPathsSet = new Set(processed.variantBlobs.map((v) => v.storagePath))
  const pathsToDelete = oldPaths.filter((p) => !newPathsSet.has(p))

  if (pathsToDelete.length > 0) {
    await supabase.storage.from('media').remove(pathsToDelete)
  }

  onProgress?.(100)
  return updated as MediaRow
}

/**
 * Detects if and where a media item is referenced across posts, works, partners, and site settings
 */
export async function detectMediaUsage(
  mediaId: string,
  storagePath: string,
): Promise<MediaUsageReport> {
  const items: MediaUsageItem[] = []

  try {
    // 1. Check posts (featured_image_id, og_image_id, or content_html)
    const { data: posts } = await supabase
      .from('posts')
      .select('id, title, slug, featured_image_id, og_image_id, content_html')
      .or(
        `featured_image_id.eq.${mediaId},og_image_id.eq.${mediaId},content_html.ilike.%${storagePath}%`,
      )

    if (posts && posts.length > 0) {
      for (const p of posts) {
        let field = 'محتوى المقال'
        if (p.featured_image_id === mediaId) field = 'الصورة البارزة للمقال'
        else if (p.og_image_id === mediaId) field = 'صورة المشاركة (OG Image)'

        items.push({
          id: p.id,
          type: 'post',
          title: `مقال: ${p.title}`,
          field,
          url: `/blog/${p.slug}`,
        })
      }
    }
  } catch (err) {
    console.error('Error checking posts media usage:', err)
  }

  try {
    // 2. Check works (cover_media_id or gallery_media_ids contains mediaId)
    const { data: works } = await supabase
      .from('works')
      .select('id, title_ar, slug, cover_media_id, gallery_media_ids')
      .or(`cover_media_id.eq.${mediaId},gallery_media_ids.cs.{${mediaId}}`)

    if (works && works.length > 0) {
      for (const w of works) {
        const field =
          w.cover_media_id === mediaId ? 'غلاف المشروع' : 'معرض صور المشروع'
        items.push({
          id: w.id,
          type: 'work',
          title: `مشروع: ${w.title_ar}`,
          field,
          url: `/works/${w.slug}`,
        })
      }
    }
  } catch (err) {
    console.error('Error checking works media usage:', err)
  }

  try {
    // 3. Check partners (logo_media_id)
    const { data: partners } = await supabase
      .from('partners')
      .select('id, name_ar, logo_media_id')
      .eq('logo_media_id', mediaId)

    if (partners && partners.length > 0) {
      for (const part of partners) {
        items.push({
          id: part.id,
          type: 'partner',
          title: `شريك: ${part.name_ar}`,
          field: 'شعار الشريك',
        })
      }
    }
  } catch (err) {
    console.error('Error checking partners media usage:', err)
  }

  try {
    // 4. Check site_settings
    const { data: settings } = await supabase
      .from('site_settings')
      .select('key, value')

    if (settings && settings.length > 0) {
      for (const s of settings) {
        const valueStr = JSON.stringify(s.value || {})
        if (valueStr.includes(mediaId) || valueStr.includes(storagePath)) {
          items.push({
            id: s.key,
            type: 'setting',
            title: `إعدادات الموقع: ${s.key}`,
            field: 'شعار أو إعداد مرئي عام',
          })
        }
      }
    }
  } catch (err) {
    console.error('Error checking site_settings media usage:', err)
  }

  return {
    isUsed: items.length > 0,
    items,
  }
}

/**
 * Deletes a media file, all its variants from Storage, and its row from DB
 */
export async function deleteMedia(
  mediaId: string,
  bypassUsageCheck = false,
): Promise<void> {
  const media = await getMediaById(mediaId)
  if (!media) {
    return // Already deleted
  }

  // 1. Verify usage protection
  if (!bypassUsageCheck) {
    const usage = await detectMediaUsage(mediaId, media.storage_path)
    if (usage.isUsed) {
      const names = usage.items.map((i) => i.title).join('، ')
      throw new Error(
        `لا يمكن حذف الملف لأنه مستخدم حالياً في: ${names}. يرجى إزالة استخدامه أولاً أو تأكيد الحذف القسري.`,
      )
    }
  }

  // 2. Gather all storage paths (primary + variants)
  const pathsToRemove: string[] = [media.storage_path]
  if (Array.isArray(media.variants)) {
    for (const v of media.variants as unknown as MediaVariantInfo[]) {
      if (v?.path && !pathsToRemove.includes(v.path)) {
        pathsToRemove.push(v.path)
      }
    }
  }

  // 3. Delete from Supabase Storage
  if (pathsToRemove.length > 0) {
    const { error: storageErr } = await supabase.storage
      .from('media')
      .remove(pathsToRemove)

    if (storageErr) {
      console.warn('Storage deletion warning:', storageErr.message)
    }
  }

  // 4. Delete row from Database
  const { error: dbErr } = await supabase
    .from('media')
    .delete()
    .eq('id', mediaId)

  if (dbErr) {
    throw new Error(`فشل حذف سجل الوسائط من قاعدة البيانات: ${dbErr.message}`)
  }
}

/**
 * Bulk moves multiple media items to a target folder
 */
export async function bulkMoveMedia(
  ids: string[],
  targetFolder: MediaFolder,
): Promise<void> {
  if (ids.length === 0) return

  const { error } = await supabase
    .from('media')
    .update({ folder: targetFolder, updated_at: new Date().toISOString() })
    .in('id', ids)

  if (error) {
    throw new Error(`فشل نقل الملفات المحددة: ${error.message}`)
  }
}

/**
 * Bulk deletes multiple media items
 */
export async function bulkDeleteMedia(
  ids: string[],
  bypassUsageCheck = false,
): Promise<{ deletedCount: number; errors: string[] }> {
  let deletedCount = 0
  const errors: string[] = []

  for (const id of ids) {
    try {
      await deleteMedia(id, bypassUsageCheck)
      deletedCount++
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err)
      errors.push(msg)
    }
  }

  return { deletedCount, errors }
}
