var _a;
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Briefcase, ArrowUp, ArrowDown, Image, CheckCircle, EyeOff, ExternalLink, Edit2, Trash2 } from "lucide-react";
import { P as PageHeader, C as ConfirmDialog } from "./index-6EXxYG9x.js";
import { u as useToast, B as Button, g as getStoragePublicUrl } from "../main.mjs";
import { u as useAdminWorks, a as useToggleWorkPublish, b as useReorderWorks, c as useDeleteWork, S as SERVICE_TYPE_OPTIONS } from "./useAdminWorks-B4dAFM1p.js";
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
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/admin/works/WorksListPage.tsx");
const WorksListPage = () => {
  const { success, error: toastError } = useToast();
  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [deletingWork, setDeletingWork] = useState(null);
  const { data, isLoading } = useAdminWorks({
    search: search || void 0,
    serviceType: serviceFilter,
    status: statusFilter,
    page,
    limit: 20
  });
  const togglePublishMutation = useToggleWorkPublish();
  const reorderMutation = useReorderWorks();
  const deleteMutation = useDeleteWork();
  const works = (data == null ? void 0 : data.works) || [];
  const total = (data == null ? void 0 : data.total) || 0;
  const totalPages = Math.ceil(total / 20) || 1;
  const handleTogglePublish = async (work) => {
    try {
      await togglePublishMutation.mutateAsync({
        id: work.id,
        is_published: !work.is_published
      });
      success(
        !work.is_published ? "تم نشر المشروع بنجاح" : "تم إلغاء نشر المشروع",
        REBUILD_NOTICE
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل تغيير حالة النشر", msg);
    }
  };
  const handleMove = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= works.length) return;
    const newOrder = [...works];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    const orderedIds = newOrder.map((w) => w.id);
    try {
      await reorderMutation.mutateAsync(orderedIds);
      success("تم تحديث ترتيب المشاريع", REBUILD_NOTICE);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل تحديث الترتيب", msg);
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deletingWork) return;
    try {
      await deleteMutation.mutateAsync(deletingWork.id);
      success("تم حذف المشروع بنجاح", deletingWork.is_published ? REBUILD_NOTICE : void 0);
      setDeletingWork(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حذف المشروع", msg);
    }
  };
  const getServiceLabel = (type) => {
    const option = SERVICE_TYPE_OPTIONS.find((o) => o.value === type);
    return (option == null ? void 0 : option.labelAr) || type;
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "المشاريع وسابقة الأعمال",
        description: "إدارة وتوثيق مشاريع المصاعد المنجزة والتحكم في ظهورها وترتيبها على الموقع.",
        backTo: "/admin",
        backLabel: "الرئيسية",
        actions: /* @__PURE__ */ jsx(
          Button,
          {
            to: "/admin/works/new",
            variant: "primary",
            className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2",
            leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4", "aria-hidden": "true" }),
            children: "مشروع جديد"
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-card border border-surface-border shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-80", children: [
        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-content-muted" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "search",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setPage(1);
            },
            placeholder: "البحث بالاسم أو المدينة أو الرابط...",
            className: "w-full ps-9 pe-4 py-2 text-xs border border-surface-border rounded-control focus:outline-none focus:border-brand-600 bg-surface-soft/40"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: serviceFilter,
            onChange: (e) => {
              setServiceFilter(e.target.value);
              setPage(1);
            },
            "aria-label": "تصفية حسب نوع الخدمة",
            className: "text-xs border border-surface-border rounded-control py-2 px-3 bg-white text-content-heading focus:outline-none focus:border-brand-600",
            children: [
              /* @__PURE__ */ jsx("option", { value: "all", children: "كل الخدمات" }),
              SERVICE_TYPE_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.labelAr }, opt.value))
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: statusFilter,
            onChange: (e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            },
            "aria-label": "تصفية حسب حالة النشر",
            className: "text-xs border border-surface-border rounded-control py-2 px-3 bg-white text-content-heading focus:outline-none focus:border-brand-600",
            children: [
              /* @__PURE__ */ jsxs("option", { value: "all", children: [
                "كل الحالات (",
                total,
                ")"
              ] }),
              /* @__PURE__ */ jsx("option", { value: "published", children: "منشور فقط" }),
              /* @__PURE__ */ jsx("option", { value: "draft", children: "مسودة فقط" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-surface-border overflow-hidden shadow-xs", children: [
      isLoading ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل قائمة المشاريع..." }) : works.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center space-y-3", children: [
        /* @__PURE__ */ jsx(Briefcase, { className: "w-10 h-10 text-content-muted mx-auto" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-content-heading", children: "لا توجد مشاريع مطابقة" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted max-w-sm mx-auto", children: "لم يتم العثور على أي مشروع مطابق لمعايير البحث الحالية. يمكنك إضافة مشروع جديد للبدء." }),
        /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
          Button,
          {
            to: "/admin/works/new",
            variant: "primary",
            className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2",
            leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4", "aria-hidden": "true" }),
            children: "إضافة أول مشروع"
          }
        ) })
      ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-start text-xs border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-surface-soft border-b border-surface-border text-content-muted font-bold text-start", children: [
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 w-12 text-center", children: "الترتيب" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 w-16", children: "الغلاف" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "اسم المشروع" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "الخدمة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "الموقع والسنة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "الحالة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "تاريخ الإضافة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-end", children: "إجراءات" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-surface-border", children: works.map((work, index) => {
          var _a2, _b;
          const coverUrl = ((_a2 = work.cover_media) == null ? void 0 : _a2.storage_path) ? getStoragePublicUrl(work.cover_media.storage_path) : null;
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: "hover:bg-surface-soft/40 transition-colors",
              children: [
                /* @__PURE__ */ jsx("td", { className: "py-3 px-2 text-center", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex flex-col items-center", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleMove(index, "up"),
                      disabled: index === 0 || reorderMutation.isPending,
                      className: "p-1 text-content-muted hover:text-brand-600 disabled:opacity-20 transition-colors",
                      title: "تحريك لأعلى",
                      "aria-label": "تحريك لأعلى",
                      children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-3.5 h-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-content-muted", children: work.sort_order }),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleMove(index, "down"),
                      disabled: index === works.length - 1 || reorderMutation.isPending,
                      className: "p-1 text-content-muted hover:text-brand-600 disabled:opacity-20 transition-colors",
                      title: "تحريك لأسفل",
                      "aria-label": "تحريك لأسفل",
                      children: /* @__PURE__ */ jsx(ArrowDown, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-control bg-surface-soft border border-surface-border overflow-hidden flex items-center justify-center shrink-0", children: coverUrl ? /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: coverUrl,
                    alt: ((_b = work.cover_media) == null ? void 0 : _b.alt_text) || work.title_ar,
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsx(Image, { className: "w-5 h-5 text-content-muted" }) }) }),
                /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 min-w-[200px]", children: [
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: `/admin/works/${work.id}`,
                      className: "font-bold text-content-heading hover:text-brand-600 transition-colors block text-xs",
                      children: work.title_ar
                    }
                  ),
                  work.title_en && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block mt-0.5", children: work.title_en }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-mono text-content-muted bg-surface-soft px-1.5 py-0.5 rounded-sm inline-block mt-1", children: [
                    "/",
                    work.slug
                  ] })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-brand-50 text-brand-700 border border-brand-200", children: getServiceLabel(work.service_type) }) }),
                /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx("p", { className: "text-content-heading font-medium", children: work.location_ar || "—" }),
                  /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted", children: work.completed_year ? `عام ${work.completed_year}` : "غير محدد" })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center whitespace-nowrap", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleTogglePublish(work),
                    disabled: togglePublishMutation.isPending,
                    className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${work.is_published ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-surface-soft text-content-muted border-surface-border hover:bg-surface-border/60"}`,
                    children: work.is_published ? /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3 text-emerald-600" }),
                      /* @__PURE__ */ jsx("span", { children: "منشور" })
                    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                      /* @__PURE__ */ jsx(EyeOff, { className: "w-3 h-3 text-content-muted" }),
                      /* @__PURE__ */ jsx("span", { children: "مسودة" })
                    ] })
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center whitespace-nowrap text-content-muted text-[11px]", children: new Date(work.created_at).toLocaleDateString("ar-SA") }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-end whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1", children: [
                  work.is_published && /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: `/works/${work.slug}`,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "p-1.5 rounded-control text-content-muted hover:text-brand-600 hover:bg-surface-soft transition-colors",
                      title: "معاينة الصفحة العامة",
                      "aria-label": "معاينة",
                      children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Link,
                    {
                      to: `/admin/works/${work.id}`,
                      className: "p-1.5 rounded-control text-content-muted hover:text-brand-600 hover:bg-surface-soft transition-colors",
                      title: "تعديل المشروع",
                      "aria-label": "تعديل",
                      children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeletingWork(work),
                      className: "p-1.5 rounded-control text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 transition-colors",
                      title: "حذف المشروع",
                      "aria-label": "حذف",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ]
            },
            work.id
          );
        }) })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-surface-border flex items-center justify-between text-xs text-content-muted", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "إجمالي المشاريع: ",
          /* @__PURE__ */ jsx("strong", { children: total }),
          " (صفحة ",
          page,
          " من ",
          totalPages,
          ")"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setPage((p) => Math.max(1, p - 1)),
              disabled: page <= 1,
              children: "السابق"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
              disabled: page >= totalPages,
              children: "التالي"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: Boolean(deletingWork),
        onClose: () => setDeletingWork(null),
        onConfirm: handleDeleteConfirm,
        title: "تأكيد حذف المشروع",
        description: `هل أنت متأكد من رغبتك في حذف المشروع "${deletingWork == null ? void 0 : deletingWork.title_ar}" نهائياً؟ لن يتم حذف الصور المرتبطة به من مكتبة الوسائط.`,
        confirmText: "حذف المشروع",
        cancelText: "إلغاء",
        isLoading: deleteMutation.isPending
      }
    )
  ] });
};
export {
  WorksListPage
};
