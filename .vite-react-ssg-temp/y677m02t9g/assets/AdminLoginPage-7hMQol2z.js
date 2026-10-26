var _a;
import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import React, { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { AlertCircle, CheckCircle2, Mail, Lock, KeyRound, ArrowRight } from "lucide-react";
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
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/auth/AdminLoginPage.tsx");
const AdminLoginPage = () => {
  const { signIn, requestPasswordReset, user, isStaff } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("returnTo") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isForgotMode, setIsForgotMode] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  React.useEffect(() => {
    if (user && isStaff) {
      navigate(returnTo, { replace: true });
    }
  }, [user, isStaff, navigate, returnTo]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email || !password) {
      setErrorMsg("يرجى إدخال البريد الإلكتروني وكلمة المرور.");
      return;
    }
    setIsSubmitting(true);
    const { error } = await signIn(email.trim(), password);
    if (error) {
      setIsSubmitting(false);
      if (error.message.includes("Invalid login credentials") || error.message.includes("invalid_credentials")) {
        setErrorMsg("البريد الإلكتروني أو كلمة المرور غير صحيحة.");
      } else if (error.message.includes("Email not confirmed")) {
        setErrorMsg("يرجى تأكيد بريدك الإلكتروني أولاً قبل تسجيل الدخول.");
      } else if (error.message.includes("Too many requests")) {
        setErrorMsg("تم تجاوز الحد المسموح من المحاولات. يرجى الانتظار قليلاً.");
      } else {
        setErrorMsg(error.message);
      }
      return;
    }
    navigate(returnTo, { replace: true });
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!email) {
      setErrorMsg("يرجى إدخال عنوان بريدك الإلكتروني لإرسال رابط الاستعادة.");
      return;
    }
    setIsSubmitting(true);
    const { error } = await requestPasswordReset(email.trim());
    setIsSubmitting(false);
    if (error) {
      setErrorMsg(error.message);
      return;
    }
    setResetSuccess(true);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "تسجيل الدخول إلى لوحة الإدارة",
        noindex: true,
        description: "بوابة الإدارة المركزية لشركة المصاعد المبتكرة."
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
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-black text-content-heading tracking-tight", children: isForgotMode ? "استعادة كلمة المرور" : "لوحة الإدارة المركزية" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-content-muted", children: isForgotMode ? "أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً لإعادة تعيين كلمة المرور" : "يرجى تسجيل الدخول بحساب الموظف المعتمد للوصول إلى أدوات الإدارة" })
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
          resetSuccess ? /* @__PURE__ */ jsxs("div", { className: "text-center py-4", children: [
            /* @__PURE__ */ jsx("div", { className: "w-12 h-12 rounded-full bg-feedback-success/10 text-feedback-success flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx(CheckCircle2, { className: "w-6 h-6" }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-content-heading text-sm mb-2", children: "تم إرسال رابط الاستعادة" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-content-body leading-relaxed mb-6", children: "إذا كان البريد الإلكتروني مسجلاً لدينا، فستصلك رسالة تحتوي على رابط إعادة تعيين كلمة المرور في غضون لحظات." }),
            /* @__PURE__ */ jsx(
              Button,
              {
                variant: "secondary",
                onClick: () => {
                  setIsForgotMode(false);
                  setResetSuccess(false);
                  setErrorMsg(null);
                },
                className: "w-full text-xs",
                children: "العودة لتسجيل الدخول"
              }
            )
          ] }) : isForgotMode ? (
            /* Forgot password form */
            /* @__PURE__ */ jsxs("form", { onSubmit: handleResetPassword, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "reset-email",
                    className: "block text-xs font-bold text-content-heading mb-1.5",
                    children: "البريد الإلكتروني"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "reset-email",
                      type: "email",
                      dir: "ltr",
                      autoComplete: "email",
                      required: true,
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      placeholder: "admin@almubtakirah.com",
                      className: "w-full px-3.5 py-2.5 ps-10 rounded-control border border-surface-border bg-white text-content-heading text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    }
                  ),
                  /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-content-muted absolute top-3 start-3" })
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
                Button,
                {
                  type: "submit",
                  variant: "primary",
                  isLoading: isSubmitting,
                  className: "w-full",
                  children: "إرسال رابط استعادة كلمة المرور"
                }
              ) }),
              /* @__PURE__ */ jsx("div", { className: "text-center pt-2", children: /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => {
                    setIsForgotMode(false);
                    setErrorMsg(null);
                  },
                  className: "text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline",
                  children: "العودة إلى شاشة تسجيل الدخول"
                }
              ) })
            ] })
          ) : (
            /* Sign in form */
            /* @__PURE__ */ jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "block text-xs font-bold text-content-heading mb-1.5",
                    children: "البريد الإلكتروني"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "email",
                      type: "email",
                      dir: "ltr",
                      autoComplete: "email",
                      required: true,
                      value: email,
                      onChange: (e) => setEmail(e.target.value),
                      placeholder: "name@almubtakirah.com",
                      className: "w-full px-3.5 py-2.5 ps-10 rounded-control border border-surface-border bg-white text-content-heading text-sm focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    }
                  ),
                  /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4 text-content-muted absolute top-3 start-3" })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      htmlFor: "password",
                      className: "block text-xs font-bold text-content-heading",
                      children: "كلمة المرور"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        setIsForgotMode(true);
                        setErrorMsg(null);
                      },
                      className: "text-xs text-brand-600 hover:text-brand-700 hover:underline",
                      children: "نسيت كلمة المرور؟"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      id: "password",
                      type: "password",
                      dir: "ltr",
                      autoComplete: "current-password",
                      required: true,
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
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
                  leftIcon: /* @__PURE__ */ jsx(KeyRound, { className: "w-4 h-4" }),
                  children: "تسجيل الدخول"
                }
              ) })
            ] })
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-1.5 text-xs text-content-muted hover:text-brand-600 transition-colors",
            children: [
              /* @__PURE__ */ jsx("span", { children: "العودة لموقع شركة المصاعد المبتكرة" }),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-3.5 h-3.5" })
            ]
          }
        ) })
      ] })
    ] })
  ] });
};
export {
  AdminLoginPage
};
