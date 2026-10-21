import { supabase } from '@/lib/supabase'
import type { Tables } from '@/types/database.types'
import type { MediaItem } from '@/components/ui'

export interface PartnerWithLogo extends Tables<'partners'> {
  logo_media?: MediaItem | null
}

export async function getPublishedPartners(): Promise<PartnerWithLogo[]> {
  try {
    const { data, error } = await supabase
      .from('partners')
      .select(
        `
        id,
        name_ar,
        name_en,
        logo_media_id,
        website_url,
        sort_order,
        is_published,
        created_at,
        updated_at,
        logo_media:logo_media_id (
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
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: true })

    if (error || !data || data.length === 0) {
      const { fallbackPartners } = await import('@/data/seedData')
      return fallbackPartners
    }

    return data as unknown as PartnerWithLogo[]
  } catch {
    const { fallbackPartners } = await import('@/data/seedData')
    return fallbackPartners
  }
}
