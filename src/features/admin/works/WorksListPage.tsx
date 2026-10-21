import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Briefcase,
  CheckCircle,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react'
import {
  PageHeader,
  ConfirmDialog,
} from '@/components/admin'
import { Button, useToast } from '@/components/ui'
import {
  useAdminWorks,
  useToggleWorkPublish,
  useReorderWorks,
  useDeleteWork,
} from '@/features/works/useAdminWorks'
import {
  SERVICE_TYPE_OPTIONS,
  type AdminWorkRow,
  type WorkServiceType,
} from '@/features/works/worksAdminService'
import { getStoragePublicUrl } from '@/lib/media'
import { REBUILD_NOTICE } from '@/lib/rebuild'

export const WorksListPage: React.FC = () => {
  const { success, error: toastError } = useToast()
  const [search, setSearch] = useState('')
  const [serviceFilter, setServiceFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all')
  const [page, setPage] = useState(1)

  // Modals state
  const [deletingWork, setDeletingWork] = useState<AdminWorkRow | null>(null)

  const { data, isLoading } = useAdminWorks({
    search: search || undefined,
    serviceType: serviceFilter,
    status: statusFilter,
    page,
    limit: 20,
  })

  const togglePublishMutation = useToggleWorkPublish()
  const reorderMutation = useReorderWorks()
  const deleteMutation = useDeleteWork()

  const works = data?.works || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / 20) || 1

  const handleTogglePublish = async (work: AdminWorkRow) => {
    try {
      await togglePublishMutation.mutateAsync({
        id: work.id,
        is_published: !work.is_published,
      })
      success(
        !work.is_published ? 'تم نشر المشروع بنجاح' : 'تم إلغاء نشر المشروع',
        REBUILD_NOTICE,
      )
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل تغيير حالة النشر', msg)
    }
  }

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= works.length) return

    const newOrder = [...works]
    const temp = newOrder[index]
    newOrder[index] = newOrder[targetIndex]
    newOrder[targetIndex] = temp

    const orderedIds = newOrder.map((w) => w.id)

    try {
      await reorderMutation.mutateAsync(orderedIds)
      success('تم تحديث ترتيب المشاريع', REBUILD_NOTICE)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل تحديث الترتيب', msg)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingWork) return
    try {
      await deleteMutation.mutateAsync(deletingWork.id)
      success('تم حذف المشروع بنجاح', deletingWork.is_published ? REBUILD_NOTICE : undefined)
      setDeletingWork(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حذف المشروع', msg)
    }
  }

  const getServiceLabel = (type: WorkServiceType) => {
    const option = SERVICE_TYPE_OPTIONS.find((o) => o.value === type)
    return option?.labelAr || type
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="المشاريع وسابقة الأعمال"
        description="إدارة وتوثيق مشاريع المصاعد المنجزة والتحكم في ظهورها وترتيبها على الموقع."
        backTo="/admin"
        backLabel="الرئيسية"
        actions={
          <Link to="/admin/works/new">
            <Button variant="primary" size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              <span>مشروع جديد</span>
            </Button>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-card border border-surface-border shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-content-muted" />
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            placeholder="البحث بالاسم أو المدينة أو الرابط..."
            className="w-full ps-9 pe-4 py-2 text-xs border border-surface-border rounded-control focus:outline-none focus:border-brand-600 bg-surface-soft/40"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Service filter */}
          <select
            value={serviceFilter}
            onChange={(e) => {
              setServiceFilter(e.target.value)
              setPage(1)
            }}
            aria-label="تصفية حسب نوع الخدمة"
            className="text-xs border border-surface-border rounded-control py-2 px-3 bg-white text-content-heading focus:outline-none focus:border-brand-600"
          >
            <option value="all">كل الخدمات</option>
            {SERVICE_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.labelAr}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value as 'all' | 'published' | 'draft')
              setPage(1)
            }}
            aria-label="تصفية حسب حالة النشر"
            className="text-xs border border-surface-border rounded-control py-2 px-3 bg-white text-content-heading focus:outline-none focus:border-brand-600"
          >
            <option value="all">كل الحالات ({total})</option>
            <option value="published">منشور فقط</option>
            <option value="draft">مسودة فقط</option>
          </select>
        </div>
      </div>

      {/* Table view */}
      <div className="bg-white rounded-card border border-surface-border overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-12 text-center text-content-muted text-sm">
            جاري تحميل قائمة المشاريع...
          </div>
        ) : works.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Briefcase className="w-10 h-10 text-content-muted mx-auto" />
            <p className="text-sm font-bold text-content-heading">لا توجد مشاريع مطابقة</p>
            <p className="text-xs text-content-muted max-w-sm mx-auto">
              لم يتم العثور على أي مشروع مطابق لمعايير البحث الحالية. يمكنك إضافة مشروع جديد للبدء.
            </p>
            <div className="pt-2">
              <Link to="/admin/works/new">
                <Button variant="primary" size="sm" className="gap-2">
                  <Plus className="w-4 h-4" />
                  <span>إضافة أول مشروع</span>
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="bg-surface-soft border-b border-surface-border text-content-muted font-bold text-start">
                  <th className="py-3 px-4 w-12 text-center">الترتيب</th>
                  <th className="py-3 px-4 w-16">الغلاف</th>
                  <th className="py-3 px-4">اسم المشروع</th>
                  <th className="py-3 px-4">الخدمة</th>
                  <th className="py-3 px-4">الموقع والسنة</th>
                  <th className="py-3 px-4 text-center">الحالة</th>
                  <th className="py-3 px-4 text-center">تاريخ الإضافة</th>
                  <th className="py-3 px-4 text-end">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {works.map((work, index) => {
                  const coverUrl = work.cover_media?.storage_path
                    ? getStoragePublicUrl(work.cover_media.storage_path)
                    : null

                  return (
                    <tr
                      key={work.id}
                      className="hover:bg-surface-soft/40 transition-colors"
                    >
                      {/* Sort Order buttons */}
                      <td className="py-3 px-2 text-center">
                        <div className="inline-flex flex-col items-center">
                          <button
                            type="button"
                            onClick={() => handleMove(index, 'up')}
                            disabled={index === 0 || reorderMutation.isPending}
                            className="p-1 text-content-muted hover:text-brand-600 disabled:opacity-20 transition-colors"
                            title="تحريك لأعلى"
                            aria-label="تحريك لأعلى"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-[10px] font-bold text-content-muted">
                            {work.sort_order}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleMove(index, 'down')}
                            disabled={index === works.length - 1 || reorderMutation.isPending}
                            className="p-1 text-content-muted hover:text-brand-600 disabled:opacity-20 transition-colors"
                            title="تحريك لأسفل"
                            aria-label="تحريك لأسفل"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Cover thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-12 h-12 rounded-control bg-surface-soft border border-surface-border overflow-hidden flex items-center justify-center shrink-0">
                          {coverUrl ? (
                            <img
                              src={coverUrl}
                              alt={work.cover_media?.alt_text || work.title_ar}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-content-muted" />
                          )}
                        </div>
                      </td>

                      {/* Title & Slug */}
                      <td className="py-3 px-4 min-w-[200px]">
                        <Link
                          to={`/admin/works/${work.id}`}
                          className="font-bold text-content-heading hover:text-brand-600 transition-colors block text-xs"
                        >
                          {work.title_ar}
                        </Link>
                        {work.title_en && (
                          <span className="text-[11px] text-content-muted block mt-0.5">
                            {work.title_en}
                          </span>
                        )}
                        <span className="text-[10px] font-mono text-content-muted bg-surface-soft px-1.5 py-0.5 rounded-sm inline-block mt-1">
                          /{work.slug}
                        </span>
                      </td>

                      {/* Service */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-brand-50 text-brand-700 border border-brand-200">
                          {getServiceLabel(work.service_type)}
                        </span>
                      </td>

                      {/* Location & Year */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <p className="text-content-heading font-medium">
                          {work.location_ar || '—'}
                        </p>
                        <p className="text-[11px] text-content-muted">
                          {work.completed_year ? `عام ${work.completed_year}` : 'غير محدد'}
                        </p>
                      </td>

                      {/* Publish Toggle */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(work)}
                          disabled={togglePublishMutation.isPending}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                            work.is_published
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-surface-soft text-content-muted border-surface-border hover:bg-surface-border/60'
                          }`}
                        >
                          {work.is_published ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>منشور</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-content-muted" />
                              <span>مسودة</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-center whitespace-nowrap text-content-muted text-[11px]">
                        {new Date(work.created_at).toLocaleDateString('ar-SA')}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-end whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          {work.is_published && (
                            <Link
                              to={`/works/${work.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-control text-content-muted hover:text-brand-600 hover:bg-surface-soft transition-colors"
                              title="معاينة الصفحة العامة"
                              aria-label="معاينة"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                          )}

                          <Link
                            to={`/admin/works/${work.id}`}
                            className="p-1.5 rounded-control text-content-muted hover:text-brand-600 hover:bg-surface-soft transition-colors"
                            title="تعديل المشروع"
                            aria-label="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setDeletingWork(work)}
                            className="p-1.5 rounded-control text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 transition-colors"
                            title="حذف المشروع"
                            aria-label="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination footer */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-surface-border flex items-center justify-between text-xs text-content-muted">
            <span>
              إجمالي المشاريع: <strong>{total}</strong> (صفحة {page} من {totalPages})
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

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(deletingWork)}
        onClose={() => setDeletingWork(null)}
        onConfirm={handleDeleteConfirm}
        title="تأكيد حذف المشروع"
        description={`هل أنت متأكد من رغبتك في حذف المشروع "${deletingWork?.title_ar}" نهائياً؟ لن يتم حذف الصور المرتبطة به من مكتبة الوسائط.`}
        confirmText="حذف المشروع"
        cancelText="إلغاء"
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
