import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Copy,
  Languages,
  CheckCircle,
  EyeOff,
  Image as ImageIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  FileText,
} from 'lucide-react'
import { PageHeader, ConfirmDialog, StatusBadge } from '@/components/admin'
import { Button, useToast } from '@/components/ui'
import {
  useAdminPosts,
  useDuplicatePost,
  useCreateTranslationTwin,
  useBulkUpdatePostStatus,
  useBulkDeletePosts,
  useDeletePost,
} from '@/features/blog/useAdminPosts'
import { useAdminCategories } from '@/features/blog/useBlogTaxonomy'
import {
  type AdminPostListItem,
  type PostStatus,
  type PostLang,
} from '@/features/blog/blogAdminService'
import { getStoragePublicUrl } from '@/lib/media'
import { REBUILD_NOTICE } from '@/lib/rebuild'

export const PostsListPage: React.FC = () => {
  const navigate = useNavigate()
  const { success, error: toastError } = useToast()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<PostStatus | 'all'>('all')
  const [langFilter, setLangFilter] = useState<PostLang | 'all'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string | 'all'>('all')
  const [page, setPage] = useState(1)

  // Selection state for bulk operations
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // Modal states
  const [deletingPost, setDeletingPost] = useState<AdminPostListItem | null>(null)
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false)

  const { data: categories = [] } = useAdminCategories()

  const { data, isLoading } = useAdminPosts({
    search: search || undefined,
    status: statusFilter,
    lang: langFilter,
    categoryId: categoryFilter,
    page,
    limit: 15,
  })

  const duplicateMutation = useDuplicatePost()
  const createTwinMutation = useCreateTranslationTwin()
  const bulkStatusMutation = useBulkUpdatePostStatus()
  const bulkDeleteMutation = useBulkDeletePosts()
  const deleteMutation = useDeletePost()

  const posts = data?.posts || []
  const total = data?.total || 0
  const totalPages = Math.ceil(total / 15) || 1

  // Handle multi-select
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(posts.map((p) => p.id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  // Row operations
  const handleDuplicate = async (post: AdminPostListItem) => {
    try {
      const duplicated = await duplicateMutation.mutateAsync(post.id)
      success('تم استنساخ المقال كمسودة بنجاح')
      navigate(`/admin/posts/${duplicated.id}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل استنساخ المقال', msg)
    }
  }

  const handleCreateTwin = async (post: AdminPostListItem) => {
    try {
      const twin = await createTwinMutation.mutateAsync(post.id)
      const targetLangName = post.lang === 'ar' ? 'الإنجليزية' : 'العربية'
      success(`تم إنشاء نسخة مترجمة باللغة ${targetLangName}`)
      navigate(`/admin/posts/${twin.id}`)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل إنشاء النسخة المترجمة', msg)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingPost) return
    try {
      await deleteMutation.mutateAsync(deletingPost.id)
      success('تم حذف المقال بنجاح', REBUILD_NOTICE)
      setDeletingPost(null)
      setSelectedIds((prev) => prev.filter((id) => id !== deletingPost.id))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حذف المقال', msg)
    }
  }

  // Bulk operations
  const handleBulkStatus = async (status: PostStatus) => {
    if (selectedIds.length === 0) return
    try {
      await bulkStatusMutation.mutateAsync({ ids: selectedIds, status })
      const statusLabel =
        status === 'published' ? 'نشر' : status === 'draft' ? 'تحويل لمسودة' : 'أرشفة'
      success(`تم ${statusLabel} ${selectedIds.length} مقالاً بنجاح`, REBUILD_NOTICE)
      setSelectedIds([])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل تعديل حالة المقالات المحددة', msg)
    }
  }

  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.length === 0) return
    try {
      await bulkDeleteMutation.mutateAsync(selectedIds)
      success(`تم حذف ${selectedIds.length} مقالاً بنجاح`, REBUILD_NOTICE)
      setIsBulkDeleteOpen(false)
      setSelectedIds([])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل حذف المقالات المحددة', msg)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="المقالات والأخبار"
        description="إدارة وتحرير مقالات المدونة، الأخبار، والتوعية التقنية بمصاعد جدة مع دعم الترجمة الفورية والـ SEO."
        actions={
          <Link to="/admin/posts/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              <span>مقال جديد</span>
            </Button>
          </Link>
        }
      />

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder="بحث بالعنوان، الرابط، أو المقتطف..."
              className="w-full ps-9 pe-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as PostStatus | 'all')
                setPage(1)
              }}
              className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">كل الحالات</option>
              <option value="published">منشور</option>
              <option value="draft">مسودة</option>
              <option value="archived">مؤرشف</option>
            </select>

            {/* Language Filter */}
            <select
              value={langFilter}
              onChange={(e) => {
                setLangFilter(e.target.value as PostLang | 'all')
                setPage(1)
              }}
              className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">كل اللغات</option>
              <option value="ar">العربية (AR)</option>
              <option value="en">English (EN)</option>
            </select>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value)
                setPage(1)
              }}
              className="px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">كل التصنيفات</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name_ar}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bulk Action Controls */}
        {selectedIds.length > 0 && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 bg-primary-50/60 dark:bg-primary-950/20 p-2.5 rounded-lg">
            <div className="text-xs font-semibold text-primary-900 dark:text-primary-300">
              تم تحديد <span className="font-bold">{selectedIds.length}</span> مقالاً
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleBulkStatus('published')}
                className="text-xs h-8"
              >
                <CheckCircle className="w-3.5 h-3.5 me-1 text-emerald-600" />
                <span>نشر المحدد</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => handleBulkStatus('draft')}
                className="text-xs h-8"
              >
                <EyeOff className="w-3.5 h-3.5 me-1 text-amber-600" />
                <span>تحويل لمسودة</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsBulkDeleteOpen(true)}
                className="text-xs h-8 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
              >
                <Trash2 className="w-3.5 h-3.5 me-1" />
                <span>حذف المحدد</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Posts Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">جاري تحميل المقالات...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              لا توجد مقالات تطابق هذا المعيار
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {search || statusFilter !== 'all' || langFilter !== 'all' || categoryFilter !== 'all'
                ? 'جرّب تغيير خيارات البحث أو التصفية.'
                : 'ابدأ بكتابة مقالك الأول في المدونة.'}
            </p>
            {!search && statusFilter === 'all' && (
              <Link to="/admin/posts/new" className="inline-block mt-4">
                <Button size="sm">كتابة مقال جديد</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-start text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                <tr>
                  <th className="py-3 px-4 w-10 text-center">
                    <input
                      type="checkbox"
                      checked={selectedIds.length === posts.length && posts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                    />
                  </th>
                  <th className="py-3 px-4 text-start">المقال</th>
                  <th className="py-3 px-4 text-start">التصنيف</th>
                  <th className="py-3 px-4 text-center">اللغة</th>
                  <th className="py-3 px-4 text-center">الحالة</th>
                  <th className="py-3 px-4 text-center">وقت القراءة</th>
                  <th className="py-3 px-4 text-start">التاريخ</th>
                  <th className="py-3 px-4 text-end">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {posts.map((post) => {
                  const isSelected = selectedIds.includes(post.id)
                  const imageUrl = post.featured_image?.storage_path
                    ? getStoragePublicUrl(post.featured_image.storage_path)
                    : null
                  const publicUrl =
                    post.lang === 'en' ? `/en/blog/${post.slug}` : `/blog/${post.slug}`

                  return (
                    <tr
                      key={post.id}
                      className={`hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors ${
                        isSelected ? 'bg-primary-50/40 dark:bg-primary-950/20' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(post.id)}
                          className="rounded border-slate-300 text-primary-600 focus:ring-primary-500"
                        />
                      </td>

                      {/* Post Thumbnail & Info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                            {imageUrl ? (
                              <img
                                src={imageUrl}
                                alt={post.featured_image_alt || post.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <ImageIcon className="w-5 h-5 text-slate-400" />
                            )}
                          </div>
                          <div className="min-w-0 max-w-sm">
                            <Link
                              to={`/admin/posts/${post.id}`}
                              className="font-medium text-slate-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 line-clamp-1 block transition-colors"
                            >
                              {post.title}
                            </Link>
                            <span className="text-xs text-slate-400 font-mono block truncate">
                              /{post.lang}/blog/{post.slug}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {post.category ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                            {post.category.name_ar}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>

                      {/* Language */}
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-bold ${
                            post.lang === 'ar'
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                              : 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                          }`}
                        >
                          {post.lang.toUpperCase()}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 text-center">
                        <StatusBadge status={post.status} />
                      </td>

                      {/* Reading Time */}
                      <td className="py-3 px-4 text-center text-xs text-slate-500 font-mono">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{post.reading_time_min || 1} د</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 text-xs text-slate-500">
                        <div>
                          {post.published_at
                            ? new Date(post.published_at).toLocaleDateString('ar-SA')
                            : new Date(post.updated_at).toLocaleDateString('ar-SA')}
                        </div>
                        <span className="text-[10px] text-slate-400">
                          {post.published_at ? 'تاريخ النشر' : 'آخر تعديل'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-end">
                        <div className="flex items-center justify-end gap-1">
                          {post.status === 'published' && (
                            <a
                              href={publicUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                              title="معاينة المقال المباشر"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          )}
                          <Link
                            to={`/admin/posts/${post.id}`}
                            className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="تعديل المقال"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(post)}
                            disabled={duplicateMutation.isPending}
                            className="p-1.5 text-slate-500 hover:text-primary-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                            title="استنساخ المقال"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCreateTwin(post)}
                            disabled={createTwinMutation.isPending}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-colors"
                            title={
                              post.lang === 'ar'
                                ? 'إنشاء نسخة مترجمة بالإنجليزية'
                                : 'إنشاء نسخة مترجمة بالعربية'
                            }
                          >
                            <Languages className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeletingPost(post)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                            title="حذف المقال"
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="text-xs text-slate-500">
              عرض {(page - 1) * 15 + 1} - {Math.min(page * 15, total)} من أصل {total} مقال
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="secondary"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-1.5 h-8 w-8"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <span className="px-3 text-xs font-semibold text-slate-700 dark:text-slate-300">
                صفحة {page} من {totalPages}
              </span>
              <Button
                variant="secondary"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-1.5 h-8 w-8"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Single Post Confirm */}
      <ConfirmDialog
        isOpen={Boolean(deletingPost)}
        onClose={() => setDeletingPost(null)}
        onConfirm={handleDeleteConfirm}
        title="تأكيد حذف المقال"
        description={
          deletingPost
            ? `هل أنت متأكد من رغبتك في حذف المقال "${deletingPost.title}"؟ لا يمكن التراجع عن هذا الإجراء وسيتم إزالة ارتباط الوسوم نهائياً.`
            : ''
        }
        confirmText="حذف المقال نهائياً"
        isDestructive
        isLoading={deleteMutation.isPending}
      />

      {/* Bulk Delete Confirm */}
      <ConfirmDialog
        isOpen={isBulkDeleteOpen}
        onClose={() => setIsBulkDeleteOpen(false)}
        onConfirm={handleBulkDeleteConfirm}
        title="تأكيد حذف المقالات المحددة"
        description={`هل أنت متأكد من رغبتك في حذف ${selectedIds.length} مقالات محددة؟ سيتم حذفها نهائياً مع كافة الوسوم المرتبطة بها.`}
        confirmText={`حذف ${selectedIds.length} مقالات نهائياً`}
        isDestructive
        isLoading={bulkDeleteMutation.isPending}
      />
    </div>
  )
}
