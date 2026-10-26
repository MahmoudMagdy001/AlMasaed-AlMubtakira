var _a;
import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { RotateCcw, AlertCircle, Wand2, CheckCircle2, Image, Plus, FileText, Languages, Globe, Share2, HelpCircle, ExternalLink, Save } from "lucide-react";
import { P as PageHeader, f as MediaPicker, C as ConfirmDialog } from "./index-6EXxYG9x.js";
import { u as useToast, g as getStoragePublicUrl, B as Button, F as FormField } from "../main.mjs";
import { u as useUnsavedChangesWarning } from "./useUnsavedChangesWarning-BGBFKU17.js";
import { f as useAdminPost, g as useCreatePost, h as useUpdatePost, b as useCreateTranslationTwin } from "./useAdminPosts-B_luQ5kt.js";
import { u as useAdminCategories, a as useAdminTags, b as useCreateTag } from "./useBlogTaxonomy-COB38oJP.js";
import { i as isPostSlugUnique, d as deriveFaqFromContent, a as isPostTitleUnique, c as calculateReadingTime, g as generateSlug, p as postFormSchema } from "./blogAdminService-DtY0JHBt.js";
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
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/admin/blog/PostEditPage.tsx");
const TipTapEditor = React.lazy(
  () => {
    var _a2;
    return ((_a2 = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a2.call(globalThis, "src/features/blog/editor/TipTapEditor.tsx"), import("./TipTapEditor-CtJIboSu.js")).then((m) => ({
      default: m.TipTapEditor
    }));
  }
);
const PostEditPage = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { success, error: toastError, info } = useToast();
  const { data: existingPost, isLoading: isLoadingPost } = useAdminPost(
    isNew ? void 0 : id
  );
  const { data: categories = [] } = useAdminCategories();
  const { data: allTags = [] } = useAdminTags();
  const createTagMutation = useCreateTag();
  const createPostMutation = useCreatePost();
  const updatePostMutation = useUpdatePost();
  const createTwinMutation = useCreateTranslationTwin();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [lang, setLang] = useState("ar");
  const [excerpt, setExcerpt] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  const [contentJson, setContentJson] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState([]);
  const [featuredImageId, setFeaturedImageId] = useState(null);
  const [featuredImageUrl, setFeaturedImageUrl] = useState(null);
  const [featuredImageAlt, setFeaturedImageAlt] = useState("");
  const [status, setStatus] = useState("draft");
  const [publishedAt, setPublishedAt] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [secondaryKeywords, setSecondaryKeywords] = useState([]);
  const [secondaryInput, setSecondaryInput] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [robotsNoindex, setRobotsNoindex] = useState(false);
  const [robotsNofollow, setRobotsNofollow] = useState(false);
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImageId, setOgImageId] = useState(null);
  const [ogImageUrl, setOgImageUrl] = useState(null);
  const [schemaType, setSchemaType] = useState("BlogPosting");
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [isSlugChecking, setIsSlugChecking] = useState(false);
  const [isSlugAvailable, setIsSlugAvailable] = useState(null);
  const [lastSavedAt, setLastSavedAt] = useState(null);
  const [hasLocalBackup, setHasLocalBackup] = useState(false);
  const [serpDevice, setSerpDevice] = useState("desktop");
  const [isTitleDuplicate, setIsTitleDuplicate] = useState(false);
  const [isLowSeoConfirmOpen, setIsLowSeoConfirmOpen] = useState(false);
  const [isFeaturedPickerOpen, setIsFeaturedPickerOpen] = useState(false);
  const [isOgPickerOpen, setIsOgPickerOpen] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");
  useUnsavedChangesWarning(isDirty);
  const localStorageKey = `post_draft_backup_${isNew ? "new" : id}`;
  useEffect(() => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.title && parsed.savedAt) {
          setHasLocalBackup(true);
        }
      }
    } catch {
    }
  }, [localStorageKey]);
  useEffect(() => {
    var _a2, _b;
    if (existingPost && !isNew) {
      setTitle(existingPost.title || "");
      setSlug(existingPost.slug || "");
      setLang(existingPost.lang || "ar");
      setExcerpt(existingPost.excerpt || "");
      setContentHtml(existingPost.content_html || "");
      setContentJson(existingPost.content_json || null);
      setCategoryId(existingPost.category_id || "");
      setSelectedTagIds(((_a2 = existingPost.tags) == null ? void 0 : _a2.map((t) => t.id)) || []);
      setFeaturedImageId(existingPost.featured_image_id || null);
      setFeaturedImageAlt(existingPost.featured_image_alt || "");
      setStatus(existingPost.status || "draft");
      setPublishedAt(existingPost.published_at || "");
      setSeoTitle(existingPost.seo_title || "");
      setSeoDescription(existingPost.seo_description || "");
      setFocusKeyword(existingPost.focus_keyword || "");
      setSecondaryKeywords(existingPost.secondary_keywords || []);
      setCanonicalUrl(existingPost.canonical_url || "");
      setRobotsNoindex(existingPost.robots_noindex || false);
      setRobotsNofollow(existingPost.robots_nofollow || false);
      setOgTitle(existingPost.og_title || "");
      setOgDescription(existingPost.og_description || "");
      setOgImageId(existingPost.og_image_id || null);
      setSchemaType(existingPost.schema_type || "BlogPosting");
      if ((_b = existingPost.featured_image) == null ? void 0 : _b.storage_path) {
        setFeaturedImageUrl(getStoragePublicUrl(existingPost.featured_image.storage_path));
      }
      setIsDirty(false);
    }
  }, [existingPost, isNew]);
  const handleRestoreBackup = () => {
    try {
      const saved = localStorage.getItem(localStorageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.title) setTitle(parsed.title);
        if (parsed.slug) setSlug(parsed.slug);
        if (parsed.excerpt) setExcerpt(parsed.excerpt);
        if (parsed.contentHtml) setContentHtml(parsed.contentHtml);
        if (parsed.contentJson) setContentJson(parsed.contentJson);
        if (parsed.categoryId) setCategoryId(parsed.categoryId);
        if (parsed.seoTitle) setSeoTitle(parsed.seoTitle);
        if (parsed.seoDescription) setSeoDescription(parsed.seoDescription);
        setIsDirty(true);
        setHasLocalBackup(false);
        info("تمت استعادة المسودة المحلية بنجاح");
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
  const handleAutoSlug = () => {
    if (!title.trim()) return;
    const generated = generateSlug(title);
    setSlug(generated);
    setIsDirty(true);
  };
  useEffect(() => {
    if (!slug.trim()) {
      setIsSlugAvailable(null);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSlugChecking(true);
      try {
        const available = await isPostSlugUnique(slug, lang, isNew ? void 0 : id);
        setIsSlugAvailable(available);
      } catch {
        setIsSlugAvailable(null);
      } finally {
        setIsSlugChecking(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [slug, lang, id, isNew]);
  const handleEditorChange = useCallback((html, json) => {
    setContentHtml(html);
    setContentJson(json);
    setIsDirty(true);
  }, []);
  const derivedFaqs = deriveFaqFromContent(contentHtml);
  const seoInput = useMemo(
    () => ({
      title,
      slug,
      seoTitle,
      seoDescription,
      focusKeyword,
      secondaryKeywords,
      excerpt,
      featuredImageId,
      featuredImageAlt,
      contentHtml,
      canonicalUrl,
      robotsNoindex,
      robotsNofollow,
      ogImageId,
      faq: derivedFaqs,
      siteDomain: "almubtakirah.com"
    }),
    [
      title,
      slug,
      seoTitle,
      seoDescription,
      focusKeyword,
      secondaryKeywords,
      excerpt,
      featuredImageId,
      featuredImageAlt,
      contentHtml,
      canonicalUrl,
      robotsNoindex,
      robotsNofollow,
      ogImageId,
      derivedFaqs
    ]
  );
  const { result: seoResult, isAnalyzing: isSeoAnalyzing } = useSeoAnalyzer(seoInput);
  useEffect(() => {
    if (!title.trim() || title.trim().length < 5) {
      setIsTitleDuplicate(false);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const isUnique = await isPostTitleUnique(title, lang, isNew ? void 0 : id);
        setIsTitleDuplicate(!isUnique);
      } catch {
      }
    }, 450);
    return () => clearTimeout(timer);
  }, [title, lang, isNew, id]);
  const handleAddSecondaryKeyword = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = secondaryInput.trim();
      if (val && !secondaryKeywords.includes(val) && secondaryKeywords.length < 5) {
        setSecondaryKeywords([...secondaryKeywords, val]);
        setSecondaryInput("");
        setIsDirty(true);
      }
    }
  };
  const handleRemoveSecondaryKeyword = (keyword) => {
    setSecondaryKeywords(secondaryKeywords.filter((k) => k !== keyword));
    setIsDirty(true);
  };
  const handleCreateNewTag = async () => {
    const tagName = newTagInput.trim();
    if (!tagName) return;
    const tagSlug = generateSlug(tagName);
    try {
      const created = await createTagMutation.mutateAsync({
        name_ar: tagName,
        slug: tagSlug
      });
      setSelectedTagIds((prev) => [...prev, created.id]);
      setNewTagInput("");
      setIsDirty(true);
      success(`تمت إضافة الوسم #${tagName}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل إنشاء الوسم", msg);
    }
  };
  useEffect(() => {
    if (!isDirty) return;
    const interval = setInterval(() => {
      try {
        const backupData = {
          title,
          slug,
          excerpt,
          contentHtml,
          contentJson,
          categoryId,
          seoTitle,
          seoDescription,
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
    title,
    slug,
    excerpt,
    contentHtml,
    contentJson,
    categoryId,
    seoTitle,
    seoDescription,
    localStorageKey
  ]);
  const handleSave = async (targetStatus, skipLowSeoConfirm = false) => {
    setErrors({});
    const postStatus = targetStatus || status;
    if (postStatus === "published") {
      const publishErrors = {};
      if (!title.trim()) publishErrors.title = "عنوان المقال مطلوب لنشر المقال";
      if (!slug.trim()) publishErrors.slug = "الرابط اللطيف مطلوب لنشر المقال";
      if (!excerpt.trim()) publishErrors.excerpt = "المقتطف التعريفي مطلوب لنشر المقال";
      if (featuredImageId && !featuredImageAlt.trim()) {
        publishErrors.featured_image_alt = "النص البديل (Alt) مطلوب للصورة الرئيسية لنشر المقال";
      }
      if (Object.keys(publishErrors).length > 0) {
        setErrors(publishErrors);
        toastError("بيانات غير مكتملة", "يرجى استكمال الحقول الإلزامية قبل النشر");
        return;
      }
      if (seoResult.score < 50 && !skipLowSeoConfirm) {
        setIsLowSeoConfirmOpen(true);
        return;
      }
    }
    const payload = {
      title: title.trim(),
      slug: slug.trim(),
      lang,
      translation_key: (existingPost == null ? void 0 : existingPost.translation_key) || void 0,
      excerpt: excerpt.trim() || null,
      content_html: contentHtml,
      content_json: contentJson,
      category_id: categoryId || null,
      tag_ids: selectedTagIds,
      featured_image_id: featuredImageId,
      featured_image_alt: featuredImageAlt.trim() || null,
      status: postStatus,
      published_at: postStatus === "published" ? publishedAt || (/* @__PURE__ */ new Date()).toISOString() : publishedAt || null,
      seo_score: seoResult.score,
      seo_title: seoTitle.trim() || null,
      seo_description: seoDescription.trim() || null,
      focus_keyword: focusKeyword.trim() || null,
      secondary_keywords: secondaryKeywords,
      canonical_url: canonicalUrl.trim() || null,
      robots_noindex: robotsNoindex,
      robots_nofollow: robotsNofollow,
      og_title: ogTitle.trim() || null,
      og_description: ogDescription.trim() || null,
      og_image_id: ogImageId || featuredImageId,
      schema_type: schemaType,
      faq: derivedFaqs
    };
    const validation = postFormSchema.safeParse(payload);
    if (!validation.success) {
      const fieldErrors = {};
      validation.error.errors.forEach((err) => {
        const field = String(err.path[0]);
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
      toastError("خطأ في البيانات", "يرجى مراجعة الحقول المشار إليها بالأحمر");
      return;
    }
    try {
      if (isNew) {
        const created = await createPostMutation.mutateAsync({
          data: payload
        });
        try {
          localStorage.removeItem(localStorageKey);
        } catch {
        }
        setIsDirty(false);
        success(
          postStatus === "published" ? "تم نشر المقال بنجاح" : "تم حفظ المسودة بنجاح",
          postStatus === "published" ? REBUILD_NOTICE : void 0
        );
        navigate(`/admin/posts/${created.id}`);
      } else {
        await updatePostMutation.mutateAsync({
          id,
          data: payload
        });
        try {
          localStorage.removeItem(localStorageKey);
        } catch {
        }
        setIsDirty(false);
        setStatus(postStatus);
        setLastSavedAt((/* @__PURE__ */ new Date()).toLocaleTimeString("ar-SA"));
        success(
          postStatus === "published" ? "تم نشر وتحديث المقال" : "تم حفظ التعديلات بنجاح",
          postStatus === "published" ? REBUILD_NOTICE : void 0
        );
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حفظ المقال", msg);
    }
  };
  const handleCreateTwin = async () => {
    if (isNew || !id) return;
    try {
      const twin = await createTwinMutation.mutateAsync(id);
      const targetName = lang === "ar" ? "الإنجليزية" : "العربية";
      success(`تم إنشاء نسخة المقال المترجمة باللغة ${targetName}`);
      navigate(`/admin/posts/${twin.id}`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل إنشاء النسخة المترجمة", msg);
    }
  };
  const handleFeaturedImageSelect = (selected) => {
    const item = Array.isArray(selected) ? selected[0] : selected;
    if (item) {
      setFeaturedImageId(item.id);
      setFeaturedImageUrl(getStoragePublicUrl(item.storage_path));
      if (!featuredImageAlt && item.alt_text) {
        setFeaturedImageAlt(item.alt_text);
      }
      setIsDirty(true);
    }
    setIsFeaturedPickerOpen(false);
  };
  const handleOgImageSelect = (selected) => {
    const item = Array.isArray(selected) ? selected[0] : selected;
    if (item) {
      setOgImageId(item.id);
      setOgImageUrl(getStoragePublicUrl(item.storage_path));
      setIsDirty(true);
    }
    setIsOgPickerOpen(false);
  };
  const wordCount = contentHtml.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length;
  const readingTime = calculateReadingTime(contentHtml.replace(/<[^>]*>/g, " "));
  const publicUrl = lang === "en" ? `/en/blog/${slug || "post"}` : `/blog/${slug || "post"}`;
  if (isLoadingPost && !isNew) {
    return /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-slate-500", children: "جاري تحميل بيانات المقال..." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto space-y-6 pb-20", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: isNew ? "كتابة مقال جديد" : `تحرير: ${title || "مقال"}`,
        description: "محرر مقالات متقدم يدعم تنسيقات المصاعد الخاصة وبلوكات الأسئلة التفاعلية والتحسين لمحركات البحث.",
        backTo: "/admin/posts",
        backLabel: "العودة لقائمة المقالات"
      }
    ),
    hasLocalBackup && /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-card bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(RotateCcw, { className: "w-5 h-5 shrink-0 text-amber-600" }),
        /* @__PURE__ */ jsx("span", { children: "تم العثور على مسودة محلية محفوظة تلقائياً لهذا المقال. هل ترغب في استعادتها؟" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
        /* @__PURE__ */ jsx(Button, { size: "sm", variant: "secondary", onClick: handleDismissBackup, children: "تجاهل" }),
        /* @__PURE__ */ jsx(Button, { size: "sm", className: "bg-brand-600 hover:bg-brand-700 text-white font-bold", onClick: handleRestoreBackup, children: "استعادة المسودة" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-4 shadow-xs", children: [
        /* @__PURE__ */ jsxs(
          FormField,
          {
            label: "عنوان المقال (H1 الرئيسي للصفحة)",
            required: true,
            error: errors.title,
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: title,
                  onChange: (e) => {
                    setTitle(e.target.value);
                    setIsDirty(true);
                    if (!slug) {
                      setSlug(generateSlug(e.target.value));
                    }
                  },
                  placeholder: "اكتب عنواناً جذاباً ومحدداً للمقال...",
                  className: "w-full px-4 py-3 text-lg font-bold rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              ),
              isTitleDuplicate && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 text-xs text-amber-700 mt-1.5 bg-amber-50 p-2 rounded-control border border-amber-200", children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 shrink-0 text-amber-600" }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "تنبيه: يوجد مقال آخر بنفس العنوان في قاعدة البيانات (",
                  lang === "ar" ? "العربية" : "الإنجليزية",
                  "). يوصى باختيار عنوان فريد لتجنب التنافس في نتائج البحث."
                ] })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs(FormField, { label: "الرابط اللطيف (Slug)", required: true, error: errors.slug, children: [
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
                placeholder: "e.g. elevator-maintenance-cost-jeddah",
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
              "almubtakirah.com/",
              lang,
              "/blog/",
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
        ] }),
        /* @__PURE__ */ jsxs(
          FormField,
          {
            label: "المقتطف التعريفي (Excerpt)",
            required: true,
            error: errors.excerpt,
            children: [
              /* @__PURE__ */ jsx(
                "textarea",
                {
                  rows: 3,
                  value: excerpt,
                  onChange: (e) => {
                    setExcerpt(e.target.value);
                    setIsDirty(true);
                  },
                  maxLength: 350,
                  placeholder: "موجز جذاب للمقال يظهر في بطاقات المدونة ونتائج البحث (حد أقصى 350 حرفاً)...",
                  className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-content-muted mt-1", children: [
                /* @__PURE__ */ jsx("span", { children: "يستخدم كوصف تلقائي في بطاقات المشاركة وبحث Google" }),
                /* @__PURE__ */ jsxs("span", { className: excerpt.length > 320 ? "text-amber-500 font-bold" : "", children: [
                  excerpt.length,
                  " / 350 حرفاً"
                ] })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-content-heading pb-3 border-b border-surface-border", children: "الصورة البارزة للمقال" }),
        featuredImageUrl ? /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "aspect-[21/9] sm:aspect-[2.4/1] w-full rounded-control bg-surface-soft overflow-hidden border border-surface-border relative group max-h-72", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: featuredImageUrl,
                alt: featuredImageAlt || "الصورة البارزة",
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
                  onClick: () => setIsFeaturedPickerOpen(true),
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
                    setFeaturedImageId(null);
                    setFeaturedImageUrl(null);
                    setIsDirty(true);
                  },
                  children: "إزالة"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            FormField,
            {
              label: "النص البديل للصورة (Alt Text)",
              required: true,
              error: errors.featured_image_alt,
              children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: featuredImageAlt,
                    onChange: (e) => {
                      setFeaturedImageAlt(e.target.value);
                      setIsDirty(true);
                    },
                    placeholder: "وصف دقيق للصورة لمحركات البحث وضعاف البصر...",
                    className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                  }
                ),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted mt-1", children: "إلزامي لنشر المقال وتحسين محركات البحث." })
              ]
            }
          )
        ] }) : /* @__PURE__ */ jsxs("div", { className: "space-y-3 text-center p-8 border-2 border-dashed border-surface-border rounded-control bg-surface-soft", children: [
          /* @__PURE__ */ jsx(Image, { className: "w-12 h-12 text-content-muted mx-auto" }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-content-muted max-w-sm mx-auto", children: "اختر صورة عالية الجودة لتمثيل المقال في رأس الصفحة وقوائم المدونة وبطاقات المشاركة الاجتماعية." }),
          /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: () => setIsFeaturedPickerOpen(true),
              className: "gap-1.5 font-bold",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "اختيار من مكتبة الوسائط" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card overflow-hidden shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-surface-border flex items-center justify-between bg-surface-soft", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-brand-600" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-sm text-content-heading", children: "محتوى المقال الكامل" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-xs text-content-muted", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              wordCount,
              " كلمة"
            ] }),
            /* @__PURE__ */ jsx("span", { children: "•" }),
            /* @__PURE__ */ jsxs("span", { children: [
              readingTime,
              " دقيقة قراءة"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "p-2 sm:p-4", children: /* @__PURE__ */ jsx(
          React.Suspense,
          {
            fallback: /* @__PURE__ */ jsx("div", { className: "h-64 flex items-center justify-center text-sm text-content-muted", children: "جارٍ تحميل المحرر..." }),
            children: /* @__PURE__ */ jsx(
              TipTapEditor,
              {
                contentHtml,
                contentJson,
                onChange: handleEditorChange,
                lang,
                placeholder: "ابدأ بكتابة المقال هنا... يمكنك إدراج صور، جداول، فيديوهات يوتيوب، وبلوكات الأسئلة المخصصة للمصاعد عبر القائمة."
              }
            )
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm text-content-heading pb-3 border-b border-surface-border", children: "إعدادات النشر والتصنيف واللغة" }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
          /* @__PURE__ */ jsx(FormField, { label: "حالة المقال", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: status,
              onChange: (e) => {
                setStatus(e.target.value);
                setIsDirty(true);
              },
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: [
                /* @__PURE__ */ jsx("option", { value: "draft", children: "مسودة (غير ظاهر للعامة)" }),
                /* @__PURE__ */ jsx("option", { value: "published", children: "منشور للجمهور" }),
                /* @__PURE__ */ jsx("option", { value: "archived", children: "مؤرشف" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "لغة المقال", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: lang,
              onChange: (e) => {
                setLang(e.target.value);
                setIsDirty(true);
              },
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: [
                /* @__PURE__ */ jsx("option", { value: "ar", children: "العربية (RTL)" }),
                /* @__PURE__ */ jsx("option", { value: "en", children: "English (LTR)" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "تصنيف المقال", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: categoryId,
              onChange: (e) => {
                setCategoryId(e.target.value);
                setIsDirty(true);
              },
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "بدون تصنيف" }),
                categories.map((c) => /* @__PURE__ */ jsxs("option", { value: c.id, children: [
                  c.name_ar,
                  " ",
                  c.name_en ? `(${c.name_en})` : ""
                ] }, c.id))
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-3.5 rounded-control bg-surface-soft border border-surface-border text-xs space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between font-medium text-content-heading", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Languages, { className: "w-3.5 h-3.5 text-brand-600" }),
              /* @__PURE__ */ jsx("span", { children: "النسخة المترجمة المزدوجة" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-mono text-[10px] text-content-muted", children: lang === "ar" ? "EN Twin" : "AR Twin" })
          ] }),
          (existingPost == null ? void 0 : existingPost.twin_post) ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-content-body line-clamp-1", children: existingPost.twin_post.title }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `/admin/posts/${existingPost.twin_post.id}`,
                className: "text-brand-600 hover:underline shrink-0 ms-2 font-medium",
                children: "فتح النسخة"
              }
            )
          ] }) : !isNew ? /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsxs(
            Button,
            {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: handleCreateTwin,
              disabled: createTwinMutation.isPending,
              className: "text-xs h-8 gap-1 font-semibold",
              children: [
                /* @__PURE__ */ jsx(Plus, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsx("span", { children: lang === "ar" ? "إنشاء نسخة مترجمة بالإنجليزية" : "إنشاء نسخة مترجمة بالعربية" })
              ]
            }
          ) }) : /* @__PURE__ */ jsx("span", { className: "text-content-muted block pt-1", children: "احفظ المقال أولاً لربطه بنسخة مترجمة." })
        ] }),
        /* @__PURE__ */ jsx(FormField, { label: "الوسوم المرتبطة", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 min-h-[36px] p-2 bg-surface-soft rounded-control border border-surface-border", children: selectedTagIds.length === 0 ? /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted self-center", children: "لا توجد وسوم محددة" }) : selectedTagIds.map((tagId) => {
            const tag = allTags.find((t) => t.id === tagId);
            if (!tag) return null;
            return /* @__PURE__ */ jsxs(
              "span",
              {
                className: "inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-brand-50 text-brand-700 border border-brand-200 font-medium",
                children: [
                  "#",
                  tag.name_ar,
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setSelectedTagIds(selectedTagIds.filter((id2) => id2 !== tag.id));
                        setIsDirty(true);
                      },
                      className: "hover:text-feedback-error ms-1",
                      children: "×"
                    }
                  )
                ]
              },
              tag.id
            );
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2 max-w-md", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: newTagInput,
                onChange: (e) => setNewTagInput(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleCreateNewTag();
                  }
                },
                placeholder: "إضافة وسم جديد...",
                className: "flex-1 px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            ),
            /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: handleCreateNewTag,
                disabled: !newTagInput.trim() || createTagMutation.isPending,
                className: "h-9 text-xs px-3 font-semibold",
                children: [
                  /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5 me-1" }),
                  /* @__PURE__ */ jsx("span", { children: "إضافة" })
                ]
              }
            )
          ] }),
          allTags.length > 0 && /* @__PURE__ */ jsxs("div", { className: "pt-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block mb-1.5", children: "الوسوم المتوفرة (انقر للإضافة):" }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 max-h-24 overflow-y-auto", children: allTags.filter((t) => !selectedTagIds.includes(t.id)).map((tag) => /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setSelectedTagIds([...selectedTagIds, tag.id]);
                  setIsDirty(true);
                },
                className: "text-[11px] px-2.5 py-1 rounded bg-surface-soft hover:bg-brand-50 hover:text-brand-700 border border-surface-border text-content-body transition-colors",
                children: [
                  "+",
                  tag.name_ar
                ]
              },
              tag.id
            )) })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-content-heading pb-3 border-b border-surface-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "إعدادات تحسين محركات البحث (SEO)" }),
          /* @__PURE__ */ jsx(Globe, { className: "w-4 h-4 text-brand-600" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs(FormField, { label: "عنوان الـ SEO", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: seoTitle,
                onChange: (e) => {
                  setSeoTitle(e.target.value);
                  setIsDirty(true);
                },
                placeholder: title || "العنوان لمحركات البحث...",
                className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[11px] mt-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-content-muted", children: "المثالي: 30 إلى 60 حرفاً" }),
              /* @__PURE__ */ jsxs(
                "span",
                {
                  className: (seoTitle || title).length >= 30 && (seoTitle || title).length <= 60 ? "text-emerald-600 font-bold" : "text-amber-600",
                  children: [
                    (seoTitle || title).length,
                    " حرفاً"
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(FormField, { label: "الكلمة المفتاحية المستهدفة (Focus Keyword)", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: focusKeyword,
              onChange: (e) => {
                setFocusKeyword(e.target.value);
                setIsDirty(true);
              },
              placeholder: "مثال: صيانة مصاعد جدة",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs(FormField, { label: "الوصف التعريفي (Meta Description)", children: [
          /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 3,
              value: seoDescription,
              onChange: (e) => {
                setSeoDescription(e.target.value);
                setIsDirty(true);
              },
              placeholder: excerpt || "الوصف المختصر في نتائج البحث...",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[11px] mt-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-content-muted", children: "المثالي: 120 إلى 160 حرفاً" }),
            /* @__PURE__ */ jsxs(
              "span",
              {
                className: (seoDescription || excerpt).length >= 120 && (seoDescription || excerpt).length <= 160 ? "text-emerald-600 font-bold" : "text-amber-600",
                children: [
                  (seoDescription || excerpt).length,
                  " حرفاً"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx(FormField, { label: "الكلمات المفتاحية الثانوية (حد أقصى 5)", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: secondaryKeywords.map((kw) => /* @__PURE__ */ jsxs(
            "span",
            {
              className: "inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-surface-soft border border-surface-border text-content-heading font-medium",
              children: [
                kw,
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleRemoveSecondaryKeyword(kw),
                    className: "hover:text-feedback-error ms-1",
                    children: "×"
                  }
                )
              ]
            },
            kw
          )) }),
          secondaryKeywords.length < 5 && /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: secondaryInput,
              onChange: (e) => setSecondaryInput(e.target.value),
              onKeyDown: handleAddSecondaryKeyword,
              placeholder: "اكتب كلمة مفتاحية ثانوية واضغط Enter...",
              className: "w-full max-w-md px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-surface-border", children: [
          /* @__PURE__ */ jsxs(FormField, { label: "الرابط القانوني المخصص (Canonical URL - اختياري)", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                value: canonicalUrl,
                onChange: (e) => {
                  setCanonicalUrl(e.target.value);
                  setIsDirty(true);
                },
                placeholder: "https://almubtakirah.com/ar/blog/...",
                className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 text-start",
                dir: "ltr"
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted mt-1", children: "اتركه فارغاً ليتم استخدام رابط المقال الافتراضي كـ Canonical تلقائياً." })
          ] }),
          /* @__PURE__ */ jsx(FormField, { label: "نوع البيانات المنظمة (Schema)", children: /* @__PURE__ */ jsxs(
            "select",
            {
              value: schemaType,
              onChange: (e) => {
                setSchemaType(e.target.value);
                setIsDirty(true);
              },
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600",
              children: [
                /* @__PURE__ */ jsx("option", { value: "BlogPosting", children: "BlogPosting (مقال مدونة - موصى به)" }),
                /* @__PURE__ */ jsx("option", { value: "Article", children: "Article (مقال عام)" }),
                /* @__PURE__ */ jsx("option", { value: "NewsArticle", children: "NewsArticle (خبر صحفي)" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 text-xs pt-2", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: robotsNoindex,
                onChange: (e) => {
                  setRobotsNoindex(e.target.checked);
                  setIsDirty(true);
                },
                className: "rounded border-surface-border text-brand-600 focus:ring-brand-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-content-heading font-medium", children: "منع الفهرسة (noindex)" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "checkbox",
                checked: robotsNofollow,
                onChange: (e) => {
                  setRobotsNofollow(e.target.checked);
                  setIsDirty(true);
                },
                className: "rounded border-surface-border text-brand-600 focus:ring-brand-500"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-content-heading font-medium", children: "منع تتبع الروابط (nofollow)" })
          ] })
        ] }),
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
              dir: lang === "ar" ? "rtl" : "ltr",
              className: "p-3.5 bg-surface-soft border border-surface-border rounded-control text-start space-y-1.5",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-content-muted truncate", dir: "ltr", children: [
                  "https://almubtakirah.com › ",
                  lang,
                  " › blog › ",
                  slug || "article"
                ] }),
                /* @__PURE__ */ jsx("div", { className: "text-sm font-medium text-blue-700 hover:underline line-clamp-1 cursor-pointer", children: seoTitle || title || "عنوان المقال التجريبي في محرك البحث" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-content-body line-clamp-2", children: seoDescription || excerpt || "هنا سيظهر وصف المقال المعروض للزوار في محرك بحث جوجل ومواقع التواصل الاجتماعي..." })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-5 shadow-xs", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-content-heading pb-3 border-b border-surface-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "بطاقة التواصل الاجتماعي (Open Graph)" }),
          /* @__PURE__ */ jsx(Share2, { className: "w-4 h-4 text-brand-600" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(FormField, { label: "عنوان المشاركة (OG Title)", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: ogTitle,
              onChange: (e) => {
                setOgTitle(e.target.value);
                setIsDirty(true);
              },
              placeholder: seoTitle || title || "عنوان البطاقة...",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "وصف المشاركة (OG Description)", children: /* @__PURE__ */ jsx(
            "textarea",
            {
              rows: 2,
              value: ogDescription,
              onChange: (e) => {
                setOgDescription(e.target.value);
                setIsDirty(true);
              },
              placeholder: seoDescription || excerpt || "وصف البطاقة...",
              className: "w-full px-3 py-2 text-xs rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold text-content-heading", children: "صورة المشاركة (تستخدم الصورة البارزة افتراضياً)" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => setIsOgPickerOpen(true),
                className: "text-xs font-semibold",
                children: "اختيار صورة مخصصة"
              }
            ),
            ogImageUrl && /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => {
                  setOgImageId(null);
                  setOgImageUrl(null);
                  setIsDirty(true);
                },
                className: "text-xs text-feedback-error font-semibold",
                children: "إعادة للافتراضي"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            dir: lang === "ar" ? "rtl" : "ltr",
            className: "rounded-control border border-surface-border overflow-hidden bg-surface-soft text-start max-w-lg",
            children: [
              /* @__PURE__ */ jsx("div", { className: "aspect-[1.91/1] w-full bg-slate-100 overflow-hidden", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: ogImageUrl || featuredImageUrl || "/brand/og-default.png",
                  alt: "OG Preview",
                  className: "w-full h-full object-cover",
                  onError: (e) => {
                    e.currentTarget.style.display = "none";
                  }
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "p-3.5 space-y-1", children: [
                /* @__PURE__ */ jsx("div", { className: "text-[10px] text-content-muted uppercase font-mono", children: "almubtakirah.com" }),
                /* @__PURE__ */ jsx("div", { className: "text-xs font-bold text-content-heading line-clamp-1", children: ogTitle || seoTitle || title || "عنوان المقال" }),
                /* @__PURE__ */ jsx("div", { className: "text-[11px] text-content-muted line-clamp-2", children: ogDescription || seoDescription || excerpt || "وصف المقال لمواقع التواصل..." })
              ] })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        SeoAnalyzerPanel,
        {
          seoData: seoResult,
          isAnalyzing: isSeoAnalyzing,
          focusKeyword
        }
      ),
      derivedFaqs.length > 0 && /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-6 space-y-4 shadow-xs", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(HelpCircle, { className: "w-4 h-4 text-emerald-600" }),
            /* @__PURE__ */ jsxs("h3", { className: "font-bold text-sm text-content-heading", children: [
              "الأسئلة الشائعة المستخرجة تلقائياً (",
              derivedFaqs.length,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted", children: "تُدرج تلقائياً في بيانات الـ FAQPage المنسقة للـ Rich Snippets" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-2", children: derivedFaqs.map((faq, idx) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "p-3.5 rounded-control bg-surface-soft border border-surface-border text-xs space-y-1",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "font-bold text-content-heading", children: [
                "س: ",
                faq.q
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-content-body", children: [
                "ج: ",
                faq.a
              ] })
            ]
          },
          idx
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white border border-surface-border rounded-card p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-content-muted flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: "الحفظ التلقائي: مفعّل (كل 30ث)" }),
          lastSavedAt && /* @__PURE__ */ jsxs("span", { children: [
            "• آخر حفظ: ",
            lastSavedAt
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 w-full sm:w-auto", children: [
          !isNew && status === "published" && /* @__PURE__ */ jsxs(
            "a",
            {
              href: publicUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-control border border-surface-border hover:bg-surface-soft text-content-body transition-colors",
              children: [
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: "معاينة المقال المباشر" })
              ]
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              size: "sm",
              variant: "secondary",
              onClick: () => handleSave("draft"),
              disabled: createPostMutation.isPending || updatePostMutation.isPending,
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
              onClick: () => handleSave("published"),
              disabled: createPostMutation.isPending || updatePostMutation.isPending,
              className: "flex-1 sm:flex-none px-6 bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap",
              leftIcon: /* @__PURE__ */ jsx(Save, { className: "w-4 h-4", "aria-hidden": "true" }),
              children: status === "published" ? "تحديث ونشر المقال" : "نشر المقال الآن"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      MediaPicker,
      {
        open: isFeaturedPickerOpen,
        onClose: () => setIsFeaturedPickerOpen(false),
        onSelect: handleFeaturedImageSelect,
        mode: "single",
        accept: "image",
        title: "اختيار الصورة البارزة للمقال"
      }
    ),
    /* @__PURE__ */ jsx(
      MediaPicker,
      {
        open: isOgPickerOpen,
        onClose: () => setIsOgPickerOpen(false),
        onSelect: handleOgImageSelect,
        mode: "single",
        accept: "image",
        title: "اختيار صورة بطاقة المشاركة الاجتماعية"
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: isLowSeoConfirmOpen,
        onClose: () => setIsLowSeoConfirmOpen(false),
        onConfirm: () => {
          setIsLowSeoConfirmOpen(false);
          handleSave("published", true);
        },
        title: "تنبيه: نتيجة السيو منخفضة",
        description: `نتيجة تحسين محركات البحث الحالية للمقال هي ${seoResult.score}/100 (أقل من 50). يُفضل مراجعة توصيات السيو وتطبيقها لتحسين ترتيب المقال في نتائج بحث جوجل. هل ترغب في الاستمرار ونشر المقال الآن على أي حال؟`,
        confirmText: "متابعة النشر على أي حال",
        cancelText: "العودة وإصلاح الملاحظات",
        isDestructive: false
      }
    )
  ] });
};
export {
  PostEditPage
};
