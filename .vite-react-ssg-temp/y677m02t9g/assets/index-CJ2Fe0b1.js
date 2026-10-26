var _a, _b;
import "./authContextDef-DRZS3Rdw.js";
import "./AuthContext-67Taikd_.js";
import { u as useAuth } from "./useAuth-BKMX_f9Z.js";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Loader2, ShieldAlert, LogOut, ArrowRight } from "lucide-react";
import { B as Button } from "../main.mjs";
import "./AdminLoginPage-7hMQol2z.js";
import "./AdminResetPasswordPage-C7yCgmhx.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/auth/AdminRouteGuard.tsx");
const AdminRouteGuard = ({
  children
}) => {
  const { user, session, profile, isLoading, isStaff, signOut } = useAuth();
  const location = useLocation();
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-surface-soft flex flex-col items-center justify-center p-6 text-center", children: [
      /* @__PURE__ */ jsx(Loader2, { className: "w-10 h-10 text-brand-600 animate-spin mb-4" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold text-content-body", children: "جاري التحقق من صلاحيات الدخول..." })
    ] });
  }
  if (!user || !session) {
    const returnTo = encodeURIComponent(location.pathname + location.search);
    return /* @__PURE__ */ jsx(Navigate, { to: `/admin/login?returnTo=${returnTo}`, replace: true });
  }
  if (!isStaff) {
    return /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-surface-soft flex items-center justify-center p-6", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-md bg-white rounded-card border border-surface-border p-8 text-center shadow-card", children: [
      /* @__PURE__ */ jsx("div", { className: "w-16 h-16 rounded-full bg-feedback-error/10 text-feedback-error flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsx(ShieldAlert, { className: "w-8 h-8", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-content-heading mb-3", children: "غير مصرح بالدخول" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-content-body leading-relaxed mb-6", children: [
        "تم تسجيل الدخول بنجاح بحساب",
        " ",
        /* @__PURE__ */ jsx("strong", { className: "text-content-heading", children: user.email }),
        "، ولكن هذا الحساب لا يملك صلاحية الوصول إلى لوحة تحكم الإدارة (الصلاحية الحالية:",
        " ",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-feedback-error", children: (profile == null ? void 0 : profile.role) === "none" ? "بدون صلاحية (قيد الاعتماد)" : "غير مصرح" }),
        ")."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "p-4 rounded-control bg-surface-soft border border-surface-border text-xs text-content-muted mb-6 text-start", children: "يرجى التواصل مع مسؤول النظام في شركة المصاعد المبتكرة لتفعيل حسابك وترقية رتبتك إلى محرر أو مسؤول." }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "secondary",
            onClick: () => signOut(),
            leftIcon: /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" }),
            className: "w-full",
            children: "تسجيل الخروج والتبديل لحساب آخر"
          }
        ),
        /* @__PURE__ */ jsx(
          Button,
          {
            variant: "ghost",
            to: "/",
            rightIcon: /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4" }),
            className: "w-full text-xs text-content-muted",
            children: "العودة إلى موقع الشركة"
          }
        )
      ] })
    ] }) });
  }
  return children ? /* @__PURE__ */ jsx(Fragment, { children }) : /* @__PURE__ */ jsx(Outlet, {});
};
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/auth/index.ts");
export {
  AdminRouteGuard as A
};
