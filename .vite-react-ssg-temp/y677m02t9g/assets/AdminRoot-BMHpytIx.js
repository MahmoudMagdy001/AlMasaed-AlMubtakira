var _a;
import { jsx } from "react/jsx-runtime";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { A as AppProviders, T as ToastProvider } from "../main.mjs";
import { A as AuthProvider } from "./AuthContext-67Taikd_.js";
import "vite-react-ssg";
import "react-i18next";
import "@tanstack/react-query";
import "lucide-react";
import "@supabase/supabase-js";
import "gsap";
import "gsap/ScrollTrigger";
import "@gsap/react";
import "react-hook-form";
import "zod";
import "i18next";
import "./authContextDef-DRZS3Rdw.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/app/layouts/AdminRoot.tsx");
const AdminRoot = ({ children }) => {
  return /* @__PURE__ */ jsx(AppProviders, { children: /* @__PURE__ */ jsx(AuthProvider, { children: /* @__PURE__ */ jsx(ToastProvider, { children: /* @__PURE__ */ jsx(
    Suspense,
    {
      fallback: /* @__PURE__ */ jsx("div", { className: "min-h-screen bg-surface-soft flex items-center justify-center p-6", children: /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin" }) }),
      children: children ?? /* @__PURE__ */ jsx(Outlet, {})
    }
  ) }) }) });
};
export {
  AdminRoot
};
