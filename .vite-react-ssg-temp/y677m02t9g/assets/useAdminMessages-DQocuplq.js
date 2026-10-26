var _a, _b;
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { s as supabase } from "../main.mjs";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/contact/messagesAdminService.ts");
const STATUS_LABELS = {
  new: { ar: "جديد", color: "bg-brand-50 text-brand-700 border-brand-200" },
  contacted: { ar: "تم التواصل", color: "bg-purple-50 text-purple-700 border-purple-200" },
  closed: { ar: "مغلق ومكتمل", color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  spam: { ar: "بريد عشوائي", color: "bg-rose-50 text-rose-700 border-rose-200" }
};
async function getAdminMessages(params = {}) {
  const { status = "all", search, page = 1, limit = 20 } = params;
  let query = supabase.from("contact_submissions").select("*", { count: "exact" });
  if (status && status !== "all") {
    query = query.eq("status", status);
  }
  if (search) {
    const s = `%${search.trim()}%`;
    query = query.or(`name.ilike.${s},phone.ilike.${s},email.ilike.${s},message.ilike.${s}`);
  }
  const offset = (page - 1) * limit;
  query = query.order("created_at", { ascending: false }).range(offset, offset + limit - 1);
  const { data, count, error } = await query;
  if (error) {
    throw new Error(`فشل تحميل الرسائل: ${error.message}`);
  }
  return {
    messages: data || [],
    total: count ?? 0
  };
}
async function getUnreadMessagesCount() {
  const { count, error } = await supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("status", "new");
  if (error) {
    return 0;
  }
  return count ?? 0;
}
async function updateMessageStatus(id, status) {
  const { data, error } = await supabase.from("contact_submissions").update({ status }).eq("id", id).select().single();
  if (error || !data) {
    throw new Error(`فشل تعديل حالة الرسالة: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  return data;
}
async function updateMessageNotes(id, notes) {
  const { data, error } = await supabase.from("contact_submissions").update({ notes }).eq("id", id).select().single();
  if (error || !data) {
    throw new Error(`فشل حفظ الملاحظات: ${(error == null ? void 0 : error.message) || "خطأ غير معروف"}`);
  }
  return data;
}
async function deleteMessage(id) {
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) {
    throw new Error(`فشل حذف الرسالة: ${error.message}`);
  }
}
function formatWhatsAppUrl(phone) {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("05")) {
    digits = "966" + digits.slice(1);
  } else if (digits.startsWith("5") && digits.length === 9) {
    digits = "966" + digits;
  }
  return `https://wa.me/${digits}`;
}
function formatTelUrl(phone) {
  return `tel:${phone.replace(/\s+/g, "")}`;
}
function exportSubmissionsToCsv(submissions) {
  const headers = [
    "معرف الرسالة",
    "تاريخ الإرسال",
    "الاسم الكامل",
    "رقم الجوال",
    "البريد الإلكتروني",
    "نوع الخدمة المطلوبة",
    "نص الرسالة",
    "الحالة",
    "صفحة المصدر",
    "ملاحظات الإدارة"
  ];
  const escapeCsv = (val) => {
    if (val === null || val === void 0) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };
  const rows = submissions.map((sub) => {
    var _a2;
    return [
      escapeCsv(sub.id),
      escapeCsv(new Date(sub.created_at).toLocaleString("ar-SA")),
      escapeCsv(sub.name),
      escapeCsv(sub.phone),
      escapeCsv(sub.email || ""),
      escapeCsv(sub.service_interest || ""),
      escapeCsv(sub.message),
      escapeCsv(((_a2 = STATUS_LABELS[sub.status]) == null ? void 0 : _a2.ar) || sub.status),
      escapeCsv(sub.source_page || ""),
      escapeCsv(sub.notes || "")
    ];
  });
  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `contact-submissions-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
(_b = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _b.call(globalThis, "src/features/contact/useAdminMessages.ts");
function useAdminMessages(params = {}) {
  return useQuery({
    queryKey: ["admin_messages", params],
    queryFn: () => getAdminMessages(params),
    staleTime: 1e3 * 30
  });
}
function useUnreadMessagesCount() {
  return useQuery({
    queryKey: ["unread_messages_count"],
    queryFn: () => getUnreadMessagesCount(),
    staleTime: 1e3 * 30,
    // 30 seconds
    refetchInterval: 1e3 * 60
    // Poll every minute for new customer inquiries
  });
}
function useUpdateMessageStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }) => updateMessageStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_messages"] });
      queryClient.invalidateQueries({ queryKey: ["unread_messages_count"] });
    }
  });
}
function useUpdateMessageNotes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, notes }) => updateMessageNotes(id, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_messages"] });
    }
  });
}
function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteMessage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin_messages"] });
      queryClient.invalidateQueries({ queryKey: ["unread_messages_count"] });
    }
  });
}
export {
  STATUS_LABELS as S,
  useAdminMessages as a,
  useUpdateMessageStatus as b,
  useUpdateMessageNotes as c,
  useDeleteMessage as d,
  formatWhatsAppUrl as e,
  formatTelUrl as f,
  exportSubmissionsToCsv as g,
  useUnreadMessagesCount as u
};
