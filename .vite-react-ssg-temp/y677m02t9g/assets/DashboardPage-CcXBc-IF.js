var _a;
import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { FileText, FileEdit, Briefcase, Handshake, Inbox, ArrowLeft, Calendar, Phone, AlertTriangle } from "lucide-react";
import { s as supabase } from "../main.mjs";
import { P as PageHeader, S as StatusBadge } from "./index-6EXxYG9x.js";
import "./index-CJ2Fe0b1.js";
import { u as useAuth } from "./useAuth-BKMX_f9Z.js";
import "vite-react-ssg";
import "react";
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
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/admin/DashboardPage.tsx");
const DashboardPage = () => {
  const { profile } = useAuth();
  const { data: stats, isLoading: isStatsLoading } = useQuery({
    queryKey: ["admin_dashboard_stats"],
    queryFn: async () => {
      const [
        { count: publishedPosts },
        { count: draftPosts },
        { count: works },
        { count: partners },
        { count: newMessages }
      ] = await Promise.all([
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "published"),
        supabase.from("posts").select("id", { count: "exact", head: true }).eq("status", "draft"),
        supabase.from("works").select("id", { count: "exact", head: true }),
        supabase.from("partners").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new")
      ]);
      return {
        publishedPosts: publishedPosts ?? 0,
        draftPosts: draftPosts ?? 0,
        works: works ?? 0,
        partners: partners ?? 0,
        newMessages: newMessages ?? 0
      };
    },
    staleTime: 1e3 * 60 * 2
  });
  const { data: lastDrafts, isLoading: isDraftsLoading } = useQuery({
    queryKey: ["admin_dashboard_drafts"],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("id, slug, title, lang, updated_at").eq("status", "draft").order("updated_at", { ascending: false }).limit(5);
      if (error) return [];
      return data || [];
    },
    staleTime: 1e3 * 60 * 2
  });
  const { data: lastMessages, isLoading: isMessagesLoading } = useQuery({
    queryKey: ["admin_dashboard_messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_submissions").select("id, name, phone, service_interest, status, created_at").order("created_at", { ascending: false }).limit(5);
      if (error) return [];
      return data || [];
    },
    staleTime: 1e3 * 60 * 2
  });
  const { data: lowSeoPosts, isLoading: isSeoLoading } = useQuery({
    queryKey: ["admin_dashboard_low_seo"],
    queryFn: async () => {
      const { data, error } = await supabase.from("posts").select("id, slug, title, lang, seo_score, status").lt("seo_score", 50).order("seo_score", { ascending: true }).limit(5);
      if (error) return [];
      return data || [];
    },
    staleTime: 1e3 * 60 * 2
  });
  const statCards = [
    {
      title: "المقالات المنشورة",
      value: (stats == null ? void 0 : stats.publishedPosts) ?? 0,
      icon: FileText,
      href: "/admin/posts",
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100"
    },
    {
      title: "المسودات قيد المراجعة",
      value: (stats == null ? void 0 : stats.draftPosts) ?? 0,
      icon: FileEdit,
      href: "/admin/posts",
      colorClass: "text-amber-600 bg-amber-50 border-amber-100"
    },
    {
      title: "سابقة الأعمال والمشاريع",
      value: (stats == null ? void 0 : stats.works) ?? 0,
      icon: Briefcase,
      href: "/admin/works",
      colorClass: "text-brand-600 bg-brand-50 border-brand-100"
    },
    {
      title: "شركاء النجاح",
      value: (stats == null ? void 0 : stats.partners) ?? 0,
      icon: Handshake,
      href: "/admin/partners",
      colorClass: "text-purple-600 bg-purple-50 border-purple-100"
    },
    {
      title: "طلبات الأسعار الجديدة",
      value: (stats == null ? void 0 : stats.newMessages) ?? 0,
      icon: Inbox,
      href: "/admin/messages",
      colorClass: ((stats == null ? void 0 : stats.newMessages) ?? 0) > 0 ? "text-rose-600 bg-rose-50 border-rose-200" : "text-slate-600 bg-slate-50 border-slate-200"
    }
  ];
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: `مرحباً بك، ${(profile == null ? void 0 : profile.full_name) || "مسؤول النظام"}`,
        description: "نظرة عامة على حالة الموقع والمحتوى والرسائل الواردة."
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8", children: statCards.map((card) => {
      const Icon = card.icon;
      return /* @__PURE__ */ jsxs(
        Link,
        {
          to: card.href,
          className: "bg-white p-5 rounded-card border border-surface-border shadow-2xs hover:shadow-card-hover transition-all flex flex-col justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-content-muted leading-tight", children: card.title }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-9 h-9 rounded-control flex items-center justify-center border ${card.colorClass}`,
                  children: /* @__PURE__ */ jsx(Icon, { className: "w-4 h-4", "aria-hidden": "true" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("span", { className: "text-2xl font-black text-content-heading block tracking-tight", children: isStatsLoading ? /* @__PURE__ */ jsx("span", { className: "inline-block w-8 h-6 bg-surface-border rounded animate-pulse" }) : card.value }) })
          ]
        },
        card.title
      );
    }) }),
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-surface-border p-6 shadow-xs flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-surface-border mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(FileEdit, { className: "w-4 h-4 text-amber-600" }),
            /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-content-heading", children: "أحدث المسودات قيد الإعداد" })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/admin/posts",
              className: "text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsx("span", { children: "كافة المقالات" }),
                /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: isDraftsLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-3 py-2", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-10 bg-surface-border/50 rounded animate-pulse"
          },
          i
        )) }) : lastDrafts && lastDrafts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-surface-border-subtle", children: lastDrafts.map((draft) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "py-3 flex items-center justify-between gap-4 hover:bg-surface-soft/40 px-2 -mx-2 rounded transition-colors",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    to: `/admin/posts/${draft.id}`,
                    className: "font-bold text-xs text-content-heading hover:text-brand-600 truncate block mb-1",
                    children: draft.title || "مسودة بدون عنوان"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-[11px] text-content-muted", children: [
                  /* @__PURE__ */ jsx(StatusBadge, { status: draft.lang }),
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
                    /* @__PURE__ */ jsx(Calendar, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsx("span", { children: draft.updated_at ? new Date(draft.updated_at).toLocaleDateString(
                      "ar-SA"
                    ) : "" })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: `/admin/posts/${draft.id}`,
                  className: "text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0",
                  children: "تحرير"
                }
              )
            ]
          },
          draft.id
        )) }) : /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-xs text-content-muted", children: "لا توجد مسودات حالياً. كافة المقالات منشورة أو يمكنك بدء كتابة مقال جديد." }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-surface-border p-6 shadow-xs flex flex-col", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-surface-border mb-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Inbox, { className: "w-4 h-4 text-brand-600" }),
            /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-content-heading", children: "أحدث طلبات عروض الأسعار" })
          ] }),
          /* @__PURE__ */ jsxs(
            Link,
            {
              to: "/admin/messages",
              className: "text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1",
              children: [
                /* @__PURE__ */ jsx("span", { children: "كافة الطلبات" }),
                /* @__PURE__ */ jsx(ArrowLeft, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: isMessagesLoading ? /* @__PURE__ */ jsx("div", { className: "space-y-3 py-2", children: Array.from({ length: 3 }).map((_, i) => /* @__PURE__ */ jsx(
          "div",
          {
            className: "h-10 bg-surface-border/50 rounded animate-pulse"
          },
          i
        )) }) : lastMessages && lastMessages.length > 0 ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-surface-border-subtle", children: lastMessages.map((msg) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: "py-3 flex items-center justify-between gap-4 hover:bg-surface-soft/40 px-2 -mx-2 rounded transition-colors",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-xs text-content-heading truncate", children: msg.name }),
                  /* @__PURE__ */ jsx(StatusBadge, { status: msg.status })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-[11px] text-content-muted", children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", dir: "ltr", children: [
                    /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3" }),
                    /* @__PURE__ */ jsx("span", { children: msg.phone })
                  ] }),
                  msg.service_interest && /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
                    "الخدمة: ",
                    msg.service_interest
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsx(
                Link,
                {
                  to: "/admin/messages",
                  className: "text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0",
                  children: "عرض"
                }
              )
            ]
          },
          msg.id
        )) }) : /* @__PURE__ */ jsx("div", { className: "py-8 text-center text-xs text-content-muted", children: "لا توجد طلبات واردة حتى الآن." }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-surface-border p-6 shadow-xs", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-4 border-b border-surface-border mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { className: "w-4 h-4 text-feedback-warning" }),
          /* @__PURE__ */ jsx("h2", { className: "text-base font-bold text-content-heading", children: "مقالات بحاجة لتحسين محركات البحث (SEO < 50)" })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-content-muted", children: "نظام التحليل التلقائي" })
      ] }),
      isSeoLoading ? /* @__PURE__ */ jsx("div", { className: "h-12 bg-surface-border/50 rounded animate-pulse" }) : lowSeoPosts && lowSeoPosts.length > 0 ? /* @__PURE__ */ jsx("div", { className: "divide-y divide-surface-border-subtle", children: lowSeoPosts.map((post) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: "py-3 flex items-center justify-between gap-4",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
              /* @__PURE__ */ jsx(StatusBadge, { seoScore: post.seo_score }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-content-heading truncate", children: post.title }),
              /* @__PURE__ */ jsx(StatusBadge, { status: post.lang })
            ] }),
            /* @__PURE__ */ jsx(
              Link,
              {
                to: `/admin/posts/${post.id}`,
                className: "text-xs font-semibold text-brand-600 hover:text-brand-700 shrink-0",
                children: "فحص وتحسين"
              }
            )
          ]
        },
        post.id
      )) }) : /* @__PURE__ */ jsx("div", { className: "py-6 text-center text-xs text-content-muted", children: "ممتاز! لا توجد مقالات ذات درجة SEO منخفضة تحتاج إلى تدخل." })
    ] })
  ] });
};
export {
  DashboardPage
};
