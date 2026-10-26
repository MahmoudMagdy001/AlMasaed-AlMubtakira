var _a;
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Plus, Search, CheckCircle, EyeOff, Trash2, FileText, Image, Clock, ExternalLink, Edit2, Copy, Languages, ChevronRight, ChevronLeft } from "lucide-react";
import { P as PageHeader, S as StatusBadge, C as ConfirmDialog } from "./index-6EXxYG9x.js";
import { u as useToast, B as Button, g as getStoragePublicUrl } from "../main.mjs";
import { u as useAdminPosts, a as useDuplicatePost, b as useCreateTranslationTwin, c as useBulkUpdatePostStatus, d as useBulkDeletePosts, e as useDeletePost } from "./useAdminPosts-B_luQ5kt.js";
import { u as useAdminCategories } from "./useBlogTaxonomy-COB38oJP.js";
import { R as REBUILD_NOTICE } from "./rebuild-aq1DCH4-.js";
import "@tanstack/react-query";
import "vite-react-ssg";
import "react-i18next";
import "@supabase/supabase-js";
import "gsap";
import "gsap/ScrollTrigger";
import "@gsap/react";
import "react-hook-form";
import "zod";
import "i18next";
import "./blogAdminService-DtY0JHBt.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/admin/blog/PostsListPage.tsx");
const PostsListPage = () => {
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [langFilter, setLangFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [deletingPost, setDeletingPost] = useState(null);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const { data: categories = [] } = useAdminCategories();
  const { data, isLoading } = useAdminPosts({
    search: search || void 0,
    status: statusFilter,
    lang: langFilter,
    categoryId: categoryFilter,
    page,
    limit: 15
  });
  const duplicateMutation = useDuplicatePost();
  const createTwinMutation = useCreateTranslationTwin();
  const bulkStatusMutation = useBulkUpdatePostStatus();
  const bulkDeleteMutation = useBulkDeletePosts();
  const deleteMutation = useDeletePost();
  const posts = (data == null ? void 0 : data.posts) || [];
  const total = (data == null ? void 0 : data.total) || 0;
  const totalPages = Math.ceil(total / 15) || 1;
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(posts.map((p) => p.id));
    } else {
      setSelectedIds([]);
    }
  };
  const handleSelectRow = (id) => {
    setSelectedIds(
      (prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleDuplicate = async (post) => {
    try {
      const duplicated = await duplicateMutation.mutateAsync(post.id);
      success("تم استنساخ المقال كمسودة بنجاح");
      navigate(`/admin/posts/${duplicated.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل استنساخ المقال", msg);
    }
  };
  const handleCreateTwin = async (post) => {
    try {
      const twin = await createTwinMutation.mutateAsync(post.id);
      const targetLangName = post.lang === "ar" ? "الإنجليزية" : "العربية";
      success(`تم إنشاء نسخة مترجمة باللغة ${targetLangName}`);
      navigate(`/admin/posts/${twin.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل إنشاء النسخة المترجمة", msg);
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deletingPost) return;
    try {
      await deleteMutation.mutateAsync(deletingPost.id);
      success("تم حذف المقال بنجاح", REBUILD_NOTICE);
      setDeletingPost(null);
      setSelectedIds((prev) => prev.filter((id) => id !== deletingPost.id));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حذف المقال", msg);
    }
  };
  const handleBulkStatus = async (status) => {
    if (selectedIds.length === 0) return;
    try {
      await bulkStatusMutation.mutateAsync({ ids: selectedIds, status });
      const statusLabel = status === "published" ? "نشر" : status === "draft" ? "تحويل لمسودة" : "أرشفة";
      success(`تم ${statusLabel} ${selectedIds.length} مقالاً بنجاح`, REBUILD_NOTICE);
      setSelectedIds([]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل تعديل حالة المقالات المحددة", msg);
    }
  };
  const handleBulkDeleteConfirm = async () => {
    if (selectedIds.length === 0) return;
    try {
      await bulkDeleteMutation.mutateAsync(selectedIds);
      success(`تم حذف ${selectedIds.length} مقالاً بنجاح`, REBUILD_NOTICE);
      setIsBulkDeleteOpen(false);
      setSelectedIds([]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حذف المقالات المحددة", msg);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "المقالات والأخبار",
        description: "إدارة وتحرير مقالات المدونة، الأخبار، والتوعية التقنية بمصاعد جدة مع دعم الترجمة الفورية والـ SEO.",
        actions: /* @__PURE__ */ jsx(
          Button,
          {
            to: "/admin/posts/new",
            variant: "primary",
            className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2",
            leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4", "aria-hidden": "true" }),
            children: "مقال جديد"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-4 space-y-3 shadow-2xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
          /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-content-muted" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: search,
              onChange: (e) => {
                setSearch(e.target.value);
                setPage(1);
              },
              placeholder: "بحث بالعنوان، الرابط، أو المقتطف...",
              className: "w-full ps-9 pe-4 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: statusFilter,
              onChange: (e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              },
              className: "px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "كل الحالات" }),
                /* @__PURE__ */ jsx("option", { value: "published", children: "منشور" }),
                /* @__PURE__ */ jsx("option", { value: "draft", children: "مسودة" }),
                /* @__PURE__ */ jsx("option", { value: "archived", children: "مؤرشف" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: langFilter,
              onChange: (e) => {
                setLangFilter(e.target.value);
                setPage(1);
              },
              className: "px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "كل اللغات" }),
                /* @__PURE__ */ jsx("option", { value: "ar", children: "العربية (AR)" }),
                /* @__PURE__ */ jsx("option", { value: "en", children: "English (EN)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: categoryFilter,
              onChange: (e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              },
              className: "px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: [
                /* @__PURE__ */ jsx("option", { value: "all", children: "كل التصنيفات" }),
                categories.map((c) => /* @__PURE__ */ jsx("option", { value: c.id, children: c.name_ar }, c.id))
              ]
            }
          )
        ] })
      ] }),
      selectedIds.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-surface-border-subtle flex items-center justify-between gap-3 bg-brand-50/70 p-2.5 rounded-control", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xs font-semibold text-brand-900", children: [
          "تم تحديد ",
          /* @__PURE__ */ jsx("span", { className: "font-bold", children: selectedIds.length }),
          " مقالاً"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => handleBulkStatus("published"),
              className: "text-xs h-8 bg-white",
              children: [
                /* @__PURE__ */ jsx(CheckCircle, { className: "w-3.5 h-3.5 me-1 text-emerald-600" }),
                /* @__PURE__ */ jsx("span", { children: "نشر المحدد" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => handleBulkStatus("draft"),
              className: "text-xs h-8 bg-white",
              children: [
                /* @__PURE__ */ jsx(EyeOff, { className: "w-3.5 h-3.5 me-1 text-amber-600" }),
                /* @__PURE__ */ jsx("span", { children: "تحويل لمسودة" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => setIsBulkDeleteOpen(true),
              className: "text-xs h-8 text-feedback-error hover:bg-feedback-error/10 bg-white",
              children: [
                /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5 me-1" }),
                /* @__PURE__ */ jsx("span", { children: "حذف المحدد" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card overflow-hidden shadow-xs", children: [
      isLoading ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل المقالات..." }) : posts.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center space-y-3", children: [
        /* @__PURE__ */ jsx(FileText, { className: "w-10 h-10 text-content-muted mx-auto" }),
        /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-content-heading", children: "لا توجد مقالات تطابق هذا المعيار" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted max-w-sm mx-auto", children: search || statusFilter !== "all" || langFilter !== "all" || categoryFilter !== "all" ? "جرّب تغيير خيارات البحث أو التصفية." : "ابدأ بكتابة مقالك الأول في المدونة." }),
        !search && statusFilter === "all" && /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
          Button,
          {
            to: "/admin/posts/new",
            size: "sm",
            className: "bg-brand-600 hover:bg-brand-700 text-white font-bold",
            leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            children: "كتابة مقال جديد"
          }
        ) })
      ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-start text-xs border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { className: "bg-surface-soft border-b border-surface-border text-content-muted font-bold", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 w-10 text-center", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: selectedIds.length === posts.length && posts.length > 0,
              onChange: handleSelectAll,
              className: "rounded border-surface-border text-brand-600 focus:ring-brand-500"
            }
          ) }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "المقال" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "التصنيف" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "اللغة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "الحالة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "السيو" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "وقت القراءة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "التاريخ" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-end", children: "الإجراءات" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-surface-border", children: posts.map((post) => {
          var _a2;
          const isSelected = selectedIds.includes(post.id);
          const imageUrl = ((_a2 = post.featured_image) == null ? void 0 : _a2.storage_path) ? getStoragePublicUrl(post.featured_image.storage_path) : null;
          const publicUrl = post.lang === "en" ? `/en/blog/${post.slug}` : `/blog/${post.slug}`;
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: `hover:bg-surface-soft/50 transition-colors ${isSelected ? "bg-brand-50/50" : ""}`,
              children: [
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center", children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: isSelected,
                    onChange: () => handleSelectRow(post.id),
                    className: "rounded border-surface-border text-brand-600 focus:ring-brand-500"
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-control bg-surface-soft overflow-hidden shrink-0 flex items-center justify-center border border-surface-border", children: imageUrl ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: imageUrl,
                      alt: post.featured_image_alt || post.title,
                      className: "w-full h-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsx(Image, { className: "w-5 h-5 text-content-muted" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0 max-w-sm", children: [
                    /* @__PURE__ */ jsx(
                      Link,
                      {
                        to: `/admin/posts/${post.id}`,
                        className: "font-bold text-content-heading hover:text-brand-600 line-clamp-1 block transition-colors",
                        children: post.title
                      }
                    ),
                    /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-content-muted font-mono block truncate mt-0.5", children: [
                      "/",
                      post.lang,
                      "/blog/",
                      post.slug
                    ] })
                  ] })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-content-body", children: post.category ? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-control text-xs bg-surface-soft text-content-body border border-surface-border font-medium", children: post.category.name_ar }) : /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted", children: "—" }) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center", children: /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-control text-[11px] font-mono font-bold border ${post.lang === "ar" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-brand-50 text-brand-700 border-brand-200"}`,
                    children: post.lang.toUpperCase()
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center", children: /* @__PURE__ */ jsx(StatusBadge, { status: post.status }) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center", children: typeof post.seo_score === "number" ? /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: `inline-flex items-center px-2 py-0.5 rounded-control text-xs font-mono font-bold border ${post.seo_score >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : post.seo_score >= 50 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200"}`,
                    title: `نتيجة السيو: ${post.seo_score}/100`,
                    children: post.seo_score
                  }
                ) : /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted font-mono", children: "—" }) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center text-xs text-content-muted font-mono", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-content-muted" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    post.reading_time_min || 1,
                    " د"
                  ] })
                ] }) }),
                /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 text-xs text-content-muted", children: [
                  /* @__PURE__ */ jsx("div", { className: "font-medium text-content-body", children: post.published_at ? new Date(post.published_at).toLocaleDateString("ar-SA") : new Date(post.updated_at).toLocaleDateString("ar-SA") }),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] text-content-muted", children: post.published_at ? "تاريخ النشر" : "آخر تعديل" })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-end", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1", children: [
                  post.status === "published" && /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: publicUrl,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "p-1.5 text-content-muted hover:text-brand-600 hover:bg-surface-soft rounded-control transition-colors",
                      title: "معاينة المقال المباشر",
                      children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: `/admin/posts/${post.id}`,
                      className: "p-1.5 text-content-muted hover:text-brand-600 hover:bg-surface-soft rounded-control transition-colors",
                      title: "تعديل المقال",
                      children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleDuplicate(post),
                      disabled: duplicateMutation.isPending,
                      className: "p-1.5 text-content-muted hover:text-brand-600 hover:bg-surface-soft rounded-control transition-colors",
                      title: "استنساخ المقال",
                      children: /* @__PURE__ */ jsx(Copy, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleCreateTwin(post),
                      disabled: createTwinMutation.isPending,
                      className: "p-1.5 text-content-muted hover:text-brand-600 hover:bg-surface-soft rounded-control transition-colors",
                      title: post.lang === "ar" ? "إنشاء نسخة مترجمة بالإنجليزية" : "إنشاء نسخة مترجمة بالعربية",
                      children: /* @__PURE__ */ jsx(Languages, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeletingPost(post),
                      className: "p-1.5 text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 rounded-control transition-colors",
                      title: "حذف المقال",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ]
            },
            post.id
          );
        }) })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-surface-border flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-content-muted", children: [
          "عرض ",
          (page - 1) * 15 + 1,
          " - ",
          Math.min(page * 15, total),
          " من أصل ",
          total,
          " مقال"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "secondary",
              size: "sm",
              disabled: page <= 1,
              onClick: () => setPage((p) => p - 1),
              className: "p-1.5 h-8 w-8",
              children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "px-3 text-xs font-semibold text-content-body", children: [
            "صفحة ",
            page,
            " من ",
            totalPages
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "secondary",
              size: "sm",
              disabled: page >= totalPages,
              onClick: () => setPage((p) => p + 1),
              className: "p-1.5 h-8 w-8",
              children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: Boolean(deletingPost),
        onClose: () => setDeletingPost(null),
        onConfirm: handleDeleteConfirm,
        title: "تأكيد حذف المقال",
        description: deletingPost ? `هل أنت متأكد من رغبتك في حذف المقال "${deletingPost.title}"؟ لا يمكن التراجع عن هذا الإجراء وسيتم إزالة ارتباط الوسوم نهائياً.` : "",
        confirmText: "حذف المقال نهائياً",
        isDestructive: true,
        isLoading: deleteMutation.isPending
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: isBulkDeleteOpen,
        onClose: () => setIsBulkDeleteOpen(false),
        onConfirm: handleBulkDeleteConfirm,
        title: "تأكيد حذف المقالات المحددة",
        description: `هل أنت متأكد من رغبتك في حذف ${selectedIds.length} مقالات محددة؟ سيتم حذفها نهائياً مع كافة الوسوم المرتبطة بها.`,
        confirmText: `حذف ${selectedIds.length} مقالات نهائياً`,
        isDestructive: true,
        isLoading: bulkDeleteMutation.isPending
      }
    )
  ] });
};
export {
  PostsListPage
};
