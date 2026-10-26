var _a;
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, Search, Tag, FileText, Edit2, Trash2, Wand2 } from "lucide-react";
import { P as PageHeader, C as ConfirmDialog } from "./index-6EXxYG9x.js";
import { u as useToast, B as Button, D as Dialog, F as FormField } from "../main.mjs";
import { a as useAdminTags, b as useCreateTag, g as useUpdateTag, h as useDeleteTag, t as tagFormSchema } from "./useBlogTaxonomy-COB38oJP.js";
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
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/admin/blog/TagsPage.tsx");
const TagsPage = () => {
  const { success, error: toastError } = useToast();
  const { data: tags = [], isLoading } = useAdminTags();
  const createMutation = useCreateTag();
  const updateMutation = useUpdateTag();
  const deleteMutation = useDeleteTag();
  const [search, setSearch] = useState("");
  const [editingTag, setEditingTag] = useState(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [deletingTag, setDeletingTag] = useState(null);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [slug, setSlug] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const resetForm = () => {
    setNameAr("");
    setNameEn("");
    setSlug("");
    setFormErrors({});
  };
  const handleOpenCreate = () => {
    resetForm();
    setEditingTag(null);
    setIsCreateOpen(true);
  };
  const handleOpenEdit = (tag) => {
    setEditingTag(tag);
    setNameAr(tag.name_ar || "");
    setNameEn(tag.name_en || "");
    setSlug(tag.slug || "");
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
      slug: slug.trim()
    };
    const validation = tagFormSchema.safeParse(formData);
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
      if (editingTag) {
        await updateMutation.mutateAsync({
          id: editingTag.id,
          data: formData
        });
        success("تم تحديث الوسم بنجاح");
      } else {
        await createMutation.mutateAsync(formData);
        success("تم إنشاء الوسم بنجاح");
      }
      setIsCreateOpen(false);
      resetForm();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حفظ الوسم", msg);
    }
  };
  const handleDelete = async () => {
    if (!deletingTag) return;
    try {
      await deleteMutation.mutateAsync(deletingTag.id);
      success("تم حذف الوسم بنجاح");
      setDeletingTag(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حذف الوسم", msg);
    }
  };
  const filteredTags = tags.filter((t) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return t.name_ar.toLowerCase().includes(q) || t.name_en && t.name_en.toLowerCase().includes(q) || t.slug.toLowerCase().includes(q);
  });
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "الوسوم والكلمات الدلالية",
        description: "إدارة وسوم المقالات لتسهيل تصنيف المقالات التقنية وربطها بالكلمات المفتاحية.",
        actions: /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleOpenCreate,
            variant: "primary",
            className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2",
            leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4", "aria-hidden": "true" }),
            children: "وسم جديد"
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
            placeholder: "بحث في الوسوم بالاسم أو الرابط...",
            className: "w-full ps-9 pe-4 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-xs text-content-muted", children: [
        "إجمالي الوسوم: ",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-content-heading", children: tags.length })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-white border border-surface-border rounded-card overflow-hidden shadow-xs", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل الوسوم..." }) : filteredTags.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center space-y-3", children: [
      /* @__PURE__ */ jsx(Tag, { className: "w-10 h-10 text-content-muted mx-auto" }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-content-heading", children: "لا توجد وسوم حالياً" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted max-w-sm mx-auto", children: search ? "لا توجد نتائج تطابق بحثك" : "ابدأ بإضافة وسوم لربط مقالات المدونة ببعضها." })
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-start text-xs border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { className: "bg-surface-soft border-b border-surface-border text-content-muted font-bold", children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الاسم بالعربية" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الاسم بالإنجليزية" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الرابط اللطيف (Slug)" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "عدد المقالات" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-end", children: "الإجراءات" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-surface-border", children: filteredTags.map((tag) => /* @__PURE__ */ jsxs(
        "tr",
        {
          className: "hover:bg-surface-soft/50 transition-colors",
          children: [
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 font-bold text-content-heading", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Tag, { className: "w-4 h-4 text-brand-600 shrink-0" }),
              /* @__PURE__ */ jsx("span", { children: tag.name_ar })
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-content-body font-mono text-xs", children: tag.name_en || "—" }),
            /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 text-content-muted font-mono text-xs", children: [
              "#",
              tag.slug
            ] }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center", children: /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 border border-brand-200", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-3 h-3 me-1" }),
              tag.posts_count || 0
            ] }) }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-end", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-1", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleOpenEdit(tag),
                  className: "p-1.5 text-content-muted hover:text-brand-600 hover:bg-surface-soft rounded-control transition-colors",
                  title: "تعديل الوسم",
                  children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setDeletingTag(tag),
                  className: "p-1.5 text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 rounded-control transition-colors",
                  title: "حذف الوسم",
                  children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                }
              )
            ] }) })
          ]
        },
        tag.id
      )) })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        isOpen: isCreateOpen,
        onClose: () => setIsCreateOpen(false),
        title: editingTag ? "تعديل الوسم" : "إضافة وسم جديد",
        children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsx(FormField, { label: "اسم الوسم بالعربية", required: true, error: formErrors.name_ar, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: nameAr,
              onChange: (e) => setNameAr(e.target.value),
              placeholder: "مثال: قطع غيار",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "اسم الوسم بالإنجليزية (اختياري)", error: formErrors.name_en, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              dir: "ltr",
              value: nameEn,
              onChange: (e) => setNameEn(e.target.value),
              placeholder: "e.g. Spare Parts",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
            }
          ) }),
          /* @__PURE__ */ jsxs(FormField, { label: "الرابط اللطيف (Slug)", required: true, error: formErrors.slug, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  dir: "ltr",
                  value: slug,
                  onChange: (e) => setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-")),
                  placeholder: "spare-parts",
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
                children: editingTag ? "حفظ التعديلات" : "إنشاء الوسم"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: Boolean(deletingTag),
        onClose: () => setDeletingTag(null),
        onConfirm: handleDelete,
        title: "تأكيد حذف الوسم",
        description: deletingTag ? `هل أنت متأكد من رغبتك في حذف الوسم "#${deletingTag.name_ar}"؟${deletingTag.posts_count && deletingTag.posts_count > 0 ? ` تنبيه: هذا الوسم مرتبط حالياً بـ ${deletingTag.posts_count} مقالاً وسيتم إزالته منها.` : ""}` : "",
        confirmText: "حذف الوسم",
        isDestructive: true,
        isLoading: deleteMutation.isPending
      }
    )
  ] });
};
export {
  TagsPage
};
