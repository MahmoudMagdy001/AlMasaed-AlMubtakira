import React, { useState } from 'react'
import {
  Tag as TagIcon,
  Plus,
  Edit2,
  Trash2,
  Search,
  FileText,
  Wand2,
} from 'lucide-react'
import { PageHeader, ConfirmDialog, FormField } from '@/components/admin'
import { Button, Dialog, useToast } from '@/components/ui'
import {
  useAdminTags,
  useCreateTag,
  useUpdateTag,
  useDeleteTag,
} from '@/features/blog/useBlogTaxonomy'
import {
  tagFormSchema,
  type TagRow,
  type TagFormData,
} from '@/features/blog/blogTaxonomyService'
import { generateSlug } from '@/features/blog/blogAdminService'

export const TagsPage: React.FC = () => {
  const { success, error: toastError } = useToast()
  const { data: tags = [], isLoading } = useAdminTags()

  const createMutation = useCreateTag()
  const updateMutation = useUpdateTag()
  const deleteMutation = useDeleteTag()

  const [search, setSearch] = useState('')
  const [editingTag, setEditingTag] = useState<TagRow | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [deletingTag, setDeletingTag] = useState<TagRow | null>(null)

  // Form State
  const [nameAr, setNameAr] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [slug, setSlug] = useState('')
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const resetForm = () => {
    setNameAr('')
    setNameEn('')
    setSlug('')
    setFormErrors({})
  }

  const handleOpenCreate = () => {
    resetForm()
    setEditingTag(null)
    setIsCreateOpen(true)
  }

  const handleOpenEdit = (tag: TagRow) => {
    setEditingTag(tag)
    setNameAr(tag.name_ar || '')
    setNameEn(tag.name_en || '')
    setSlug(tag.slug || '')
    setFormErrors({})
    setIsCreateOpen(true)
  }

  const handleAutoSlug = () => {
    const source = nameEn.trim() || nameAr.trim()
    if (!source) return
    const generated = generateSlug(source)
    setSlug(generated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    const formData: TagFormData = {
      name_ar: nameAr.trim(),
      name_en: nameEn.trim() || null,
      slug: slug.trim(),
    }

    const validation = tagFormSchema.safeParse(formData)
    if (!validation.success) {
      const fieldErrors: Record<string, string> = {}
      validation.error.errors.forEach((err) => {
        const fieldName = String(err.path[0])
        fieldErrors[fieldName] = err.message
      })
      setFormErrors(fieldErrors)
      return
    }

    try {
      if (editingTag) {
        await updateMutation.mutateAsync({
          id: editingTag.id,
          data: formData,
        })
        success('تم تحديث الوسم بنجاح')
      } else {
        await createMutation.mutateAsync(formData)
        success('تم إنشاء الوسم بنجاح')
      }
      setIsCreateOpen(false)
      resetForm()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حفظ الوسم', msg)
    }
  }

  const handleDelete = async () => {
    if (!deletingTag) return
    try {
      await deleteMutation.mutateAsync(deletingTag.id)
      success('تم حذف الوسم بنجاح')
      setDeletingTag(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حذف الوسم', msg)
    }
  }

  const filteredTags = tags.filter((t) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      t.name_ar.toLowerCase().includes(q) ||
      (t.name_en && t.name_en.toLowerCase().includes(q)) ||
      t.slug.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="الوسوم والكلمات الدلالية"
        description="إدارة وسوم المقالات لتسهيل تصنيف المقالات التقنية وربطها بالكلمات المفتاحية."
        actions={
          <Button onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>وسم جديد</span>
          </Button>
        }
      />

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="بحث في الوسوم بالاسم أو الرابط..."
            className="w-full ps-9 pe-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
        <div className="text-xs text-slate-500">
          إجمالي الوسوم: <span className="font-bold text-slate-700 dark:text-slate-300">{tags.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">جاري تحميل الوسوم...</div>
        ) : filteredTags.length === 0 ? (
          <div className="p-12 text-center">
            <TagIcon className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              لا توجد وسوم حالياً
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {search ? 'لا توجد نتائج تطابق بحثك' : 'ابدأ بإضافة وسوم لربط مقالات المدونة ببعضها.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                <tr>
                  <th className="py-3 px-4 text-start">الاسم بالعربية</th>
                  <th className="py-3 px-4 text-start">الاسم بالإنجليزية</th>
                  <th className="py-3 px-4 text-start">الرابط اللطيف (Slug)</th>
                  <th className="py-3 px-4 text-center">عدد المقالات</th>
                  <th className="py-3 px-4 text-end">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredTags.map((tag) => (
                  <tr
                    key={tag.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <TagIcon className="w-4 h-4 text-primary-500 shrink-0" />
                        <span>{tag.name_ar}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono text-xs">
                      {tag.name_en || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-xs">
                      #{tag.slug}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <FileText className="w-3 h-3 me-1" />
                        {tag.posts_count || 0}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(tag)}
                          className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="تعديل الوسم"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingTag(tag)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                          title="حذف الوسم"
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
      </div>

      {/* Create / Edit Dialog */}
      <Dialog
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        title={editingTag ? 'تعديل الوسم' : 'إضافة وسم جديد'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <FormField label="اسم الوسم بالعربية" required error={formErrors.name_ar}>
            <input
              type="text"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              placeholder="مثال: قطع غيار"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </FormField>

          <FormField label="اسم الوسم بالإنجليزية (اختياري)" error={formErrors.name_en}>
            <input
              type="text"
              dir="ltr"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              placeholder="e.g. Spare Parts"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-start"
            />
          </FormField>

          <FormField label="الرابط اللطيف (Slug)" required error={formErrors.slug}>
            <div className="flex gap-2">
              <input
                type="text"
                dir="ltr"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="spare-parts"
                className="flex-1 px-3 py-2 text-sm font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-start"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAutoSlug}
                title="توليد تلقائي من الاسم"
                className="shrink-0 px-3"
              >
                <Wand2 className="w-4 h-4 me-1" />
                <span>توليد</span>
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              حروف إنجليزية صغيرة وأرقام وشرطات فقط (-).
            </p>
          </FormField>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCreateOpen(false)}
            >
              إلغاء
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
            >
              {editingTag ? 'حفظ التعديلات' : 'إنشاء الوسم'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingTag)}
        onClose={() => setDeletingTag(null)}
        onConfirm={handleDelete}
        title="تأكيد حذف الوسم"
        description={
          deletingTag
            ? `هل أنت متأكد من رغبتك في حذف الوسم "#${deletingTag.name_ar}"؟${
                deletingTag.posts_count && deletingTag.posts_count > 0
                  ? ` تنبيه: هذا الوسم مرتبط حالياً بـ ${deletingTag.posts_count} مقالاً وسيتم إزالته منها.`
                  : ''
              }`
            : ''
        }
        confirmText="حذف الوسم"
        isDestructive
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
