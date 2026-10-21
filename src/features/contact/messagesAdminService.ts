import { supabase } from '@/lib/supabase'
import type { Tables } from '@/types/database.types'

export type SubmissionStatus = 'new' | 'contacted' | 'closed' | 'spam'

export type ContactSubmissionRow = Tables<'contact_submissions'>

export const STATUS_LABELS: Record<SubmissionStatus, { ar: string; color: string }> = {
  new: { ar: 'جديد', color: 'bg-brand-50 text-brand-700 border-brand-200' },
  contacted: { ar: 'تم التواصل', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  closed: { ar: 'مغلق ومكتمل', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  spam: { ar: 'بريد عشوائي', color: 'bg-rose-50 text-rose-700 border-rose-200' },
}

export interface GetMessagesParams {
  status?: SubmissionStatus | 'all'
  search?: string
  page?: number
  limit?: number
}

export async function getAdminMessages(
  params: GetMessagesParams = {},
): Promise<{ messages: ContactSubmissionRow[]; total: number }> {
  const { status = 'all', search, page = 1, limit = 20 } = params

  let query = supabase.from('contact_submissions').select('*', { count: 'exact' })

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  if (search) {
    const s = `%${search.trim()}%`
    query = query.or(`name.ilike.${s},phone.ilike.${s},email.ilike.${s},message.ilike.${s}`)
  }

  const offset = (page - 1) * limit
  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  const { data, count, error } = await query

  if (error) {
    throw new Error(`فشل تحميل الرسائل: ${error.message}`)
  }

  return {
    messages: (data || []) as ContactSubmissionRow[],
    total: count ?? 0,
  }
}

export async function getUnreadMessagesCount(): Promise<number> {
  const { count, error } = await supabase
    .from('contact_submissions')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'new')

  if (error) {
    return 0
  }

  return count ?? 0
}

export async function updateMessageStatus(
  id: string,
  status: SubmissionStatus,
): Promise<ContactSubmissionRow> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ status })
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    throw new Error(`فشل تعديل حالة الرسالة: ${error?.message || 'خطأ غير معروف'}`)
  }

  return data as ContactSubmissionRow
}

export async function updateMessageNotes(
  id: string,
  notes: string,
): Promise<ContactSubmissionRow> {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ notes })
    .eq('id', id)
    .select()
    .single()

  if (error || !data) {
    throw new Error(`فشل حفظ الملاحظات: ${error?.message || 'خطأ غير معروف'}`)
  }

  return data as ContactSubmissionRow
}

export async function deleteMessage(id: string): Promise<void> {
  const { error } = await supabase.from('contact_submissions').delete().eq('id', id)

  if (error) {
    throw new Error(`فشل حذف الرسالة: ${error.message}`)
  }
}

/**
 * Normalizes phone number for WhatsApp link (E.164 without plus or spaces).
 */
export function formatWhatsAppUrl(phone: string): string {
  // Strip non-digits
  let digits = phone.replace(/\D/g, '')
  // If Saudi local format starting with 05..., replace leading 0 with 966
  if (digits.startsWith('05')) {
    digits = '966' + digits.slice(1)
  } else if (digits.startsWith('5') && digits.length === 9) {
    digits = '966' + digits
  }
  return `https://wa.me/${digits}`
}

/**
 * Normalizes phone for tel: link.
 */
export function formatTelUrl(phone: string): string {
  return `tel:${phone.replace(/\s+/g, '')}`
}

/**
 * Exports submissions to CSV with UTF-8 BOM so Arabic text opens cleanly in Microsoft Excel.
 */
export function exportSubmissionsToCsv(submissions: ContactSubmissionRow[]): void {
  const headers = [
    'معرف الرسالة',
    'تاريخ الإرسال',
    'الاسم الكامل',
    'رقم الجوال',
    'البريد الإلكتروني',
    'نوع الخدمة المطلوبة',
    'نص الرسالة',
    'الحالة',
    'صفحة المصدر',
    'ملاحظات الإدارة',
  ]

  const escapeCsv = (val: string | null | undefined): string => {
    if (val === null || val === undefined) return '""'
    const str = String(val).replace(/"/g, '""')
    return `"${str}"`
  }

  const rows = submissions.map((sub) => [
    escapeCsv(sub.id),
    escapeCsv(new Date(sub.created_at).toLocaleString('ar-SA')),
    escapeCsv(sub.name),
    escapeCsv(sub.phone),
    escapeCsv(sub.email || ''),
    escapeCsv(sub.service_interest || ''),
    escapeCsv(sub.message),
    escapeCsv(STATUS_LABELS[sub.status]?.ar || sub.status),
    escapeCsv(sub.source_page || ''),
    escapeCsv(sub.notes || ''),
  ])

  const csvContent =
    '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\r\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `contact-submissions-${new Date().toISOString().slice(0, 10)}.csv`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
