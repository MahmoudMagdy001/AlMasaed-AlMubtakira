var _a, _b;
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { s as supabase } from "../main.mjs";
import { r as requestRebuild } from "./rebuild-aq1DCH4-.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/works/worksAdminService.ts");
const SERVICE_TYPE_OPTIONS = [
  { value: "maintenance", labelAr: "صيانة مصاعد", labelEn: "Elevator Maintenance" },
  { value: "modernization", labelAr: "تحديث وتطوير", labelEn: "Modernization" },
  { value: "installation", labelAr: "توريد وتركيب", labelEn: "Installation" },
  { value: "spare-parts", labelAr: "قطع غيار أصلية", labelEn: "Spare Parts" },
  { value: "escalators", labelAr: "سلالم ومماشي متحركة", labelEn: "Escalators & Moving Walkways" }
];
const workFormSchema = z.object({
  title_ar: z.string().min(2, "عنوان المشروع بالعربية مطلوب (على الأقل حرفين)"),
  title_en: z.string().optional().nullable(),
  slug: z.string().min(2, "الاسم اللطيف (Slug) مطلوب").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "الرابط اللطيف يجب أن يتكون من حروف إنجليزية صغيرة وأرقام وشرطات فقط (-)").max(120, "الرابط اللطيف طويل جداً"),
  service_type: z.enum(
    ["installation", "maintenance", "modernization", "spare-parts", "escalators"],
    { required_error: "نوع الخدمة مطلوب" }
  ),
  location_ar: z.string().optional().nullable(),
  location_en: z.string().optional().nullable(),
  completed_year: z.number({ invalid_type_error: "سنة الإنجاز يجب أن تكون رقماً" }).min(1980, "سنة غير صحيحة").max(2100, "سنة غير صحيحة").optional().nullable(),
  description_ar: z.string().optional().nullable(),
  description_en: z.string().optional().nullable(),
  cover_media_id: z.string().uuid("معرّف الصورة الرئيسية غير صحيح").optional().nullable(),
  gallery_media_ids: z.array(z.string().uuid()).default([]),
  seo_title: z.string().max(80, "عنوان SEO يجب ألا يتجاوز 80 حرفاً").optional().nullable(),
  seo_description: z.string().max(200, "وصف SEO يجب ألا يتجاوز 200 حرفاً").optional().nullable(),
  is_published: z.boolean().default(false),
  sort_order: z.number().int().default(0)
});
function generateSlug(text) {
  if (!text) return "";
  const arabicToLatinMap = {
    أ: "a",
    إ: "e",
    آ: "aa",
    ا: "a",
    ب: "b",
    ت: "t",
    ث: "th",
    ج: "j",
    ح: "h",
    خ: "kh",
    د: "d",
    ذ: "th",
    ر: "r",
    ز: "z",
    س: "s",
    ش: "sh",
    ص: "s",
    ض: "d",
    ط: "t",
    ظ: "z",
    ع: "a",
    غ: "gh",
    ف: "f",
    ق: "q",
    ك: "k",
    ل: "l",
    م: "m",
    ن: "n",
    ه: "h",
    و: "w",
    ي: "y",
    ى: "a",
    ة: "h",
    ء: "",
    ئ: "e",
    ؤ: "o"
  };
  const transliterated = text.trim().toLowerCase().split("").map((c) => arabicToLatinMap[c] || c).join("");
  return transliterated.replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
async function isWorkSlugUnique(slug, excludeId) {
  let query = supabase.from("works").select("id").eq("slug", slug);
  if (excludeId) {
    query = query.neq("id", excludeId);
  }
  const { data } = await query.maybeSingle();
  return !data;
}
async function getAdminWorks(params = {}) {
  const { search, serviceType, status = "all", page = 1, limit = 20 } = params;
  let query = supabase.from("works").select(
    `
      id,
      slug,
      title_ar,
      title_en,
      description_ar,
      description_en,
      service_type,
      location_ar,
      location_en,
      completed_year,
      cover_media_id,
      gallery_media_ids,
      seo_title,
      seo_description,
      is_published,
      sort_order,
      created_at,
      updated_at,
      cover_media:cover_media_id (
        id,
        storage_path,
        width,
        height,
        alt_text,
        variants
      )
    `,
    { count: "exact" }
  );
  if (search) {
    const s = `%${search.trim()}%`;
    query = query.or(`title_ar.ilike.${s},title_en.ilike.${s},slug.ilike.${s},location_ar.ilike.${s}`);
  }
  if (serviceType && serviceType !== "all") {
    query = query.eq("service_type", serviceType);
  }
  if (status === "published") {
    query = query.eq("is_published", true);
  } else if (status === "draft") {
    query = query.eq("is_published", false);
  }
  const offset = (page - 1) * limit;
  query = query.order("sort_order", { ascending: true }).order("created_at", { ascending: false }).range(offset, offset + limit - 1);
  const { data, count, error } = await query;
  if (error) {
    throw new Error(`فشل تحميل قائمة المشاريع: ${error.message}`);
  }
  return {
    works: data || [],
    total: count ?? 0
  };
}
async function getAdminWorkById(id) {
  const { data, error } = await supabase.from("works").select(
    `
      id,
      slug,
      title_ar,
      title_en,
      description_ar,
      description_en,
      service_type,
      location_ar,
      location_en,
      completed_year,
      cover_media_id,
      gallery_media_ids,
      seo_title,
      seo_description,
      is_published,
      sort_order,
      created_at,
      updated_at,
      cover_media:cover_media_id (
        id,
        storage_path,
        width,
        height,
        alt_text,
        variants
      )
    `
  ).eq("id", id).single();
  if (error || !data) {
    throw new Error(`تعذر العثور على المشروع المطلوب: ${(error == null ? void 0 : error.message) || "غير موجود"}`);
  }
  const work = data;
  if (work.gallery_media_ids && work.gallery_media_ids.length > 0) {
    const { data: galleryItems } = await supabase.from("media").select("id, storage_path, width, height, alt_text, variants").in("id", work.gallery_media_ids);
    if (galleryItems) {
      const map = new Map(galleryItems.map((m) => [m.id, m]));
      work.gallery_media = work.gallery_media_ids.map((gid) => map.get(gid)).filter((m) => Boolean(m));
    }
  } else {
    work.gallery_media = [];
  }
  return work;
}
async function createWork(payload) {
  const parsed = workFormSchema.parse(payload);
  let sortOrder = parsed.sort_order;
  if (sortOrder === 0) {
    const { data: maxRow } = await supabase.from("works").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
    sortOrder = ((maxRow == null ? void 0 : maxRow.sort_order) ?? 0) + 1;
  }
  const { data, error } = await supabase.from("works").insert({
    title_ar: parsed.title_ar,
    title_en: parsed.title_en || null,
    slug: parsed.slug,
    service_type: parsed.service_type,
    location_ar: parsed.location_ar || null,
    location_en: parsed.location_en || null,
    completed_year: parsed.completed_year || null,
    description_ar: parsed.description_ar || null,
    description_en: parsed.description_en || null,
    cover_media_id: parsed.cover_media_id || null,
    gallery_media_ids: parsed.gallery_media_ids || [],
    seo_title: parsed.seo_title || null,
    seo_description: parsed.seo_description || null,
    is_published: parsed.is_published,
    sort_order: sortOrder
  }).select("id").single();
  if (error || !data) {
    throw new Error(`فشل إنشاء المشروع: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  if (parsed.is_published) {
    await requestRebuild("create-work-published");
  }
  return getAdminWorkById(data.id);
}
async function updateWork(id, payload) {
  const current = await getAdminWorkById(id);
  const merged = {
    title_ar: payload.title_ar ?? current.title_ar,
    title_en: payload.title_en ?? current.title_en,
    slug: payload.slug ?? current.slug,
    service_type: payload.service_type ?? current.service_type,
    location_ar: payload.location_ar ?? current.location_ar,
    location_en: payload.location_en ?? current.location_en,
    completed_year: payload.completed_year !== void 0 ? payload.completed_year : current.completed_year,
    description_ar: payload.description_ar ?? current.description_ar,
    description_en: payload.description_en ?? current.description_en,
    cover_media_id: payload.cover_media_id !== void 0 ? payload.cover_media_id : current.cover_media_id,
    gallery_media_ids: payload.gallery_media_ids ?? current.gallery_media_ids,
    seo_title: payload.seo_title !== void 0 ? payload.seo_title : current.seo_title,
    seo_description: payload.seo_description !== void 0 ? payload.seo_description : current.seo_description,
    is_published: payload.is_published !== void 0 ? payload.is_published : current.is_published,
    sort_order: payload.sort_order !== void 0 ? payload.sort_order : current.sort_order
  };
  const parsed = workFormSchema.parse(merged);
  const { error } = await supabase.from("works").update({
    title_ar: parsed.title_ar,
    title_en: parsed.title_en || null,
    slug: parsed.slug,
    service_type: parsed.service_type,
    location_ar: parsed.location_ar || null,
    location_en: parsed.location_en || null,
    completed_year: parsed.completed_year || null,
    description_ar: parsed.description_ar || null,
    description_en: parsed.description_en || null,
    cover_media_id: parsed.cover_media_id || null,
    gallery_media_ids: parsed.gallery_media_ids,
    seo_title: parsed.seo_title || null,
    seo_description: parsed.seo_description || null,
    is_published: parsed.is_published,
    sort_order: parsed.sort_order,
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  }).eq("id", id);
  if (error) {
    throw new Error(`فشل تحديث المشروع: ${error.message}`);
  }
  if (current.is_published && parsed.slug !== current.slug) {
    try {
      await supabase.from("redirects").upsert(
        [
          {
            source_path: `/works/${current.slug}`,
            target_path: `/works/${parsed.slug}`,
            status_code: 301
          },
          {
            source_path: `/en/works/${current.slug}`,
            target_path: `/en/works/${parsed.slug}`,
            status_code: 301
          }
        ],
        { onConflict: "source_path" }
      );
    } catch (redirectErr) {
      console.warn("Failed to record work slug redirect:", redirectErr);
    }
  }
  if (current.is_published || parsed.is_published) {
    await requestRebuild("update-work");
  }
  return getAdminWorkById(id);
}
async function toggleWorkPublish(id, is_published) {
  const { error } = await supabase.from("works").update({ is_published, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
  if (error) {
    throw new Error(`فشل تعديل حالة النشر: ${error.message}`);
  }
  await requestRebuild("toggle-work-publish");
}
async function reorderWorks(orderedIds) {
  const updates = orderedIds.map(
    (id, index) => supabase.from("works").update({ sort_order: index + 1, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed == null ? void 0 : failed.error) {
    throw new Error(`فشل تحديث ترتيب المشاريع: ${failed.error.message}`);
  }
  await requestRebuild("reorder-works");
}
async function deleteWork(id) {
  const current = await getAdminWorkById(id);
  const { error } = await supabase.from("works").delete().eq("id", id);
  if (error) {
    throw new Error(`فشل حذف المشروع: ${error.message}`);
  }
  if (current.is_published) {
    await requestRebuild("delete-work");
  }
}
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/works/useAdminWorks.ts");
function useAdminWorks(params = {}) {
  return useQuery({
    queryKey: ["admin_works", params],
    queryFn: () => getAdminWorks(params),
    staleTime: 1e3 * 30
    // 30 seconds
  });
}
function useAdminWork(id) {
  return useQuery({
    queryKey: ["admin_work", id],
    queryFn: () => id ? getAdminWorkById(id) : null,
    enabled: Boolean(id),
    staleTime: 1e3 * 30
  });
}
function useCreateWork() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createWork(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_works"] });
      queryClient.invalidateQueries({ queryKey: ["works"] });
    }
  });
}
function useUpdateWork() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateWork(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin_works"] });
      queryClient.invalidateQueries({ queryKey: ["admin_work", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["works"] });
      queryClient.invalidateQueries({ queryKey: ["work"] });
    }
  });
}
function useToggleWorkPublish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_published }) => toggleWorkPublish(id, is_published),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_works"] });
      queryClient.invalidateQueries({ queryKey: ["works"] });
    }
  });
}
function useReorderWorks() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderedIds) => reorderWorks(orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_works"] });
      queryClient.invalidateQueries({ queryKey: ["works"] });
    }
  });
}
function useDeleteWork() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteWork(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_works"] });
      queryClient.invalidateQueries({ queryKey: ["works"] });
    }
  });
}
export {
  SERVICE_TYPE_OPTIONS as S,
  useToggleWorkPublish as a,
  useReorderWorks as b,
  useDeleteWork as c,
  useAdminWork as d,
  useCreateWork as e,
  useUpdateWork as f,
  generateSlug as g,
  isWorkSlugUnique as i,
  useAdminWorks as u,
  workFormSchema as w
};
