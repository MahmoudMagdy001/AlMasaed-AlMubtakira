var _a;
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useLocation, Link, NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, FileText, FolderTree, Tag, Briefcase, Handshake, Image, Inbox, Settings, X, Menu, User, LogOut, ExternalLink } from "lucide-react";
import { S as Seo, L as Logo } from "../main.mjs";
import { A as AdminRouteGuard } from "./index-CJ2Fe0b1.js";
import { S as StatusBadge } from "./index-6EXxYG9x.js";
import { u as useUnreadMessagesCount } from "./useAdminMessages-DQocuplq.js";
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
import "./AuthContext-67Taikd_.js";
import "./AdminLoginPage-7hMQol2z.js";
import "./AdminResetPasswordPage-C7yCgmhx.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/app/layouts/AdminLayout.tsx");
const NAV_ITEMS = [
  { name: "الرئيسية والإحصائيات", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "المقالات والأخبار", href: "/admin/posts", icon: FileText },
  { name: "تصنيفات المدونة", href: "/admin/categories", icon: FolderTree },
  { name: "الوسوم والكلمات", href: "/admin/tags", icon: Tag },
  { name: "المشاريع وسابقة الأعمال", href: "/admin/works", icon: Briefcase },
  { name: "شركاء النجاح", href: "/admin/partners", icon: Handshake },
  { name: "مكتبة الوسائط والصور", href: "/admin/media", icon: Image },
  { name: "طلبات عروض الأسعار والرسائل", href: "/admin/messages", icon: Inbox },
  { name: "إعدادات الموقع ومعلومات التواصل", href: "/admin/settings", icon: Settings, adminOnly: true }
];
const AdminLayoutInner = () => {
  const { user, profile, isAdmin, signOut } = useAuth();
  const { data: unreadMessagesCount = 0 } = useUnreadMessagesCount();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const visibleNavItems = NAV_ITEMS.filter((item) => {
    if (item.adminOnly && !isAdmin) return false;
    return true;
  }).map((item) => {
    if (item.href === "/admin/messages") {
      return { ...item, badge: unreadMessagesCount };
    }
    return item;
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      Seo,
      {
        title: "لوحة الإدارة",
        noindex: true,
        description: "نظام إدارة المحتوى الخاص بشركة المصاعد المبتكرة."
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "min-h-screen bg-surface-soft flex flex-col lg:flex-row text-content-body font-sans", children: [
      /* @__PURE__ */ jsxs("header", { className: "lg:hidden bg-white border-b border-surface-border px-4 py-3 flex items-center justify-between sticky top-0 z-40", children: [
        /* @__PURE__ */ jsx(Link, { to: "/admin", className: "focus-visible:outline-none", children: /* @__PURE__ */ jsx(Logo, { theme: "light", asLink: false }) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => setIsMobileMenuOpen((prev) => !prev),
            className: "p-2 rounded-control text-content-body hover:bg-surface-soft transition-colors focus-visible:outline-none",
            "aria-label": isMobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة",
            children: isMobileMenuOpen ? /* @__PURE__ */ jsx(X, { className: "w-6 h-6" }) : /* @__PURE__ */ jsx(Menu, { className: "w-6 h-6" })
          }
        )
      ] }),
      isMobileMenuOpen && /* @__PURE__ */ jsx(
        "div",
        {
          className: "fixed inset-0 bg-brand-950/40 z-40 lg:hidden backdrop-blur-xs",
          onClick: () => setIsMobileMenuOpen(false),
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsxs(
        "aside",
        {
          className: `fixed lg:sticky top-0 start-0 z-50 h-screen w-72 bg-white border-e border-surface-border flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? "translate-x-0 shadow-elevated" : "max-lg:-translate-x-full"}`,
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-surface-border flex items-center justify-between", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: "/admin",
                    onClick: () => setIsMobileMenuOpen(false),
                    className: "focus-visible:outline-none",
                    children: /* @__PURE__ */ jsx(Logo, { theme: "light", asLink: false })
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setIsMobileMenuOpen(false),
                    className: "lg:hidden p-1 rounded-control text-content-muted hover:text-content-heading",
                    "aria-label": "إغلاق",
                    children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "nav",
                {
                  className: "p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)]",
                  "aria-label": "أقسام لوحة الإدارة",
                  children: visibleNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.exact ? location.pathname === item.href : location.pathname.startsWith(item.href);
                    return /* @__PURE__ */ jsxs(
                      NavLink,
                      {
                        to: item.href,
                        onClick: () => setIsMobileMenuOpen(false),
                        className: `flex items-center justify-between px-3.5 py-2.5 rounded-control text-xs font-semibold transition-all focus-visible:outline-none ${isActive ? "bg-brand-600 text-white shadow-xs font-bold" : "text-content-body hover:bg-surface-soft hover:text-brand-600"}`,
                        children: [
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                            /* @__PURE__ */ jsx(
                              Icon,
                              {
                                className: `w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-content-muted"}`,
                                "aria-hidden": "true"
                              }
                            ),
                            /* @__PURE__ */ jsx("span", { children: item.name })
                          ] }),
                          item.badge != null && item.badge > 0 && /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: `px-2 py-0.5 rounded-full text-[10px] font-bold ${isActive ? "bg-white text-brand-600" : "bg-brand-100 text-brand-700"}`,
                              children: item.badge
                            }
                          )
                        ]
                      },
                      item.href
                    );
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-surface-border bg-surface-soft/50", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-3 mb-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-xs shrink-0", children: (profile == null ? void 0 : profile.avatar_url) ? /* @__PURE__ */ jsx(
                    "img",
                    {
                      src: profile.avatar_url,
                      alt: profile.full_name || "",
                      className: "w-full h-full rounded-full object-cover"
                    }
                  ) : /* @__PURE__ */ jsx(User, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-content-heading truncate", children: (profile == null ? void 0 : profile.full_name) || (user == null ? void 0 : user.email) || "المسؤول" }),
                    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-1.5 mt-0.5", children: /* @__PURE__ */ jsx(StatusBadge, { status: (profile == null ? void 0 : profile.role) || "editor" }) })
                  ] })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => signOut(),
                    className: "p-1.5 rounded-control text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 transition-colors focus-visible:outline-none",
                    title: "تسجيل الخروج",
                    "aria-label": "تسجيل الخروج",
                    children: /* @__PURE__ */ jsx(LogOut, { className: "w-4 h-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs(
                Link,
                {
                  to: "/",
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className: "w-full inline-flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-control text-xs font-semibold text-content-body hover:bg-white hover:text-brand-600 border border-surface-border transition-colors",
                  children: [
                    /* @__PURE__ */ jsx("span", { children: "معاينة الموقع العام" }),
                    /* @__PURE__ */ jsx(ExternalLink, { className: "w-3.5 h-3.5", "aria-hidden": "true" })
                  ]
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col min-w-0 overflow-y-auto", children: /* @__PURE__ */ jsx("main", { className: "flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto", children: /* @__PURE__ */ jsx(Outlet, {}) }) })
    ] })
  ] });
};
const AdminLayout = () => {
  return /* @__PURE__ */ jsx(AdminRouteGuard, { children: /* @__PURE__ */ jsx(AdminLayoutInner, {}) });
};
export {
  AdminLayout
};
