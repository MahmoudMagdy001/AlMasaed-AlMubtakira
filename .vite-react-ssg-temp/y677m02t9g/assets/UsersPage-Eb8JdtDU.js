var _a, _b, _c;
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { ShieldAlert, User, Info, ExternalLink, Shield } from "lucide-react";
import { P as PageHeader, S as StatusBadge, C as ConfirmDialog } from "./index-6EXxYG9x.js";
import { s as supabase, u as useToast } from "../main.mjs";
import "./index-CJ2Fe0b1.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { u as useAuth } from "./useAuth-BKMX_f9Z.js";
import "react-router-dom";
import "vite-react-ssg";
import "react-i18next";
import "@supabase/supabase-js";
import "gsap";
import "gsap/ScrollTrigger";
import "@gsap/react";
import "react-hook-form";
import "zod";
import "i18next";
import "./authContextDef-DRZS3Rdw.js";
import "./AuthContext-67Taikd_.js";
import "./AdminLoginPage-7hMQol2z.js";
import "./AdminResetPasswordPage-C7yCgmhx.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/users/usersAdminService.ts");
const ROLE_LABELS = {
  admin: {
    ar: "مسؤول نظام (Admin)",
    description: "صلاحيات كاملة تشمل إدارة المستخدمين، وتعديل إعدادات الموقع، والنشر، وحذف السجلات."
  },
  editor: {
    ar: "محرّر محتوى (Editor)",
    description: "صلاحيات إدارة المقالات، والمشاريع، والشركاء، ومكتبة الوسائط، والرد على الرسائل."
  },
  none: {
    ar: "معطّل (None)",
    description: "حساب مسجل ولكن ليس لديه أي صلاحية وصول إلى لوحة الإدارة."
  }
};
async function getAdminProfiles() {
  const { data, error } = await supabase.from("profiles").select("id, full_name, avatar_url, role, created_at").order("created_at", { ascending: false });
  if (error) {
    throw new Error(`فشل تحميل قائمة المستخدمين: ${error.message}`);
  }
  return data || [];
}
async function updateUserRole(userId, role) {
  const { data, error } = await supabase.from("profiles").update({ role }).eq("id", userId).select().single();
  if (error || !data) {
    throw new Error(`فشل تحديث صلاحية المستخدم: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  return data;
}
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/users/useAdminUsers.ts");
function useAdminProfiles() {
  return useQuery({
    queryKey: ["admin_profiles"],
    queryFn: () => getAdminProfiles(),
    staleTime: 1e3 * 30
  });
}
function useUpdateUserRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, role }) => updateUserRole(userId, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_profiles"] });
    }
  });
}
(_c = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _c.call(globalThis, "src/features/admin/users/UsersPage.tsx");
const UsersPage = () => {
  var _a2;
  const { user: currentUser, isAdmin } = useAuth();
  const { success, error: toastError } = useToast();
  const { data: profiles = [], isLoading } = useAdminProfiles();
  const updateRoleMutation = useUpdateUserRole();
  const [roleChangeTarget, setRoleChangeTarget] = useState(null);
  if (!isAdmin) {
    return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-feedback-error/20 p-12 text-center max-w-xl mx-auto space-y-4", children: [
      /* @__PURE__ */ jsx(ShieldAlert, { className: "w-12 h-12 text-feedback-error mx-auto" }),
      /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-content-heading", children: "غير مصرح لك بالوصول إلى هذه الصفحة" }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted leading-relaxed", children: "إدارة فريق العمل وتعديل الصلاحيات مقتصرة حصرياً على مستخدمي النظام بصلاحية المسؤول (Admin)." })
    ] });
  }
  const handleRoleSelect = (profile, newRole) => {
    if (profile.role === newRole) return;
    if (profile.role === "admin" || profile.id === (currentUser == null ? void 0 : currentUser.id)) {
      setRoleChangeTarget({ profile, newRole });
      return;
    }
    applyRoleUpdate(profile.id, newRole);
  };
  const applyRoleUpdate = async (userId, newRole) => {
    try {
      await updateRoleMutation.mutateAsync({ userId, role: newRole });
      success("تم تحديث صلاحية المستخدم بنجاح");
      setRoleChangeTarget(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل تحديث الصلاحية", msg);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "فريق العمل وصلاحيات المستخدمين",
        description: "إدارة حسابات موظفي ومحرري لوحة التحكم وتعيين صلاحيات الوصول ومستويات الإدارة.",
        backTo: "/admin",
        backLabel: "الرئيسية"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-surface-border overflow-hidden shadow-xs", children: [
        /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-surface-border flex items-center justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-content-heading", children: "حسابات فريق العمل" }),
          /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-content-muted", children: [
            "إجمالي الحسابات المسجلة: ",
            profiles.length
          ] })
        ] }) }),
        isLoading ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل قائمة المستخدمين..." }) : profiles.length === 0 ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-xs", children: "لا يوجد مستخدمين مسجلين حالياً." }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-start text-xs border-collapse", children: [
          /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-surface-soft border-b border-surface-border text-content-muted font-bold text-start", children: [
            /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "المستخدم" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "تاريخ التسجيل" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "الصلاحية الحالية" }),
            /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-end", children: "تغيير الصلاحية" })
          ] }) }),
          /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-surface-border", children: profiles.map((profile) => {
            const isSelf = profile.id === (currentUser == null ? void 0 : currentUser.id);
            return /* @__PURE__ */ jsxs(
              "tr",
              {
                className: "hover:bg-surface-soft/40 transition-colors",
                children: [
                  /* @__PURE__ */ jsx("td", { className: "py-3 px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden", children: profile.avatar_url ? /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: profile.avatar_url,
                        alt: profile.full_name || "",
                        className: "w-full h-full object-cover"
                      }
                    ) : /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }) }),
                    /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxs("span", { className: "font-bold text-content-heading block text-xs truncate", children: [
                        profile.full_name || "مستخدم لوحة التحكم",
                        isSelf && /* @__PURE__ */ jsx("span", { className: "ms-1.5 text-[10px] font-semibold text-brand-600 bg-brand-50 px-1.5 py-0.2 rounded-sm", children: "(حسابك الحالي)" })
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "text-[10px] text-content-muted font-mono block truncate", dir: "ltr", children: profile.id })
                    ] })
                  ] }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-3 px-4 whitespace-nowrap text-content-muted text-[11px]", children: new Date(profile.created_at).toLocaleDateString("ar-SA") }),
                  /* @__PURE__ */ jsx("td", { className: "py-3 px-4 whitespace-nowrap", children: /* @__PURE__ */ jsx(StatusBadge, { status: profile.role }) }),
                  /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-end whitespace-nowrap", children: /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: profile.role,
                      onChange: (e) => handleRoleSelect(profile, e.target.value),
                      disabled: updateRoleMutation.isPending,
                      "aria-label": "تحديد صلاحية المستخدم",
                      className: "text-xs border border-surface-border rounded-control py-1 px-2.5 bg-white text-content-heading focus:outline-none focus:border-brand-600 cursor-pointer font-medium",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "admin", children: "مسؤول نظام (Admin)" }),
                        /* @__PURE__ */ jsx("option", { value: "editor", children: "محرّر محتوى (Editor)" }),
                        /* @__PURE__ */ jsx("option", { value: "none", children: "معطّل (بلا وصول)" })
                      ]
                    }
                  ) })
                ]
              },
              profile.id
            );
          }) })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white p-6 rounded-card border border-surface-border shadow-xs space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 pb-2 border-b border-surface-border text-brand-600", children: [
            /* @__PURE__ */ jsx(Info, { className: "w-5 h-5 shrink-0" }),
            /* @__PURE__ */ jsx("h2", { className: "text-sm font-bold text-content-heading", children: "كيفية دعوة مستخدم جديد" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-content-body leading-relaxed", children: "وفقاً لمعايير الأمان المعتمدة في هذا المشروع، يتم إرسال دعوات التسجيل الرسمية من خلال لوحة تحكم Supabase لحماية النظام من أي تسجيل غير مصرّح به:" }),
          /* @__PURE__ */ jsxs("ol", { className: "space-y-3 text-xs text-content-body list-decimal list-inside", children: [
            /* @__PURE__ */ jsxs("li", { className: "leading-relaxed", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold", children: "سجّل الدخول" }),
              " إلى مشروعك في Supabase Dashboard."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "leading-relaxed", children: [
              "انتقل إلى قسم ",
              /* @__PURE__ */ jsx("strong", { children: "Authentication" }),
              " ثم اضغط على تبويب ",
              /* @__PURE__ */ jsx("strong", { children: "Users" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("li", { className: "leading-relaxed", children: [
              "اضغط على زر ",
              /* @__PURE__ */ jsx("strong", { children: "Add User" }),
              " واختر ",
              /* @__PURE__ */ jsx("strong", { children: "Send Invite" }),
              "."
            ] }),
            /* @__PURE__ */ jsx("li", { className: "leading-relaxed", children: "أدخل البريد الإلكتروني للموظف. سيتلقى رابطاً آمناً لتعيين كلمة المرور الخاصة به." }),
            /* @__PURE__ */ jsxs("li", { className: "leading-relaxed", children: [
              "بمجرد تسجيل دخوله، سيظهر حسابه تلقائياً في هذه القائمة، حيث يمكنك ترقيته إلى ",
              /* @__PURE__ */ jsx("strong", { children: "محرّر محتوى (Editor)" }),
              " أو ",
              /* @__PURE__ */ jsx("strong", { children: "مسؤول نظام (Admin)" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxs(
            "a",
            {
              href: "https://supabase.com/dashboard/project/flkydlhewzezfomfjrvi/auth/users",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-control text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors",
              children: [
                /* @__PURE__ */ jsx("span", { children: "فتح لوحة Supabase لإرسال دعوة" }),
                /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5" })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-surface-soft p-5 rounded-card border border-surface-border space-y-3", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-xs font-bold text-content-heading flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx(Shield, { className: "w-4 h-4 text-brand-600" }),
            /* @__PURE__ */ jsx("span", { children: "مستويات الصلاحيات المتاحة" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 text-xs", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-brand-700", children: "مسؤول النظام (Admin):" }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted leading-relaxed", children: "تحكم كامل بجميع أقسام لوحة الإدارة، وإدارة المستخدمين، وحذف السجلات، وإعدادات الموقع." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-emerald-700", children: "محرّر المحتوى (Editor):" }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted leading-relaxed", children: "إدارة المقالات، وتوثيق المشاريع وسابقة الأعمال، وتعديل الشركاء ومكتبة الصور، ومتابعة رسائل العملاء. لا يمكنه دخول الإعدادات أو إدارة المستخدمين." })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold text-feedback-error", children: "معطّل (None):" }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-content-muted leading-relaxed", children: "الحساب مسجل في النظام ولكنه ممنوع تماماً من الوصول إلى أي بيانات في لوحة الإدارة." })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: Boolean(roleChangeTarget),
        onClose: () => setRoleChangeTarget(null),
        onConfirm: () => {
          if (roleChangeTarget) {
            applyRoleUpdate(roleChangeTarget.profile.id, roleChangeTarget.newRole);
          }
        },
        title: "تأكيد تغيير الصلاحية",
        description: `هل أنت متأكد من تغيير صلاحية المستخدم "${(roleChangeTarget == null ? void 0 : roleChangeTarget.profile.full_name) || (roleChangeTarget == null ? void 0 : roleChangeTarget.profile.id)}" إلى "${(_a2 = ROLE_LABELS[(roleChangeTarget == null ? void 0 : roleChangeTarget.newRole) || "none"]) == null ? void 0 : _a2.ar}"؟`,
        confirmText: "تأكيد التغيير",
        cancelText: "إلغاء",
        isDestructive: (roleChangeTarget == null ? void 0 : roleChangeTarget.newRole) === "none",
        isLoading: updateRoleMutation.isPending
      }
    )
  ] });
};
export {
  UsersPage
};
