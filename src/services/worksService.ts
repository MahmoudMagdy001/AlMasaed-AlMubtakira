import { supabase } from '@/lib/supabase'
import type { Tables } from '@/types/database.types'
import type { MediaItem } from '@/components/ui'

export type WorkServiceType =
  | 'installation'
  | 'maintenance'
  | 'modernization'
  | 'spare-parts'
  | 'escalators'

export interface WorkWithCover extends Tables<'works'> {
  cover_media?: MediaItem | null
}

export interface WorkDetail extends WorkWithCover {
  gallery_media?: MediaItem[]
}

export interface GetWorksParams {
  serviceType?: string
  limit?: number
  offset?: number
}

export interface GetWorksResult {
  works: WorkWithCover[]
  total: number
}

export async function getPublishedWorks({
  serviceType,
  limit = 12,
  offset = 0,
}: GetWorksParams = {}): Promise<GetWorksResult> {
  try {
    let query = supabase
      .from('works')
      .select(
        `
        id,
        slug,
        title_ar,
        title_en,
        description_ar,
        description_en,
        service_type,
        location_ar,
        location_en,
        completed_year,
        cover_media_id,
        gallery_media_ids,
        seo_title,
        seo_description,
        is_published,
        sort_order,
        created_at,
        updated_at,
        cover_media:cover_media_id (
          id,
          storage_path,
          width,
          height,
          alt_text,
          variants
        )
      `,
        { count: 'exact' },
      )
      .eq('is_published', true)

    if (serviceType && serviceType !== 'all') {
      query = query.eq('service_type', serviceType as WorkServiceType)
    }

    query = query
      .order('sort_order', { ascending: true })
      .order('completed_year', { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })

    if (typeof limit === 'number') {
      query = query.range(offset, offset + limit - 1)
    }

    const { data, count, error } = await query

    if (error) {
      return { works: [], total: 0 }
    }

    const works = (data || []) as unknown as WorkWithCover[]
    if (works.length === 0) {
      const { fallbackWorks } = await import('@/data/seedData')
      let filtered = fallbackWorks
      if (serviceType && serviceType !== 'all') {
        filtered = filtered.filter((w) => w.service_type === serviceType)
      }
      const totalFallback = filtered.length
      if (typeof limit === 'number') {
        filtered = filtered.slice(offset, offset + limit)
      }
      return { works: filtered, total: totalFallback }
    }
    return { works, total: count ?? works.length }
  } catch {
    const { fallbackWorks } = await import('@/data/seedData')
    let filtered = fallbackWorks
    if (serviceType && serviceType !== 'all') {
      filtered = filtered.filter((w) => w.service_type === serviceType)
    }
    const totalFallback = filtered.length
    if (typeof limit === 'number') {
      filtered = filtered.slice(offset, offset + limit)
    }
    return { works: filtered, total: totalFallback }
  }
}

export async function getWorkBySlug(slug: string): Promise<WorkDetail | null> {
  try {
    const { data, error } = await supabase
      .from('works')
      .select(
        `
        id,
        slug,
        title_ar,
        title_en,
        description_ar,
        description_en,
        service_type,
        location_ar,
        location_en,
        completed_year,
        cover_media_id,
        gallery_media_ids,
        seo_title,
        seo_description,
        is_published,
        sort_order,
        created_at,
        updated_at,
        cover_media:cover_media_id (
          id,
          storage_path,
          width,
          height,
          alt_text,
          variants
        )
      `,
      )
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()

    if (error || !data) {
      const { fallbackWorks, fallbackMedia } = await import('@/data/seedData')
      const fallback = fallbackWorks.find((w) => w.slug === slug)
      if (fallback) {
        return {
          ...fallback,
          gallery_media: [fallbackMedia.gallery1, fallbackMedia.gallery2],
        }
      }
      return null
    }

    const work = data as unknown as WorkDetail

    // Fetch gallery media items if any
    if (work.gallery_media_ids && work.gallery_media_ids.length > 0) {
      const { data: galleryData } = await supabase
        .from('media')
        .select('id, storage_path, width, height, alt_text, variants')
        .in('id', work.gallery_media_ids)

      if (galleryData) {
        // preserve order of gallery_media_ids
        const map = new Map(galleryData.map((m) => [m.id, m as unknown as MediaItem]))
        work.gallery_media = work.gallery_media_ids
          .map((id) => map.get(id))
          .filter((m): m is MediaItem => Boolean(m))
      } else {
        work.gallery_media = []
      }
    } else {
      work.gallery_media = []
    }

    return work
  } catch {
    return null
  }
}

export async function getRelatedWorks({
  currentWorkId,
  serviceType,
  limit = 3,
}: {
  currentWorkId: string
  serviceType: string
  limit?: number
}): Promise<WorkWithCover[]> {
  try {
    const { data, error } = await supabase
      .from('works')
      .select(
        `
        id,
        slug,
        title_ar,
        title_en,
        description_ar,
        description_en,
        service_type,
        location_ar,
        location_en,
        completed_year,
        cover_media_id,
        gallery_media_ids,
        seo_title,
        seo_description,
        is_published,
        sort_order,
        created_at,
        updated_at,
        cover_media:cover_media_id (
          id,
          storage_path,
          width,
          height,
          alt_text,
          variants
        )
      `,
      )
      .eq('is_published', true)
      .eq('service_type', serviceType as WorkServiceType)
      .neq('id', currentWorkId)
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error || !data || data.length === 0) {
      const { fallbackWorks } = await import('@/data/seedData')
      return fallbackWorks
        .filter(
          (w) =>
            w.id !== currentWorkId &&
            (!serviceType || w.service_type === serviceType),
        )
        .slice(0, limit)
    }

    return data as unknown as WorkWithCover[]
  } catch {
    const { fallbackWorks } = await import('@/data/seedData')
    return fallbackWorks
      .filter(
        (w) =>
          w.id !== currentWorkId &&
          (!serviceType || w.service_type === serviceType),
      )
      .slice(0, limit)
  }
}
