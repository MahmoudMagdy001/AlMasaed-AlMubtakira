import { z } from 'zod'
import { supabase } from '../../lib/supabase'
import type { Tables } from '../../types/database.types'

export type CategoryRow = Tables<'categories'> & {
  posts_count?: number
}

export type TagRow = Tables<'tags'> & {
  posts_count?: number
}

export const categoryFormSchema = z.object({
  name_ar: z.string().min(2, 'اسم التصنيف بالعربية مطلوب'),
  name_en: z.string().optional().nullable(),
  slug: z
    .string()
    .min(2, 'الرابط اللطيف مطلوب')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'الرابط اللطيف يجب أن يتكون من حروف إنجليزية صغيرة وأرقام وشرطات فقط'),
  description_ar: z.string().optional().nullable(),
  description_en: z.string().optional().nullable(),
  seo_title: z.string().max(80).optional().nullable(),
  seo_description: z.string().max(200).optional().nullable(),
  sort_order: z.number().int().default(0),
})

export type CategoryFormData = z.infer<typeof categoryFormSchema>

export const tagFormSchema = z.object({
  name_ar: z.string().min(2, 'اسم الوسم بالعربية مطلوب'),
  name_en: z.string().optional().nullable(),
  slug: z
    .string()
    .min(2, 'الرابط اللطيف مطلوب')
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'الرابط اللطيف يجب أن يتكون من حروف إنجليزية صغيرة وأرقام وشرطات فقط'),
})

export type TagFormData = z.infer<typeof tagFormSchema>

// --- Categories CRUD ---

export async function getAdminCategories(): Promise<CategoryRow[]> {
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`فشل تحميل التصنيفات: ${error.message}`)
  }

  // Fetch post counts per category
  const { data: postsCount } = await supabase
    .from('posts')
    .select('category_id')

  const countMap = new Map<string, number>()
  for (const post of postsCount || []) {
    if (post.category_id) {
      countMap.set(post.category_id, (countMap.get(post.category_id) || 0) + 1)
    }
  }

  return (categories || []).map((cat) => ({
    ...cat,
    posts_count: countMap.get(cat.id) || 0,
  }))
}

export async function createCategory(payload: CategoryFormData): Promise<CategoryRow> {
  const parsed = categoryFormSchema.parse(payload)

  const { data, error } = await supabase
    .from('categories')
    .insert({
      name_ar: parsed.name_ar,
      name_en: parsed.name_en || null,
      slug: parsed.slug,
      description_ar: parsed.description_ar || null,
      description_en: parsed.description_en || null,
      seo_title: parsed.seo_title || null,
      seo_description: parsed.seo_description || null,
      sort_order: parsed.sort_order,
    })
    .select()
    .single()

  if (error || !data) {
    throw new Error(`فشل إنشاء التصنيف: ${error?.message || 'خطأ غير معروف'}`)
  }

  return { ...data, posts_count: 0 }
}

export async function updateCategory(
  id: string,
  payload: Partial<CategoryFormData>,
): Promise<CategoryRow> {
  const updateData: {
    name_ar?: string
    name_en?: string | null
    slug?: string
    description_ar?: string | null
    description_en?: string | null
    seo_title?: string | null
    seo_description?: string | null
    sort_order?: number
    updated_at: string
  } = {
    updated_at: new Date().toISOString(),
  }

  if (payload.name_ar !== undefined) updateData.name_ar = payload.name_ar
  if (payload.name_en !== undefined) updateData.name_en = payload.name_en || null
  if (payload.slug !== undefined) updateData.slug = payload.slug
  if (payload.description_ar !== undefined) updateData.description_ar = payload.description_ar || null
  if (payload.description_en !== undefined) updateData.description_en = payload.description_en || null
  if (payload.seo_title !== undefined) updateData.seo_title = payload.seo_title || null
  if (payload.seo_description !== undefined) updateData.seo_description = payload.seo_description || null
  if (payload.sort_order !== undefined) updateData.sort_order = payload.sort_order

  const { data, error } = await supabase
    .from('categories')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    throw new Error(`فشل تحديث التصنيف: ${error?.message || 'خطأ غير معروف'}`)
  }

  return data as CategoryRow
}

export async function deleteCategory(id: string): Promise<void> {
  // Check if posts exist
  const { count, error: countError } = await supabase
    .from('posts')
    .select('id', { count: 'exact', head: true })
    .eq('category_id', id)

  if (countError) {
    throw new Error(`فشل التحقق من ارتباطات التصنيف: ${countError.message}`)
  }

  if (count && count > 0) {
    throw new Error(
      `لا يمكن حذف هذا التصنيف لأنه يحتوي على ${count} مقال مرتبط به. يرجى نقل المقالات إلى تصنيف آخر أولاً.`,
    )
  }

  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) {
    throw new Error(`فشل حذف التصنيف: ${error.message}`)
  }
}

// --- Tags CRUD ---

export async function getAdminTags(): Promise<TagRow[]> {
  const { data: tags, error } = await supabase
    .from('tags')
    .select('*')
    .order('name_ar', { ascending: true })

  if (error) {
    throw new Error(`فشل تحميل الوسوم: ${error.message}`)
  }

  // Count posts per tag from post_tags junction
  const { data: junctions } = await supabase.from('post_tags').select('tag_id')
  const countMap = new Map<string, number>()
  for (const j of junctions || []) {
    countMap.set(j.tag_id, (countMap.get(j.tag_id) || 0) + 1)
  }

  return (tags || []).map((t) => ({
    ...t,
    posts_count: countMap.get(t.id) || 0,
  }))
}

export async function createTag(payload: TagFormData): Promise<TagRow> {
  const parsed = tagFormSchema.parse(payload)

  const { data, error } = await supabase
    .from('tags')
    .insert({
      name_ar: parsed.name_ar,
      name_en: parsed.name_en || null,
      slug: parsed.slug,
    })
    .select()
    .single()

  if (error || !data) {
    throw new Error(`فشل إضافة الوسم: ${error?.message || 'خطأ غير معروف'}`)
  }

  return { ...data, posts_count: 0 }
}

export async function updateTag(id: string, payload: Partial<TagFormData>): Promise<TagRow> {
  const updateData: {
    name_ar?: string
    name_en?: string | null
    slug?: string
  } = {}

  if (payload.name_ar !== undefined) updateData.name_ar = payload.name_ar
  if (payload.name_en !== undefined) updateData.name_en = payload.name_en || null
  if (payload.slug !== undefined) updateData.slug = payload.slug

  const { data, error } = await supabase
    .from('tags')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    throw new Error(`فشل تحديث الوسم: ${error?.message || 'خطأ غير معروف'}`)
  }

  return data as TagRow
}

export async function deleteTag(id: string): Promise<void> {
  // post_tags will cascade or delete references
  await supabase.from('post_tags').delete().eq('tag_id', id)

  const { error } = await supabase.from('tags').delete().eq('id', id)
  if (error) {
    throw new Error(`فشل حذف الوسم: ${error.message}`)
  }
}
