var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { D as Dialog, B as Button, s as supabase, u as useToast, g as getStoragePublicUrl } from "../main.mjs";
import { AlertTriangle, ArrowRight, UploadCloud, FileImage, FileText, X, CheckCircle2, AlertCircle, Loader2, Save, Plus, Search, Upload, Image as Image$1, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useRef, useCallback, useEffect, useId } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/components/admin/DataTable.tsx");
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/components/admin/ConfirmDialog.tsx");
const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "تأكيد الحذف",
  cancelText = "إلغاء",
  isDestructive = true,
  isLoading = false
}) => {
  return /* @__PURE__ */ jsx(
    Dialog,
    {
      isOpen,
      onClose: () => {
        if (!isLoading) onClose();
      },
      title,
      maxWidth: "sm",
      children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3.5", children: [
          isDestructive && /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-feedback-error/10 text-feedback-error flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5", "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-content-body leading-relaxed", children: description })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-surface-border", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "ghost",
              onClick: onClose,
              disabled: isLoading,
              size: "sm",
              children: cancelText
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "primary",
              onClick: onConfirm,
              isLoading,
              size: "sm",
              className: isDestructive ? "bg-feedback-error hover:bg-rose-700 text-white" : void 0,
              children: confirmText
            }
          )
        ] })
      ] })
    }
  );
};
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/components/admin/StatusBadge.tsx");
const STATUS_CONFIG = {
  published: { label: "منشور", dot: "bg-emerald-500", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  draft: { label: "مسودة", dot: "bg-amber-500", classes: "bg-amber-50 text-amber-700 border-amber-200" },
  archived: { label: "مؤرشف", dot: "bg-slate-400", classes: "bg-slate-100 text-slate-700 border-slate-200" },
  new: { label: "رسالة جديدة", dot: "bg-blue-500", classes: "bg-blue-50 text-blue-700 border-blue-200" },
  contacted: { label: "تم التواصل", dot: "bg-amber-500", classes: "bg-amber-50 text-amber-700 border-amber-200" },
  closed: { label: "مكتمل", dot: "bg-emerald-500", classes: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  spam: { label: "مزعج", dot: "bg-rose-500", classes: "bg-rose-50 text-rose-700 border-rose-200" },
  admin: { label: "مدير عام", dot: "bg-purple-500", classes: "bg-purple-50 text-purple-700 border-purple-200" },
  editor: { label: "محرر", dot: "bg-indigo-500", classes: "bg-indigo-50 text-indigo-700 border-indigo-200" },
  none: { label: "بدون صلاحية", dot: "bg-slate-300", classes: "bg-slate-100 text-slate-500 border-slate-200" },
  ar: { label: "العربية", classes: "rounded-sm font-bold bg-brand-50 text-brand-800 border-brand-200" },
  en: { label: "English", classes: "rounded-sm font-bold bg-slate-100 text-slate-700 border-slate-200" }
};
const StatusBadge = ({
  status,
  seoScore,
  className = ""
}) => {
  if (seoScore !== void 0 && seoScore !== null) {
    const colorClasses = seoScore >= 80 ? "bg-feedback-success/10 text-feedback-success border-feedback-success/20" : seoScore >= 50 ? "bg-feedback-warning/10 text-feedback-warning border-feedback-warning/20" : "bg-feedback-error/10 text-feedback-error border-feedback-error/20";
    return /* @__PURE__ */ jsxs(
      "span",
      {
        className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${colorClasses} ${className}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "SEO: ",
            seoScore,
            "/100"
          ] })
        ]
      }
    );
  }
  const config = status ? STATUS_CONFIG[status] : void 0;
  return /* @__PURE__ */ jsxs(
    "span",
    {
      className: `inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config ? config.classes : "bg-surface-soft text-content-body border-surface-border"} ${className}`,
      children: [
        (config == null ? void 0 : config.dot) && /* @__PURE__ */ jsx("span", { className: `w-1.5 h-1.5 rounded-full ${config.dot}`, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx("span", { children: (config == null ? void 0 : config.label) ?? status })
      ]
    }
  );
};
(_d = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _d.call(globalThis, "src/components/admin/PageHeader.tsx");
const PageHeader = ({
  title,
  description,
  backTo,
  backLabel = "الرجوع",
  actions
}) => {
  return /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
    backTo && /* @__PURE__ */ jsx("div", { className: "mb-3", children: /* @__PURE__ */ jsxs(
      Link,
      {
        to: backTo,
        className: "inline-flex items-center gap-1.5 text-xs font-semibold text-content-muted hover:text-brand-600 transition-colors",
        children: [
          /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx("span", { children: backLabel })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-content-heading tracking-tight", children: title }),
        description && /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted mt-1 leading-relaxed", children: description })
      ] }),
      actions && /* @__PURE__ */ jsx("div", { className: "flex items-center gap-3 shrink-0", children: actions })
    ] })
  ] });
};
(_e = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _e.call(globalThis, "src/features/media/imagePipeline.ts");
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024;
const MAX_LONG_EDGE_PX = 2400;
const VARIANT_WIDTHS = [480, 960, 1600];
const WEBP_QUALITY = 0.82;
const ALLOWED_MIME_TYPES = /* @__PURE__ */ new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
  "image/svg+xml",
  "application/pdf"
]);
class MediaValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "MediaValidationError";
  }
}
function slugifyFileName(fileName) {
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  const safe = nameWithoutExt.toLowerCase().trim().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
  return safe || "media-asset";
}
async function calculateBufferHash(buffer) {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }
  let hash = 0;
  const view = new Uint8Array(buffer);
  for (let i = 0; i < view.length; i++) {
    hash = hash * 31 + view[i] >>> 0;
  }
  return hash.toString(16).padStart(8, "0");
}
function loadImageElement(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new MediaValidationError("فشل في قراءة بيانات ملف الصورة. يرجى التأكد من سلامة الملف."));
    };
    img.src = url;
  });
}
function validateMediaFile(file) {
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    throw new MediaValidationError(
      `نوع الملف (${file.type || "غير معروف"}) غير مدعوم. الصيغ المدعومة هي JPG، PNG، WebP، AVIF، SVG، و PDF فقط.`
    );
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
    throw new MediaValidationError(
      `حجم الملف (${sizeMb} ميجابايت) يتجاوز الحد الأقصى المسموح به وهو 10 ميجابايت.`
    );
  }
}
function renderCanvasToWebp(img, targetWidth, targetHeight) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      reject(new Error("Canvas 2D context not available"));
      return;
    }
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("فشل في توليد صورة WebP من Canvas"));
          return;
        }
        resolve(blob);
      },
      "image/webp",
      WEBP_QUALITY
    );
  });
}
async function processMediaFile(file) {
  validateMediaFile(file);
  const arrayBuffer = await file.arrayBuffer();
  const fullHash = await calculateBufferHash(arrayBuffer);
  const shortHash = fullHash.slice(0, 8);
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const datePrefix = `${year}/${month}`;
  const slug = slugifyFileName(file.name);
  if (file.type === "application/pdf" || file.type === "image/svg+xml") {
    const ext = file.type === "application/pdf" ? "pdf" : "svg";
    const storagePath = `${datePrefix}/${slug}-${shortHash}.${ext}`;
    return {
      originalFileName: file.name,
      slug,
      mimeType: file.type,
      width: 0,
      height: 0,
      sizeBytes: file.size,
      hash: fullHash,
      storagePath,
      variants: [],
      variantBlobs: [
        {
          blob: file,
          width: 0,
          height: 0,
          sizeBytes: file.size,
          storagePath
        }
      ]
    };
  }
  const img = await loadImageElement(file);
  const origWidth = img.naturalWidth || img.width;
  const origHeight = img.naturalHeight || img.height;
  if (origWidth <= 0 || origHeight <= 0) {
    throw new MediaValidationError("أبعاد الصورة غير صالحة أو تعذر قراءتها.");
  }
  let masterWidth = origWidth;
  let masterHeight = origHeight;
  const longestEdge = Math.max(origWidth, origHeight);
  if (longestEdge > MAX_LONG_EDGE_PX) {
    const ratio = MAX_LONG_EDGE_PX / longestEdge;
    masterWidth = Math.round(origWidth * ratio);
    masterHeight = Math.round(origHeight * ratio);
  }
  const candidateWidths = VARIANT_WIDTHS.filter((w) => w < masterWidth);
  const targetWidths = Array.from(/* @__PURE__ */ new Set([...candidateWidths, masterWidth])).sort((a, b) => a - b);
  const variantBlobs = [];
  const variantsInfo = [];
  for (const w of targetWidths) {
    const h = Math.round(w / masterWidth * masterHeight);
    const blob = await renderCanvasToWebp(img, w, h);
    const variantPath = `${datePrefix}/${slug}-${shortHash}-${w}.webp`;
    variantBlobs.push({
      blob,
      width: w,
      height: h,
      sizeBytes: blob.size,
      storagePath: variantPath
    });
    variantsInfo.push({
      w,
      h,
      path: variantPath,
      size: blob.size
    });
  }
  const primaryVariant = variantBlobs.find((v) => v.width === 1600) || variantBlobs[variantBlobs.length - 1];
  return {
    originalFileName: file.name,
    slug,
    mimeType: "image/webp",
    width: masterWidth,
    height: masterHeight,
    sizeBytes: primaryVariant.sizeBytes,
    hash: fullHash,
    storagePath: primaryVariant.storagePath,
    variants: variantsInfo,
    variantBlobs
  };
}
(_f = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _f.call(globalThis, "src/features/media/mediaService.ts");
async function getMediaList(params = {}) {
  const page = Math.max(1, params.page ?? 1);
  const pageSize = Math.max(1, params.pageSize ?? 40);
  const filter = params.filter ?? {};
  let query = supabase.from("media").select("*", { count: "exact" });
  if (filter.folder && filter.folder !== "all") {
    query = query.eq("folder", filter.folder);
  }
  if (filter.type === "image") {
    query = query.ilike("mime_type", "image/%");
  } else if (filter.type === "pdf") {
    query = query.eq("mime_type", "application/pdf");
  }
  if (filter.search && filter.search.trim()) {
    const term = filter.search.trim();
    query = query.or(
      `file_name.ilike.%${term}%,title.ilike.%${term}%,alt_text.ilike.%${term}%`
    );
  }
  switch (filter.sort) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "name_asc":
      query = query.order("file_name", { ascending: true });
      break;
    case "name_desc":
      query = query.order("file_name", { ascending: false });
      break;
    case "size_desc":
      query = query.order("size_bytes", { ascending: false });
      break;
    case "size_asc":
      query = query.order("size_bytes", { ascending: true });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  query = query.range(from, to);
  const { data, count, error } = await query;
  if (error) {
    throw new Error(`خطأ أثناء جلب ملفات الوسائط: ${error.message}`);
  }
  const totalCount = count ?? 0;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  return {
    items: data || [],
    totalCount,
    page,
    pageSize,
    totalPages
  };
}
async function getMediaById(id) {
  const { data, error } = await supabase.from("media").select("*").eq("id", id).maybeSingle();
  if (error) {
    throw new Error(`خطأ أثناء جلب تفاصيل الملف: ${error.message}`);
  }
  return data || null;
}
async function checkDuplicateMedia(fileName, _sizeBytes) {
  const { data } = await supabase.from("media").select("*").eq("file_name", fileName).order("created_at", { ascending: false }).limit(1);
  if (data && data.length > 0) {
    return { isDuplicate: true, existingMedia: data[0] };
  }
  return { isDuplicate: false };
}
async function uploadMedia(file, options = {}) {
  const { folder = "general", altText, title, onProgress } = options;
  onProgress == null ? void 0 : onProgress(10);
  const processed = await processMediaFile(file);
  onProgress == null ? void 0 : onProgress(30);
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const { data: existingRecord } = await supabase.from("media").select("*").eq("storage_path", processed.storagePath).maybeSingle();
  const totalBlobs = processed.variantBlobs.length;
  let uploadedCount = 0;
  for (const variant of processed.variantBlobs) {
    const { error: storageError } = await supabase.storage.from("media").upload(variant.storagePath, variant.blob, {
      contentType: processed.mimeType,
      upsert: true
    });
    if (storageError) {
      throw new Error(`فشل رفع الملف إلى وحدة التخزين: ${storageError.message}`);
    }
    uploadedCount++;
    const progressPercent = 30 + Math.round(uploadedCount / totalBlobs * 50);
    onProgress == null ? void 0 : onProgress(progressPercent);
  }
  if (existingRecord) {
    if (altText !== void 0 || title !== void 0 || folder && folder !== existingRecord.folder) {
      const updatePayload = {};
      if (altText !== void 0) updatePayload.alt_text = altText.trim() || null;
      if (title !== void 0) updatePayload.title = title.trim() || processed.originalFileName.replace(/\.[^/.]+$/, "");
      if (folder) updatePayload.folder = folder;
      const { data: updated } = await supabase.from("media").update(updatePayload).eq("id", existingRecord.id).select("*").single();
      onProgress == null ? void 0 : onProgress(100);
      return updated || existingRecord;
    }
    onProgress == null ? void 0 : onProgress(100);
    return existingRecord;
  }
  const insertPayload = {
    file_name: processed.originalFileName,
    storage_path: processed.storagePath,
    mime_type: processed.mimeType,
    size_bytes: processed.sizeBytes,
    width: processed.width > 0 ? processed.width : null,
    height: processed.height > 0 ? processed.height : null,
    variants: processed.variants,
    alt_text: (altText == null ? void 0 : altText.trim()) || null,
    title: (title == null ? void 0 : title.trim()) || processed.originalFileName.replace(/\.[^/.]+$/, ""),
    folder,
    uploaded_by: (user == null ? void 0 : user.id) || null
  };
  const { data: inserted, error: dbError } = await supabase.from("media").insert(insertPayload).select("*").single();
  if (dbError) {
    if (dbError.code === "23505" || dbError.message.includes("unique constraint")) {
      const { data: fallbackRecord } = await supabase.from("media").select("*").eq("storage_path", processed.storagePath).maybeSingle();
      if (fallbackRecord) {
        onProgress == null ? void 0 : onProgress(100);
        return fallbackRecord;
      }
    }
    const pathsToRemove = processed.variantBlobs.map((v) => v.storagePath);
    await supabase.storage.from("media").remove(pathsToRemove);
    throw new Error(`فشل تسجيل بيانات الوسائط في قاعدة البيانات: ${dbError.message}`);
  }
  onProgress == null ? void 0 : onProgress(100);
  return inserted;
}
async function updateMedia(id, updates) {
  const updatePayload = {
    ...updates,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const { data, error } = await supabase.from("media").update(updatePayload).eq("id", id).select("*").single();
  if (error) {
    throw new Error(`فشل تحديث بيانات الملف: ${error.message}`);
  }
  return data;
}
async function replaceMediaFile(id, newFile, onProgress) {
  const current = await getMediaById(id);
  if (!current) {
    throw new Error("الملف المطلوب استبداله غير موجود");
  }
  const processed = await processMediaFile(newFile);
  for (const variant of processed.variantBlobs) {
    const { error: uploadError } = await supabase.storage.from("media").upload(variant.storagePath, variant.blob, {
      contentType: processed.mimeType,
      upsert: true
    });
    if (uploadError) {
      throw new Error(`فشل رفع الملف الجديد: ${uploadError.message}`);
    }
  }
  const updatePayload = {
    file_name: processed.originalFileName,
    storage_path: processed.storagePath,
    mime_type: processed.mimeType,
    size_bytes: processed.sizeBytes,
    width: processed.width > 0 ? processed.width : null,
    height: processed.height > 0 ? processed.height : null,
    variants: processed.variants,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  const { data: updated, error: updateError } = await supabase.from("media").update(updatePayload).eq("id", id).select("*").single();
  if (updateError) {
    throw new Error(`فشل تحديث سجل الملف: ${updateError.message}`);
  }
  const oldPaths = [current.storage_path];
  if (Array.isArray(current.variants)) {
    for (const v of current.variants) {
      if ((v == null ? void 0 : v.path) && !oldPaths.includes(v.path)) {
        oldPaths.push(v.path);
      }
    }
  }
  const newPathsSet = new Set(processed.variantBlobs.map((v) => v.storagePath));
  const pathsToDelete = oldPaths.filter((p) => !newPathsSet.has(p));
  if (pathsToDelete.length > 0) {
    await supabase.storage.from("media").remove(pathsToDelete);
  }
  return updated;
}
async function detectMediaUsage(mediaId, storagePath) {
  const items = [];
  try {
    const { data: posts } = await supabase.from("posts").select("id, title, slug, featured_image_id, og_image_id, content_html").or(
      `featured_image_id.eq.${mediaId},og_image_id.eq.${mediaId},content_html.ilike.%${storagePath}%`
    );
    if (posts && posts.length > 0) {
      for (const p of posts) {
        let field = "محتوى المقال";
        if (p.featured_image_id === mediaId) field = "الصورة البارزة للمقال";
        else if (p.og_image_id === mediaId) field = "صورة المشاركة (OG Image)";
        items.push({
          id: p.id,
          type: "post",
          title: `مقال: ${p.title}`,
          field,
          url: `/blog/${p.slug}`
        });
      }
    }
  } catch (err) {
    console.error("Error checking posts media usage:", err);
  }
  try {
    const { data: works } = await supabase.from("works").select("id, title_ar, slug, cover_media_id, gallery_media_ids").or(`cover_media_id.eq.${mediaId},gallery_media_ids.cs.{${mediaId}}`);
    if (works && works.length > 0) {
      for (const w of works) {
        const field = w.cover_media_id === mediaId ? "غلاف المشروع" : "معرض صور المشروع";
        items.push({
          id: w.id,
          type: "work",
          title: `مشروع: ${w.title_ar}`,
          field,
          url: `/works/${w.slug}`
        });
      }
    }
  } catch (err) {
    console.error("Error checking works media usage:", err);
  }
  try {
    const { data: partners } = await supabase.from("partners").select("id, name_ar, logo_media_id").eq("logo_media_id", mediaId);
    if (partners && partners.length > 0) {
      for (const part of partners) {
        items.push({
          id: part.id,
          type: "partner",
          title: `شريك: ${part.name_ar}`,
          field: "شعار الشريك"
        });
      }
    }
  } catch (err) {
    console.error("Error checking partners media usage:", err);
  }
  try {
    const { data: settings } = await supabase.from("site_settings").select("key, value");
    if (settings && settings.length > 0) {
      for (const s of settings) {
        const valueStr = JSON.stringify(s.value || {});
        if (valueStr.includes(mediaId) || valueStr.includes(storagePath)) {
          items.push({
            id: s.key,
            type: "setting",
            title: `إعدادات الموقع: ${s.key}`,
            field: "شعار أو إعداد مرئي عام"
          });
        }
      }
    }
  } catch (err) {
    console.error("Error checking site_settings media usage:", err);
  }
  return {
    isUsed: items.length > 0,
    items
  };
}
async function deleteMedia(mediaId, bypassUsageCheck = false) {
  const media = await getMediaById(mediaId);
  if (!media) {
    return;
  }
  if (!bypassUsageCheck) {
    const usage = await detectMediaUsage(mediaId, media.storage_path);
    if (usage.isUsed) {
      const names = usage.items.map((i) => i.title).join("، ");
      throw new Error(
        `لا يمكن حذف الملف لأنه مستخدم حالياً في: ${names}. يرجى إزالة استخدامه أولاً أو تأكيد الحذف القسري.`
      );
    }
  }
  const pathsToRemove = [media.storage_path];
  if (Array.isArray(media.variants)) {
    for (const v of media.variants) {
      if ((v == null ? void 0 : v.path) && !pathsToRemove.includes(v.path)) {
        pathsToRemove.push(v.path);
      }
    }
  }
  if (pathsToRemove.length > 0) {
    const { error: storageErr } = await supabase.storage.from("media").remove(pathsToRemove);
    if (storageErr) {
      console.warn("Storage deletion warning:", storageErr.message);
    }
  }
  const { error: dbErr } = await supabase.from("media").delete().eq("id", mediaId);
  if (dbErr) {
    throw new Error(`فشل حذف سجل الوسائط من قاعدة البيانات: ${dbErr.message}`);
  }
}
async function bulkMoveMedia(ids, targetFolder) {
  if (ids.length === 0) return;
  const { error } = await supabase.from("media").update({ folder: targetFolder, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).in("id", ids);
  if (error) {
    throw new Error(`فشل نقل الملفات المحددة: ${error.message}`);
  }
}
async function bulkDeleteMedia(ids, bypassUsageCheck = false) {
  let deletedCount = 0;
  const errors = [];
  for (const id of ids) {
    try {
      await deleteMedia(id, bypassUsageCheck);
      deletedCount++;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(msg);
    }
  }
  return { deletedCount, errors };
}
(_g = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _g.call(globalThis, "src/features/media/useMedia.ts");
const MEDIA_QUERY_KEY = ["admin-media"];
function useMediaList(params = {}) {
  return useQuery({
    queryKey: [...MEDIA_QUERY_KEY, params],
    queryFn: () => getMediaList(params),
    staleTime: 1e3 * 30
    // 30 seconds
  });
}
function useMediaUsage(id, storagePath) {
  return useQuery({
    queryKey: ["admin-media-usage", id, storagePath],
    queryFn: () => id && storagePath ? detectMediaUsage(id, storagePath) : null,
    enabled: Boolean(id && storagePath)
  });
}
function useUpdateMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      updates
    }) => updateMedia(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: MEDIA_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ["admin-media-detail", variables.id] });
    }
  });
}
function useDeleteMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, force = false }) => deleteMedia(id, force),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDIA_QUERY_KEY });
    }
  });
}
function useBulkDeleteMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, force = false }) => bulkDeleteMedia(ids, force),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDIA_QUERY_KEY });
    }
  });
}
function useBulkMoveMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ ids, targetFolder }) => bulkMoveMedia(ids, targetFolder),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEDIA_QUERY_KEY });
    }
  });
}
(_h = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _h.call(globalThis, "src/features/media/components/MediaDropzone.tsx");
const ACCEPTED_TYPES = "image/jpeg,image/png,image/webp,image/avif,image/svg+xml,application/pdf";
const MediaDropzone = ({
  onFilesSelected,
  disabled = false,
  compact = false,
  inputRef: externalInputRef
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const internalInputRef = useRef(null);
  const fileInputRef = externalInputRef || internalInputRef;
  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) setIsDragOver(true);
    },
    [disabled]
  );
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);
  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      if (disabled) return;
      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesSelected(files);
      }
    },
    [disabled, onFilesSelected]
  );
  const handleFileInputChange = useCallback(
    (e) => {
      if (e.target.files && e.target.files.length > 0) {
        const files = Array.from(e.target.files);
        onFilesSelected(files);
        e.target.value = "";
      }
    },
    [onFilesSelected]
  );
  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      onClick: handleClick,
      className: `border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-200 text-center ${compact ? "p-6" : "p-10"} ${isDragOver ? "border-brand-600 bg-brand-50/70 scale-[1.01]" : "border-sand-300 hover:border-brand-400 bg-sand-50/50 hover:bg-brand-50/20"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`,
      role: "button",
      tabIndex: 0,
      onKeyDown: (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      },
      "aria-label": "منطقة رفع ملفات الوسائط",
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: fileInputRef,
            type: "file",
            multiple: true,
            accept: ACCEPTED_TYPES,
            onChange: handleFileInputChange,
            className: "hidden",
            disabled
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center space-y-3", children: [
          /* @__PURE__ */ jsx("div", { className: "w-13 h-13 rounded-2xl bg-brand-50 border border-brand-100 flex items-center justify-center text-brand-600 shadow-2xs", children: /* @__PURE__ */ jsx(UploadCloud, { className: "w-6 h-6" }) }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-sand-900", children: "اسحب الملفات وأفلتها هنا، أو اضغط للاختيار من جهازك" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-sand-500 max-w-md mx-auto", children: "ندعم صور JPG، PNG، WebP، AVIF، SVG ومستندات PDF حتى 10 ميجابايت كحد أقصى" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-1", children: /* @__PURE__ */ jsx(
            Button,
            {
              type: "button",
              variant: "secondary",
              size: "sm",
              onClick: (e) => {
                e.stopPropagation();
                handleClick();
              },
              disabled,
              leftIcon: /* @__PURE__ */ jsx(UploadCloud, { className: "w-4 h-4" }),
              className: "border-sand-300 bg-white hover:bg-brand-50 hover:border-brand-400 text-brand-700 shadow-xs font-semibold px-4 py-2",
              children: "تصفح واختيار الملفات من جهازك"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3 text-xs text-sand-500 pt-2 border-t border-sand-200/60 w-full max-w-lg", children: [
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(FileImage, { className: "w-3.5 h-3.5 text-brand-600" }),
              "تحويل ذكي وتوليد تلقائي لأبعاد WebP"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sand-300", children: "•" }),
            /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(FileText, { className: "w-3.5 h-3.5 text-brand-600" }),
              "فحص أمان الحجم والامتداد"
            ] })
          ] })
        ] })
      ]
    }
  );
};
(_i = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _i.call(globalThis, "src/features/media/components/MediaUploadModal.tsx");
const MediaUploadModal = ({
  open,
  onClose,
  onSuccess,
  initialFolder = "general"
}) => {
  const { success, error } = useToast();
  const [targetFolder, setTargetFolder] = useState(initialFolder);
  const [queue, setQueue] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const abortControllersRef = useRef(/* @__PURE__ */ new Map());
  const fileInputRef = useRef(null);
  useEffect(() => {
    if (open) {
      setTargetFolder(initialFolder);
    } else {
      setQueue([]);
      setIsProcessing(false);
      abortControllersRef.current.clear();
    }
  }, [open, initialFolder]);
  const handleFilesSelected = (files) => {
    const newItems = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      file,
      progress: 0,
      status: "pending",
      altText: "",
      title: file.name.replace(/\.[^/.]+$/, ""),
      folder: targetFolder
    }));
    setQueue((prev) => [...prev, ...newItems]);
  };
  useEffect(() => {
    const pendingItems = queue.filter((i) => i.status === "pending");
    if (pendingItems.length === 0 || isProcessing) return;
    setIsProcessing(true);
    const processItem = async (item) => {
      setQueue(
        (prev) => prev.map((i) => i.id === item.id ? { ...i, status: "processing", progress: 15 } : i)
      );
      try {
        const dupCheck = await checkDuplicateMedia(item.file.name, item.file.size);
        if (dupCheck.isDuplicate) {
          setQueue(
            (prev) => prev.map((i) => i.id === item.id ? { ...i, isDuplicate: true } : i)
          );
        }
      } catch (err) {
        console.warn("Duplicate check skipped:", err);
      }
      if (abortControllersRef.current.get(item.id)) {
        setQueue(
          (prev) => prev.map((i) => i.id === item.id ? { ...i, status: "cancelled" } : i)
        );
        return;
      }
      try {
        setQueue(
          (prev) => prev.map((i) => i.id === item.id ? { ...i, status: "uploading" } : i)
        );
        const result = await uploadMedia(item.file, {
          folder: item.folder,
          altText: item.altText,
          title: item.title,
          onProgress: (percent) => {
            setQueue(
              (prev) => prev.map((i) => i.id === item.id ? { ...i, progress: percent } : i)
            );
          }
        });
        setQueue(
          (prev) => prev.map(
            (i) => i.id === item.id ? {
              ...i,
              status: "done",
              progress: 100,
              result,
              altText: result.alt_text || "",
              title: result.title || ""
            } : i
          )
        );
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "فشل رفع الملف";
        setQueue(
          (prev) => prev.map(
            (i) => i.id === item.id ? { ...i, status: "error", progress: 0, errorMessage: errorMsg } : i
          )
        );
      }
    };
    const runAll = async () => {
      for (const item of pendingItems) {
        await processItem(item);
      }
      setIsProcessing(false);
    };
    runAll();
  }, [queue, isProcessing]);
  const handleCancel = (id) => {
    abortControllersRef.current.set(id, true);
    setQueue(
      (prev) => prev.map(
        (i) => i.id === id ? { ...i, status: "cancelled", errorMessage: "تم إلغاء الرفع" } : i
      )
    );
  };
  const handleSaveMetadata = async (item) => {
    var _a2;
    if (!((_a2 = item.result) == null ? void 0 : _a2.id)) return;
    try {
      const updated = await updateMedia(item.result.id, {
        alt_text: item.altText,
        title: item.title,
        folder: item.folder
      });
      setQueue(
        (prev) => prev.map((i) => i.id === item.id ? { ...i, result: updated } : i)
      );
      success("تم حفظ البيانات", "تم تحديث النص البديل وعنوان الملف بنجاح.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "فشل الحفظ";
      error("خطأ أثناء الحفظ", msg);
    }
  };
  const handleFinish = () => {
    const doneItems = queue.map((i) => i.result).filter((r) => Boolean(r));
    if (doneItems.length > 0) {
      onSuccess == null ? void 0 : onSuccess(doneItems);
    }
    onClose();
  };
  if (!open) return null;
  const hasDoneItems = queue.some((i) => i.status === "done");
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-sand-900/60 backdrop-blur-sm animate-in fade-in duration-200",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "upload-modal-title",
      children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-elevated w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-sand-200", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-sand-100 bg-sand-50/50", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { id: "upload-modal-title", className: "text-base font-bold text-sand-900", children: "رفع ملفات وسائط جديدة" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-sand-500 mt-0.5", children: "يتم معالجة الصور وتحويلها تلقائياً إلى صيغة WebP بأحجام متجاوبة وسريعة التحميل" })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "p-1.5 rounded-lg text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors",
              "aria-label": "إغلاق",
              children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 overflow-y-auto p-6 space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-4 p-3 bg-sand-50 rounded-xl border border-sand-200 text-xs", children: [
            /* @__PURE__ */ jsx("span", { className: "font-semibold text-sand-700", children: "مجلد الحفظ الافتراضي:" }),
            /* @__PURE__ */ jsxs(
              "select",
              {
                value: targetFolder,
                onChange: (e) => setTargetFolder(e.target.value),
                className: "bg-white border border-sand-300 rounded-lg py-1.5 px-3 text-xs text-sand-900 font-medium focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
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
            MediaDropzone,
            {
              onFilesSelected: handleFilesSelected,
              disabled: isProcessing,
              inputRef: fileInputRef,
              compact: true
            }
          ),
          queue.length > 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "text-xs font-bold text-sand-800 uppercase tracking-wider", children: [
              "قائمة الملفات (",
              queue.length,
              ")"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "space-y-3", children: queue.map((item) => {
              var _a2;
              const isImage = item.file.type.startsWith("image/");
              const isPdf = item.file.type === "application/pdf";
              const isDone = item.status === "done";
              return /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "p-4 rounded-xl border border-sand-200 bg-sand-50/30 space-y-3",
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                        /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-lg bg-sand-100 flex items-center justify-center shrink-0 text-brand-600", children: isPdf ? /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4" }) : /* @__PURE__ */ jsx(FileImage, { className: "w-4 h-4" }) }),
                        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold text-sand-900 truncate", children: item.file.name }),
                          /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-sand-500", children: [
                            (item.file.size / 1024).toFixed(0),
                            " كيلوبايت •",
                            " ",
                            (_a2 = item.file.type.split("/")[1]) == null ? void 0 : _a2.toUpperCase()
                          ] })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                        item.status === "done" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200", children: [
                          /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
                          "اكتمل"
                        ] }),
                        item.status === "error" && /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200", children: [
                          /* @__PURE__ */ jsx(AlertCircle, { className: "w-3.5 h-3.5" }),
                          "فشل"
                        ] }),
                        (item.status === "processing" || item.status === "uploading") && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-1 text-xs font-medium text-brand-600", children: [
                            /* @__PURE__ */ jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin" }),
                            item.status === "processing" ? "معالجة..." : "جاري الرفع..."
                          ] }),
                          /* @__PURE__ */ jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => handleCancel(item.id),
                              className: "px-2 py-0.5 text-[11px] font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded border border-red-200 transition-colors",
                              children: "إلغاء"
                            }
                          )
                        ] })
                      ] })
                    ] }),
                    item.isDuplicate && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs", children: [
                      /* @__PURE__ */ jsx(AlertTriangle, { className: "w-3.5 h-3.5 shrink-0 text-amber-600" }),
                      /* @__PURE__ */ jsx("span", { children: "ملاحظة: هذا الملف مسجل مسبقاً في مكتبة الوسائط؛ تم اعتماده وتحديث نسخته بنجاح." })
                    ] }),
                    item.errorMessage && /* @__PURE__ */ jsx("p", { className: "text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-100", children: item.errorMessage }),
                    (item.status === "uploading" || item.status === "processing") && /* @__PURE__ */ jsx("div", { className: "w-full bg-sand-200 rounded-full h-1.5 overflow-hidden", children: /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "bg-brand-600 h-1.5 transition-all duration-300 rounded-full",
                        style: { width: `${item.progress}%` }
                      }
                    ) }),
                    isDone && isImage && /* @__PURE__ */ jsxs("div", { className: "pt-2 border-t border-sand-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3", children: [
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                          /* @__PURE__ */ jsxs("label", { className: "text-[11px] font-semibold text-sand-700", children: [
                            "النص البديل (Alt Text) ",
                            /* @__PURE__ */ jsx("span", { className: "text-red-500", children: "*" })
                          ] }),
                          !item.altText.trim() && /* @__PURE__ */ jsx("span", { className: "text-[10px] text-amber-600 font-medium", children: "مطلوب للسيو وتسهيل الوصول" })
                        ] }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            value: item.altText,
                            onChange: (e) => setQueue(
                              (prev) => prev.map(
                                (i) => i.id === item.id ? { ...i, altText: e.target.value } : i
                              )
                            ),
                            placeholder: "وصف دقيق لمحتوى الصورة...",
                            className: `w-full px-2.5 py-1.5 text-xs rounded-lg border bg-white focus:outline-none focus:ring-2 ${!item.altText.trim() ? "border-amber-300 focus:ring-amber-400/30" : "border-sand-300 focus:ring-brand-500/20 focus:border-brand-500"}`
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                          /* @__PURE__ */ jsx("label", { className: "text-[11px] font-semibold text-sand-700", children: "عنوان الصورة (Title)" }),
                          /* @__PURE__ */ jsxs(
                            "button",
                            {
                              type: "button",
                              onClick: () => handleSaveMetadata(item),
                              className: "inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-md transition-colors shadow-2xs",
                              children: [
                                /* @__PURE__ */ jsx(Save, { className: "w-3 h-3" }),
                                "حفظ التعديل"
                              ]
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx(
                          "input",
                          {
                            type: "text",
                            value: item.title,
                            onChange: (e) => setQueue(
                              (prev) => prev.map(
                                (i) => i.id === item.id ? { ...i, title: e.target.value } : i
                              )
                            ),
                            placeholder: "عنوان الملف...",
                            className: "w-full px-2.5 py-1.5 text-xs rounded-lg border border-sand-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                          }
                        )
                      ] })
                    ] })
                  ]
                },
                item.id
              );
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-t border-sand-100 bg-sand-50/50", children: [
          queue.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-sand-500 font-medium", children: [
            /* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-sand-400" }),
            /* @__PURE__ */ jsx("span", { children: "جاهز لاختيار الملفات للبدء" })
          ] }) : isProcessing ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-brand-600 font-medium", children: [
            /* @__PURE__ */ jsx(Loader2, { className: "w-3.5 h-3.5 animate-spin text-brand-600" }),
            /* @__PURE__ */ jsx("span", { children: "جاري معالجة ورفع الملفات..." })
          ] }) : hasDoneItems ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-emerald-600 font-semibold", children: [
            /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-600" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "تم رفع ",
              queue.filter((i) => i.status === "done").length,
              " من ",
              queue.length,
              " ملفات بنجاح"
            ] })
          ] }) : /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-xs text-red-600 font-medium", children: [
            /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 text-red-600" }),
            /* @__PURE__ */ jsx("span", { children: "تعذر إتمام رفع الملفات المحددة" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: onClose,
                className: "border-sand-300 text-sand-700 hover:bg-sand-100 font-medium px-4 py-2",
                children: "إلغاء"
              }
            ),
            queue.length === 0 ? /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "primary",
                size: "sm",
                onClick: () => {
                  var _a2;
                  return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                },
                leftIcon: /* @__PURE__ */ jsx(UploadCloud, { className: "w-4 h-4" }),
                className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs px-5 py-2",
                children: "تصفح واختيار الملفات"
              }
            ) : isProcessing ? /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "primary",
                size: "sm",
                disabled: true,
                isLoading: true,
                className: "bg-brand-600 text-white font-bold shadow-xs px-5 py-2 opacity-80 cursor-wait",
                children: "جاري الرفع..."
              }
            ) : hasDoneItems ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: () => {
                    var _a2;
                    return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                  },
                  leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
                  className: "border-sand-300 text-sand-700 hover:bg-sand-100 font-medium px-4 py-2",
                  children: "إضافة المزيد"
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "primary",
                  size: "sm",
                  onClick: handleFinish,
                  leftIcon: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-4 h-4" }),
                  className: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-xs px-5 py-2",
                  children: [
                    "إتمام وإضافة (",
                    queue.filter((i) => i.status === "done").length,
                    ")"
                  ]
                }
              )
            ] }) : /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "primary",
                size: "sm",
                onClick: () => {
                  var _a2;
                  return (_a2 = fileInputRef.current) == null ? void 0 : _a2.click();
                },
                leftIcon: /* @__PURE__ */ jsx(UploadCloud, { className: "w-4 h-4" }),
                className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs px-5 py-2",
                children: "اختيار ملفات أخرى"
              }
            )
          ] })
        ] })
      ] })
    }
  );
};
(_j = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _j.call(globalThis, "src/components/admin/MediaPicker.tsx");
const MediaPicker = ({
  open,
  onClose,
  onSelect,
  mode = "single",
  accept = "all",
  initialFolder,
  title = "اختيار ملف من مكتبة الوسائط"
}) => {
  const dialogId = useId();
  const [search, setSearch] = useState("");
  const [folder, setFolder] = useState(initialFolder || "all");
  const [selectedMap, setSelectedMap] = useState({});
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  useEffect(() => {
    if (open) {
      setSearch("");
      setFolder(initialFolder || "all");
      setSelectedMap({});
    }
  }, [open, initialFolder]);
  const handleKeyDown = useCallback(
    (e) => {
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [open, onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  const typeFilter = accept === "image" ? "image" : accept === "pdf" ? "pdf" : "all";
  const { data, isLoading } = useMediaList({
    page: 1,
    pageSize: 60,
    filter: {
      search,
      folder,
      type: typeFilter,
      sort: "newest"
    }
  });
  const items = (data == null ? void 0 : data.items) || [];
  const handleToggleSelect = (item) => {
    if (mode === "single") {
      setSelectedMap({ [item.id]: item });
    } else {
      setSelectedMap((prev) => {
        const next = { ...prev };
        if (next[item.id]) {
          delete next[item.id];
        } else {
          next[item.id] = item;
        }
        return next;
      });
    }
  };
  const handleConfirm = () => {
    const selectedList = Object.values(selectedMap);
    if (selectedList.length === 0) return;
    if (mode === "single") {
      onSelect(selectedList[0]);
    } else {
      onSelect(selectedList);
    }
    onClose();
  };
  const handleUploadSuccess = (newMedia) => {
    if (newMedia.length > 0) {
      if (mode === "single") {
        setSelectedMap({ [newMedia[0].id]: newMedia[0] });
      } else {
        const update = { ...selectedMap };
        for (const item of newMedia) {
          update[item.id] = item;
        }
        setSelectedMap(update);
      }
    }
    setIsUploadModalOpen(false);
  };
  if (!open) return null;
  const selectedCount = Object.keys(selectedMap).length;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-sand-900/60 backdrop-blur-sm animate-in fade-in duration-150",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": `${dialogId}-title`,
        children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-elevated w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden border border-sand-200", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-sand-100 bg-sand-50/50", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { id: `${dialogId}-title`, className: "text-base font-bold text-sand-900", children: title }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-sand-500 mt-0.5", children: mode === "single" ? "انقر على الصورة لاختيارها" : "يمكنك اختيار أكثر من صورة بالنقر عليها" })
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                className: "p-1.5 rounded-lg text-sand-400 hover:text-sand-700 hover:bg-sand-100 transition-colors",
                "aria-label": "إغلاق",
                children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-4 border-b border-sand-100 flex flex-wrap items-center justify-between gap-3 bg-white", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-[240px]", children: [
              /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
                /* @__PURE__ */ jsx(Search, { className: "absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sand-400" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: search,
                    onChange: (e) => setSearch(e.target.value),
                    placeholder: "بحث في الوسائط...",
                    className: "w-full ps-9 pe-4 py-1.5 border border-sand-300 rounded-lg text-xs bg-sand-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: folder,
                  onChange: (e) => setFolder(e.target.value),
                  className: "bg-sand-50 border border-sand-300 rounded-lg py-1.5 px-2.5 text-xs text-sand-800 focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "all", children: "كل المجلدات" }),
                    /* @__PURE__ */ jsx("option", { value: "general", children: "عام (General)" }),
                    /* @__PURE__ */ jsx("option", { value: "blog", children: "المدونة (Blog)" }),
                    /* @__PURE__ */ jsx("option", { value: "works", children: "المشاريع (Works)" }),
                    /* @__PURE__ */ jsx("option", { value: "partners", children: "الشركاء (Partners)" }),
                    /* @__PURE__ */ jsx("option", { value: "branding", children: "الهوية (Branding)" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: () => setIsUploadModalOpen(true),
                leftIcon: /* @__PURE__ */ jsx(Upload, { className: "w-3.5 h-3.5" }),
                className: "border-brand-200 bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold px-3 py-1.5 text-xs shadow-2xs shrink-0",
                children: "رفع ملف جديد"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto p-4", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: Array.from({ length: 12 }).map((_, i) => /* @__PURE__ */ jsx(
            "div",
            {
              className: "animate-pulse rounded-lg bg-sand-100 aspect-square"
            },
            i
          )) }) : items.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center text-sand-500 space-y-2", children: [
            /* @__PURE__ */ jsx(Image$1, { className: "w-8 h-8 mx-auto text-sand-300" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs font-medium", children: "لا توجد وسائط مطابقة" })
          ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3", children: items.map((item) => {
            var _a2;
            const isSelected = Boolean(selectedMap[item.id]);
            const isImage = item.mime_type.startsWith("image/");
            const publicUrl = getStoragePublicUrl(item.storage_path);
            return /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => handleToggleSelect(item),
                className: `group relative rounded-xl border overflow-hidden aspect-square flex flex-col items-center justify-center p-1 transition-all ${isSelected ? "border-brand-600 ring-2 ring-brand-500/30 bg-brand-50/50" : "border-sand-200 hover:border-sand-300 bg-sand-50/50"}`,
                "aria-pressed": isSelected,
                title: item.title || item.file_name,
                children: [
                  isImage ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: publicUrl,
                      alt: item.alt_text || item.title || item.file_name,
                      loading: "lazy",
                      className: "w-full h-full object-contain rounded-lg"
                    }
                  ) : /* @__PURE__ */ jsx(FileText, { className: "w-8 h-8 text-red-500" }),
                  isSelected && /* @__PURE__ */ jsx("div", { className: "absolute top-1.5 start-1.5 w-5 h-5 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-xs", children: /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 stroke-[3]" }) }),
                  isImage && !((_a2 = item.alt_text) == null ? void 0 : _a2.trim()) && /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "absolute top-1.5 end-1.5 p-1 rounded bg-amber-500/90 text-white",
                      title: "بدون نص بديل",
                      children: /* @__PURE__ */ jsx(AlertTriangle, { className: "w-2.5 h-2.5" })
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { className: "absolute bottom-1 inset-x-1 text-[9px] text-center truncate px-1 py-0.5 rounded bg-sand-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity", children: item.title || item.file_name })
                ]
              },
              item.id
            );
          }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-6 py-3.5 border-t border-sand-100 bg-sand-50/50", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-sand-600 font-medium", children: [
              "تم تحديد: ",
              selectedCount,
              " ",
              selectedCount === 1 ? "عنصر" : "عناصر"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: onClose,
                  className: "border-sand-300 text-sand-700 hover:bg-sand-100 font-medium px-4 py-2",
                  children: "إلغاء"
                }
              ),
              /* @__PURE__ */ jsxs(
                Button,
                {
                  type: "button",
                  variant: "primary",
                  size: "sm",
                  onClick: handleConfirm,
                  disabled: selectedCount === 0,
                  leftIcon: /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
                  className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs px-5 py-2",
                  children: [
                    "تأكيد الاختيار ",
                    selectedCount > 0 ? `(${selectedCount})` : ""
                  ]
                }
              )
            ] })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      MediaUploadModal,
      {
        open: isUploadModalOpen,
        onClose: () => setIsUploadModalOpen(false),
        onSuccess: handleUploadSuccess,
        initialFolder: folder !== "all" ? folder : "general"
      }
    )
  ] });
};
(_k = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _k.call(globalThis, "src/components/admin/index.ts");
export {
  ConfirmDialog as C,
  MediaUploadModal as M,
  PageHeader as P,
  StatusBadge as S,
  useUpdateMedia as a,
  useDeleteMedia as b,
  useMediaList as c,
  useBulkDeleteMedia as d,
  useBulkMoveMedia as e,
  MediaPicker as f,
  replaceMediaFile as r,
  useMediaUsage as u
};
