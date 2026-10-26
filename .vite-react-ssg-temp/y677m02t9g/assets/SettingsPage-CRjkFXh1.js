var _a, _b, _c;
import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ShieldAlert, Save, Building2, Phone, Share2, Search, BarChart3, Plus, Trash2, Image, AlertTriangle } from "lucide-react";
import { P as PageHeader, f as MediaPicker } from "./index-6EXxYG9x.js";
import { s as supabase, a as siteConfig, u as useToast, g as getStoragePublicUrl, B as Button, F as FormField } from "../main.mjs";
import "./index-CJ2Fe0b1.js";
import { u as useUnsavedChangesWarning } from "./useUnsavedChangesWarning-BGBFKU17.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { r as requestRebuild, R as REBUILD_NOTICE } from "./rebuild-aq1DCH4-.js";
import { u as useAuth } from "./useAuth-BKMX_f9Z.js";
import "react-router-dom";
import "vite-react-ssg";
import "react-i18next";
import "@supabase/supabase-js";
import "gsap";
import "gsap/ScrollTrigger";
import "@gsap/react";
import "react-hook-form";
import "i18next";
import "./authContextDef-DRZS3Rdw.js";
import "./AuthContext-67Taikd_.js";
import "./AdminLoginPage-7hMQol2z.js";
import "./AdminResetPasswordPage-C7yCgmhx.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/settings/settingsAdminService.ts");
function normalizePhoneToE164(phone) {
  const trimmed = phone.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("+")) {
    return "+" + trimmed.replace(/\D/g, "");
  }
  const digits = trimmed.replace(/\D/g, "");
  if (digits.startsWith("966")) {
    return `+${digits}`;
  }
  if (digits.startsWith("0")) {
    return `+966${digits.slice(1)}`;
  }
  if (digits.length === 9 && digits.startsWith("5")) {
    return `+966${digits}`;
  }
  return `+${digits}`;
}
const settingsFormSchema = z.object({
  // Company Information
  company_name_ar: z.string().min(2, "اسم الشركة بالعربية مطلوب"),
  company_name_en: z.string().optional().nullable(),
  slogan_ar: z.string().optional().nullable(),
  cr_number: z.string().min(5, "رقم السجل التجاري مطلوب (10 أرقام)").max(15, "رقم السجل التجاري غير صحيح"),
  vat_number: z.string().max(20, "الرقم الضريبي غير صحيح").optional().nullable(),
  city_ar: z.string().default("جدة"),
  city_en: z.string().default("Jeddah"),
  // Contact Information
  phones: z.array(z.string()).min(1, "يجب إدخال رقم هاتف واحد على الأقل"),
  whatsapp: z.string().min(8, "رقم الواتساب مطلوب"),
  unified_number: z.string().default("920000000"),
  email: z.string().email("صيغة البريد الإلكتروني غير صحيحة"),
  address_ar: z.string().optional().nullable(),
  address_en: z.string().optional().nullable(),
  working_hours_ar: z.string().optional().nullable(),
  working_hours_en: z.string().optional().nullable(),
  map_url: z.string().url("رابط خريطة قوقل غير صحيح").or(z.literal("")).optional().nullable(),
  // Social Media
  instagram_url: z.string().url("الرابط غير صحيح").or(z.literal("")).optional().nullable(),
  tiktok_url: z.string().url("الرابط غير صحيح").or(z.literal("")).optional().nullable(),
  x_url: z.string().url("الرابط غير صحيح").or(z.literal("")).optional().nullable(),
  linkedin_url: z.string().url("الرابط غير صحيح").or(z.literal("")).optional().nullable(),
  snapchat_url: z.string().url("الرابط غير صحيح").or(z.literal("")).optional().nullable(),
  // Default SEO & OG Image
  default_seo_title_ar: z.string().max(80, "عنوان الصفحة الرئيسي يجب ألا يتجاوز 80 حرفاً").optional().nullable(),
  default_seo_description_ar: z.string().max(200, "الوصف التعريفي يجب ألا يتجاوز 200 حرفاً").optional().nullable(),
  default_og_media_id: z.string().uuid().optional().nullable(),
  // Analytics (disabled, labeled as coming soon)
  gtm_id: z.string().optional().nullable(),
  ga4_id: z.string().optional().nullable(),
  meta_pixel_id: z.string().optional().nullable()
});
async function getAdminSettings() {
  const { data, error } = await supabase.from("site_settings").select("key, value");
  if (error) {
    throw new Error(`فشل جلب إعدادات الموقع: ${error.message}`);
  }
  const map = {};
  for (const row of data || []) {
    map[row.key] = row.value;
  }
  const company = map["company"] || {};
  const contact = map["contact"] || {};
  const social = map["social"] || {};
  const tax = map["tax"] || {};
  const seo = map["seo"] || {};
  const analytics = map["analytics"] || {};
  const rawPhones = Array.isArray(contact.phones) ? contact.phones : siteConfig.contact.phones;
  const defaultOgMediaId = seo.default_og_media_id || null;
  let defaultOgMedia = null;
  if (defaultOgMediaId) {
    const { data: mediaRow } = await supabase.from("media").select("id, storage_path, width, height, alt_text, variants").eq("id", defaultOgMediaId).maybeSingle();
    if (mediaRow) {
      defaultOgMedia = mediaRow;
    }
  }
  return {
    company_name_ar: company.name_ar || siteConfig.company.nameAr,
    company_name_en: company.name_en || siteConfig.company.nameEn,
    slogan_ar: company.slogan_ar || siteConfig.company.sloganAr,
    cr_number: company.cr_number || siteConfig.company.crNumber,
    vat_number: tax.vat_number || "310000000000003",
    city_ar: company.city_ar || siteConfig.contact.cityAr,
    city_en: company.city_en || siteConfig.contact.cityEn,
    phones: rawPhones.length > 0 ? rawPhones : siteConfig.contact.phones,
    whatsapp: contact.whatsapp || siteConfig.contact.whatsapp,
    unified_number: contact.unified_number || siteConfig.contact.unifiedNumber,
    email: contact.email || siteConfig.contact.email,
    address_ar: contact.address_ar || "جدة، المملكة العربية السعودية",
    address_en: contact.address_en || "Jeddah, Kingdom of Saudi Arabia",
    working_hours_ar: contact.working_hours_ar || "السبت - الخميس: 8:00 ص - 6:00 م | الطوارئ 24/7",
    working_hours_en: contact.working_hours_en || "Sat - Thu: 8:00 AM - 6:00 PM | Emergency 24/7",
    map_url: contact.map_url || "",
    instagram_url: social.instagram || "",
    tiktok_url: social.tiktok || "",
    x_url: social.x || "",
    linkedin_url: social.linkedin || "",
    snapchat_url: social.snapchat || "",
    default_seo_title_ar: seo.default_title_ar || "شركة المصاعد المبتكرة | توريد وصيانة وتحديث المصاعد في جدة",
    default_seo_description_ar: seo.default_description_ar || "شركة المصاعد المبتكرة بجدة - معتمدة من الدفاع المدني وسابر والمركز السعودي للاعتماد. صيانة دورية، قطع غيار أصلية، وطوارئ 24/7.",
    default_og_media_id: defaultOgMediaId,
    default_og_media: defaultOgMedia,
    gtm_id: analytics.gtm_id || "",
    ga4_id: analytics.ga4_id || "",
    meta_pixel_id: analytics.meta_pixel_id || ""
  };
}
async function saveAdminSettings(formData) {
  const parsed = settingsFormSchema.parse(formData);
  const normalizedPhones = parsed.phones.map((p) => normalizePhoneToE164(p)).filter(Boolean);
  const normalizedWhatsapp = normalizePhoneToE164(parsed.whatsapp);
  const updates = [
    {
      key: "company",
      value: {
        name_ar: parsed.company_name_ar,
        name_en: parsed.company_name_en || null,
        slogan_ar: parsed.slogan_ar || null,
        cr_number: parsed.cr_number,
        city_ar: parsed.city_ar,
        city_en: parsed.city_en
      },
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      key: "contact",
      value: {
        phones: normalizedPhones,
        whatsapp: normalizedWhatsapp,
        unified_number: parsed.unified_number,
        email: parsed.email,
        address_ar: parsed.address_ar || null,
        address_en: parsed.address_en || null,
        working_hours_ar: parsed.working_hours_ar || null,
        working_hours_en: parsed.working_hours_en || null,
        map_url: parsed.map_url || null
      },
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      key: "social",
      value: {
        instagram: parsed.instagram_url || null,
        tiktok: parsed.tiktok_url || null,
        x: parsed.x_url || null,
        linkedin: parsed.linkedin_url || null,
        snapchat: parsed.snapchat_url || null
      },
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      key: "tax",
      value: {
        vat_number: parsed.vat_number || null
      },
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      key: "seo",
      value: {
        default_title_ar: parsed.default_seo_title_ar || null,
        default_description_ar: parsed.default_seo_description_ar || null,
        default_og_media_id: parsed.default_og_media_id || null
      },
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    },
    {
      key: "analytics",
      value: {
        gtm_id: parsed.gtm_id || null,
        ga4_id: parsed.ga4_id || null,
        meta_pixel_id: parsed.meta_pixel_id || null,
        status: "disabled_until_phase_10"
      },
      updated_at: (/* @__PURE__ */ new Date()).toISOString()
    }
  ];
  const { error } = await supabase.from("site_settings").upsert(updates, { onConflict: "key" });
  if (error) {
    throw new Error(`فشل حفظ إعدادات الموقع: ${error.message}`);
  }
  await requestRebuild("update-site-settings");
}
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/settings/useAdminSettings.ts");
function useAdminSiteSettings() {
  return useQuery({
    queryKey: ["admin_site_settings"],
    queryFn: () => getAdminSettings(),
    staleTime: 1e3 * 60
    // 1 minute
  });
}
function useUpdateSiteSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => saveAdminSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_site_settings"] });
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
    }
  });
}
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/features/admin/settings/SettingsPage.tsx");
const SettingsPage = () => {
  const { isAdmin } = useAuth();
  const { success, error: toastError } = useToast();
  const { data: settings, isLoading } = useAdminSiteSettings();
  const updateMutation = useUpdateSiteSettings();
  const [activeTab, setActiveTab] = useState("company");
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState({});
  const [companyNameAr, setCompanyNameAr] = useState("");
  const [companyNameEn, setCompanyNameEn] = useState("");
  const [sloganAr, setSloganAr] = useState("");
  const [crNumber, setCrNumber] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [cityAr, setCityAr] = useState("جدة");
  const [cityEn, setCityEn] = useState("Jeddah");
  const [phones, setPhones] = useState(["+966124231773"]);
  const [newPhoneInput, setNewPhoneInput] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [unifiedNumber, setUnifiedNumber] = useState("");
  const [email, setEmail] = useState("");
  const [addressAr, setAddressAr] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [workingHoursAr, setWorkingHoursAr] = useState("");
  const [workingHoursEn, setWorkingHoursEn] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [xUrl, setXUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [snapchatUrl, setSnapchatUrl] = useState("");
  const [defaultSeoTitleAr, setDefaultSeoTitleAr] = useState("");
  const [defaultSeoDescriptionAr, setDefaultSeoDescriptionAr] = useState("");
  const [defaultOgMediaId, setDefaultOgMediaId] = useState(null);
  const [defaultOgMediaUrl, setDefaultOgMediaUrl] = useState(null);
  const [gtmId, setGtmId] = useState("");
  const [ga4Id, setGa4Id] = useState("");
  const [metaPixelId, setMetaPixelId] = useState("");
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  useUnsavedChangesWarning(isDirty);
  useEffect(() => {
    var _a2;
    if (settings) {
      setCompanyNameAr(settings.company_name_ar);
      setCompanyNameEn(settings.company_name_en || "");
      setSloganAr(settings.slogan_ar || "");
      setCrNumber(settings.cr_number);
      setVatNumber(settings.vat_number || "");
      setCityAr(settings.city_ar);
      setCityEn(settings.city_en);
      setPhones(settings.phones);
      setWhatsapp(settings.whatsapp);
      setUnifiedNumber(settings.unified_number);
      setEmail(settings.email);
      setAddressAr(settings.address_ar || "");
      setAddressEn(settings.address_en || "");
      setWorkingHoursAr(settings.working_hours_ar || "");
      setWorkingHoursEn(settings.working_hours_en || "");
      setMapUrl(settings.map_url || "");
      setInstagramUrl(settings.instagram_url || "");
      setTiktokUrl(settings.tiktok_url || "");
      setXUrl(settings.x_url || "");
      setLinkedinUrl(settings.linkedin_url || "");
      setSnapchatUrl(settings.snapchat_url || "");
      setDefaultSeoTitleAr(settings.default_seo_title_ar || "");
      setDefaultSeoDescriptionAr(settings.default_seo_description_ar || "");
      setDefaultOgMediaId(settings.default_og_media_id || null);
      if ((_a2 = settings.default_og_media) == null ? void 0 : _a2.storage_path) {
        setDefaultOgMediaUrl(getStoragePublicUrl(settings.default_og_media.storage_path));
      } else {
        setDefaultOgMediaUrl(null);
      }
      setGtmId(settings.gtm_id || "");
      setGa4Id(settings.ga4_id || "");
      setMetaPixelId(settings.meta_pixel_id || "");
      setIsDirty(false);
    }
  }, [settings]);
  if (!isAdmin) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-feedback-error/20 p-12 text-center max-w-xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsx(ShieldAlert, { className: "w-12 h-12 text-feedback-error mx-auto" }),
      /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-content-heading", children: "غير مصرح لك بالوصول إلى هذه الصفحة" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted leading-relaxed", children: "إعدادات الموقع ومعلومات الشركة الحساسة متاحة فقط للمستخدمين بصلاحية مسؤول النظام (Admin)." })
    ] });
  }
  const handleAddPhone = () => {
    if (!newPhoneInput.trim()) return;
    const normalized = normalizePhoneToE164(newPhoneInput);
    if (!phones.includes(normalized)) {
      setPhones([...phones, normalized]);
      setNewPhoneInput("");
      setIsDirty(true);
    }
  };
  const handleRemovePhone = (index) => {
    if (phones.length <= 1) {
      toastError("يجب الإبقاء على رقم هاتف واحد على الأقل");
      return;
    }
    setPhones(phones.filter((_, i) => i !== index));
    setIsDirty(true);
  };
  const handleSelectOgMedia = (selected) => {
    const item = Array.isArray(selected) ? selected[0] : selected;
    if (!item) return;
    setDefaultOgMediaId(item.id);
    setDefaultOgMediaUrl(getStoragePublicUrl(item.storage_path));
    setIsMediaPickerOpen(false);
    setIsDirty(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const payload = {
      company_name_ar: companyNameAr.trim(),
      company_name_en: companyNameEn.trim() || null,
      slogan_ar: sloganAr.trim() || null,
      cr_number: crNumber.trim(),
      vat_number: vatNumber.trim() || null,
      city_ar: cityAr.trim(),
      city_en: cityEn.trim(),
      phones: phones.map(normalizePhoneToE164).filter(Boolean),
      whatsapp: normalizePhoneToE164(whatsapp),
      unified_number: unifiedNumber.trim(),
      email: email.trim(),
      address_ar: addressAr.trim() || null,
      address_en: addressEn.trim() || null,
      working_hours_ar: workingHoursAr.trim() || null,
      working_hours_en: workingHoursEn.trim() || null,
      map_url: mapUrl.trim() || null,
      instagram_url: instagramUrl.trim() || null,
      tiktok_url: tiktokUrl.trim() || null,
      x_url: xUrl.trim() || null,
      linkedin_url: linkedinUrl.trim() || null,
      snapchat_url: snapchatUrl.trim() || null,
      default_seo_title_ar: defaultSeoTitleAr.trim() || null,
      default_seo_description_ar: defaultSeoDescriptionAr.trim() || null,
      default_og_media_id: defaultOgMediaId || null,
      gtm_id: gtmId.trim() || null,
      ga4_id: ga4Id.trim() || null,
      meta_pixel_id: metaPixelId.trim() || null
    };
    const validation = settingsFormSchema.safeParse(payload);
    if (!validation.success) {
      const errMap = {};
      for (const err of validation.error.errors) {
        if (err.path[0]) {
          errMap[err.path[0]] = err.message;
        }
      }
      setErrors(errMap);
      toastError("يرجى مراجعة وتصحيح الأخطاء في الإعدادات");
      return;
    }
    try {
      await updateMutation.mutateAsync(payload);
      setIsDirty(false);
      success("تم حفظ إعدادات الموقع بنجاح", REBUILD_NOTICE);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حفظ الإعدادات", msg);
    }
  };
  const tabs = [
    { id: "company", label: "بيانات الشركة والسجل", icon: Building2 },
    { id: "contact", label: "بيانات الاتصال والعنوان", icon: Phone },
    { id: "social", label: "حسابات التواصل", icon: Share2 },
    { id: "seo", label: "محركات البحث والوسائط", icon: Search },
    { id: "analytics", label: "أدوات التحليل", icon: BarChart3 }
  ];
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "إعدادات الموقع العامة",
        description: "إدارة معلومات الشركة الرسمية، أرقام التواصل الموحدة، وحسابات التواصل الاجتماعي.",
        backTo: "/admin",
        backLabel: "الرئيسية",
        actions: /* @__PURE__ */ jsxs(
          Button,
          {
            type: "submit",
            variant: "primary",
            size: "sm",
            isLoading: updateMutation.isPending,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsx(Save, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "حفظ الإعدادات" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "flex border-b border-surface-border bg-white rounded-t-card px-4 pt-2 overflow-x-auto gap-2", children: tabs.map((tab) => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setActiveTab(tab.id),
          className: `flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${isActive ? "border-brand-600 text-brand-600" : "border-transparent text-content-muted hover:text-content-heading"}`,
          children: [
            /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx("span", { children: tab.label })
          ]
        },
        tab.id
      );
    }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white p-6 rounded-b-card border border-t-0 border-surface-border shadow-xs", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل الإعدادات..." }) : /* @__PURE__ */ jsxs("div", { className: "space-y-6 max-w-3xl", children: [
      activeTab === "company" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "اسم الشركة الرسمي (بالعربية)",
              required: true,
              error: errors.company_name_ar,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: companyNameAr,
                  onChange: (e) => {
                    setCompanyNameAr(e.target.value);
                    setIsDirty(true);
                  },
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "اسم الشركة (بالإنجليزية)",
              optional: true,
              error: errors.company_name_en,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  dir: "ltr",
                  value: companyNameEn,
                  onChange: (e) => {
                    setCompanyNameEn(e.target.value);
                    setIsDirty(true);
                  },
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "الشعار اللفظي (Slogan بالعربية)",
            optional: true,
            error: errors.slogan_ar,
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: sloganAr,
                onChange: (e) => {
                  setSloganAr(e.target.value);
                  setIsDirty(true);
                },
                placeholder: "شريكك الموثوق في عالم المصاعد والسلالم الكهربائية",
                className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "رقم السجل التجاري (CR Number)",
              required: true,
              error: errors.cr_number,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  dir: "ltr",
                  value: crNumber,
                  onChange: (e) => {
                    setCrNumber(e.target.value);
                    setIsDirty(true);
                  },
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "الرقم الضريبي (VAT Number)",
              optional: true,
              error: errors.vat_number,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  dir: "ltr",
                  value: vatNumber,
                  onChange: (e) => {
                    setVatNumber(e.target.value);
                    setIsDirty(true);
                  },
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2", children: [
          /* @__PURE__ */ jsx(FormField, { label: "المدينة والمقر الرئيسي (بالعربية)", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: cityAr,
              onChange: (e) => {
                setCityAr(e.target.value);
                setIsDirty(true);
              },
              className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "المدينة والمقر الرئيسي (بالإنجليزية)", children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              dir: "ltr",
              value: cityEn,
              onChange: (e) => {
                setCityEn(e.target.value);
                setIsDirty(true);
              },
              className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) })
        ] })
      ] }),
      activeTab === "contact" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "أرقام هواتف الاتصال المباشر والطوارئ",
            required: true,
            hint: "يتم توحيد الأرقام تلقائياً بصيغة E.164 الدولية (+966)",
            error: errors.phones,
            children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    dir: "ltr",
                    value: newPhoneInput,
                    onChange: (e) => setNewPhoneInput(e.target.value),
                    placeholder: "0559557459 أو +966124231773",
                    className: "flex-1 text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  Button,
                  {
                    type: "button",
                    variant: "secondary",
                    size: "sm",
                    onClick: handleAddPhone,
                    className: "gap-1.5 shrink-0",
                    children: [
                      /* @__PURE__ */ jsx(Plus, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsx("span", { children: "إضافة رقم" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-1", children: phones.map((p, idx) => /* @__PURE__ */ jsxs(
                "span",
                {
                  className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-control bg-surface-soft border border-surface-border text-xs font-mono text-content-heading",
                  dir: "ltr",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: p }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleRemovePhone(idx),
                        className: "text-feedback-error hover:text-rose-700 ms-1",
                        title: "حذف الرقم",
                        "aria-label": "حذف",
                        children: /* @__PURE__ */ jsx(Trash2, { className: "w-3 h-3" })
                      }
                    )
                  ]
                },
                p
              )) })
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2", children: [
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "رقم الواتساب الرسمي (خدمة العملاء)",
              required: true,
              error: errors.whatsapp,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  dir: "ltr",
                  value: whatsapp,
                  onChange: (e) => {
                    setWhatsapp(e.target.value);
                    setIsDirty(true);
                  },
                  placeholder: "+966559557459",
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            FormField,
            {
              label: "الرقم الموحد",
              required: true,
              error: errors.unified_number,
              children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  dir: "ltr",
                  value: unifiedNumber,
                  onChange: (e) => {
                    setUnifiedNumber(e.target.value);
                    setIsDirty(true);
                  },
                  placeholder: "920000000",
                  className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading font-mono focus:outline-none focus:border-brand-600"
                }
              )
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "البريد الإلكتروني الرسمي",
            required: true,
            error: errors.email,
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                dir: "ltr",
                value: email,
                onChange: (e) => {
                  setEmail(e.target.value);
                  setIsDirty(true);
                },
                placeholder: "info@almubtakirah.com",
                className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2", children: [
          /* @__PURE__ */ jsx(FormField, { label: "العنوان الوطني (بالعربية)", optional: true, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: addressAr,
              onChange: (e) => {
                setAddressAr(e.target.value);
                setIsDirty(true);
              },
              placeholder: "جدة، حي الفيصلية، طريق المدينة المنورة",
              className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "العنوان الوطني (بالإنجليزية)", optional: true, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              dir: "ltr",
              value: addressEn,
              onChange: (e) => {
                setAddressEn(e.target.value);
                setIsDirty(true);
              },
              placeholder: "Jeddah, Al-Faisaliyah, Madinah Road",
              className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2", children: [
          /* @__PURE__ */ jsx(FormField, { label: "ساعات العمل الرسمية (بالعربية)", optional: true, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: workingHoursAr,
              onChange: (e) => {
                setWorkingHoursAr(e.target.value);
                setIsDirty(true);
              },
              className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) }),
          /* @__PURE__ */ jsx(FormField, { label: "ساعات العمل الرسمية (بالإنجليزية)", optional: true, children: /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              dir: "ltr",
              value: workingHoursEn,
              onChange: (e) => {
                setWorkingHoursEn(e.target.value);
                setIsDirty(true);
              },
              className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "رابط موقع الشركة على خرائط قوقل (Google Maps URL)",
            optional: true,
            error: errors.map_url,
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "url",
                dir: "ltr",
                value: mapUrl,
                onChange: (e) => {
                  setMapUrl(e.target.value);
                  setIsDirty(true);
                },
                placeholder: "https://maps.google.com/?q=...",
                className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            )
          }
        )
      ] }),
      activeTab === "social" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(FormField, { label: "رابط إنستغرام (Instagram)", optional: true, error: errors.instagram_url, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            dir: "ltr",
            value: instagramUrl,
            onChange: (e) => {
              setInstagramUrl(e.target.value);
              setIsDirty(true);
            },
            placeholder: "https://instagram.com/...",
            className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
          }
        ) }),
        /* @__PURE__ */ jsx(FormField, { label: "رابط تيك توك (TikTok)", optional: true, error: errors.tiktok_url, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            dir: "ltr",
            value: tiktokUrl,
            onChange: (e) => {
              setTiktokUrl(e.target.value);
              setIsDirty(true);
            },
            placeholder: "https://tiktok.com/@...",
            className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
          }
        ) }),
        /* @__PURE__ */ jsx(FormField, { label: "رابط منصة إكس / تويتر (X / Twitter)", optional: true, error: errors.x_url, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            dir: "ltr",
            value: xUrl,
            onChange: (e) => {
              setXUrl(e.target.value);
              setIsDirty(true);
            },
            placeholder: "https://x.com/...",
            className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
          }
        ) }),
        /* @__PURE__ */ jsx(FormField, { label: "رابط لينكد إن (LinkedIn)", optional: true, error: errors.linkedin_url, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            dir: "ltr",
            value: linkedinUrl,
            onChange: (e) => {
              setLinkedinUrl(e.target.value);
              setIsDirty(true);
            },
            placeholder: "https://linkedin.com/company/...",
            className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
          }
        ) }),
        /* @__PURE__ */ jsx(FormField, { label: "رابط سناب شات (Snapchat)", optional: true, error: errors.snapchat_url, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "url",
            dir: "ltr",
            value: snapchatUrl,
            onChange: (e) => {
              setSnapchatUrl(e.target.value);
              setIsDirty(true);
            },
            placeholder: "https://snapchat.com/add/...",
            className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
          }
        ) })
      ] }),
      activeTab === "seo" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "عنوان الصفحة الرئيسية الافتراضي (SEO Title)",
            hint: "العنوان الذي يظهر في نتائج محركات البحث عند البحث عن الشركة",
            error: errors.default_seo_title_ar,
            children: /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: defaultSeoTitleAr,
                onChange: (e) => {
                  setDefaultSeoTitleAr(e.target.value);
                  setIsDirty(true);
                },
                maxLength: 80,
                className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "الوصف التعريفي الافتراضي (Meta Description)",
            hint: "الوصف الذي يظهر أسفل العنوان في قوقل وشبكات التواصل",
            error: errors.default_seo_description_ar,
            children: /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                value: defaultSeoDescriptionAr,
                onChange: (e) => {
                  setDefaultSeoDescriptionAr(e.target.value);
                  setIsDirty(true);
                },
                maxLength: 200,
                className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
              }
            )
          }
        ),
        /* @__PURE__ */ jsx(
          FormField,
          {
            label: "صورة المشاركة الافتراضية للروابط (Default Open Graph Image)",
            hint: "تظهر عند مشاركة رابط الموقع على واتساب أو تويتر أو فيسبوك (يفضل أبعاد 1200x630)",
            children: /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
              defaultOgMediaUrl ? /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm aspect-[1.91/1] rounded-control overflow-hidden border border-surface-border bg-surface-soft", children: /* @__PURE__ */ jsx(
                "img",
                {
                  src: defaultOgMediaUrl,
                  alt: "صورة المشاركة الافتراضية",
                  className: "w-full h-full object-cover"
                }
              ) }) : /* @__PURE__ */ jsxs(
                "div",
                {
                  onClick: () => setIsMediaPickerOpen(true),
                  className: "w-full max-w-sm aspect-[1.91/1] border-2 border-dashed border-surface-border rounded-control p-6 text-center cursor-pointer hover:border-brand-600/50 hover:bg-surface-soft/40 transition-colors flex flex-col items-center justify-center",
                  children: [
                    /* @__PURE__ */ jsx(Image, { className: "w-8 h-8 text-content-muted mb-2" }),
                    /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-content-heading", children: "اختيار صورة OG الافتراضية" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "secondary",
                    size: "sm",
                    onClick: () => setIsMediaPickerOpen(true),
                    className: "text-xs",
                    children: defaultOgMediaUrl ? "تغيير الصورة" : "اختيار من مكتبة الوسائط"
                  }
                ),
                defaultOgMediaUrl && /* @__PURE__ */ jsx(
                  Button,
                  {
                    type: "button",
                    variant: "ghost",
                    size: "sm",
                    onClick: () => {
                      setDefaultOgMediaId(null);
                      setDefaultOgMediaUrl(null);
                      setIsDirty(true);
                    },
                    className: "text-feedback-error hover:bg-feedback-error/10 text-xs",
                    children: "إزالة"
                  }
                )
              ] })
            ] })
          }
        )
      ] }),
      activeTab === "analytics" && /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-control bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-5 h-5 text-amber-600 shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs space-y-1", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold", children: "أدوات التتبع والتحليل غير مفعّلة حالياً" }),
            /* @__PURE__ */ jsx("p", { className: "text-amber-800 leading-relaxed", children: "الحقول التالية مجهزة في قاعدة البيانات ولكنها معطلة حالياً لمنع تحميل نصوص برمجية خارجية حتى اعتماد سياسة ملفات تعريف الارتباط وتفعيلها رسمياً في المرحلة 10." })
          ] })
        ] }),
        /* @__PURE__ */ jsx(FormField, { label: "معرّف إدارة العلامات من قوقل (Google Tag Manager ID)", optional: true, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            dir: "ltr",
            disabled: true,
            value: gtmId,
            onChange: (e) => setGtmId(e.target.value),
            placeholder: "GTM-XXXXXXX (غير مفعّل حالياً)",
            className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-surface-soft text-content-muted cursor-not-allowed font-mono"
          }
        ) }),
        /* @__PURE__ */ jsx(FormField, { label: "معرّف تحليلات قوقل (GA4 Measurement ID)", optional: true, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            dir: "ltr",
            disabled: true,
            value: ga4Id,
            onChange: (e) => setGa4Id(e.target.value),
            placeholder: "G-XXXXXXXXXX (غير مفعّل حالياً)",
            className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-surface-soft text-content-muted cursor-not-allowed font-mono"
          }
        ) }),
        /* @__PURE__ */ jsx(FormField, { label: "معرّف بكسل ميتا (Meta Pixel ID)", optional: true, children: /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            dir: "ltr",
            disabled: true,
            value: metaPixelId,
            onChange: (e) => setMetaPixelId(e.target.value),
            placeholder: "XXXXXXXXXXXXXXX (غير مفعّل حالياً)",
            className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-surface-soft text-content-muted cursor-not-allowed font-mono"
          }
        ) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(
      MediaPicker,
      {
        open: isMediaPickerOpen,
        onClose: () => setIsMediaPickerOpen(false),
        onSelect: handleSelectOgMedia,
        mode: "single",
        accept: "image",
        initialFolder: "branding",
        title: "اختيار صورة المشاركة الافتراضية للموقع"
      }
    )
  ] });
};
export {
  SettingsPage
};
