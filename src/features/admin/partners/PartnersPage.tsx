import React, { useState } from 'react'
import {
  Plus,
  ExternalLink,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Handshake,
  CheckCircle,
  EyeOff,
  Image as ImageIcon,
} from 'lucide-react'
import {
  PageHeader,
  ConfirmDialog,
  FormField,
  MediaPicker,
} from '@/components/admin'
import { Button, Dialog, useToast } from '@/components/ui'
import {
  useAdminPartners,
  useCreatePartner,
  useUpdatePartner,
  useTogglePartnerPublish,
  useReorderPartners,
  useDeletePartner,
} from '@/features/partners/useAdminPartners'
import {
  partnerFormSchema,
  type AdminPartnerRow,
  type PartnerFormData,
} from '@/features/partners/partnersAdminService'
import type { MediaRow } from '@/features/media/types'
import { getStoragePublicUrl } from '@/lib/media'
import { REBUILD_NOTICE } from '@/lib/rebuild'

export const PartnersPage: React.FC = () => {
  const { success, error: toastError } = useToast()

  const { data: partners = [], isLoading } = useAdminPartners()
  const createMutation = useCreatePartner()
  const updateMutation = useUpdatePartner()
  const togglePublishMutation = useTogglePartnerPublish()
  const reorderMutation = useReorderPartners()
  const deleteMutation = useDeletePartner()

  // Modal / Form state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingPartner, setEditingPartner] = useState<AdminPartnerRow | null>(null)
  const [deletingPartner, setDeletingPartner] = useState<AdminPartnerRow | null>(null)

  // Form Fields
  const [nameAr, setNameAr] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [logoMediaId, setLogoMediaId] = useState<string | null>(null)
  const [logoMediaUrl, setLogoMediaUrl] = useState<string | null>(null)
  const [sortOrder, setSortOrder] = useState(0)
  const [isPublished, setIsPublished] = useState(true)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  // Media Picker state
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false)

  const openCreateModal = () => {
    setEditingPartner(null)
    setNameAr('')
    setNameEn('')
    setWebsiteUrl('')
    setLogoMediaId(null)
    setLogoMediaUrl(null)
    setSortOrder((partners.length || 0) + 1)
    setIsPublished(true)
    setFormErrors({})
    setIsFormOpen(true)
  }

  const openEditModal = (partner: AdminPartnerRow) => {
    setEditingPartner(partner)
    setNameAr(partner.name_ar)
    setNameEn(partner.name_en || '')
    setWebsiteUrl(partner.website_url || '')
    setLogoMediaId(partner.logo_media_id || null)
    setLogoMediaUrl(
      partner.logo_media?.storage_path
        ? getStoragePublicUrl(partner.logo_media.storage_path)
        : null,
    )
    setSortOrder(partner.sort_order)
    setIsPublished(partner.is_published)
    setFormErrors({})
    setIsFormOpen(true)
  }

  const handleSelectLogo = (selected: MediaRow | MediaRow[]) => {
    const item = Array.isArray(selected) ? selected[0] : selected
    if (!item) return
    setLogoMediaId(item.id)
    setLogoMediaUrl(getStoragePublicUrl(item.storage_path))
    setIsMediaPickerOpen(false)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    const payload: PartnerFormData = {
      name_ar: nameAr.trim(),
      name_en: nameEn.trim() || null,
      website_url: websiteUrl.trim() || null,
      logo_media_id: logoMediaId || null,
      sort_order: sortOrder,
      is_published: isPublished,
    }

    const validation = partnerFormSchema.safeParse(payload)
    if (!validation.success) {
      const errMap: Record<string, string> = {}
      for (const err of validation.error.errors) {
        if (err.path[0]) {
          errMap[err.path[0] as string] = err.message
        }
      }
      setFormErrors(errMap)
      return
    }

    try {
      if (editingPartner) {
        await updateMutation.mutateAsync({ id: editingPartner.id, data: payload })
        success('تم تحديث بيانات الشريك بنجاح', payload.is_published ? REBUILD_NOTICE : undefined)
      } else {
        await createMutation.mutateAsync(payload)
        success('تمت إضافة الشريك بنجاح', payload.is_published ? REBUILD_NOTICE : undefined)
      }
      setIsFormOpen(false)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حفظ بيانات الشريك', msg)
    }
  }

  const handleTogglePublish = async (partner: AdminPartnerRow) => {
    try {
      await togglePublishMutation.mutateAsync({
        id: partner.id,
        is_published: !partner.is_published,
      })
      success(
        !partner.is_published ? 'تم تفعيل ظهور الشريك' : 'تم إخفاء الشريك',
        REBUILD_NOTICE,
      )
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل تعديل حالة الظهور', msg)
    }
  }

  const handleMove = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= partners.length) return

    const newOrder = [...partners]
    const temp = newOrder[index]
    newOrder[index] = newOrder[targetIndex]
    newOrder[targetIndex] = temp

    const orderedIds = newOrder.map((p) => p.id)

    try {
      await reorderMutation.mutateAsync(orderedIds)
      success('تم تحديث ترتيب الشركاء', REBUILD_NOTICE)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل تحديث الترتيب', msg)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingPartner) return
    try {
      await deleteMutation.mutateAsync(deletingPartner.id)
      success('تم حذف الشريك بنجاح', deletingPartner.is_published ? REBUILD_NOTICE : undefined)
      setDeletingPartner(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حذف الشريك', msg)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="شركاء النجاح"
        description="إدارة قائمة الشركات والجهات الشريكة وتعديل شعاراتهم وترتيب ظهورهم في الموقع."
        backTo="/admin"
        backLabel="الرئيسية"
        actions={
          <Button
            variant="primary"
            onClick={openCreateModal}
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2"
            leftIcon={<Plus className="w-4 h-4" aria-hidden="true" />}
          >
            إضافة شريك جديد
          </Button>
        }
      />

      <div className="bg-white rounded-card border border-surface-border overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-12 text-center text-content-muted text-sm">
            جاري تحميل قائمة الشركاء...
          </div>
        ) : partners.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Handshake className="w-10 h-10 text-content-muted mx-auto" />
            <p className="text-sm font-bold text-content-heading">لا يوجد شركاء مضافين حالياً</p>
            <p className="text-xs text-content-muted max-w-sm mx-auto">
              قم بإضافة العلامات التجارية والشركات الشريكة لعرض شعاراتهم في الصفحة الرئيسية وصفحة الشركاء.
            </p>
            <div className="pt-2">
              <Button
                variant="primary"
                size="sm"
                onClick={openCreateModal}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة أول شريك</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-xs border-collapse">
              <thead>
                <tr className="bg-surface-soft border-b border-surface-border text-content-muted font-bold text-start">
                  <th className="py-3 px-4 w-12 text-center">الترتيب</th>
                  <th className="py-3 px-4 w-20">الشعار</th>
                  <th className="py-3 px-4">اسم الشريك</th>
                  <th className="py-3 px-4">الموقع الإلكتروني</th>
                  <th className="py-3 px-4 text-center">حالة الظهور</th>
                  <th className="py-3 px-4 text-end">إجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {partners.map((partner, index) => {
                  const logoUrl = partner.logo_media?.storage_path
                    ? getStoragePublicUrl(partner.logo_media.storage_path)
                    : null

                  return (
                    <tr
                      key={partner.id}
                      className="hover:bg-surface-soft/40 transition-colors"
                    >
                      {/* Sort controls */}
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
                            {partner.sort_order}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleMove(index, 'down')}
                            disabled={index === partners.length - 1 || reorderMutation.isPending}
                            className="p-1 text-content-muted hover:text-brand-600 disabled:opacity-20 transition-colors"
                            title="تحريك لأسفل"
                            aria-label="تحريك لأسفل"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* Logo thumbnail */}
                      <td className="py-3 px-4">
                        <div className="w-14 h-10 rounded-control bg-surface-soft border border-surface-border p-1 flex items-center justify-center shrink-0">
                          {logoUrl ? (
                            <img
                              src={logoUrl}
                              alt={partner.name_ar}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-content-muted" />
                          )}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="py-3 px-4">
                        <span className="font-bold text-content-heading block text-xs">
                          {partner.name_ar}
                        </span>
                        {partner.name_en && (
                          <span className="text-[11px] text-content-muted block mt-0.5">
                            {partner.name_en}
                          </span>
                        )}
                      </td>

                      {/* Website */}
                      <td className="py-3 px-4">
                        {partner.website_url ? (
                          <a
                            href={partner.website_url}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="inline-flex items-center gap-1.5 text-xs text-brand-600 hover:underline"
                          >
                            <span className="truncate max-w-[200px]" dir="ltr">
                              {partner.website_url.replace(/^https?:\/\//, '')}
                            </span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        ) : (
                          <span className="text-content-muted text-xs">—</span>
                        )}
                      </td>

                      {/* Publish Toggle */}
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(partner)}
                          disabled={togglePublishMutation.isPending}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${
                            partner.is_published
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-surface-soft text-content-muted border-surface-border hover:bg-surface-border/60'
                          }`}
                        >
                          {partner.is_published ? (
                            <>
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              <span>ظاهر</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3 text-content-muted" />
                              <span>مخفي</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-end whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openEditModal(partner)}
                            className="p-1.5 rounded-control text-content-muted hover:text-brand-600 hover:bg-surface-soft transition-colors"
                            title="تعديل الشريك"
                            aria-label="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletingPartner(partner)}
                            className="p-1.5 rounded-control text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 transition-colors"
                            title="حذف الشريك"
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
      </div>

      {/* Add / Edit Dialog */}
      <Dialog
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        title={editingPartner ? 'تعديل بيانات الشريك' : 'إضافة شريك نجاح جديد'}
        maxWidth="md"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <FormField
            label="اسم الشريك (بالعربية)"
            required
            error={formErrors.name_ar}
          >
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="مثال: شركة شنايدر إلكتريك"
              className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
          </FormField>

          <FormField
            label="اسم الشريك (بالإنجليزية)"
            optional
            error={formErrors.name_en}
          >
            <input
              type="text"
              dir="ltr"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. Schneider Electric"
              className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
          </FormField>

          <FormField
            label="رابط الموقع الإلكتروني"
            optional
            hint="يجب أن يبدأ بـ https:// أو http://"
            error={formErrors.website_url}
          >
            <input
              type="url"
              dir="ltr"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            />
          </FormField>

          {/* Logo Picker */}
          <FormField label="شعار الشريك" optional>
            <div className="flex items-center gap-4">
              <div className="w-20 h-14 rounded-control bg-surface-soft border border-surface-border p-1 flex items-center justify-center shrink-0">
                {logoMediaUrl ? (
                  <img
                    src={logoMediaUrl}
                    alt="الشعار"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <ImageIcon className="w-6 h-6 text-content-muted" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsMediaPickerOpen(true)}
                  className="text-xs"
                >
                  {logoMediaUrl ? 'تغيير الشعار' : 'اختيار شعار من الوسائط'}
                </Button>

                {logoMediaUrl && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setLogoMediaId(null)
                      setLogoMediaUrl(null)
                    }}
                    className="text-feedback-error hover:bg-feedback-error/10 text-xs"
                  >
                    إزالة
                  </Button>
                )}
              </div>
            </div>
          </FormField>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <FormField label="الترتيب اليدوي">
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(parseInt(e.target.value, 10) || 0)}
                className="w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              />
            </FormField>

            <div className="flex flex-col justify-center">
              <label className="flex items-center gap-2 cursor-pointer mt-4">
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-brand-600 rounded-control border-surface-border focus:ring-brand-600"
                />
                <span className="text-xs font-bold text-content-heading">
                  إظهار الشريك في الموقع
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-border">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setIsFormOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              isLoading={createMutation.isPending || updateMutation.isPending}
            >
              {editingPartner ? 'حفظ التعديلات' : 'إضافة الشريك'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Media Picker for Partner Logo */}
      <MediaPicker
        open={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleSelectLogo}
        mode="single"
        accept="image"
        initialFolder="partners"
        title="اختيار شعار الشريك من مكتبة الوسائط"
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingPartner)}
        onClose={() => setDeletingPartner(null)}
        onConfirm={handleDeleteConfirm}
        title="تأكيد حذف الشريك"
        description={`هل أنت متأكد من رغبتك في حذف الشريك "${deletingPartner?.name_ar}"؟ لن يتم حذف شعاره من مكتبة الوسائط.`}
        confirmText="حذف الشريك"
        cancelText="إلغاء"
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
