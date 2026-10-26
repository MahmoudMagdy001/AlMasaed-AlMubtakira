var _a, _b, _c;
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Plus, Handshake, ArrowUp, ArrowDown, Image, ExternalLink, CheckCircle, EyeOff, Edit2, Trash2 } from "lucide-react";
import { P as PageHeader, f as MediaPicker, C as ConfirmDialog } from "./index-6EXxYG9x.js";
import { s as supabase, u as useToast, B as Button, g as getStoragePublicUrl, D as Dialog, F as FormField } from "../main.mjs";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { r as requestRebuild, R as REBUILD_NOTICE } from "./rebuild-aq1DCH4-.js";
import "react-router-dom";
import "vite-react-ssg";
import "react-i18next";
import "@supabase/supabase-js";
import "gsap";
import "gsap/ScrollTrigger";
import "@gsap/react";
import "react-hook-form";
import "i18next";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/partners/partnersAdminService.ts");
const partnerFormSchema = z.object({
  name_ar: z.string().min(2, "اسم الشريك بالعربية مطلوب (على الأقل حرفين)"),
  name_en: z.string().optional().nullable(),
  logo_media_id: z.string().uuid("معرّف الشعار غير صحيح").optional().nullable(),
  website_url: z.string().url("رابط الموقع الإلكتروني غير صحيح (يجب أن يبدأ بـ https:// أو http://)").or(z.literal("")).optional().nullable(),
  sort_order: z.number().int().default(0),
  is_published: z.boolean().default(true)
});
async function getAdminPartners() {
  const { data, error } = await supabase.from("partners").select(
    `
      id,
      name_ar,
      name_en,
      logo_media_id,
      website_url,
      sort_order,
      is_published,
      created_at,
      updated_at,
      logo_media:logo_media_id (
        id,
        storage_path,
        width,
        height,
        alt_text,
        variants
      )
    `
  ).order("sort_order", { ascending: true }).order("created_at", { ascending: false });
  if (error) {
    throw new Error(`فشل تحميل قائمة الشركاء: ${error.message}`);
  }
  return data || [];
}
async function createPartner(payload) {
  const parsed = partnerFormSchema.parse(payload);
  let sortOrder = parsed.sort_order;
  if (sortOrder === 0) {
    const { data: maxRow } = await supabase.from("partners").select("sort_order").order("sort_order", { ascending: false }).limit(1).maybeSingle();
    sortOrder = ((maxRow == null ? void 0 : maxRow.sort_order) ?? 0) + 1;
  }
  const { data, error } = await supabase.from("partners").insert({
    name_ar: parsed.name_ar,
    name_en: parsed.name_en || null,
    logo_media_id: parsed.logo_media_id || null,
    website_url: parsed.website_url || null,
    sort_order: sortOrder,
    is_published: parsed.is_published
  }).select(
    `
      id,
      name_ar,
      name_en,
      logo_media_id,
      website_url,
      sort_order,
      is_published,
      created_at,
      updated_at
    `
  ).single();
  if (error || !data) {
    throw new Error(`فشل إضافة الشريك: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  if (parsed.is_published) {
    await requestRebuild("create-partner");
  }
  return data;
}
async function updatePartner(id, payload) {
  const { data: current } = await supabase.from("partners").select("id, is_published").eq("id", id).single();
  const updateData = {
    updated_at: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (payload.name_ar !== void 0) updateData.name_ar = payload.name_ar;
  if (payload.name_en !== void 0) updateData.name_en = payload.name_en || null;
  if (payload.logo_media_id !== void 0) updateData.logo_media_id = payload.logo_media_id || null;
  if (payload.website_url !== void 0) updateData.website_url = payload.website_url || null;
  if (payload.sort_order !== void 0) updateData.sort_order = payload.sort_order;
  if (payload.is_published !== void 0) updateData.is_published = payload.is_published;
  const { data, error } = await supabase.from("partners").update(updateData).eq("id", id).select(
    `
      id,
      name_ar,
      name_en,
      logo_media_id,
      website_url,
      sort_order,
      is_published,
      created_at,
      updated_at
    `
  ).single();
  if (error || !data) {
    throw new Error(`فشل تحديث بيانات الشريك: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  if ((current == null ? void 0 : current.is_published) || payload.is_published) {
    await requestRebuild("update-partner");
  }
  return data;
}
async function togglePartnerPublish(id, is_published) {
  const { error } = await supabase.from("partners").update({ is_published, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
  if (error) {
    throw new Error(`فشل تعديل حالة ظهور الشريك: ${error.message}`);
  }
  await requestRebuild("toggle-partner-publish");
}
async function reorderPartners(orderedIds) {
  const updates = orderedIds.map(
    (id, index) => supabase.from("partners").update({ sort_order: index + 1, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id)
  );
  const results = await Promise.all(updates);
  const failed = results.find((r) => r.error);
  if (failed == null ? void 0 : failed.error) {
    throw new Error(`فشل تحديث ترتيب الشركاء: ${failed.error.message}`);
  }
  await requestRebuild("reorder-partners");
}
async function deletePartner(id) {
  const { data: current } = await supabase.from("partners").select("is_published").eq("id", id).single();
  const { error } = await supabase.from("partners").delete().eq("id", id);
  if (error) {
    throw new Error(`فشل حذف الشريك: ${error.message}`);
  }
  if (current == null ? void 0 : current.is_published) {
    await requestRebuild("delete-partner");
  }
}
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/partners/useAdminPartners.ts");
function useAdminPartners() {
  return useQuery({
    queryKey: ["admin_partners"],
    queryFn: () => getAdminPartners(),
    staleTime: 1e3 * 30
  });
}
function useCreatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => createPartner(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    }
  });
}
function useUpdatePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => updatePartner(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    }
  });
}
function useTogglePartnerPublish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_published }) => togglePartnerPublish(id, is_published),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    }
  });
}
function useReorderPartners() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (orderedIds) => reorderPartners(orderedIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    }
  });
}
function useDeletePartner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deletePartner(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_partners"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    }
  });
}
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/features/admin/partners/PartnersPage.tsx");
const PartnersPage = () => {
  const { success, error: toastError } = useToast();
  const { data: partners = [], isLoading } = useAdminPartners();
  const createMutation = useCreatePartner();
  const updateMutation = useUpdatePartner();
  const togglePublishMutation = useTogglePartnerPublish();
  const reorderMutation = useReorderPartners();
  const deleteMutation = useDeletePartner();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [deletingPartner, setDeletingPartner] = useState(null);
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [logoMediaId, setLogoMediaId] = useState(null);
  const [logoMediaUrl, setLogoMediaUrl] = useState(null);
  const [sortOrder, setSortOrder] = useState(0);
  const [isPublished, setIsPublished] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const openCreateModal = () => {
    setEditingPartner(null);
    setNameAr("");
    setNameEn("");
    setWebsiteUrl("");
    setLogoMediaId(null);
    setLogoMediaUrl(null);
    setSortOrder((partners.length || 0) + 1);
    setIsPublished(true);
    setFormErrors({});
    setIsFormOpen(true);
  };
  const openEditModal = (partner) => {
    var _a2;
    setEditingPartner(partner);
    setNameAr(partner.name_ar);
    setNameEn(partner.name_en || "");
    setWebsiteUrl(partner.website_url || "");
    setLogoMediaId(partner.logo_media_id || null);
    setLogoMediaUrl(
      ((_a2 = partner.logo_media) == null ? void 0 : _a2.storage_path) ? getStoragePublicUrl(partner.logo_media.storage_path) : null
    );
    setSortOrder(partner.sort_order);
    setIsPublished(partner.is_published);
    setFormErrors({});
    setIsFormOpen(true);
  };
  const handleSelectLogo = (selected) => {
    const item = Array.isArray(selected) ? selected[0] : selected;
    if (!item) return;
    setLogoMediaId(item.id);
    setLogoMediaUrl(getStoragePublicUrl(item.storage_path));
    setIsMediaPickerOpen(false);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormErrors({});
    const payload = {
      name_ar: nameAr.trim(),
      name_en: nameEn.trim() || null,
      website_url: websiteUrl.trim() || null,
      logo_media_id: logoMediaId || null,
      sort_order: sortOrder,
      is_published: isPublished
    };
    const validation = partnerFormSchema.safeParse(payload);
    if (!validation.success) {
      const errMap = {};
      for (const err of validation.error.errors) {
        if (err.path[0]) {
          errMap[err.path[0]] = err.message;
        }
      }
      setFormErrors(errMap);
      return;
    }
    try {
      if (editingPartner) {
        await updateMutation.mutateAsync({ id: editingPartner.id, data: payload });
        success("تم تحديث بيانات الشريك بنجاح", payload.is_published ? REBUILD_NOTICE : void 0);
      } else {
        await createMutation.mutateAsync(payload);
        success("تمت إضافة الشريك بنجاح", payload.is_published ? REBUILD_NOTICE : void 0);
      }
      setIsFormOpen(false);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حفظ بيانات الشريك", msg);
    }
  };
  const handleTogglePublish = async (partner) => {
    try {
      await togglePublishMutation.mutateAsync({
        id: partner.id,
        is_published: !partner.is_published
      });
      success(
        !partner.is_published ? "تم تفعيل ظهور الشريك" : "تم إخفاء الشريك",
        REBUILD_NOTICE
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل تعديل حالة الظهور", msg);
    }
  };
  const handleMove = async (index, direction) => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= partners.length) return;
    const newOrder = [...partners];
    const temp = newOrder[index];
    newOrder[index] = newOrder[targetIndex];
    newOrder[targetIndex] = temp;
    const orderedIds = newOrder.map((p) => p.id);
    try {
      await reorderMutation.mutateAsync(orderedIds);
      success("تم تحديث ترتيب الشركاء", REBUILD_NOTICE);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل تحديث الترتيب", msg);
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deletingPartner) return;
    try {
      await deleteMutation.mutateAsync(deletingPartner.id);
      success("تم حذف الشريك بنجاح", deletingPartner.is_published ? REBUILD_NOTICE : void 0);
      setDeletingPartner(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حذف الشريك", msg);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "شركاء النجاح",
        description: "إدارة قائمة الشركات والجهات الشريكة وتعديل شعاراتهم وترتيب ظهورهم في الموقع.",
        backTo: "/admin",
        backLabel: "الرئيسية",
        actions: /* @__PURE__ */ jsx(
          Button,
          {
            variant: "primary",
            onClick: openCreateModal,
            className: "bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-xs whitespace-nowrap inline-flex items-center gap-2 px-4 py-2",
            leftIcon: /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4", "aria-hidden": "true" }),
            children: "إضافة شريك جديد"
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "bg-white rounded-card border border-surface-border overflow-hidden shadow-xs", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل قائمة الشركاء..." }) : partners.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center space-y-3", children: [
      /* @__PURE__ */ jsx(Handshake, { className: "w-10 h-10 text-content-muted mx-auto" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-content-heading", children: "لا يوجد شركاء مضافين حالياً" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted max-w-sm mx-auto", children: "قم بإضافة العلامات التجارية والشركات الشريكة لعرض شعاراتهم في الصفحة الرئيسية وصفحة الشركاء." }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "primary",
          size: "sm",
          onClick: openCreateModal,
          className: "gap-2",
          children: [
            /* @__PURE__ */ jsx(Plus, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: "إضافة أول شريك" })
          ]
        }
      ) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-start text-xs border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-surface-soft border-b border-surface-border text-content-muted font-bold text-start", children: [
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 w-12 text-center", children: "الترتيب" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 w-20", children: "الشعار" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "اسم الشريك" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "الموقع الإلكتروني" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "حالة الظهور" }),
        /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-end", children: "إجراءات" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-surface-border", children: partners.map((partner, index) => {
        var _a2;
        const logoUrl = ((_a2 = partner.logo_media) == null ? void 0 : _a2.storage_path) ? getStoragePublicUrl(partner.logo_media.storage_path) : null;
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
                /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-content-muted", children: partner.sort_order }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleMove(index, "down"),
                    disabled: index === partners.length - 1 || reorderMutation.isPending,
                    className: "p-1 text-content-muted hover:text-brand-600 disabled:opacity-20 transition-colors",
                    title: "تحريك لأسفل",
                    "aria-label": "تحريك لأسفل",
                    children: /* @__PURE__ */ jsx(ArrowDown, { className: "w-3.5 h-3.5" })
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsx("div", { className: "w-14 h-10 rounded-control bg-surface-soft border border-surface-border p-1 flex items-center justify-center shrink-0", children: logoUrl ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: logoUrl,
                  alt: partner.name_ar,
                  className: "max-h-full max-w-full object-contain"
                }
              ) : /* @__PURE__ */ jsx(Image, { className: "w-4 h-4 text-content-muted" }) }) }),
              /* @__PURE__ */ jsxs("td", { className: "py-3 px-4", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-content-heading block text-xs", children: partner.name_ar }),
                partner.name_en && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block mt-0.5", children: partner.name_en })
              ] }),
              /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: partner.website_url ? /* @__PURE__ */ jsxs(
                "a",
                {
                  href: partner.website_url,
                  target: "_blank",
                  rel: "noopener noreferrer nofollow",
                  className: "inline-flex items-center gap-1.5 text-xs text-brand-600 hover:underline",
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "truncate max-w-[200px]", dir: "ltr", children: partner.website_url.replace(/^https?:\/\//, "") }),
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-3 h-3 shrink-0" })
                  ]
                }
              ) : /* @__PURE__ */ jsx("span", { className: "text-content-muted text-xs", children: "—" }) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center whitespace-nowrap", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => handleTogglePublish(partner),
                  disabled: togglePublishMutation.isPending,
                  className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors ${partner.is_published ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-surface-soft text-content-muted border-surface-border hover:bg-surface-border/60"}`,
                  children: partner.is_published ? /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(CheckCircle, { className: "w-3 h-3 text-emerald-600" }),
                    /* @__PURE__ */ jsx("span", { children: "ظاهر" })
                  ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                    /* @__PURE__ */ jsx(EyeOff, { className: "w-3 h-3 text-content-muted" }),
                    /* @__PURE__ */ jsx("span", { children: "مخفي" })
                  ] })
                }
              ) }),
              /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-end whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => openEditModal(partner),
                    className: "p-1.5 rounded-control text-content-muted hover:text-brand-600 hover:bg-surface-soft transition-colors",
                    title: "تعديل الشريك",
                    "aria-label": "تعديل",
                    children: /* @__PURE__ */ jsx(Edit2, { className: "w-4 h-4" })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setDeletingPartner(partner),
                    className: "p-1.5 rounded-control text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 transition-colors",
                    title: "حذف الشريك",
                    "aria-label": "حذف",
                    children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] }) })
            ]
          },
          partner.id
        );
      }) })
    ] }) }) }),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        isOpen: isFormOpen,
        onClose: () => setIsFormOpen(false),
        title: editingPartner ? "تعديل بيانات الشريك" : "إضافة شريك نجاح جديد",
        maxWidth: "md",
        children: /* @__PURE__ */ jsxs("form", { onSubmit: handleFormSubmit, className: "space-y-4", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "اسم الشريك (بالعربية)",
              required: true,
              error: formErrors.name_ar,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: nameAr,
                  onChange: (e) => setNameAr(e.target.value),
                  placeholder: "مثال: شركة شنايدر إلكتريك",
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "اسم الشريك (بالإنجليزية)",
              optional: true,
              error: formErrors.name_en,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  dir: "ltr",
                  value: nameEn,
                  onChange: (e) => setNameEn(e.target.value),
                  placeholder: "e.g. Schneider Electric",
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "رابط الموقع الإلكتروني",
              optional: true,
              hint: "يجب أن يبدأ بـ https:// أو http://",
              error: formErrors.website_url,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "url",
                  dir: "ltr",
                  value: websiteUrl,
                  onChange: (e) => setWebsiteUrl(e.target.value),
                  placeholder: "https://example.com",
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(FormField, { label: "شعار الشريك", optional: true, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-20 h-14 rounded-control bg-surface-soft border border-surface-border p-1 flex items-center justify-center shrink-0", children: logoMediaUrl ? /* @__PURE__ */ jsx(
              "img",
              {
                src: logoMediaUrl,
                alt: "الشعار",
                className: "max-h-full max-w-full object-contain"
              }
            ) : /* @__PURE__ */ jsx(Image, { className: "w-6 h-6 text-content-muted" }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "secondary",
                  size: "sm",
                  onClick: () => setIsMediaPickerOpen(true),
                  className: "text-xs",
                  children: logoMediaUrl ? "تغيير الشعار" : "اختيار شعار من الوسائط"
                }
              ),
              logoMediaUrl && /* @__PURE__ */ jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "sm",
                  onClick: () => {
                    setLogoMediaId(null);
                    setLogoMediaUrl(null);
                  },
                  className: "text-feedback-error hover:bg-feedback-error/10 text-xs",
                  children: "إزالة"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4 pt-2", children: [
            /* @__PURE__ */ jsx(FormField, { label: "الترتيب اليدوي", children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "number",
                value: sortOrder,
                onChange: (e) => setSortOrder(parseInt(e.target.value, 10) || 0),
                className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-center", children: /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 cursor-pointer mt-4", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: isPublished,
                  onChange: (e) => setIsPublished(e.target.checked),
                  className: "w-4 h-4 text-brand-600 rounded-control border-surface-border focus:ring-brand-600"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-content-heading", children: "إظهار الشريك في الموقع" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 pt-4 border-t border-surface-border", children: [
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => setIsFormOpen(false),
                children: "إلغاء"
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "primary",
                size: "sm",
                isLoading: createMutation.isPending || updateMutation.isPending,
                children: editingPartner ? "حفظ التعديلات" : "إضافة الشريك"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      MediaPicker,
      {
        open: isMediaPickerOpen,
        onClose: () => setIsMediaPickerOpen(false),
        onSelect: handleSelectLogo,
        mode: "single",
        accept: "image",
        initialFolder: "partners",
        title: "اختيار شعار الشريك من مكتبة الوسائط"
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: Boolean(deletingPartner),
        onClose: () => setDeletingPartner(null),
        onConfirm: handleDeleteConfirm,
        title: "تأكيد حذف الشريك",
        description: `هل أنت متأكد من رغبتك في حذف الشريك "${deletingPartner == null ? void 0 : deletingPartner.name_ar}"؟ لن يتم حذف شعاره من مكتبة الوسائط.`,
        confirmText: "حذف الشريك",
        cancelText: "إلغاء",
        isLoading: deleteMutation.isPending
      }
    )
  ] });
};
export {
  PartnersPage
};
