var _a;
import { jsxs, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Download, Search, Inbox, Phone, MessageCircle, Eye, Trash2, Clock, Globe, Mail, FileText, Save } from "lucide-react";
import { P as PageHeader, C as ConfirmDialog } from "./index-6EXxYG9x.js";
import { u as useToast, B as Button, D as Dialog } from "../main.mjs";
import { a as useAdminMessages, u as useUnreadMessagesCount, b as useUpdateMessageStatus, c as useUpdateMessageNotes, d as useDeleteMessage, f as formatTelUrl, e as formatWhatsAppUrl, S as STATUS_LABELS, g as exportSubmissionsToCsv } from "./useAdminMessages-DQocuplq.js";
import "react-router-dom";
import "@tanstack/react-query";
import "vite-react-ssg";
import "react-i18next";
import "@supabase/supabase-js";
import "gsap";
import "gsap/ScrollTrigger";
import "@gsap/react";
import "react-hook-form";
import "zod";
import "i18next";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/admin/messages/MessagesPage.tsx");
const MessagesPage = () => {
  const { success, error: toastError } = useToast();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [viewingMessage, setViewingMessage] = useState(null);
  const [deletingMessage, setDeletingMessage] = useState(null);
  const [notesText, setNotesText] = useState("");
  const { data, isLoading } = useAdminMessages({
    status: statusFilter,
    search: search || void 0,
    page,
    limit: 20
  });
  const { data: unreadCount = 0 } = useUnreadMessagesCount();
  const statusMutation = useUpdateMessageStatus();
  const notesMutation = useUpdateMessageNotes();
  const deleteMutation = useDeleteMessage();
  const messages = (data == null ? void 0 : data.messages) || [];
  const total = (data == null ? void 0 : data.total) || 0;
  const totalPages = Math.ceil(total / 20) || 1;
  const handleOpenDetails = (msg) => {
    setViewingMessage(msg);
    setNotesText(msg.notes || "");
  };
  const handleStatusChange = async (msg, newStatus) => {
    try {
      await statusMutation.mutateAsync({ id: msg.id, status: newStatus });
      success("تم تحديث حالة الرسالة بنجاح");
      if (viewingMessage && viewingMessage.id === msg.id) {
        setViewingMessage({ ...viewingMessage, status: newStatus });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل تعديل الحالة", errorMsg);
    }
  };
  const handleSaveNotes = async () => {
    if (!viewingMessage) return;
    try {
      await notesMutation.mutateAsync({ id: viewingMessage.id, notes: notesText });
      success("تم حفظ الملاحظات بنجاح");
      setViewingMessage({ ...viewingMessage, notes: notesText });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حفظ الملاحظات", errorMsg);
    }
  };
  const handleDeleteConfirm = async () => {
    if (!deletingMessage) return;
    try {
      await deleteMutation.mutateAsync(deletingMessage.id);
      success("تم حذف الرسالة بنجاح");
      setDeletingMessage(null);
      if (viewingMessage && viewingMessage.id === deletingMessage.id) {
        setViewingMessage(null);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "حدث خطأ";
      toastError("فشل حذف الرسالة", errorMsg);
    }
  };
  const handleExportCsv = () => {
    if (messages.length === 0) {
      toastError("لا توجد رسائل لتصديرها");
      return;
    }
    exportSubmissionsToCsv(messages);
    success("تم تصدير ملف الرسائل (CSV) بنجاح");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx(
      PageHeader,
      {
        title: "طلبات الأسعار والرسائل",
        description: "متابعة استفسارات العملاء وطلبات عروض أسعار صيانة وتركيب وتحديث المصاعد.",
        backTo: "/admin",
        backLabel: "الرئيسية",
        actions: /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: handleExportCsv,
            disabled: messages.length === 0,
            className: "gap-2",
            children: [
              /* @__PURE__ */ jsx(Download, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx("span", { children: "تصدير CSV" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "bg-white p-4 rounded-card border border-surface-border shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5 w-full md:w-auto", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setStatusFilter("all");
              setPage(1);
            },
            className: `px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${statusFilter === "all" ? "bg-brand-600 text-white" : "text-content-body hover:bg-surface-soft"}`,
            children: [
              "الكل (",
              total,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => {
              setStatusFilter("new");
              setPage(1);
            },
            className: `inline-flex items-center gap-1.5 px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${statusFilter === "new" ? "bg-brand-600 text-white" : "text-content-body hover:bg-surface-soft"}`,
            children: [
              /* @__PURE__ */ jsx("span", { children: "جديد" }),
              unreadCount > 0 && /* @__PURE__ */ jsx(
                "span",
                {
                  className: `px-1.5 py-0.2 rounded-full text-[10px] font-bold ${statusFilter === "new" ? "bg-white text-brand-600" : "bg-brand-100 text-brand-700"}`,
                  children: unreadCount
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setStatusFilter("contacted");
              setPage(1);
            },
            className: `px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${statusFilter === "contacted" ? "bg-brand-600 text-white" : "text-content-body hover:bg-surface-soft"}`,
            children: "تم التواصل"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setStatusFilter("closed");
              setPage(1);
            },
            className: `px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${statusFilter === "closed" ? "bg-brand-600 text-white" : "text-content-body hover:bg-surface-soft"}`,
            children: "مغلق"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setStatusFilter("spam");
              setPage(1);
            },
            className: `px-3 py-1.5 rounded-control text-xs font-semibold transition-colors ${statusFilter === "spam" ? "bg-brand-600 text-white" : "text-content-body hover:bg-surface-soft"}`,
            children: "بريد عشوائي"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-72", children: [
        /* @__PURE__ */ jsx(Search, { className: "w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-content-muted" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "search",
            value: search,
            onChange: (e) => {
              setSearch(e.target.value);
              setPage(1);
            },
            placeholder: "البحث بالاسم أو الجوال أو البريد...",
            className: "w-full ps-9 pe-4 py-2 text-xs border border-surface-border rounded-control focus:outline-none focus:border-brand-600 bg-surface-soft/40"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card border border-surface-border overflow-hidden shadow-xs", children: [
      isLoading ? /* @__PURE__ */ jsx("div", { className: "p-12 text-center text-content-muted text-sm", children: "جاري تحميل الرسائل والطلبات..." }) : messages.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "p-12 text-center space-y-3", children: [
        /* @__PURE__ */ jsx(Inbox, { className: "w-10 h-10 text-content-muted mx-auto" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-content-heading", children: "لا توجد رسائل مطابقة" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-content-muted max-w-sm mx-auto", children: "لم تصل أي رسائل جديدة بعد ضمن هذا القسم. ستظهر هنا استفسارات وطلبات عروض الأسعار المقدمة عبر نماذج التواصل." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-start text-xs border-collapse", children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-surface-soft border-b border-surface-border text-content-muted font-bold text-start", children: [
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 w-28", children: "التاريخ" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "العميل" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "التواصل السريع" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4", children: "الخدمة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 max-w-xs", children: "نص الرسالة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "الحالة" }),
          /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-end", children: "إجراءات" })
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-surface-border", children: messages.map((msg) => {
          var _a2;
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              className: `hover:bg-surface-soft/40 transition-colors ${msg.status === "new" ? "bg-brand-50/20 font-semibold" : ""}`,
              children: [
                /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 whitespace-nowrap text-content-muted text-[11px]", children: [
                  new Date(msg.created_at).toLocaleDateString("ar-SA", {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                  }),
                  /* @__PURE__ */ jsx("span", { className: "block text-[10px] text-content-muted/80", children: new Date(msg.created_at).toLocaleTimeString("ar-SA", {
                    hour: "2-digit",
                    minute: "2-digit"
                  }) })
                ] }),
                /* @__PURE__ */ jsxs("td", { className: "py-3 px-4 whitespace-nowrap", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-content-heading block text-xs", children: msg.name }),
                  msg.email && /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block", dir: "ltr", children: msg.email })
                ] }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxs(
                    "a",
                    {
                      href: formatTelUrl(msg.phone),
                      className: "inline-flex items-center gap-1 px-2 py-1 rounded-control bg-surface-soft hover:bg-brand-50 hover:text-brand-600 text-content-heading transition-colors border border-surface-border",
                      title: "اتصال هاتفي مباشر",
                      children: [
                        /* @__PURE__ */ jsx(Phone, { className: "w-3 h-3 text-brand-600" }),
                        /* @__PURE__ */ jsx("span", { dir: "ltr", className: "text-[11px] font-mono", children: msg.phone })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "a",
                    {
                      href: formatWhatsAppUrl(msg.phone),
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "p-1 rounded-control bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors border border-emerald-200",
                      title: "محادثة واتساب",
                      "aria-label": "واتساب",
                      children: /* @__PURE__ */ jsx(MessageCircle, { className: "w-3.5 h-3.5" })
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 whitespace-nowrap", children: /* @__PURE__ */ jsx("span", { className: "inline-block px-2 py-0.5 rounded-full text-[11px] font-medium bg-surface-soft text-content-heading border border-surface-border", children: msg.service_interest || "استفسار عام" }) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 max-w-xs", children: /* @__PURE__ */ jsx(
                  "p",
                  {
                    onClick: () => handleOpenDetails(msg),
                    className: "truncate text-content-body hover:text-brand-600 cursor-pointer text-xs",
                    title: msg.message,
                    children: msg.message
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-center whitespace-nowrap", children: /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: msg.status,
                    onChange: (e) => handleStatusChange(msg, e.target.value),
                    "aria-label": "تغيير حالة الرسالة",
                    className: `text-[11px] font-bold rounded-full px-2.5 py-1 border focus:outline-none cursor-pointer ${((_a2 = STATUS_LABELS[msg.status]) == null ? void 0 : _a2.color) || ""}`,
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "new", children: "جديد" }),
                      /* @__PURE__ */ jsx("option", { value: "contacted", children: "تم التواصل" }),
                      /* @__PURE__ */ jsx("option", { value: "closed", children: "مغلق ومكتمل" }),
                      /* @__PURE__ */ jsx("option", { value: "spam", children: "بريد عشوائي" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("td", { className: "py-3 px-4 text-end whitespace-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleOpenDetails(msg),
                      className: "p-1.5 rounded-control text-content-muted hover:text-brand-600 hover:bg-surface-soft transition-colors",
                      title: "عرض التفاصيل والملاحظات",
                      "aria-label": "عرض التفاصيل",
                      children: /* @__PURE__ */ jsx(Eye, { className: "w-4 h-4" })
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setDeletingMessage(msg),
                      className: "p-1.5 rounded-control text-content-muted hover:text-feedback-error hover:bg-feedback-error/10 transition-colors",
                      title: "حذف الرسالة",
                      "aria-label": "حذف",
                      children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                    }
                  )
                ] }) })
              ]
            },
            msg.id
          );
        }) })
      ] }) }),
      totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "p-4 border-t border-surface-border flex items-center justify-between text-xs text-content-muted", children: [
        /* @__PURE__ */ jsxs("span", { children: [
          "إجمالي الرسائل: ",
          /* @__PURE__ */ jsx("strong", { children: total }),
          " (صفحة ",
          page,
          " من ",
          totalPages,
          ")"
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setPage((p) => Math.max(1, p - 1)),
              disabled: page <= 1,
              children: "السابق"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
              disabled: page >= totalPages,
              children: "التالي"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        isOpen: Boolean(viewingMessage),
        onClose: () => setViewingMessage(null),
        title: "تفاصيل طلب التواصل",
        maxWidth: "lg",
        children: viewingMessage && /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-control bg-surface-soft border border-surface-border text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block", children: "اسم العميل:" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-content-heading text-sm", children: viewingMessage.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block", children: "تاريخ الإرسال:" }),
              /* @__PURE__ */ jsxs("span", { className: "text-content-heading flex items-center gap-1.5 font-medium", children: [
                /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5 text-content-muted" }),
                new Date(viewingMessage.created_at).toLocaleString("ar-SA")
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block", children: "نوع الخدمة المطلوبة:" }),
              /* @__PURE__ */ jsx("span", { className: "font-bold text-brand-600", children: viewingMessage.service_interest || "استفسار عام" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted block", children: "صفحة المصدر:" }),
              /* @__PURE__ */ jsxs("span", { className: "text-content-heading flex items-center gap-1.5", dir: "ltr", children: [
                /* @__PURE__ */ jsx(Globe, { className: "w-3.5 h-3.5 text-content-muted" }),
                viewingMessage.source_page || "/contact"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: formatTelUrl(viewingMessage.phone),
                className: "inline-flex items-center gap-2 px-3 py-2 rounded-control bg-brand-50 text-brand-700 hover:bg-brand-100 text-xs font-bold transition-colors border border-brand-200",
                children: [
                  /* @__PURE__ */ jsx(Phone, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    "اتصال هاتفياً (",
                    viewingMessage.phone,
                    ")"
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: formatWhatsAppUrl(viewingMessage.phone),
                target: "_blank",
                rel: "noopener noreferrer",
                className: "inline-flex items-center gap-2 px-3 py-2 rounded-control bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors border border-emerald-200",
                children: [
                  /* @__PURE__ */ jsx(MessageCircle, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "محادثة واتساب" })
                ]
              }
            ),
            viewingMessage.email && /* @__PURE__ */ jsxs(
              "a",
              {
                href: `mailto:${viewingMessage.email}`,
                className: "inline-flex items-center gap-2 px-3 py-2 rounded-control bg-surface-soft text-content-heading hover:bg-surface-border/60 text-xs font-bold transition-colors border border-surface-border",
                children: [
                  /* @__PURE__ */ jsx(Mail, { className: "w-4 h-4" }),
                  /* @__PURE__ */ jsx("span", { children: "إرسال بريد إلكتروني" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-content-heading block", children: "نص الرسالة أو تفاصيل الطلب:" }),
            /* @__PURE__ */ jsx("div", { className: "p-4 rounded-control bg-white border border-surface-border text-xs text-content-body leading-relaxed whitespace-pre-wrap select-text", children: viewingMessage.message })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-2 border-t border-surface-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxs("span", { className: "text-xs font-bold text-content-heading flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx(FileText, { className: "w-4 h-4 text-brand-600" }),
                /* @__PURE__ */ jsx("span", { children: "ملاحظات فريق العمل الداخلية (غير مرئية للعميل)" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[11px] text-content-muted", children: "سجل ملخص المكالمة أو عروض الأسعار المقدمة" })
            ] }),
            /* @__PURE__ */ jsx(
              "textarea",
              {
                rows: 3,
                value: notesText,
                onChange: (e) => setNotesText(e.target.value),
                placeholder: "أدخل ملاحظات المتابعة هنا...",
                className: "w-full text-xs p-2.5 rounded-control border border-surface-border bg-white text-content-heading focus:outline-none focus:border-brand-600 leading-relaxed"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs(
              Button,
              {
                type: "button",
                variant: "secondary",
                size: "sm",
                onClick: handleSaveNotes,
                isLoading: notesMutation.isPending,
                className: "gap-1.5",
                children: [
                  /* @__PURE__ */ jsx(Save, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsx("span", { children: "حفظ الملاحظات" })
                ]
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-surface-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-content-muted", children: "الحالة:" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: viewingMessage.status,
                  onChange: (e) => handleStatusChange(viewingMessage, e.target.value),
                  "aria-label": "تغيير حالة الرسالة",
                  className: "text-xs border border-surface-border rounded-control py-1 px-2.5 bg-white text-content-heading",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "new", children: "جديد" }),
                    /* @__PURE__ */ jsx("option", { value: "contacted", children: "تم التواصل" }),
                    /* @__PURE__ */ jsx("option", { value: "closed", children: "مغلق ومكتمل" }),
                    /* @__PURE__ */ jsx("option", { value: "spam", children: "بريد عشوائي" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "sm",
                onClick: () => setViewingMessage(null),
                children: "إغلاق"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        isOpen: Boolean(deletingMessage),
        onClose: () => setDeletingMessage(null),
        onConfirm: handleDeleteConfirm,
        title: "تأكيد حذف الرسالة",
        description: `هل أنت متأكد من رغبتك في حذف رسالة العميل "${deletingMessage == null ? void 0 : deletingMessage.name}" نهائياً من قاعدة البيانات؟`,
        confirmText: "حذف الرسالة",
        cancelText: "إلغاء",
        isLoading: deleteMutation.isPending
      }
    )
  ] });
};
export {
  MessagesPage
};
