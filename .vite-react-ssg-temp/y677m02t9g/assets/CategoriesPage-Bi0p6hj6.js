var _a;
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, Search, Folder, FileText, Edit2, Trash2, Wand2 } from "lucide-react";
import { P as PageHeader, C as ConfirmDialog } from "./index-6EXxYG9x.js";
import { u as useToast, B as Button, D as Dialog, F as FormField } from "../main.mjs";
import { u as useAdminCategories, c as useCreateCategory, d as useUpdateCategory, e as useDeleteCategory, f as categoryFormSchema } from "./useBlogTaxonomy-COB38oJP.js";
import { g as generateSlug } from "./blogAdminService-DtY0JHBt.js";
import "react-router-dom";
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
import "./rebuild-aq1DCH4-.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/admin/blog/CategoriesPage.tsx");
const CategoriesPage = () => {
  const { success, error: toastError } = useToast();
  const { data: categories = [], isLoading } = useAdminCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const [search, setSearch] = useState("");
  const [editingCategory, setEditingCategory] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [formErrors, setFormErrors] = useState({});
  const resetForm = () => {
    setNameAr("");
    setNameEn("");
    setSlug("");
    setDescriptionAr("");
    setDescriptionEn("");
    setSeoTitle("");
    setSeoDescription("");
    setSortOrder(0);
    setFormErrors({});
  };
  const handleOpenCreate = () => {
    resetForm();
    setEditingCategory(null);
    setIsCreateOpen(true);
  };
  const handleOpenEdit = (category) => {
    setEditingCategory(category);
    setNameAr(category.name_ar || "");
    setNameEn(category.name_en || "");
    setSlug(category.slug || "");
    setDescriptionAr(category.description_ar || "");
    setDescriptionEn(category.description_en || "");
    setSeoTitle(category.seo_title || "");
    setSeoDescription(category.seo_description || "");
    setSortOrder(category.sort_order || 0);
    setFormErrors({});
    setIsCreateOpen(true);
  };
  const handleAutoSlug = () => {
    const source = nameEn.trim() || nameAr.trim();
    if (!source) return;
    const generated = generateSlug(source);
    setSlug(generated);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    const formData = {
      name_ar: nameAr.trim(),
      name_en: nameEn.trim() || null,
      slug: slug.trim(),
      description_ar: descriptionAr.trim() || null,
      description_en: descriptionEn.trim() || null,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      sort_order: Number(sortOrder) || 0
    };
    const validation = categoryFormSchema.safeParse(formData);
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.errors.forEach((err) => {
        const fieldName = String(err.path[0]);
        fieldErrors[fieldName] = err.message;
      });
      setFormErrors(fieldErrors);
      return;
    }
    try {
      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          data: formData
        });
        success("تم تحديث التصنيف بنجاح");
      } else {
        await createMutation.mutateAsync(formData);
        success("تم إنشاء التصنيف بنجاح");
      }
      setIsCreateOpen(false);
      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حفظ التصنيف", msg);
    }
  };
  const handleDelete = async () => {
    if (!deletingCategory) return;
    try {
      await deleteMutation.mutateAsync(deletingCategory.id);
      success("تم حذف التصنيف بنجاح");
      setDeletingCategory(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حذف التصنيف", msg);
    }
  };
  const filteredCategories = categories.filter((cat) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return cat.name_ar.toLowerCase().includes(q) || cat.name_en && cat.name_en.toLowerCase().includes(q) || cat.slug.toLowerCase().includes(q);
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "تصنيفات المدونة",
        description: "إدارة تصنيفات مقالات وأخبار المصاعد وتخصيص الروابط ومعلومات SEO الخاصة بكل قسم.",
        actions: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleOpenCreate,
            variant: "primary",
            className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2",
            leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4", "aria-hidden": "true" }),
            children: "تصنيف جديد"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-4 flex items-center justify-between gap-4 shadow-2xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1 max-w-md", children: [
        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-content-muted" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "بحث في التصنيفات بالاسم أو الرابط...",
            className: "w-full ps-9 pe-4 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-content-muted", children: [
        "إجمالي التصنيفات: ",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-content-heading", children: categories.length })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border border-surface-border rounded-card overflow-hidden shadow-xs", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل التصنيفات..." }) : filteredCategories.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center space-y-3", children: [
      /* @__PURE__ */ jsx(Folder, { className: "w-10 h-10 text-content-muted mx-auto" }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-content-heading", children: "لا توجد تصنيفات حالياً" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted max-w-sm mx-auto", children: search ? "لا توجد نتائج تطابق بحثك" : "ابدأ بإضافة تصنيف لتنظيم المقالات والأخبار." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-start text-xs border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-surface-soft border-b border-surface-border text-content-muted font-bold", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الاسم بالعربية" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الاسم بالإنجليزية" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الرابط اللطيف (Slug)" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "عدد المقالات" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "الترتيب" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-end", children: "الإجراءات" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-surface-border", children: filteredCategories.map((category) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "hover:bg-surface-soft/50 transition-colors",
          children: [
            /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 font-bold text-content-heading", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Folder, { className: "w-4 h-4 text-brand-600 shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: category.name_ar })
              ] }),
              category.description_ar && /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted font-normal mt-0.5 line-clamp-1", children: category.description_ar })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-content-body font-mono text-xs", children: category.name_en || "—" }),
            /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 text-content-muted font-mono text-xs", children: [
              "/blog/category/",
              category.slug
            ] }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-3 h-3 me-1" }),
              category.posts_count || 0
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center text-content-body font-medium", children: category.sort_order }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-end", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleOpenEdit(category),
                  className: "p-1.5 text-content-muted hover:text-brand-600 hover:bg-surface-soft rounded-control transition-colors",
                  title: "تعديل التصنيف",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDeletingCategory(category),
                  className: "p-1.5 text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 rounded-control transition-colors",
                  title: "حذف التصنيف",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] }) })
          ]
        },
        category.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        isOpen: isCreateOpen,
        onClose: () => setIsCreateOpen(false),
        title: editingCategory ? "تعديل التصنيف" : "إضافة تصنيف جديد",
        children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsx(FormField, { label: "الاسم بالعربية", required: true, error: formErrors.name_ar, children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: nameAr,
                onChange: (e) => setNameAr(e.target.value),
                placeholder: "مثال: صيانة المصاعد",
                className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            ) }),
            /* @__PURE__ */ jsx(FormField, { label: "الاسم بالإنجليزية (اختياري)", error: formErrors.name_en, children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                dir: "ltr",
                value: nameEn,
                onChange: (e) => setNameEn(e.target.value),
                placeholder: "e.g. Elevator Maintenance",
                className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs(FormField, { label: "الرابط اللطيف (Slug)", required: true, error: formErrors.slug, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  dir: "ltr",
                  value: slug,
                  onChange: (e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-")),
                  placeholder: "elevator-maintenance",
                  className: "flex-1 px-3 py-2 text-xs font-mono rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  onClick: handleAutoSlug,
                  title: "توليد تلقائي من الاسم",
                  className: "shrink-0 px-3 text-xs",
                  children: [
                    /* @__PURE__ */ jsx(Wand2, { className: "w-4 h-4 me-1" }),
                    /* @__PURE__ */ jsx("span", { children: "توليد" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted mt-1", children: "حروف إنجليزية صغيرة وأرقام وشرطات فقط (-)." })
          ] }),
          /* @__PURE__ */ jsx(FormField, { label: "الوصف بالعربية (اختياري)", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              value: descriptionAr,
              onChange: (e) => setDescriptionAr(e.target.value),
              placeholder: "وصف مختصر لموضوعات هذا التصنيف...",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "الوصف بالإنجليزية (اختياري)", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              dir: "ltr",
              value: descriptionEn,
              onChange: (e) => setDescriptionEn(e.target.value),
              placeholder: "Short description of this category...",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsx(FormField, { label: "عنوان SEO (اختياري)", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: seoTitle,
                onChange: (e) => setSeoTitle(e.target.value),
                placeholder: "عنوان مخصص لمحركات البحث",
                className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            ) }),
            /* @__PURE__ */ jsx(FormField, { label: "ترتيب الظهور", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: sortOrder,
                onChange: (e) => setSortOrder(Number(e.target.value)),
                className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-surface-border-subtle", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                onClick: () => setIsCreateOpen(false),
                children: "إلغاء"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                className: "bg-brand-600 hover:bg-brand-700 text-white font-bold",
                disabled: createMutation.isPending || updateMutation.isPending,
                children: editingCategory ? "حفظ التعديلات" : "إنشاء التصنيف"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: Boolean(deletingCategory),
        onClose: () => setDeletingCategory(null),
        onConfirm: handleDelete,
        title: "تأكيد حذف التصنيف",
        description: deletingCategory ? `هل أنت متأكد من رغبتك في حذف التصنيف "${deletingCategory.name_ar}"؟${deletingCategory.posts_count && deletingCategory.posts_count > 0 ? ` تنبيه: يوجد حالياً ${deletingCategory.posts_count} مقالاً مرتبطاً بهذا التصنيف وسيتم فك ارتباطها.` : ""}` : "",
        confirmText: "حذف التصنيف",
        isDestructive: true,
        isLoading: deleteMutation.isPending
      }
    )
  ] });
};
export {
  CategoriesPage
};
