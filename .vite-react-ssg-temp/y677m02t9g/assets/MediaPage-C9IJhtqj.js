var _a, _b, _c, _d, _e, _f;
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useRef, useState, useEffect } from "react";
import { Search, LayoutGrid, List, Folder, Filter, ArrowUpDown, Image, Plus, FileText, Check, AlertTriangle, Eye, X, Copy, ExternalLink, HardDrive, Layers, Calendar, Save, Info, RefreshCw, Trash2, FolderInput, CheckSquare, Square, ChevronRight, ChevronLeft } from "lucide-react";
import { u as useMediaUsage, a as useUpdateMedia, b as useDeleteMedia, C as ConfirmDialog, r as replaceMediaFile, c as useMediaList, d as useBulkDeleteMedia, e as useBulkMoveMedia, P as PageHeader, M as MediaUploadModal } from "./index-6EXxYG9x.js";
import { g as getStoragePublicUrl, u as useToast, B as Button } from "../main.mjs";
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
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/media/components/MediaFilters.tsx");
const FOLDER_OPTIONS = [
  { value: "all", label: "جميع المجلدات" },
  { value: "general", label: "عام (General)" },
  { value: "blog", label: "المدونة (Blog)" },
  { value: "works", label: "المشاريع (Works)" },
  { value: "partners", label: "الشركاء (Partners)" },
  { value: "branding", label: "الهوية (Branding)" }
];
const TYPE_OPTIONS = [
  { value: "all", label: "جميع الأنواع" },
  { value: "image", label: "الصور فقط" },
  { value: "pdf", label: "المستندات (PDF)" }
];
const SORT_OPTIONS = [
  { value: "newest", label: "الأحدث أولاً" },
  { value: "oldest", label: "الأقدم أولاً" },
  { value: "name_asc", label: "الاسم (أ - ي)" },
  { value: "name_desc", label: "الاسم (ي - أ)" },
  { value: "size_desc", label: "الأكبر حجماً" },
  { value: "size_asc", label: "الأصغر حجماً" }
];
const MediaFilters = ({
  filter,
  onChange,
  viewMode,
  onViewModeChange,
  totalCount
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "bg-white border border-sand-200 rounded-xl p-4 shadow-subtle mb-6 space-y-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
        /* @__PURE__ */ jsx(Search, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400 pointer-events-none" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: filter.search,
            onChange: (e) => onChange({ ...filter, search: e.target.value }),
            placeholder: "بحث بالاسم، العنوان، أو النص البديل...",
            className: "w-full ps-9 pe-4 py-2 border border-sand-300 rounded-lg text-sm bg-sand-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-colors"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between md:justify-end gap-3", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-xs text-sand-500 font-medium", children: [
          totalCount,
          " عنصر"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center p-0.5 bg-sand-100 rounded-lg border border-sand-200", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onViewModeChange("grid"),
              className: `p-1.5 rounded-md text-sm transition-colors ${viewMode === "grid" ? "bg-white text-sand-900 shadow-sm" : "text-sand-600 hover:text-sand-900"}`,
              title: "عرض كشبكة",
              "aria-label": "عرض كشبكة",
              children: /* @__PURE__ */ jsx(LayoutGrid, { className: "w-4 h-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onViewModeChange("list"),
              className: `p-1.5 rounded-md text-sm transition-colors ${viewMode === "list" ? "bg-white text-sand-900 shadow-sm" : "text-sand-600 hover:text-sand-900"}`,
              title: "عرض كقائمة",
              "aria-label": "عرض كقائمة",
              children: /* @__PURE__ */ jsx(List, { className: "w-4 h-4" })
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 pt-3 border-t border-sand-100 text-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 min-w-[160px]", children: [
        /* @__PURE__ */ jsx(Folder, { className: "w-3.5 h-3.5 text-sand-500" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: filter.folder,
            onChange: (e) => onChange({ ...filter, folder: e.target.value }),
            className: "w-full bg-white border border-sand-300 rounded-md py-1.5 px-2 text-xs text-sand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
            children: FOLDER_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 min-w-[140px]", children: [
        /* @__PURE__ */ jsx(Filter, { className: "w-3.5 h-3.5 text-sand-500" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: filter.type,
            onChange: (e) => onChange({ ...filter, type: e.target.value }),
            className: "w-full bg-white border border-sand-300 rounded-md py-1.5 px-2 text-xs text-sand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
            children: TYPE_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 min-w-[160px]", children: [
        /* @__PURE__ */ jsx(ArrowUpDown, { className: "w-3.5 h-3.5 text-sand-500" }),
        /* @__PURE__ */ jsx(
          "select",
          {
            value: filter.sort,
            onChange: (e) => onChange({ ...filter, sort: e.target.value }),
            className: "w-full bg-white border border-sand-300 rounded-md py-1.5 px-2 text-xs text-sand-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
            children: SORT_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.label }, opt.value))
          }
        )
      ] }),
      (filter.search || filter.folder !== "all" || filter.type !== "all" || filter.sort !== "newest") && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => onChange({
            search: "",
            folder: "all",
            type: "all",
            sort: "newest"
          }),
          className: "ms-auto text-brand-600 hover:text-brand-700 hover:underline font-medium text-xs py-1",
          children: "إعادة تعيين الفلاتر"
        }
      )
    ] })
  ] });
};
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/media/components/MediaGrid.tsx");
const MediaGrid = ({
  items,
  selectedIds,
  onToggleSelect,
  onItemClick,
  onUploadClick,
  isLoading = false
}) => {
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "animate-pulse rounded-xl border border-sand-200 bg-sand-100/60 aspect-square flex flex-col justify-between p-3",
        children: [
          /* @__PURE__ */ jsx("div", { className: "w-4 h-4 bg-sand-200 rounded" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("div", { className: "h-3 bg-sand-200 rounded w-3/4" }),
            /* @__PURE__ */ jsx("div", { className: "h-2 bg-sand-200 rounded w-1/2" })
          ] })
        ]
      },
      i
    )) });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: "p-12 text-center rounded-2xl border border-dashed border-sand-300 bg-sand-50/50", children: [
      /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-sand-100 flex items-center justify-center mx-auto text-sand-400 mb-3", children: /* @__PURE__ */ jsx(Image, { className: "w-6 h-6" }) }),
      /* @__PURE__ */ jsx("h3", { className: "text-sm font-bold text-sand-800", children: "لا توجد ملفات وسائط مطابقة" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-sand-500 mt-1 max-w-sm mx-auto", children: "لم يتم العثور على أي ملفات تناسب الفلاتر المحددة، أو لم يتم رفع أي ملفات وسائط حتى الآن." }),
      onUploadClick && /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: onUploadClick,
          className: "inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-control transition-colors shadow-xs",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "إضافة ملفات جديدة" })
          ]
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4", children: items.map((item) => {
    var _a2;
    const isSelected = selectedIds.includes(item.id);
    const isImage = item.mime_type.startsWith("image/");
    const hasMissingAlt = isImage && !((_a2 = item.alt_text) == null ? void 0 : _a2.trim());
    const publicUrl = getStoragePublicUrl(item.storage_path);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        onClick: () => onItemClick(item),
        className: `group relative rounded-xl border bg-white overflow-hidden transition-all duration-150 cursor-pointer flex flex-col ${isSelected ? "border-brand-600 ring-2 ring-brand-500/20 shadow-sm" : "border-sand-200 hover:border-sand-300 hover:shadow-subtle"}`,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "relative aspect-square w-full bg-sand-100 flex items-center justify-center overflow-hidden border-b border-sand-100", children: [
            isImage ? /* @__PURE__ */ jsx(
              "img",
              {
                src: publicUrl,
                alt: item.alt_text || item.title || item.file_name,
                loading: "lazy",
                className: "w-full h-full object-contain p-2 transition-transform duration-200 group-hover:scale-105"
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center text-sand-400 p-4", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-10 h-10 text-red-500/80 mb-1" }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase tracking-wider text-sand-600", children: "PDF" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  onToggleSelect(item.id);
                },
                className: `absolute top-2 start-2 w-6 h-6 rounded-md flex items-center justify-center transition-colors ${isSelected ? "bg-brand-600 text-white shadow-sm" : "bg-white/80 hover:bg-white text-sand-400 border border-sand-300 opacity-0 group-hover:opacity-100 focus:opacity-100"}`,
                "aria-label": `تحديد ${item.file_name}`,
                children: isSelected && /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 stroke-[2.5]" })
              }
            ),
            hasMissingAlt && /* @__PURE__ */ jsxs(
              "div",
              {
                className: "absolute top-2 end-2 inline-flex items-center gap-1 bg-amber-500/95 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm",
                title: "تحذير سيو: هذه الصورة لا تحتوي على نص بديل (Alt Text)",
                children: [
                  /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3 h-3" }),
                  /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "بدون Alt" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-1.5 start-1.5 inline-flex items-center gap-1 bg-sand-900/70 text-white text-[10px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity", children: [
              /* @__PURE__ */ jsx(Folder, { className: "w-2.5 h-2.5" }),
              /* @__PURE__ */ jsx("span", { children: item.folder })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2.5 space-y-1", children: [
            /* @__PURE__ */ jsx(
              "p",
              {
                className: "text-xs font-semibold text-sand-900 truncate",
                title: item.title || item.file_name,
                children: item.title || item.file_name
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-[11px] text-sand-500", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                (item.size_bytes / 1024).toFixed(0),
                " ك.ب"
              ] }),
              item.width && item.height ? /* @__PURE__ */ jsxs("span", { children: [
                item.width,
                "×",
                item.height
              ] }) : /* @__PURE__ */ jsx("span", { className: "uppercase text-[10px]", children: item.mime_type.split("/")[1] })
            ] })
          ] })
        ]
      },
      item.id
    );
  }) });
};
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/features/media/components/MediaList.tsx");
const MediaList = ({
  items,
  selectedIds,
  onToggleSelect,
  onSelectAll,
  onItemClick,
  isLoading = false
}) => {
  const isAllSelected = items.length > 0 && selectedIds.length === items.length;
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "bg-white border border-sand-200 rounded-xl overflow-hidden shadow-subtle p-6 space-y-4", children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ jsxs("div", { className: "animate-pulse flex items-center gap-4", children: [
      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-sand-200 rounded-lg" }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsx("div", { className: "h-3 bg-sand-200 rounded w-1/3" }),
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-sand-200 rounded w-1/4" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-16 h-4 bg-sand-200 rounded" })
    ] }, i)) });
  }
  if (items.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "p-12 text-center rounded-2xl border border-dashed border-sand-300 bg-sand-50/50", children: /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-sand-800", children: "لا توجد ملفات وسائط مطابقة" }) });
  }
  return /* @__PURE__ */ jsx("div", { className: "bg-white border border-sand-200 rounded-xl overflow-hidden shadow-subtle", children: /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-start text-xs", children: [
    /* @__PURE__ */ jsx("thead", { className: "bg-sand-50 border-b border-sand-200 text-sand-600 font-semibold", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 w-10 text-center", children: /* @__PURE__ */ jsx(
        "input",
        {
          type: "checkbox",
          checked: isAllSelected,
          onChange: onSelectAll,
          className: "rounded border-sand-300 text-brand-600 focus:ring-brand-500/30",
          "aria-label": "تحديد الكل"
        }
      ) }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-3 text-start w-16", children: "المعاينة" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الاسم والعنوان" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "المجلد" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الأبعاد" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "الحجم" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "النص البديل" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-start", children: "تاريخ الرفع" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-end", children: "إجراءات" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-sand-100", children: items.map((item) => {
      var _a2;
      const isSelected = selectedIds.includes(item.id);
      const isImage = item.mime_type.startsWith("image/");
      const publicUrl = getStoragePublicUrl(item.storage_path);
      return /* @__PURE__ */ jsxs(
        "tr",
        {
          onClick: () => onItemClick(item),
          className: `hover:bg-sand-50/70 transition-colors cursor-pointer ${isSelected ? "bg-brand-50/70" : ""}`,
          children: [
            /* @__PURE__ */ jsx(
              "td",
              {
                className: "py-3 px-4 text-center",
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: isSelected,
                    onChange: () => onToggleSelect(item.id),
                    className: "rounded border-sand-300 text-brand-600 focus:ring-brand-500/30",
                    "aria-label": `تحديد ${item.file_name}`
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-lg bg-sand-100 border border-sand-200 overflow-hidden flex items-center justify-center shrink-0", children: isImage ? /* @__PURE__ */ jsx(
              "img",
              {
                src: publicUrl,
                alt: item.alt_text || item.title || item.file_name,
                className: "w-full h-full object-cover",
                loading: "lazy"
              }
            ) : /* @__PURE__ */ jsx(FileText, { className: "w-5 h-5 text-red-500" }) }) }),
            /* @__PURE__ */ jsxs("td", { className: "py-3 px-4", children: [
              /* @__PURE__ */ jsx("div", { className: "font-semibold text-sand-900 truncate max-w-[220px]", children: item.title || item.file_name }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px] text-sand-500 truncate max-w-[220px]", children: item.file_name })
            ] }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsx("span", { className: "inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-sand-100 text-sand-700", children: item.folder }) }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-sand-600 font-mono text-[11px]", children: item.width && item.height ? `${item.width} × ${item.height}` : "—" }),
            /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 text-sand-600", children: [
              (item.size_bytes / 1024).toFixed(0),
              " ك.ب"
            ] }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: isImage ? ((_a2 = item.alt_text) == null ? void 0 : _a2.trim()) ? /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] text-emerald-700", children: [
              /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5" }),
              "متوفر"
            ] }) : /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3 h-3" }),
              "مفقود"
            ] }) : /* @__PURE__ */ jsx("span", { className: "text-sand-400", children: "—" }) }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-sand-500 text-[11px]", children: new Date(item.created_at).toLocaleDateString("ar-SA") }),
            /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-end", children: /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: (e) => {
                  e.stopPropagation();
                  onItemClick(item);
                },
                className: "p-1 rounded-md text-sand-400 hover:text-brand-600 hover:bg-brand-50 transition-colors",
                title: "عرض التفاصيل",
                "aria-label": "عرض التفاصيل",
                children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
              }
            ) })
          ]
        },
        item.id
      );
    }) })
  ] }) }) });
};
(_d = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _d.call(globalThis, "src/features/media/components/MediaDetailPanel.tsx");
const MediaDetailPanel = ({
  media,
  onClose,
  onDeleted
}) => {
  var _a2;
  const { success, error } = useToast();
  const fileInputRef = useRef(null);
  const [altText, setAltText] = useState("");
  const [title, setTitle] = useState("");
  const [folder, setFolder] = useState("general");
  const [isCopied, setIsCopied] = useState(false);
  const [isReplacing, setIsReplacing] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const { data: usageReport, isLoading: isCheckingUsage } = useMediaUsage(
    (media == null ? void 0 : media.id) || null,
    (media == null ? void 0 : media.storage_path) || null
  );
  const updateMutation = useUpdateMedia();
  const deleteMutation = useDeleteMedia();
  useEffect(() => {
    if (media) {
      setAltText(media.alt_text || "");
      setTitle(media.title || "");
      setFolder(media.folder || "general");
      setIsCopied(false);
    }
  }, [media]);
  if (!media) return null;
  const isImage = media.mime_type.startsWith("image/");
  const publicUrl = getStoragePublicUrl(media.storage_path);
  const hasMissingAlt = isImage && !altText.trim();
  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      setIsCopied(true);
      success("تم نسخ الرابط", "تم نسخ رابط الملف المباشر إلى الحافظة بنجاح.");
      setTimeout(() => setIsCopied(false), 2e3);
    } catch {
      error("تعذر النسخ", "يرجى نسخ الرابط يدوياً.");
    }
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await updateMutation.mutateAsync({
        id: media.id,
        updates: {
          alt_text: altText.trim() || null,
          title: title.trim() || null,
          folder
        }
      });
      success("تم الحفظ", "تم تحديث بيانات الملف بنجاح.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "فشل التحديث";
      error("خطأ", msg);
    }
  };
  const handleReplaceFile = async (e) => {
    var _a3;
    const file = (_a3 = e.target.files) == null ? void 0 : _a3[0];
    if (!file) return;
    setIsReplacing(true);
    try {
      await replaceMediaFile(media.id, file);
      success("تم استبدال الملف", "تم تحديث ملف الوسائط وتوليد الأحجام الجديدة بنجاح.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "فشل الاستبدال";
      error("فشل الاستبدال", msg);
    } finally {
      setIsReplacing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };
  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync({
        id: media.id,
        force: true
        // User confirmed via dialog
      });
      success("تم حذف الملف", "تم إزالة الملف وكافة أحجامه من التخزين وقاعدة البيانات.");
      setIsConfirmDeleteOpen(false);
      onDeleted == null ? void 0 : onDeleted();
      onClose();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "فشل الحذف";
      error("تعذر الحذف", msg);
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-40 bg-sand-900/40 backdrop-blur-xs transition-opacity",
        onClick: onClose,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsxs(
      "div",
      {
        className: "fixed inset-y-0 end-0 z-50 w-full max-w-md bg-white shadow-elevated border-s border-sand-200 flex flex-col animate-in slide-in-from-right duration-200",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "detail-panel-title",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-sand-100 bg-sand-50/50", children: [
            /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsx("h2", { id: "detail-panel-title", className: "text-sm font-bold text-sand-900 truncate", children: title || media.file_name }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-sand-500 font-mono truncate", children: media.storage_path })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1.5 rounded-lg text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors",
                "aria-label": "إغلاق اللوحة",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "relative rounded-xl border border-sand-200 bg-sand-100/70 p-3 flex items-center justify-center min-h-[200px] max-h-[260px] overflow-hidden", children: isImage ? /* @__PURE__ */ jsx(
              "img",
              {
                src: publicUrl,
                alt: altText || title || media.file_name,
                className: "max-h-[230px] w-auto object-contain rounded-lg shadow-xs"
              }
            ) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-6 text-sand-500", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-14 h-14 text-red-500 mb-2" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-sand-800", children: "مستند PDF" }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-sand-500", children: media.file_name })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: handleCopyUrl,
                  className: "flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-800 transition-colors",
                  children: isCopied ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-emerald-600" }),
                    /* @__PURE__ */ jsx("span", { children: "تم النسخ!" })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(Copy, { className: "w-3.5 h-3.5 text-sand-500" }),
                    /* @__PURE__ */ jsx("span", { children: "نسخ الرابط المباشر" })
                  ] })
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  href: publicUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "p-2 rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-700 transition-colors",
                  title: "فتح في نافذة جديدة",
                  children: /* @__PURE__ */ jsx(ExternalLink, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs p-3.5 rounded-xl bg-sand-50 border border-sand-200", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sand-600", children: [
                /* @__PURE__ */ jsx(HardDrive, { className: "w-3.5 h-3.5 text-sand-400 shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "الحجم:" }),
                /* @__PURE__ */ jsxs("strong", { className: "text-sand-900 font-medium", children: [
                  (media.size_bytes / 1024).toFixed(1),
                  " ك.ب"
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sand-600", children: [
                /* @__PURE__ */ jsx(Layers, { className: "w-3.5 h-3.5 text-sand-400 shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "الأبعاد:" }),
                /* @__PURE__ */ jsx("strong", { className: "text-sand-900 font-medium", children: media.width && media.height ? `${media.width} × ${media.height}` : "غير محدد" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sand-600", children: [
                /* @__PURE__ */ jsx(Calendar, { className: "w-3.5 h-3.5 text-sand-400 shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "تاريخ الرفع:" }),
                /* @__PURE__ */ jsx("strong", { className: "text-sand-900 font-medium", children: new Date(media.created_at).toLocaleDateString("ar-SA") })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sand-600", children: [
                /* @__PURE__ */ jsx(Folder, { className: "w-3.5 h-3.5 text-sand-400 shrink-0" }),
                /* @__PURE__ */ jsx("span", { children: "الامتداد:" }),
                /* @__PURE__ */ jsx("strong", { className: "text-sand-900 font-medium uppercase", children: media.mime_type.split("/")[1] })
              ] })
            ] }),
            hasMissingAlt && /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-amber-600 shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold", children: "تنبيه سيو: الصورة تفتقر إلى النص البديل" }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-amber-800 mt-0.5", children: "وجود نص بديل معبر أمر ضروري لمحركات البحث ولإمكانية الوصول للمستخدمين ذوي الإعاقة البصرية." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("label", { className: "block text-xs font-semibold text-sand-800 mb-1", children: [
                  "النص البديل (Alt Text) ",
                  isImage && /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                ] }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: altText,
                    onChange: (e) => setAltText(e.target.value),
                    rows: 2,
                    placeholder: "صف محتوى الصورة بدقة لمساعدة محركات البحث...",
                    className: `w-full px-3 py-2 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 ${hasMissingAlt ? "border-amber-300 focus:ring-amber-400/30" : "border-sand-300 focus:ring-brand-500/20 focus:border-brand-500"}`
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-sand-800 mb-1", children: "عنوان الملف / التسمية التوضيحية" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: title,
                    onChange: (e) => setTitle(e.target.value),
                    placeholder: "عنوان تعريفي للملف...",
                    className: "w-full px-3 py-2 text-xs rounded-lg border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-xs font-semibold text-sand-800 mb-1", children: "المجلد" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: folder,
                    onChange: (e) => setFolder(e.target.value),
                    className: "w-full px-3 py-2 text-xs rounded-lg border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "general", children: "عام (General)" }),
                      /* @__PURE__ */ jsx("option", { value: "blog", children: "المدونة (Blog)" }),
                      /* @__PURE__ */ jsx("option", { value: "works", children: "المشاريع (Works)" }),
                      /* @__PURE__ */ jsx("option", { value: "partners", children: "الشركاء (Partners)" }),
                      /* @__PURE__ */ jsx("option", { value: "branding", children: "الهوية والعلامة التجارية (Branding)" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  variant: "primary",
                  size: "sm",
                  fullWidth: true,
                  disabled: updateMutation.isPending,
                  isLoading: updateMutation.isPending,
                  leftIcon: /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
                  className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs py-2",
                  children: "حفظ التعديلات"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-sand-200 space-y-2", children: [
              /* @__PURE__ */ jsxs("h3", { className: "text-xs font-bold text-sand-900 flex items-center justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: "أماكن استخدام الملف (Used in)" }),
                isCheckingUsage && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-sand-400 font-normal", children: "جاري الفحص..." })
              ] }),
              (usageReport == null ? void 0 : usageReport.isUsed) ? /* @__PURE__ */ jsx("div", { className: "space-y-1.5", children: /* @__PURE__ */ jsxs("div", { className: "p-2.5 rounded-lg bg-sand-50 border border-sand-200 text-xs space-y-1.5", children: [
                /* @__PURE__ */ jsxs("div", { className: "text-[11px] font-semibold text-amber-700 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(Info, { className: "w-3.5 h-3.5 shrink-0" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "مستخدم في ",
                    usageReport.items.length,
                    " موضع:"
                  ] })
                ] }),
                /* @__PURE__ */ jsx("ul", { className: "divide-y divide-sand-200/60", children: usageReport.items.map((u, i) => /* @__PURE__ */ jsxs("li", { className: "py-1.5 flex items-center justify-between gap-2", children: [
                  /* @__PURE__ */ jsxs("div", { className: "truncate", children: [
                    /* @__PURE__ */ jsx("span", { className: "font-medium text-sand-900", children: u.title }),
                    /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-sand-500 block", children: [
                      "(",
                      u.field,
                      ")"
                    ] })
                  ] }),
                  u.url && /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: u.url,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "text-brand-600 hover:underline text-[11px] font-semibold shrink-0",
                      children: "عرض"
                    }
                  )
                ] }, i)) })
              ] }) }) : /* @__PURE__ */ jsx("p", { className: "text-xs text-sand-500 bg-sand-50 p-2.5 rounded-lg border border-sand-200", children: "هذا الملف غير مستخدم حالياً في أي مقال أو مشروع أو شريك." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 border-t border-sand-200 space-y-2", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: fileInputRef,
                  type: "file",
                  accept: "image/jpeg,image/png,image/webp,image/avif,image/svg+xml,application/pdf",
                  onChange: handleReplaceFile,
                  className: "hidden"
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    var _a3;
                    return (_a3 = fileInputRef.current) == null ? void 0 : _a3.click();
                  },
                  disabled: isReplacing,
                  className: "w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-800 transition-colors disabled:opacity-50",
                  children: [
                    /* @__PURE__ */ jsx(RefreshCw, { className: `w-3.5 h-3.5 ${isReplacing ? "animate-spin" : ""}` }),
                    /* @__PURE__ */ jsx("span", { children: isReplacing ? "جاري استبدال الملف..." : "استبدال الملف بملف جديد" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setIsConfirmDeleteOpen(true),
                  className: "w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50 hover:bg-red-100/80 text-red-700 transition-colors",
                  children: [
                    /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    /* @__PURE__ */ jsx("span", { children: "حذف الملف نهائياً" })
                  ]
                }
              )
            ] })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: isConfirmDeleteOpen,
        onClose: () => setIsConfirmDeleteOpen(false),
        onConfirm: handleDelete,
        title: "تأكيد حذف ملف الوسائط",
        description: (usageReport == null ? void 0 : usageReport.isUsed) ? `تحذير هام: هذا الملف مستخدم حالياً في (${usageReport.items.length}) مواضع (مثل: ${(_a2 = usageReport.items[0]) == null ? void 0 : _a2.title}). حذفه سيؤدي إلى ظهور صور مفقودة في الموقع. هل أنت متأكد من الحذف القسري؟` : "هل أنت متأكد من حذف هذا الملف نهائياً؟ سيتم مسح كافة أحجامه المتولدة من مساحة التخزين ولا يمكن التراجع عن هذا الإجراء.",
        confirmText: "نعم، احذف الملف",
        cancelText: "إلغاء",
        isDestructive: true,
        isLoading: deleteMutation.isPending
      }
    )
  ] });
};
(_e = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _e.call(globalThis, "src/features/media/components/index.ts");
(_f = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _f.call(globalThis, "src/features/admin/MediaPage.tsx");
const MediaPage = () => {
  const { success, error, info } = useToast();
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [filter, setFilter] = useState({
    search: "",
    folder: "all",
    type: "all",
    sort: "newest"
  });
  const [selectedIds, setSelectedIds] = useState([]);
  const [activeMedia, setActiveMedia] = useState(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);
  const [isBulkMoveOpen, setIsBulkMoveOpen] = useState(false);
  const [targetMoveFolder, setTargetMoveFolder] = useState("general");
  const { data, isLoading, refetch } = useMediaList({
    page,
    pageSize: 40,
    filter
  });
  const bulkDeleteMutation = useBulkDeleteMedia();
  const bulkMoveMutation = useBulkMoveMedia();
  const items = (data == null ? void 0 : data.items) || [];
  const totalCount = (data == null ? void 0 : data.totalCount) || 0;
  const totalPages = (data == null ? void 0 : data.totalPages) || 1;
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
    setSelectedIds([]);
  };
  const handleToggleSelect = (id) => {
    setSelectedIds(
      (prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };
  const handleSelectAll = () => {
    if (selectedIds.length === items.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.id));
    }
  };
  const handleBulkDeleteConfirm = async () => {
    try {
      const result = await bulkDeleteMutation.mutateAsync({
        ids: selectedIds,
        force: true
      });
      if (result.errors.length > 0) {
        info(
          "اكتمل الحذف جزئياً",
          `تم حذف ${result.deletedCount} ملفات، وتعذر حذف ${result.errors.length} ملفات بسبب استخدامها.`
        );
      } else {
        success("تم الحذف بنجاح", `تم حذف ${result.deletedCount} ملفات نهائياً.`);
      }
      setSelectedIds([]);
      setIsBulkDeleteOpen(false);
      refetch();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "فشل الحذف الجماعي";
      error("خطأ", msg);
    }
  };
  const handleBulkMoveConfirm = async () => {
    try {
      await bulkMoveMutation.mutateAsync({
        ids: selectedIds,
        targetFolder: targetMoveFolder
      });
      success(
        "تم نقل الملفات",
        `تم نقل ${selectedIds.length} ملفات إلى مجلد (${targetMoveFolder}) بنجاح.`
      );
      setSelectedIds([]);
      setIsBulkMoveOpen(false);
      refetch();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "فشل النقل";
      error("خطأ", msg);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "مكتبة الوسائط",
        description: "إدارة وتنظيم كافة الصور والملفات المرفوعة، مع تحسين الأبعاد وتوليد صيغ WebP المتجاوبة تلقائياً",
        actions: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          selectedIds.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 animate-in fade-in duration-150", children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setIsBulkMoveOpen(true),
                className: "inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-800 transition-colors shadow-xs",
                children: [
                  /* @__PURE__ */ jsx(FolderInput, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "نقل (",
                    selectedIds.length,
                    ")"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => setIsBulkDeleteOpen(true),
                className: "inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-red-200 bg-red-50 hover:bg-red-100/80 text-red-700 transition-colors shadow-xs",
                children: [
                  /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "حذف (",
                    selectedIds.length,
                    ")"
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "primary",
              onClick: () => setIsUploadOpen(true),
              className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2",
              leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4", "aria-hidden": "true" }),
              children: "إضافة ملفات جديدة"
            }
          )
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      MediaFilters,
      {
        filter,
        onChange: handleFilterChange,
        viewMode,
        onViewModeChange: setViewMode,
        totalCount
      }
    ),
    viewMode === "grid" && items.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs text-sand-600 px-1 -mt-2", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleSelectAll,
          className: "inline-flex items-center gap-1.5 font-medium hover:text-sand-900 transition-colors",
          children: [
            selectedIds.length === items.length ? /* @__PURE__ */ jsx(CheckSquare, { className: "w-4 h-4 text-brand-600" }) : /* @__PURE__ */ jsx(Square, { className: "w-4 h-4 text-sand-400" }),
            /* @__PURE__ */ jsx("span", { children: selectedIds.length === items.length ? "إلغاء تحديد الكل" : "تحديد جميع عناصر الصفحة" })
          ]
        }
      ),
      selectedIds.length > 0 && /* @__PURE__ */ jsxs("span", { className: "font-semibold text-brand-600", children: [
        "تم تحديد ",
        selectedIds.length,
        " من ",
        items.length
      ] })
    ] }),
    viewMode === "grid" ? /* @__PURE__ */ jsx(
      MediaGrid,
      {
        items,
        selectedIds,
        onToggleSelect: handleToggleSelect,
        onItemClick: (item) => setActiveMedia(item),
        onUploadClick: () => setIsUploadOpen(true),
        isLoading
      }
    ) : /* @__PURE__ */ jsx(
      MediaList,
      {
        items,
        selectedIds,
        onToggleSelect: handleToggleSelect,
        onSelectAll: handleSelectAll,
        onItemClick: (item) => setActiveMedia(item),
        isLoading
      }
    ),
    totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-sand-200 text-xs", children: [
      /* @__PURE__ */ jsxs("span", { className: "text-sand-500", children: [
        "الصفحة ",
        page,
        " من ",
        totalPages,
        " (",
        totalCount,
        " ملف إجمالاً)"
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: page <= 1,
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            className: "p-1.5 rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
            "aria-label": "الصفحة السابقة",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1", children: Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
          if (p === 1 || p === totalPages || p >= page - 2 && p <= page + 2) {
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setPage(p),
                className: `min-w-[28px] h-7 rounded-lg text-xs font-semibold transition-colors ${page === p ? "bg-brand-600 text-white shadow-xs" : "bg-white border border-sand-300 text-sand-700 hover:bg-sand-50"}`,
                children: p
              },
              p
            );
          }
          if (p === page - 3 || p === page + 3) {
            return /* @__PURE__ */ jsx("span", { className: "text-sand-400 px-1", children: "..." }, p);
          }
          return null;
        }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: page >= totalPages,
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            className: "p-1.5 rounded-lg border border-sand-300 bg-white hover:bg-sand-50 text-sand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
            "aria-label": "الصفحة التالية",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      MediaUploadModal,
      {
        open: isUploadOpen,
        onClose: () => setIsUploadOpen(false),
        onSuccess: () => {
          refetch();
        },
        initialFolder: filter.folder !== "all" ? filter.folder : "general"
      }
    ),
    /* @__PURE__ */ jsx(
      MediaDetailPanel,
      {
        media: activeMedia,
        onClose: () => setActiveMedia(null),
        onDeleted: () => {
          refetch();
        }
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: isBulkDeleteOpen,
        onClose: () => setIsBulkDeleteOpen(false),
        onConfirm: handleBulkDeleteConfirm,
        title: "تأكيد حذف الملفات المحددة",
        description: `هل أنت متأكد من حذف ${selectedIds.length} ملفات نهائياً؟ سيتم فحص ارتباطاتها وحذف ملفاتها من التخزين وقاعدة البيانات.`,
        confirmText: "نعم، حذف الكل",
        cancelText: "إلغاء",
        isDestructive: true,
        isLoading: bulkDeleteMutation.isPending
      }
    ),
    isBulkMoveOpen && /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-sand-900/50 backdrop-blur-xs animate-in fade-in duration-150",
        role: "dialog",
        "aria-modal": "true",
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-elevated w-full max-w-sm p-6 space-y-4 border border-sand-200", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-sm font-bold text-sand-900", children: [
            "نقل (",
            selectedIds.length,
            ") ملفات إلى مجلد"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-sand-500", children: "اختر المجلد المستهدف الذي ترغب بنقل الملفات المحددة إليه:" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              value: targetMoveFolder,
              onChange: (e) => setTargetMoveFolder(e.target.value),
              className: "w-full bg-white border border-sand-300 rounded-lg py-2 px-3 text-xs text-sand-900 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
              children: [
                /* @__PURE__ */ jsx("option", { value: "general", children: "عام (General)" }),
                /* @__PURE__ */ jsx("option", { value: "blog", children: "المدونة (Blog)" }),
                /* @__PURE__ */ jsx("option", { value: "works", children: "المشاريع (Works)" }),
                /* @__PURE__ */ jsx("option", { value: "partners", children: "الشركاء (Partners)" }),
                /* @__PURE__ */ jsx("option", { value: "branding", children: "الهوية والعلامة التجارية (Branding)" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2.5 pt-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => setIsBulkMoveOpen(false),
                className: "border-sand-300 text-sand-700 hover:bg-sand-100 font-medium px-4 py-1.5",
                children: "إلغاء"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "primary",
                size: "sm",
                onClick: handleBulkMoveConfirm,
                disabled: bulkMoveMutation.isPending,
                isLoading: bulkMoveMutation.isPending,
                className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs px-5 py-1.5",
                children: "تأكيد النقل"
              }
            )
          ] })
        ] })
      }
    )
  ] });
};
export {
  MediaPage
};
