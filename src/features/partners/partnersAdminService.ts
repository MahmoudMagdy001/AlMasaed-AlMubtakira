import { z } from 'zod'
import { supabase } from '@/lib/supabase'
import type { Tables } from '@/types/database.types'
import type { MediaItem } from '@/components/ui'
import { requestRebuild } from '@/lib/rebuild'

export const partnerFormSchema = z.object({
  name_ar: z.string().min(2, 'اسم الشريك بالعربية مطلوب (على الأقل حرفين)'),
  name_en: z.string().optional().nullable(),
  logo_media_id: z.string().uuid('معرّف الشعار غير صحيح').optional().nullable(),
  website_url: z
    .string()
    .url('رابط الموقع الإلكتروني غير صحيح (يجب أن يبدأ بـ https:// أو http://)')
    .or(z.literal(''))
    .optional()
    .nullable(),
  sort_order: z.number().int().default(0),
  is_published: z.boolean().default(true),
})

export type PartnerFormData = z.infer<typeof partnerFormSchema>

export interface AdminPartnerRow extends Tables<'partners'> {
  logo_media?: MediaItem | null
}

export async function getAdminPartners(): Promise<AdminPartnerRow[]> {
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
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`فشل تحميل قائمة الشركاء: ${error.message}`)
  }

  return (data || []) as unknown as AdminPartnerRow[]
}

export async function createPartner(payload: PartnerFormData): Promise<AdminPartnerRow> {
  const parsed = partnerFormSchema.parse(payload)

  let sortOrder = parsed.sort_order
  if (sortOrder === 0) {
    const { data: maxRow } = await supabase
      .from('partners')
      .select('sort_order')
      .order('sort_order', { ascending: false })
      .limit(1)
      .maybeSingle()

    sortOrder = (maxRow?.sort_order ?? 0) + 1
  }

  const { data, error } = await supabase
    .from('partners')
    .insert({
      name_ar: parsed.name_ar,
      name_en: parsed.name_en || null,
      logo_media_id: parsed.logo_media_id || null,
      website_url: parsed.website_url || null,
      sort_order: sortOrder,
      is_published: parsed.is_published,
    })
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
      updated_at
    `,
    )
    .single()

  if (error || !data) {
    throw new Error(`فشل إضافة الشريك: ${error?.message || 'خطأ غير معروف'}`)
  }

  if (parsed.is_published) {
    await requestRebuild('create-partner')
  }

  return data as unknown as AdminPartnerRow
}

export async function updatePartner(
  id: string,
  payload: Partial<PartnerFormData>,
): Promise<AdminPartnerRow> {
  const { data: current } = await supabase
    .from('partners')
    .select('id, is_published')
    .eq('id', id)
    .single()

  const updateData: {
    name_ar?: string
    name_en?: string | null
    logo_media_id?: string | null
    website_url?: string | null
    sort_order?: number
    is_published?: boolean
    updated_at: string
  } = {
    updated_at: new Date().toISOString(),
  }

  if (payload.name_ar !== undefined) updateData.name_ar = payload.name_ar
  if (payload.name_en !== undefined) updateData.name_en = payload.name_en || null
  if (payload.logo_media_id !== undefined) updateData.logo_media_id = payload.logo_media_id || null
  if (payload.website_url !== undefined) updateData.website_url = payload.website_url || null
  if (payload.sort_order !== undefined) updateData.sort_order = payload.sort_order
  if (payload.is_published !== undefined) updateData.is_published = payload.is_published

  const { data, error } = await supabase
    .from('partners')
    .update(updateData)
    .eq('id', id)
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
      updated_at
    `,
    )
    .single()

  if (error || !data) {
    throw new Error(`فشل تحديث بيانات الشريك: ${error?.message || 'خطأ غير معروف'}`)
  }

  if (current?.is_published || payload.is_published) {
    await requestRebuild('update-partner')
  }

  return data as unknown as AdminPartnerRow
}

export async function togglePartnerPublish(id: string, is_published: boolean): Promise<void> {
  const { error } = await supabase
    .from('partners')
    .update({ is_published, updated_at: new Date().toISOString() })
    .eq('id', id)

  if (error) {
    throw new Error(`فشل تعديل حالة ظهور الشريك: ${error.message}`)
  }

  await requestRebuild('toggle-partner-publish')
}

export async function reorderPartners(orderedIds: string[]): Promise<void> {
  const updates = orderedIds.map((id, index) =>
    supabase
      .from('partners')
      .update({ sort_order: index + 1, updated_at: new Date().toISOString() })
      .eq('id', id),
  )

  const results = await Promise.all(updates)
  const failed = results.find((r) => r.error)
  if (failed?.error) {
    throw new Error(`فشل تحديث ترتيب الشركاء: ${failed.error.message}`)
  }

  await requestRebuild('reorder-partners')
}

export async function deletePartner(id: string): Promise<void> {
  const { data: current } = await supabase
    .from('partners')
    .select('is_published')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('partners').delete().eq('id', id)

  if (error) {
    throw new Error(`فشل حذف الشريك: ${error.message}`)
  }

  if (current?.is_published) {
    await requestRebuild('delete-partner')
  }
}
