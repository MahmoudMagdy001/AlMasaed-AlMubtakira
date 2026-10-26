var _a;
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AlertCircle, CheckCircle2, Lock, ArrowRight } from "lucide-react";
import { S as Seo, L as Logo, B as Button } from "../main.mjs";
import { u as useAuth } from "./useAuth-BKMX_f9Z.js";
import "vite-react-ssg";
import "react-i18next";
import "@tanstack/react-query";
import "@supabase/supabase-js";
import "gsap";
import "gsap/ScrollTrigger";
import "@gsap/react";
import "react-hook-form";
import "zod";
import "i18next";
import "./authContextDef-DRZS3Rdw.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/auth/AdminResetPasswordPage.tsx");
const AdminResetPasswordPage = () => {
  const { updatePassword } = useAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (newPassword.length < 10) {
      setErrorMsg("يجب ألا تقل كلمة المرور عن 10 خانات كمعيار أمان إلزامي.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMsg("كلمتا المرور غير متطابقتين.");
      return;
    }
    setIsSubmitting(true);
    const { error } = await updatePassword(newPassword);
    setIsSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      navigate("/admin", { replace: true });
    }, 2500);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "تعيين كلمة مرور جديدة",
        noindex: true,
        description: "إعادة تعيين كلمة المرور لحساب إدارة موقع شركة المصاعد المبتكرة."
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-surface-soft flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md text-center", children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/",
            className: "inline-block mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-control",
            "aria-label": "العودة إلى الموقع الرئيسي",
            children: /* @__PURE__ */ jsx(Logo, { theme: "light", asLink: false })
          }
        ),
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-content-heading tracking-tight", children: "تعيين كلمة المرور الجديدة" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-content-muted", children: "يرجى إدخال كلمة مرور قوية مكونة من 10 خانات على الأقل" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white py-8 px-6 shadow-card rounded-card border border-surface-border sm:px-10", children: [
          errorMsg && /* @__PURE__ */ jsxs(
            "div",
            {
              role: "alert",
              className: "mb-6 p-4 rounded-control bg-feedback-error/10 border border-feedback-error/30 text-feedback-error text-xs flex items-start gap-2.5",
              children: [
                /* @__PURE__ */ jsx(AlertCircle, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                /* @__PURE__ */ jsx("span", { children: errorMsg })
              ]
            }
          ),
          isSuccess ? /* @__PURE__ */ jsxs("div", { className: "text-center py-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-feedback-success/10 text-feedback-success flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-content-heading text-sm mb-2", children: "تم تحديث كلمة المرور بنجاح" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-content-body leading-relaxed mb-4", children: "جاري تحويلك إلى لوحة التحكم الآن..." })
          ] }) : /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "new-password",
                  className: "block text-xs font-bold text-content-heading mb-1.5",
                  children: "كلمة المرور الجديدة"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "new-password",
                    type: "password",
                    dir: "ltr",
                    autoComplete: "new-password",
                    required: true,
                    minLength: 10,
                    value: newPassword,
                    onChange: (e) => setNewPassword(e.target.value),
                    className: "w-full px-3.5 py-2.5 ps-10 rounded-control border border-surface-border bg-white text-content-heading text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors",
                    placeholder: "10 خانات على الأقل"
                  }
                ),
                /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 text-content-muted absolute top-3 start-3" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: "confirm-password",
                  className: "block text-xs font-bold text-content-heading mb-1.5",
                  children: "تأكيد كلمة المرور الجديدة"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    id: "confirm-password",
                    type: "password",
                    dir: "ltr",
                    autoComplete: "new-password",
                    required: true,
                    minLength: 10,
                    value: confirmPassword,
                    onChange: (e) => setConfirmPassword(e.target.value),
                    className: "w-full px-3.5 py-2.5 ps-10 rounded-control border border-surface-border bg-white text-content-heading text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                  }
                ),
                /* @__PURE__ */ jsx(Lock, { className: "w-4 h-4 text-content-muted absolute top-3 start-3" })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
              Button,
              {
                type: "submit",
                variant: "primary",
                isLoading: isSubmitting,
                className: "w-full",
                children: "حفظ وتحديث كلمة المرور"
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/admin/login",
            className: "inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-brand-600 transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { children: "العودة لشاشة تسجيل الدخول" }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
            ]
          }
        ) })
      ] })
    ] })
  ] });
};
export {
  AdminResetPasswordPage
};
