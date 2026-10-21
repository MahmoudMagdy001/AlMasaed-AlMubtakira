import React, { useState } from 'react'
import {
  Inbox,
  Search,
  Download,
  Phone,
  MessageCircle,
  Mail,
  Trash2,
  Eye,
  FileText,
  Clock,
  Globe,
  Save,
} from 'lucide-react'
import { PageHeader, ConfirmDialog } from '@/components/admin'
import { Button, Dialog, useToast } from '@/components/ui'
import {
  useAdminMessages,
  useUnreadMessagesCount,
  useUpdateMessageStatus,
  useUpdateMessageNotes,
  useDeleteMessage,
} from '@/features/contact/useAdminMessages'
import {
  STATUS_LABELS,
  formatTelUrl,
  formatWhatsAppUrl,
  exportSubmissionsToCsv,
  type ContactSubmissionRow,
  type SubmissionStatus,
} from '@/features/contact/messagesAdminService'

export const MessagesPage: React.FC = () => {
  const { success, error: toastError } = useToast()

  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'all'>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  // Dialogs state
  const [viewingMessage, setViewingMessage] = useState<ContactSubmissionRow | null>(null)
  const [deletingMessage, setDeletingMessage] = useState<ContactSubmissionRow | null>(null)
  const [notesText, setNotesText] = useState('')

  const { data, isLoading } = useAdminMessages({
    status: statusFilter,
    search: search || undefined,
    page,
    limit: 20,
  })

  const { data: unreadCount = 0 } = useUnreadMessagesCount()
  const statusMutation = useUpdateMessageStatus()
  const notesMutation = useUpdateMessageNotes()
  const deleteMutation = useDeleteMessage()

  const messages = data?.messages || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / 20) || 1

  const handleOpenDetails = (msg: ContactSubmissionRow) => {
    setViewingMessage(msg)
    setNotesText(msg.notes || '')
  }

  const handleStatusChange = async (msg: ContactSubmissionRow, newStatus: SubmissionStatus) => {
    try {
      await statusMutation.mutateAsync({ id: msg.id, status: newStatus })
      success('تم تحديث حالة الرسالة بنجاح')
      if (viewingMessage && viewingMessage.id === msg.id) {
        setViewingMessage({ ...viewingMessage, status: newStatus })
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل تعديل الحالة', errorMsg)
    }
  }

  const handleSaveNotes = async () => {
    if (!viewingMessage) return
    try {
      await notesMutation.mutateAsync({ id: viewingMessage.id, notes: notesText })
      success('تم حفظ الملاحظات بنجاح')
      setViewingMessage({ ...viewingMessage, notes: notesText })
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حفظ الملاحظات', errorMsg)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingMessage) return
    try {
      await deleteMutation.mutateAsync(deletingMessage.id)
      success('تم حذف الرسالة بنجاح')
      setDeletingMessage(null)
      if (viewingMessage && viewingMessage.id === deletingMessage.id) {
        setViewingMessage(null)
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حذف الرسالة', errorMsg)
    }
  }

  const handleExportCsv = () => {
    if (messages.length === 0) {
      toastError('لا توجد رسائل لتصديرها')
      return
    }
    exportSubmissionsToCsv(messages)
    success('تم تصدير ملف الرسائل (CSV) بنجاح')
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="طلبات الأسعار والرسائل"
        description="متابعة استفسارات العملاء وطلبات عروض أسعار صيانة وتركيب وتحديث المصاعد."
        backTo="/admin"
        backLabel="الرئيسية"
        actions={
          <Button
            variant="secondary"
            size="sm"
            onClick={handleExportCsv}
            disabled={messages.length === 0}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            <span>تصدير CSV</span>
          </Button>
        }
      />

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-card border border-surface-border shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Status filter tabs */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <button
            type="button"
            onClick={() => {
              setStatusFilter('all')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${
              statusFilter === 'all'
                ? 'bg-brand-600 text-white'
                : 'text-content-body hover:bg-surface-soft'
            }`}
          >
            الكل ({total})
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('new')
              setPage(1)
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${
              statusFilter === 'new'
                ? 'bg-brand-600 text-white'
                : 'text-content-body hover:bg-surface-soft'
            }`}
          >
            <span>جديد</span>
            {unreadCount > 0 && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                  statusFilter === 'new'
                    ? 'bg-white text-brand-600'
                    : 'bg-brand-100 text-brand-700'
                }`}
              >
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('contacted')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${
              statusFilter === 'contacted'
                ? 'bg-brand-600 text-white'
                : 'text-content-body hover:bg-surface-soft'
            }`}
          >
            تم التواصل
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('closed')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${
              statusFilter === 'closed'
                ? 'bg-brand-600 text-white'
                : 'text-content-body hover:bg-surface-soft'
            }`}
          >
            مغلق
          </button>

          <button
            type="button"
            onClick={() => {
              setStatusFilter('spam')
              setPage(1)
            }}
            className={`px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${
              statusFilter === 'spam'
                ? 'bg-brand-600 text-white'
                : 'text-content-body hover:bg-surface-soft'
            }`}
          >
            بريد عشوائي
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-content-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="البحث بالاسم أو الجوال أو البريد..."
            className="w-full ps-9 pe-4 py-2 text-xs border border-surface-border rounded-control focus:outline-none focus:border-brand-600 bg-surface-soft/40"
          />
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-white rounded-card border border-surface-border overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-12 text-center text-content-muted text-sm">
            جاري تحميل الرسائل والطلبات...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Inbox className="w-10 h-10 text-content-muted mx-auto" />
            <p className="text-sm font-bold text-content-heading">لا توجد رسائل مطابقة</p>
            <p className="text-xs text-content-muted max-w-sm mx-auto">
              لم تصل أي رسائل جديدة بعد ضمن هذا القسم. ستظهر هنا استفسارات وطلبات عروض الأسعار المقدمة عبر نماذج التواصل.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="bg-surface-soft border-b border-surface-border text-content-muted font-bold text-start">
                  <th className="py-3 px-4 w-28">التاريخ</th>
                  <th className="py-3 px-4">العميل</th>
                  <th className="py-3 px-4">التواصل السريع</th>
                  <th className="py-3 px-4">الخدمة</th>
                  <th className="py-3 px-4 max-w-xs">نص الرسالة</th>
                  <th className="py-3 px-4 text-center">الحالة</th>
                  <th className="py-3 px-4 text-end">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {messages.map((msg) => (
                  <tr
                    key={msg.id}
                    className={`hover:bg-surface-soft/40 transition-colors ${
                      msg.status === 'new' ? 'bg-brand-50/20 font-semibold' : ''
                    }`}
                  >
                    {/* Date */}
                    <td className="py-3 px-4 whitespace-nowrap text-content-muted text-[11px]">
                      {new Date(msg.created_at).toLocaleDateString('ar-SA', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                      <span className="block text-[10px] text-content-muted/80">
                        {new Date(msg.created_at).toLocaleTimeString('ar-SA', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>

                    {/* Sender */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-bold text-content-heading block text-xs">
                        {msg.name}
                      </span>
                      {msg.email && (
                        <span className="text-[11px] text-content-muted block" dir="ltr">
                          {msg.email}
                        </span>
                      )}
                    </td>

                    {/* Quick Contacts: Call & WhatsApp */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <a
                          href={formatTelUrl(msg.phone)}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-control bg-surface-soft hover:bg-brand-50 hover:text-brand-600 text-content-heading transition-colors border border-surface-border"
                          title="اتصال هاتفي مباشر"
                        >
                          <Phone className="w-3 h-3 text-brand-600" />
                          <span dir="ltr" className="text-[11px] font-mono">
                            {msg.phone}
                          </span>
                        </a>

                        <a
                          href={formatWhatsAppUrl(msg.phone)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-control bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200"
                          title="محادثة واتساب"
                          aria-label="واتساب"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-soft text-content-heading border border-surface-border">
                        {msg.service_interest || 'استفسار عام'}
                      </span>
                    </td>

                    {/* Message Excerpt */}
                    <td className="py-3 px-4 max-w-xs">
                      <p
                        onClick={() => handleOpenDetails(msg)}
                        className="truncate text-content-body hover:text-brand-600 cursor-pointer text-xs"
                        title={msg.message}
                      >
                        {msg.message}
                      </p>
                    </td>

                    {/* Status Select */}
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <select
                        value={msg.status}
                        onChange={(e) =>
                          handleStatusChange(msg, e.target.value as SubmissionStatus)
                        }
                        aria-label="تغيير حالة الرسالة"
                        className={`text-[11px] font-bold rounded-full px-2.5 py-1 border focus:outline-none cursor-pointer ${
                          STATUS_LABELS[msg.status]?.color || ''
                        }`}
                      >
                        <option value="new">جديد</option>
                        <option value="contacted">تم التواصل</option>
                        <option value="closed">مغلق ومكتمل</option>
                        <option value="spam">بريد عشوائي</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-end whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenDetails(msg)}
                          className="p-1.5 rounded-control text-content-muted hover:text-brand-600 hover:bg-surface-soft transition-colors"
                          title="عرض التفاصيل والملاحظات"
                          aria-label="عرض التفاصيل"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingMessage(msg)}
                          className="p-1.5 rounded-control text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 transition-colors"
                          title="حذف الرسالة"
                          aria-label="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-surface-border flex items-center justify-between text-xs text-content-muted">
            <span>
              إجمالي الرسائل: <strong>{total}</strong> (صفحة {page} من {totalPages})
            </span>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
              >
                السابق
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
              >
                التالي
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Message Details & Internal Notes Dialog */}
      <Dialog
        isOpen={Boolean(viewingMessage)}
        onClose={() => setViewingMessage(null)}
        title="تفاصيل طلب التواصل"
        maxWidth="lg"
      >
        {viewingMessage && (
          <div className="space-y-6">
            {/* Header Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-control bg-surface-soft border border-surface-border text-xs">
              <div className="space-y-1">
                <span className="text-[11px] text-content-muted block">اسم العميل:</span>
                <span className="font-bold text-content-heading text-sm">
                  {viewingMessage.name}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-content-muted block">تاريخ الإرسال:</span>
                <span className="text-content-heading flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5 text-content-muted" />
                  {new Date(viewingMessage.created_at).toLocaleString('ar-SA')}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-content-muted block">نوع الخدمة المطلوبة:</span>
                <span className="font-bold text-brand-600">
                  {viewingMessage.service_interest || 'استفسار عام'}
                </span>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-content-muted block">صفحة المصدر:</span>
                <span className="text-content-heading flex items-center gap-1.5" dir="ltr">
                  <Globe className="w-3.5 h-3.5 text-content-muted" />
                  {viewingMessage.source_page || '/contact'}
                </span>
              </div>
            </div>

            {/* Quick Contact Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={formatTelUrl(viewingMessage.phone)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-control bg-brand-50 text-brand-700 hover:bg-brand-100 text-xs font-bold transition-colors border border-brand-200"
              >
                <Phone className="w-4 h-4" />
                <span>اتصال هاتفياً ({viewingMessage.phone})</span>
              </a>

              <a
                href={formatWhatsAppUrl(viewingMessage.phone)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-control bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4" />
                <span>محادثة واتساب</span>
              </a>

              {viewingMessage.email && (
                <a
                  href={`mailto:${viewingMessage.email}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-control bg-surface-soft text-content-heading hover:bg-surface-border/60 text-xs font-bold transition-colors border border-surface-border"
                >
                  <Mail className="w-4 h-4" />
                  <span>إرسال بريد إلكتروني</span>
                </a>
              )}
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-content-heading block">
                نص الرسالة أو تفاصيل الطلب:
              </span>
              <div className="p-4 rounded-control bg-white border border-surface-border text-xs text-content-body leading-relaxed whitespace-pre-wrap select-text">
                {viewingMessage.message}
              </div>
            </div>

            {/* Internal Notes Section */}
            <div className="space-y-2 pt-2 border-t border-surface-border">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-content-heading flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-brand-600" />
                  <span>ملاحظات فريق العمل الداخلية (غير مرئية للعميل)</span>
                </span>
                <span className="text-[11px] text-content-muted">
                  سجل ملخص المكالمة أو عروض الأسعار المقدمة
                </span>
              </div>

              <textarea
                rows={3}
                value={notesText}
                onChange={(e) => setNotesText(e.target.value)}
                placeholder="أدخل ملاحظات المتابعة هنا..."
                className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
              />

              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleSaveNotes}
                  isLoading={notesMutation.isPending}
                  className="gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>حفظ الملاحظات</span>
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-surface-border">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-content-muted">الحالة:</span>
                <select
                  value={viewingMessage.status}
                  onChange={(e) =>
                    handleStatusChange(viewingMessage, e.target.value as SubmissionStatus)
                  }
                  aria-label="تغيير حالة الرسالة"
                  className="text-xs border border-surface-border rounded-control py-1 px-2.5 bg-white text-content-heading"
                >
                  <option value="new">جديد</option>
                  <option value="contacted">تم التواصل</option>
                  <option value="closed">مغلق ومكتمل</option>
                  <option value="spam">بريد عشوائي</option>
                </select>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setViewingMessage(null)}
              >
                إغلاق
              </Button>
            </div>
          </div>
        )}
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingMessage)}
        onClose={() => setDeletingMessage(null)}
        onConfirm={handleDeleteConfirm}
        title="تأكيد حذف الرسالة"
        description={`هل أنت متأكد من رغبتك في حذف رسالة العميل "${deletingMessage?.name}" نهائياً من قاعدة البيانات؟`}
        confirmText="حذف الرسالة"
        cancelText="إلغاء"
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
