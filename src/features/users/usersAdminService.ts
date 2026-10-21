import { supabase } from '@/lib/supabase'
import type { Tables } from '@/types/database.types'

export type UserProfileRow = Tables<'profiles'>
export type UserRole = 'admin' | 'editor' | 'none'

export const ROLE_LABELS: Record<UserRole, { ar: string; description: string }> = {
  admin: {
    ar: 'مسؤول نظام (Admin)',
    description: 'صلاحيات كاملة تشمل إدارة المستخدمين، وتعديل إعدادات الموقع، والنشر، وحذف السجلات.',
  },
  editor: {
    ar: 'محرّر محتوى (Editor)',
    description: 'صلاحيات إدارة المقالات، والمشاريع، والشركاء، ومكتبة الوسائط، والرد على الرسائل.',
  },
  none: {
    ar: 'معطّل (None)',
    description: 'حساب مسجل ولكن ليس لديه أي صلاحية وصول إلى لوحة الإدارة.',
  },
}

export async function getAdminProfiles(): Promise<UserProfileRow[]> {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, role, created_at')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(`فشل تحميل قائمة المستخدمين: ${error.message}`)
  }

  return (data || []) as UserProfileRow[]
}

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<UserProfileRow> {
  const { data, error } = await supabase
    .from('profiles')
    .update({ role })
    .eq('id', userId)
    .select()
    .single()

  if (error || !data) {
    throw new Error(`فشل تحديث صلاحية المستخدم: ${error?.message || 'خطأ غير معروف'}`)
  }

  return data as UserProfileRow
}
