import React, { useState } from 'react'
import {
  Folder,
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
  useAdminCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from '@/features/blog/useBlogTaxonomy'
import {
  categoryFormSchema,
  type CategoryRow,
  type CategoryFormData,
} from '@/features/blog/blogTaxonomyService'
import { generateSlug } from '@/features/blog/blogAdminService'

export const CategoriesPage: React.FC = () => {
  const { success, error: toastError } = useToast()
  const { data: categories = [], isLoading } = useAdminCategories()

  const createMutation = useCreateCategory()
  const updateMutation = useUpdateCategory()
  const deleteMutation = useDeleteCategory()

  const [search, setSearch] = useState('')
  const [editingCategory, setEditingCategory] = useState<CategoryRow | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [deletingCategory, setDeletingCategory] = useState<CategoryRow | null>(null)

  // Form State
  const [nameAr, setNameAr] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [slug, setSlug] = useState('')
  const [descriptionAr, setDescriptionAr] = useState('')
  const [descriptionEn, setDescriptionEn] = useState('')
  const [seoTitle, setSeoTitle] = useState('')
  const [seoDescription, setSeoDescription] = useState('')
  const [sortOrder, setSortOrder] = useState(0)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const resetForm = () => {
    setNameAr('')
    setNameEn('')
    setSlug('')
    setDescriptionAr('')
    setDescriptionEn('')
    setSeoTitle('')
    setSeoDescription('')
    setSortOrder(0)
    setFormErrors({})
  }

  const handleOpenCreate = () => {
    resetForm()
    setEditingCategory(null)
    setIsCreateOpen(true)
  }

  const handleOpenEdit = (category: CategoryRow) => {
    setEditingCategory(category)
    setNameAr(category.name_ar || '')
    setNameEn(category.name_en || '')
    setSlug(category.slug || '')
    setDescriptionAr(category.description_ar || '')
    setDescriptionEn(category.description_en || '')
    setSeoTitle(category.seo_title || '')
    setSeoDescription(category.seo_description || '')
    setSortOrder(category.sort_order || 0)
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

    const formData: CategoryFormData = {
      name_ar: nameAr.trim(),
      name_en: nameEn.trim() || null,
      slug: slug.trim(),
      description_ar: descriptionAr.trim() || null,
      description_en: descriptionEn.trim() || null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      sort_order: Number(sortOrder) || 0,
    }

    const validation = categoryFormSchema.safeParse(formData)
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
      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          data: formData,
        })
        success('تم تحديث التصنيف بنجاح')
      } else {
        await createMutation.mutateAsync(formData)
        success('تم إنشاء التصنيف بنجاح')
      }
      setIsCreateOpen(false)
      resetForm()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حفظ التصنيف', msg)
    }
  }

  const handleDelete = async () => {
    if (!deletingCategory) return
    try {
      await deleteMutation.mutateAsync(deletingCategory.id)
      success('تم حذف التصنيف بنجاح')
      setDeletingCategory(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حذف التصنيف', msg)
    }
  }

  const filteredCategories = categories.filter((cat) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      cat.name_ar.toLowerCase().includes(q) ||
      (cat.name_en && cat.name_en.toLowerCase().includes(q)) ||
      cat.slug.toLowerCase().includes(q)
    )
  })

  return (
    <div className="space-y-6">
      <PageHeader
        title="تصنيفات المدونة"
        description="إدارة تصنيفات مقالات وأخبار المصاعد وتخصيص الروابط ومعلومات SEO الخاصة بكل قسم."
        actions={
          <Button onClick={handleOpenCreate} className="gap-2">
            <Plus className="w-4 h-4" />
            <span>تصنيف جديد</span>
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
            placeholder="بحث في التصنيفات بالاسم أو الرابط..."
            className="w-full ps-9 pe-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
        <div className="text-xs text-slate-500">
          إجمالي التصنيفات: <span className="font-bold text-slate-700 dark:text-slate-300">{categories.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">جاري تحميل التصنيفات...</div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center">
            <Folder className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              لا توجد تصنيفات حالياً
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {search ? 'لا توجد نتائج تطابق بحثك' : 'ابدأ بإضافة تصنيف لتنظيم المقالات والأخبار.'}
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
                  <th className="py-3 px-4 text-center">الترتيب</th>
                  <th className="py-3 px-4 text-end">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {filteredCategories.map((category) => (
                  <tr
                    key={category.id}
                    className="hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">
                      <div className="flex items-center gap-2">
                        <Folder className="w-4 h-4 text-primary-500 shrink-0" />
                        <span>{category.name_ar}</span>
                      </div>
                      {category.description_ar && (
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {category.description_ar}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300 font-mono text-xs">
                      {category.name_en || '—'}
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-xs">
                      /blog/category/{category.slug}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                        <FileText className="w-3 h-3 me-1" />
                        {category.posts_count || 0}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-600 dark:text-slate-400">
                      {category.sort_order}
                    </td>
                    <td className="py-3 px-4 text-end">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(category)}
                          className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                          title="تعديل التصنيف"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeletingCategory(category)}
                          className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                          title="حذف التصنيف"
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
        title={editingCategory ? 'تعديل التصنيف' : 'إضافة تصنيف جديد'}
      >
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="الاسم بالعربية" required error={formErrors.name_ar}>
              <input
                type="text"
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="مثال: صيانة المصاعد"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </FormField>

            <FormField label="الاسم بالإنجليزية (اختياري)" error={formErrors.name_en}>
              <input
                type="text"
                dir="ltr"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                placeholder="e.g. Elevator Maintenance"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-start"
              />
            </FormField>
          </div>

          <FormField label="الرابط اللطيف (Slug)" required error={formErrors.slug}>
            <div className="flex gap-2">
              <input
                type="text"
                dir="ltr"
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                placeholder="elevator-maintenance"
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

          <FormField label="الوصف بالعربية (اختياري)">
            <textarea
              rows={2}
              value={descriptionAr}
              onChange={(e) => setDescriptionAr(e.target.value)}
              placeholder="وصف مختصر لموضوعات هذا التصنيف..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </FormField>

          <FormField label="الوصف بالإنجليزية (اختياري)">
            <textarea
              rows={2}
              dir="ltr"
              value={descriptionEn}
              onChange={(e) => setDescriptionEn(e.target.value)}
              placeholder="Short description of this category..."
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 text-start"
            />
          </FormField>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField label="عنوان SEO (اختياري)">
              <input
                type="text"
                value={seoTitle}
                onChange={(e) => setSeoTitle(e.target.value)}
                placeholder="عنوان مخصص لمحركات البحث"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </FormField>

            <FormField label="ترتيب الظهور">
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </FormField>
          </div>

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
              {editingCategory ? 'حفظ التعديلات' : 'إنشاء التصنيف'}
            </Button>
          </div>
        </form>
      </Dialog>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        onConfirm={handleDelete}
        title="تأكيد حذف التصنيف"
        description={
          deletingCategory
            ? `هل أنت متأكد من رغبتك في حذف التصنيف "${deletingCategory.name_ar}"؟${
                deletingCategory.posts_count && deletingCategory.posts_count > 0
                  ? ` تنبيه: يوجد حالياً ${deletingCategory.posts_count} مقالاً مرتبطاً بهذا التصنيف وسيتم فك ارتباطها.`
                  : ''
              }`
            : ''
        }
        confirmText="حذف التصنيف"
        isDestructive
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}
