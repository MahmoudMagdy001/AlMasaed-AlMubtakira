var _a;
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RotateCcw, Briefcase, Wand2, CheckCircle2, AlertCircle, Image, Plus, FileText, ArrowUp, Trash2, ArrowDown, Globe, ExternalLink, Save } from "lucide-react";
import { P as PageHeader, f as MediaPicker } from "./index-6EXxYG9x.js";
import { u as useToast, g as getStoragePublicUrl, B as Button, F as FormField } from "../main.mjs";
import { u as useUnsavedChangesWarning } from "./useUnsavedChangesWarning-BGBFKU17.js";
import { d as useAdminWork, e as useCreateWork, f as useUpdateWork, i as isWorkSlugUnique, g as generateSlug, S as SERVICE_TYPE_OPTIONS, w as workFormSchema } from "./useAdminWorks-B4dAFM1p.js";
import { u as useSeoAnalyzer, S as SeoAnalyzerPanel } from "./index-C73pVK-s.js";
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
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/admin/works/WorkEditPage.tsx");
const WorkEditPage = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { success, error: toastError } = useToast();
  const { data: existingWork, isLoading: isLoadingWork } = useAdminWork(
    isNew ? void 0 : id
  );
  const createMutation = useCreateWork();
  const updateMutation = useUpdateWork();
  const [titleAr, setTitleAr] = useState("");
  const [titleEn, setTitleEn] = useState("");
  const [slug, setSlug] = useState("");
  const [serviceType, setServiceType] = useState("installation");
  const [locationAr, setLocationAr] = useState("");
  const [locationEn, setLocationEn] = useState("");
  const [completedYear, setCompletedYear] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [coverMediaId, setCoverMediaId] = useState(null);
  const [coverMediaUrl, setCoverMediaUrl] = useState(null);
  const [galleryMedia, setGalleryMedia] = useState([]);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [isPublished, setIsPublished] = useState(false);
  const [sortOrder, setSortOrder] = useState(0);
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSlugChecking, setIsSlugChecking] = useState(false);
  const [isSlugAvailable, setIsSlugAvailable] = useState(null);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [hasLocalBackup, setHasLocalBackup] = useState(false);
  const [serpDevice, setSerpDevice] = useState("desktop");
  const [isCoverPickerOpen, setIsCoverPickerOpen] = useState(false);
  const [isGalleryPickerOpen, setIsGalleryPickerOpen] = useState(false);
  useUnsavedChangesWarning(isDirty);
  const localStorageKey = `work_draft_backup_${isNew ? "new" : id}`;
  useEffect(() => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.titleAr && parsed.savedAt) {
          setHasLocalBackup(true);
        }
      }
    } catch {
    }
  }, [localStorageKey]);
  const handleRestoreBackup = () => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.titleAr) setTitleAr(parsed.titleAr);
        if (parsed.titleEn) setTitleEn(parsed.titleEn);
        if (parsed.slug) setSlug(parsed.slug);
        if (parsed.serviceType) setServiceType(parsed.serviceType);
        if (parsed.locationAr) setLocationAr(parsed.locationAr);
        if (parsed.locationEn) setLocationEn(parsed.locationEn);
        if (parsed.completedYear) setCompletedYear(parsed.completedYear);
        if (parsed.descriptionAr) setDescriptionAr(parsed.descriptionAr);
        if (parsed.descriptionEn) setDescriptionEn(parsed.descriptionEn);
        if (parsed.seoTitle) setSeoTitle(parsed.seoTitle);
        if (parsed.seoDescription) setSeoDescription(parsed.seoDescription);
        if (parsed.focusKeyword) setFocusKeyword(parsed.focusKeyword);
        setIsDirty(true);
        setHasLocalBackup(false);
        success("تم استعادة المسودة المحفوظة محلياً");
      }
    } catch {
      toastError("فشل استعادة المسودة");
    }
  };
  const handleDismissBackup = () => {
    try {
      localStorage.removeItem(localStorageKey);
      setHasLocalBackup(false);
    } catch {
    }
  };
  useEffect(() => {
    var _a2;
    if (existingWork && !isNew) {
      setTitleAr(existingWork.title_ar || "");
      setTitleEn(existingWork.title_en || "");
      setSlug(existingWork.slug || "");
      setServiceType(existingWork.service_type || "installation");
      setLocationAr(existingWork.location_ar || "");
      setLocationEn(existingWork.location_en || "");
      setCompletedYear(existingWork.completed_year ? String(existingWork.completed_year) : "");
      setDescriptionAr(existingWork.description_ar || "");
      setDescriptionEn(existingWork.description_en || "");
      setCoverMediaId(existingWork.cover_media_id || null);
      if ((_a2 = existingWork.cover_media) == null ? void 0 : _a2.storage_path) {
        setCoverMediaUrl(getStoragePublicUrl(existingWork.cover_media.storage_path));
      }
      if (existingWork.gallery_media && existingWork.gallery_media.length > 0) {
        setGalleryMedia(
          existingWork.gallery_media.filter((m) => Boolean(m && typeof m.id === "string")).map((m) => ({
            id: m.id,
            url: getStoragePublicUrl(m.storage_path),
            alt: m.alt_text || ""
          }))
        );
      } else {
        setGalleryMedia([]);
      }
      setSeoTitle(existingWork.seo_title || "");
      setSeoDescription(existingWork.seo_description || "");
      setIsPublished(existingWork.is_published || false);
      setSortOrder(existingWork.sort_order || 0);
      setIsDirty(false);
    }
  }, [existingWork, isNew]);
  useEffect(() => {
    if (!slug || slug.length < 2) {
      setIsSlugAvailable(null);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSlugChecking(true);
      try {
        const unique = await isWorkSlugUnique(slug, isNew ? void 0 : id);
        setIsSlugAvailable(unique);
      } catch {
        setIsSlugAvailable(null);
      } finally {
        setIsSlugChecking(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [slug, isNew, id]);
  const handleAutoSlug = useCallback(() => {
    const candidate = titleEn.trim() || titleAr.trim();
    if (!candidate) return;
    const generated = generateSlug(candidate);
    setSlug(generated);
    setIsDirty(true);
  }, [titleEn, titleAr]);
  useEffect(() => {
    if (!isDirty) return;
    const interval = setInterval(() => {
      try {
        const backupData = {
          titleAr,
          titleEn,
          slug,
          serviceType,
          locationAr,
          locationEn,
          completedYear,
          descriptionAr,
          descriptionEn,
          seoTitle,
          seoDescription,
          focusKeyword,
          savedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        localStorage.setItem(localStorageKey, JSON.stringify(backupData));
        setLastSavedAt((/* @__PURE__ */ new Date()).toLocaleTimeString("ar-SA"));
      } catch {
      }
    }, 3e4);
    return () => clearInterval(interval);
  }, [
    isDirty,
    titleAr,
    titleEn,
    slug,
    serviceType,
    locationAr,
    locationEn,
    completedYear,
    descriptionAr,
    descriptionEn,
    seoTitle,
    seoDescription,
    focusKeyword,
    localStorageKey
  ]);
  const seoInput = useMemo(
    () => ({
      title: titleAr,
      slug,
      seoTitle,
      seoDescription,
      focusKeyword,
      secondaryKeywords: [],
      excerpt: descriptionAr,
      featuredImageId: coverMediaId,
      featuredImageAlt: titleAr,
      contentHtml: descriptionAr ? `<p>${descriptionAr}</p>` : "",
      canonicalUrl: null,
      robotsNoindex: !isPublished,
      robotsNofollow: false,
      ogImageId: coverMediaId,
      siteDomain: "almubtakirah.com"
    }),
    [
      titleAr,
      slug,
      seoTitle,
      seoDescription,
      focusKeyword,
      descriptionAr,
      coverMediaId,
      isPublished
    ]
  );
  const { result: seoResult, isAnalyzing: isSeoAnalyzing } = useSeoAnalyzer(seoInput);
  const handleSelectCover = (selected) => {
    const item = Array.isArray(selected) ? selected[0] : selected;
    if (!item) return;
    setCoverMediaId(item.id);
    setCoverMediaUrl(getStoragePublicUrl(item.storage_path));
    setIsCoverPickerOpen(false);
    setIsDirty(true);
  };
  const handleSelectGallery = (selected) => {
    const items = Array.isArray(selected) ? selected : [selected];
    const existingIds = new Set(galleryMedia.map((g) => g.id));
    const newItems = items.filter((item) => !existingIds.has(item.id)).map((item) => ({
      id: item.id,
      url: getStoragePublicUrl(item.storage_path),
      alt: item.alt_text || item.title || ""
    }));
    setGalleryMedia((prev) => [...prev, ...newItems]);
    setIsGalleryPickerOpen(false);
    setIsDirty(true);
  };
  const handleMoveGallery = (index, direction) => {
    const target = direction === "left" ? index - 1 : index + 1;
    if (target < 0 || target >= galleryMedia.length) return;
    const updated = [...galleryMedia];
    const temp = updated[index];
    updated[index] = updated[target];
    updated[target] = temp;
    setGalleryMedia(updated);
    setIsDirty(true);
  };
  const handleRemoveGallery = (index) => {
    setGalleryMedia((prev) => prev.filter((_, i) => i !== index));
    setIsDirty(true);
  };
  const handleSave = async (targetPublishState) => {
    setErrors({});
    const nextPublished = targetPublishState !== void 0 ? targetPublishState : isPublished;
    const payload = {
      title_ar: titleAr.trim(),
      title_en: titleEn.trim() || null,
      slug: slug.trim(),
      service_type: serviceType,
      location_ar: locationAr.trim() || null,
      location_en: locationEn.trim() || null,
      completed_year: completedYear ? parseInt(completedYear, 10) : null,
      description_ar: descriptionAr.trim() || null,
      description_en: descriptionEn.trim() || null,
      cover_media_id: coverMediaId || null,
      gallery_media_ids: galleryMedia.map((g) => g.id),
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      is_published: nextPublished,
      sort_order: sortOrder
    };
    const validation = workFormSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors = {};
      for (const err of validation.error.errors) {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      }
      setErrors(fieldErrors);
      toastError("يرجى تصحيح الأخطاء في النموذج");
      return;
    }
    if (isSlugAvailable === false) {
      setErrors((prev) => ({
        ...prev,
        slug: "هذا الرابط اللطيف (Slug) مستخدم بالفعل في مشروع آخر، يرجى تغييره"
      }));
      toastError("الاسم اللطيف مكرر");
      return;
    }
    try {
      if (isNew) {
        const created = await createMutation.mutateAsync(payload);
        try {
          localStorage.removeItem(localStorageKey);
        } catch {
        }
        setIsDirty(false);
        setIsPublished(nextPublished);
        success(
          nextPublished ? "تم إنشاء ونشر المشروع بنجاح" : "تم حفظ مسودة المشروع بنجاح",
          nextPublished ? REBUILD_NOTICE : void 0
        );
        navigate(`/admin/works/${created.id}`);
      } else {
        await updateMutation.mutateAsync({ id, data: payload });
        try {
          localStorage.removeItem(localStorageKey);
        } catch {
        }
        setIsDirty(false);
        setIsPublished(nextPublished);
        setLastSavedAt((/* @__PURE__ */ new Date()).toLocaleTimeString("ar-SA"));
        success(
          nextPublished ? "تم نشر وتحديث المشروع بنجاح" : "تم حفظ تعديلات المشروع بنجاح",
          nextPublished ? REBUILD_NOTICE : void 0
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حفظ المشروع", msg);
    }
  };
  const isSaving = createMutation.isPending || updateMutation.isPending;
  const publicUrl = `/works/${slug || "project"}`;
  if (!isNew && isLoadingWork) {
    return /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل بيانات المشروع..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-6 pb-20", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: isNew ? "إضافة مشروع وسابقة أعمال" : `تحرير: ${titleAr || "مشروع"}`,
        description: "توثيق بيانات المشروع وسابقة الأعمال وصور المعرض وإعدادات النشر وتحسين محركات البحث.",
        backTo: "/admin/works",
        backLabel: "العودة لقائمة المشاريع"
      }
    ),
    hasLocalBackup && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-card bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(RotateCcw, { className: "w-5 h-5 shrink-0 text-amber-600" }),
        /* @__PURE__ */ jsx("span", { children: "تم العثور على مسودة محلية محفوظة تلقائياً لهذا المشروع. هل ترغب في استعادتها؟" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", onClick: handleDismissBackup, children: "تجاهل" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            size: "sm",
            className: "bg-brand-600 hover:bg-brand-700 text-white font-bold",
            onClick: handleRestoreBackup,
            children: "استعادة المسودة"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-4 shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pb-2 border-b border-surface-border", children: [
          /* @__PURE__ */ jsx(Briefcase, { className: "w-4 h-4 text-brand-600" }),
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-content-heading", children: "عنوان المشروع ورابط الصفحة" })
        ] }),
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "عنوان المشروع بالعربية (H1 الرئيسي للصفحة)",
            required: true,
            error: errors.title_ar,
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: titleAr,
                onChange: (e) => {
                  setTitleAr(e.target.value);
                  setIsDirty(true);
                  if (!slug) {
                    setSlug(generateSlug(e.target.value));
                  }
                },
                placeholder: "اكتب عنواناً جذاباً ومحدداً للمشروع (مثال: برج الروضة التجاري - جدة)...",
                className: "w-full px-4 py-3 text-lg font-bold rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "عنوان المشروع بالإنجليزية (اختياري)",
            optional: true,
            error: errors.title_en,
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                dir: "ltr",
                value: titleEn,
                onChange: (e) => {
                  setTitleEn(e.target.value);
                  setIsDirty(true);
                },
                placeholder: "e.g. Al-Rawdah Commercial Tower - Jeddah",
                className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          FormField,
          {
            label: "الرابط اللطيف (Slug)",
            required: true,
            error: errors.slug,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    dir: "ltr",
                    value: slug,
                    onChange: (e) => {
                      setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                      setIsDirty(true);
                    },
                    placeholder: "al-rawdah-commercial-tower",
                    className: "flex-1 px-3 py-2 text-xs font-mono rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "secondary",
                    onClick: handleAutoSlug,
                    title: "توليد الرابط تلقائياً من العنوان",
                    className: "shrink-0 px-3 text-xs",
                    children: [
                      /* @__PURE__ */ jsx(Wand2, { className: "w-4 h-4 me-1" }),
                      /* @__PURE__ */ jsx("span", { children: "توليد" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs mt-1.5", children: [
                /* @__PURE__ */ jsxs("span", { className: "text-content-muted font-mono", dir: "ltr", children: [
                  "almubtakirah.com/works/",
                  slug || "..."
                ] }),
                /* @__PURE__ */ jsxs("div", { children: [
                  isSlugChecking && /* @__PURE__ */ jsx("span", { className: "text-content-muted", children: "جاري التحقق من الرابط..." }),
                  !isSlugChecking && isSlugAvailable === true && /* @__PURE__ */ jsxs("span", { className: "text-emerald-600 flex items-center gap-1 font-medium", children: [
                    /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
                    "الرابط متاح"
                  ] }),
                  !isSlugChecking && isSlugAvailable === false && /* @__PURE__ */ jsxs("span", { className: "text-feedback-error flex items-center gap-1 font-medium", children: [
                    /* @__PURE__ */ jsx(AlertCircle, { className: "w-3.5 h-3.5" }),
                    "الرابط مستخدم بالفعل"
                  ] })
                ] })
              ] }),
              slug.length > 75 && /* @__PURE__ */ jsxs("p", { className: "text-xs text-amber-600 mt-1 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-3.5 h-3.5" }),
                "تنبيه: يُفضل ألا يتجاوز طول الرابط 75 حرفاً لأفضل توافق مع محركات البحث."
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between pb-3 border-b border-surface-border", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-content-heading", children: "صورة الغلاف الرئيسية للمشروع" }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted mt-0.5", children: "تظهر كصورة بارزة في رأس صفحة المشروع وفي بطاقات المعرض على الموقع." })
        ] }) }),
        coverMediaUrl ? /* @__PURE__ */ jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxs("div", { className: "aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-control bg-surface-soft overflow-hidden border border-surface-border relative group max-h-72", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: coverMediaUrl,
              alt: "غلاف المشروع",
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "secondary",
                className: "bg-white text-content-heading border-white hover:bg-surface-soft font-bold",
                onClick: () => setIsCoverPickerOpen(true),
                children: "تغيير الصورة"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                variant: "secondary",
                className: "bg-white text-feedback-error border-white hover:bg-red-50 font-bold",
                onClick: () => {
                  setCoverMediaId(null);
                  setCoverMediaUrl(null);
                  setIsDirty(true);
                },
                children: "إزالة"
              }
            )
          ] })
        ] }) }) : /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-center p-8 border-2 border-dashed border-surface-border rounded-control bg-surface-soft", children: [
          /* @__PURE__ */ jsx(Image, { className: "w-12 h-12 text-content-muted mx-auto" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-content-muted max-w-sm mx-auto", children: "اختر صورة عالية الجودة لتمثيل المشروع في صفحة تفاصيل المشروع وبطاقات سابقة الأعمال." }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: () => setIsCoverPickerOpen(true),
              className: "gap-1.5 font-bold",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "اختيار من مكتبة الوسائط" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-content-heading pb-3 border-b border-surface-border", children: "بيانات ومواصفات المشروع الأساسية" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsx(FormField, { label: "نوع الخدمة", required: true, error: errors.service_type, children: /* @__PURE__ */ jsx(
            "select",
            {
              value: serviceType,
              onChange: (e) => {
                setServiceType(e.target.value);
                setIsDirty(true);
              },
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: SERVICE_TYPE_OPTIONS.map((opt) => /* @__PURE__ */ jsx("option", { value: opt.value, children: opt.labelAr }, opt.value))
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "الموقع (بالعربية)", optional: true, error: errors.location_ar, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: locationAr,
              onChange: (e) => {
                setLocationAr(e.target.value);
                setIsDirty(true);
              },
              placeholder: "مثال: جدة، حي الروضة",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "سنة الإنجاز", optional: true, error: errors.completed_year, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: "1990",
              max: "2035",
              value: completedYear,
              onChange: (e) => {
                setCompletedYear(e.target.value);
                setIsDirty(true);
              },
              placeholder: "2024",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsx(FormField, { label: "الموقع بالإنجليزية (اختياري)", optional: true, error: errors.location_en, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            dir: "ltr",
            value: locationEn,
            onChange: (e) => {
              setLocationEn(e.target.value);
              setIsDirty(true);
            },
            placeholder: "e.g. Jeddah, Al-Rawdah District",
            className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start"
          }
        ) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pb-3 border-b border-surface-border", children: [
          /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-brand-600" }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-content-heading", children: "نبذة وتفاصيل المشروع" })
        ] }),
        /* @__PURE__ */ jsxs(
          FormField,
          {
            label: "تفاصيل المشروع (بالعربية)",
            optional: true,
            error: errors.description_ar,
            children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 5,
                  value: descriptionAr,
                  onChange: (e) => {
                    setDescriptionAr(e.target.value);
                    setIsDirty(true);
                  },
                  placeholder: "تفاصيل عن أعمال التوريد أو التركيب أو الصيانة، وعدد المصاعد والمواصفات الفنية المتميزة للمشروع...",
                  className: "w-full px-3 py-2.5 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-content-muted mt-1", children: [
                /* @__PURE__ */ jsx("span", { children: "تظهر هذه النبذة في قسم الوصف الأساسي لصفحة تفاصيل المشروع" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  descriptionAr.length,
                  " حرفاً"
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "تفاصيل المشروع بالإنجليزية (اختياري)",
            optional: true,
            error: errors.description_en,
            children: /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 4,
                dir: "ltr",
                value: descriptionEn,
                onChange: (e) => {
                  setDescriptionEn(e.target.value);
                  setIsDirty(true);
                },
                placeholder: "Project specifications, number of elevator units, floor levels, architectural finishes...",
                className: "w-full px-3 py-2.5 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed text-start"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-surface-border", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-content-heading", children: [
              "معرض صور المشروع (",
              galleryMedia.length,
              ")"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted mt-0.5", children: "يمكنك إضافة عدة صور لمعرض المشروع وإعادة ترتيبها لظهورها في نافذة العرض المكبر (Lightbox)." })
          ] }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: () => setIsGalleryPickerOpen(true),
              className: "gap-1.5 font-bold",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "إضافة صور" })
              ]
            }
          )
        ] }),
        galleryMedia.length === 0 ? /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: () => setIsGalleryPickerOpen(true),
            className: "border-2 border-dashed border-surface-border rounded-control p-8 text-center cursor-pointer hover:border-brand-600/50 hover:bg-surface-soft/40 transition-colors",
            children: [
              /* @__PURE__ */ jsx(Image, { className: "w-8 h-8 text-content-muted mx-auto mb-2" }),
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-content-heading", children: "لا توجد صور في المعرض بعد" }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted mt-1", children: "اضغط هنا لاختيار صور من مكتبة الوسائط" })
            ]
          }
        ) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: galleryMedia.map((item, index) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "relative group rounded-control overflow-hidden border border-surface-border bg-surface-soft aspect-square",
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: item.url,
                  alt: item.alt || "",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-brand-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleMoveGallery(index, "left"),
                    disabled: index === 0,
                    className: "p-1.5 rounded-control bg-white/90 text-brand-900 disabled:opacity-30 hover:bg-white",
                    title: "تحريك للخلف",
                    "aria-label": "تحريك للخلف",
                    children: /* @__PURE__ */ jsx(ArrowUp, { className: "w-3.5 h-3.5 -rotate-90" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleRemoveGallery(index),
                    className: "p-1.5 rounded-control bg-feedback-error/90 text-white hover:bg-feedback-error",
                    title: "حذف من المعرض",
                    "aria-label": "حذف",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-3.5 h-3.5" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleMoveGallery(index, "right"),
                    disabled: index === galleryMedia.length - 1,
                    className: "p-1.5 rounded-control bg-white/90 text-brand-900 disabled:opacity-30 hover:bg-white",
                    title: "تحريك للأمام",
                    "aria-label": "تحريك للأمام",
                    children: /* @__PURE__ */ jsx(ArrowDown, { className: "w-3.5 h-3.5 -rotate-90" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "absolute bottom-1.5 start-1.5 px-2 py-0.5 rounded-sm bg-black/70 text-white text-[10px] font-mono", children: [
                "#",
                index + 1
              ] })
            ]
          },
          item.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-content-heading pb-3 border-b border-surface-border", children: "إعدادات النشر والترتيب" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(FormField, { label: "حالة نشر المشروع", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: isPublished ? "published" : "draft",
              onChange: (e) => {
                setIsPublished(e.target.value === "published");
                setIsDirty(true);
              },
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: [
                /* @__PURE__ */ jsx("option", { value: "published", children: "منشور للجمهور (يظهر في سابقة الأعمال والموقع)" }),
                /* @__PURE__ */ jsx("option", { value: "draft", children: "مسودة خاصة (غير ظاهر للعامة)" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "الترتيب اليدوي (Sort Order)",
              hint: "الأرقام الأقل تظهر أولاً في قائمة المشاريع",
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "number",
                  value: sortOrder,
                  onChange: (e) => {
                    setSortOrder(parseInt(e.target.value, 10) || 0);
                    setIsDirty(true);
                  },
                  className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              )
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-content-heading pb-3 border-b border-surface-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "إعدادات تحسين محركات البحث (SEO)" }),
          /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-brand-600" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs(
            FormField,
            {
              label: "عنوان الـ SEO المخصص",
              optional: true,
              hint: "إذا تُرك فارغاً سيتم استخدام عنوان المشروع تلقائياً",
              error: errors.seo_title,
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: seoTitle,
                    onChange: (e) => {
                      setSeoTitle(e.target.value);
                      setIsDirty(true);
                    },
                    maxLength: 80,
                    placeholder: titleAr || "مشروع مصاعد برج الروضة | شركة المصاعد المبتكرة",
                    className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[11px] mt-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "text-content-muted", children: "المثالي: 30 إلى 60 حرفاً" }),
                  /* @__PURE__ */ jsxs(
                    "span",
                    {
                      className: (seoTitle || titleAr).length >= 30 && (seoTitle || titleAr).length <= 60 ? "text-emerald-600 font-bold" : "text-amber-600",
                      children: [
                        (seoTitle || titleAr).length,
                        " / 80 حرفاً"
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "الكلمة المفتاحية المستهدفة (Focus Keyword)",
              optional: true,
              hint: "الكلمة أو العبارة لتحليل السيو (مثال: تركيب مصاعد جدة)",
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: focusKeyword,
                  onChange: (e) => {
                    setFocusKeyword(e.target.value);
                    setIsDirty(true);
                  },
                  placeholder: "مثال: تركيب مصاعد جدة",
                  className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(
          FormField,
          {
            label: "الوصف التعريفي (Meta Description)",
            optional: true,
            hint: "يظهر في نتائج بحث Google وشبكات التواصل الاجتماعي",
            error: errors.seo_description,
            children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  value: seoDescription,
                  onChange: (e) => {
                    setSeoDescription(e.target.value);
                    setIsDirty(true);
                  },
                  maxLength: 200,
                  placeholder: descriptionAr || "تنفيذ وتوريد مصاعد بانوراما متطورة لبرج الروضة بجدة وفق أعلى معايير السلامة والجودة...",
                  className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[11px] mt-1", children: [
                /* @__PURE__ */ jsx("span", { className: "text-content-muted", children: "المثالي: 120 إلى 160 حرفاً" }),
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: (seoDescription || descriptionAr).length >= 120 && (seoDescription || descriptionAr).length <= 160 ? "text-emerald-600 font-bold" : "text-amber-600",
                    children: [
                      (seoDescription || descriptionAr).length,
                      " / 200 حرفاً"
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "pt-3 border-t border-surface-border space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-xs font-semibold text-content-heading", children: [
            /* @__PURE__ */ jsx("span", { children: "معاينة نتيجة بحث Google" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-surface-soft p-0.5 rounded-control border border-surface-border text-[10px]", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSerpDevice("desktop"),
                  className: `px-2 py-0.5 rounded ${serpDevice === "desktop" ? "bg-white font-bold shadow-xs text-brand-600" : "text-content-muted"}`,
                  children: "كمبيوتر"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setSerpDevice("mobile"),
                  className: `px-2 py-0.5 rounded ${serpDevice === "mobile" ? "bg-white font-bold shadow-xs text-brand-600" : "text-content-muted"}`,
                  children: "هاتف"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              dir: "rtl",
              className: "p-3.5 bg-surface-soft border border-surface-border rounded-control text-start space-y-1.5",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-content-muted truncate", dir: "ltr", children: [
                  "https://almubtakirah.com › works › ",
                  slug || "project"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium text-blue-700 hover:underline line-clamp-1 cursor-pointer", children: [
                  seoTitle || titleAr || "عنوان المشروع في محرك بحث Google",
                  " | شركة المصاعد المبتكرة"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-content-body line-clamp-2", children: seoDescription || descriptionAr || "تفاصيل المشروع وسابقة الأعمال مع شركة المصاعد المبتكرة في جدة والمملكة العربية السعودية..." })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        SeoAnalyzerPanel,
        {
          seoData: seoResult,
          isAnalyzing: isSeoAnalyzing,
          focusKeyword
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-content-muted flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { children: "الحفظ التلقائي: مفعّل (كل 30ث)" }),
            lastSavedAt && /* @__PURE__ */ jsxs("span", { children: [
              "• آخر حفظ: ",
              lastSavedAt
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: `text-xs font-bold px-2.5 py-0.5 rounded-full border ${seoResult.score >= 80 ? "bg-emerald-50 text-emerald-700 border-emerald-200" : seoResult.score >= 50 ? "bg-amber-50 text-amber-700 border-amber-200" : "bg-red-50 text-red-700 border-red-200"}`,
              children: [
                "سيو المشروع: ",
                seoResult.score,
                "/100"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 w-full sm:w-auto", children: [
          !isNew && isPublished && slug && /* @__PURE__ */ jsxs(
            "a",
            {
              href: publicUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-control border border-surface-border hover:bg-surface-soft text-content-body transition-colors",
              children: [
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "معاينة المشروع المباشر" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "secondary",
              onClick: () => handleSave(false),
              disabled: isSaving,
              className: "flex-1 sm:flex-none px-5 font-bold border-surface-border text-content-body hover:bg-surface-soft hover:border-brand-600 hover:text-brand-600",
              children: "حفظ كمسودة"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "primary",
              onClick: () => handleSave(true),
              disabled: isSaving,
              className: "flex-1 sm:flex-none px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap",
              leftIcon: /* @__PURE__ */ jsx(Save, { className: "w-4 h-4", "aria-hidden": "true" }),
              children: isPublished ? "تحديث ونشر المشروع" : "نشر المشروع الآن"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      MediaPicker,
      {
        open: isCoverPickerOpen,
        onClose: () => setIsCoverPickerOpen(false),
        onSelect: handleSelectCover,
        mode: "single",
        accept: "image",
        initialFolder: "works",
        title: "اختيار صورة غلاف المشروع الرئيسية"
      }
    ),
    /* @__PURE__ */ jsx(
      MediaPicker,
      {
        open: isGalleryPickerOpen,
        onClose: () => setIsGalleryPickerOpen(false),
        onSelect: handleSelectGallery,
        mode: "multi",
        accept: "image",
        initialFolder: "works",
        title: "اختيار صور لمعرض المشروع"
      }
    )
  ] });
};
export {
  WorkEditPage
};
