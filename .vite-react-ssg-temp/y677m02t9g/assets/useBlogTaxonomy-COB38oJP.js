var _a, _b;
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { s as supabase } from "../main.mjs";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/blog/blogTaxonomyService.ts");
const categoryFormSchema = z.object({
  name_ar: z.string().min(2, "اسم التصنيف بالعربية مطلوب"),
  name_en: z.string().optional().nullable(),
  slug: z.string().min(2, "الرابط اللطيف مطلوب").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "الرابط اللطيف يجب أن يتكون من حروف إنجليزية صغيرة وأرقام وشرطات فقط"),
  description_ar: z.string().optional().nullable(),
  description_en: z.string().optional().nullable(),
  seo_title: z.string().max(80).optional().nullable(),
  seo_description: z.string().max(200).optional().nullable(),
  sort_order: z.number().int().default(0)
});
const tagFormSchema = z.object({
  name_ar: z.string().min(2, "اسم الوسم بالعربية مطلوب"),
  name_en: z.string().optional().nullable(),
  slug: z.string().min(2, "الرابط اللطيف مطلوب").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "الرابط اللطيف يجب أن يتكون من حروف إنجليزية صغيرة وأرقام وشرطات فقط")
});
async function getAdminCategories() {
  const { data: categories, error } = await supabase.from("categories").select("*").order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) {
    throw new Error(`فشل تحميل التصنيفات: ${error.message}`);
  }
  const { data: postsCount } = await supabase.from("posts").select("category_id");
  const countMap = /* @__PURE__ */ new Map();
  for (const post of postsCount || []) {
    if (post.category_id) {
      countMap.set(post.category_id, (countMap.get(post.category_id) || 0) + 1);
    }
  }
  return (categories || []).map((cat) => ({
    ...cat,
    posts_count: countMap.get(cat.id) || 0
  }));
}
async function createCategory(payload) {
  const parsed = categoryFormSchema.parse(payload);
  const { data, error } = await supabase.from("categories").insert({
    name_ar: parsed.name_ar,
    name_en: parsed.name_en || null,
    slug: parsed.slug,
    description_ar: parsed.description_ar || null,
    description_en: parsed.description_en || null,
    seo_title: parsed.seo_title || null,
    seo_description: parsed.seo_description || null,
    sort_order: parsed.sort_order
  }).select().single();
  if (error || !data) {
    throw new Error(`فشل إنشاء التصنيف: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  return { ...data, posts_count: 0 };
}
async function updateCategory(id, payload) {
  const updateData = {
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (payload.name_ar !== void 0) updateData.name_ar = payload.name_ar;
  if (payload.name_en !== void 0) updateData.name_en = payload.name_en || null;
  if (payload.slug !== void 0) updateData.slug = payload.slug;
  if (payload.description_ar !== void 0) updateData.description_ar = payload.description_ar || null;
  if (payload.description_en !== void 0) updateData.description_en = payload.description_en || null;
  if (payload.seo_title !== void 0) updateData.seo_title = payload.seo_title || null;
  if (payload.seo_description !== void 0) updateData.seo_description = payload.seo_description || null;
  if (payload.sort_order !== void 0) updateData.sort_order = payload.sort_order;
  const { data, error } = await supabase.from("categories").update(updateData).eq("id", id).select().single();
  if (error || !data) {
    throw new Error(`فشل تحديث التصنيف: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  return data;
}
async function deleteCategory(id) {
  const { count, error: countError } = await supabase.from("posts").select("id", { count: "exact", head: true }).eq("category_id", id);
  if (countError) {
    throw new Error(`فشل التحقق من ارتباطات التصنيف: ${countError.message}`);
  }
  if (count && count > 0) {
    throw new Error(
      `لا يمكن حذف هذا التصنيف لأنه يحتوي على ${count} مقال مرتبط به. يرجى نقل المقالات إلى تصنيف آخر أولاً.`
    );
  }
  const { error } = await supabase.from("categories").delete().eq("id", id);
  if (error) {
    throw new Error(`فشل حذف التصنيف: ${error.message}`);
  }
}
async function getAdminTags() {
  const { data: tags, error } = await supabase.from("tags").select("*").order("name_ar", { ascending: true });
  if (error) {
    throw new Error(`فشل تحميل الوسوم: ${error.message}`);
  }
  const { data: junctions } = await supabase.from("post_tags").select("tag_id");
  const countMap = /* @__PURE__ */ new Map();
  for (const j of junctions || []) {
    countMap.set(j.tag_id, (countMap.get(j.tag_id) || 0) + 1);
  }
  return (tags || []).map((t) => ({
    ...t,
    posts_count: countMap.get(t.id) || 0
  }));
}
async function createTag(payload) {
  const parsed = tagFormSchema.parse(payload);
  const { data, error } = await supabase.from("tags").insert({
    name_ar: parsed.name_ar,
    name_en: parsed.name_en || null,
    slug: parsed.slug
  }).select().single();
  if (error || !data) {
    throw new Error(`فشل إضافة الوسم: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  return { ...data, posts_count: 0 };
}
async function updateTag(id, payload) {
  const updateData = {};
  if (payload.name_ar !== void 0) updateData.name_ar = payload.name_ar;
  if (payload.name_en !== void 0) updateData.name_en = payload.name_en || null;
  if (payload.slug !== void 0) updateData.slug = payload.slug;
  const { data, error } = await supabase.from("tags").update(updateData).eq("id", id).select().single();
  if (error || !data) {
    throw new Error(`فشل تحديث الوسم: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  return data;
}
async function deleteTag(id) {
  await supabase.from("post_tags").delete().eq("tag_id", id);
  const { error } = await supabase.from("tags").delete().eq("id", id);
  if (error) {
    throw new Error(`فشل حذف الوسم: ${error.message}`);
  }
}
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/blog/useBlogTaxonomy.ts");
function useAdminCategories() {
  return useQuery({
    queryKey: ["admin_categories"],
    queryFn: () => getAdminCategories(),
    staleTime: 1e3 * 60
  });
}
function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });
}
function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    }
  });
}
function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_categories"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    }
  });
}
function useAdminTags() {
  return useQuery({
    queryKey: ["admin_tags"],
    queryFn: () => getAdminTags(),
    staleTime: 1e3 * 60
  });
}
function useCreateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createTag(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_tags"] });
    }
  });
}
function useUpdateTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updateTag(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_tags"] });
    }
  });
}
function useDeleteTag() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteTag(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_tags"] });
    }
  });
}
export {
  useAdminTags as a,
  useCreateTag as b,
  useCreateCategory as c,
  useUpdateCategory as d,
  useDeleteCategory as e,
  categoryFormSchema as f,
  useUpdateTag as g,
  useDeleteTag as h,
  tagFormSchema as t,
  useAdminCategories as u
};
