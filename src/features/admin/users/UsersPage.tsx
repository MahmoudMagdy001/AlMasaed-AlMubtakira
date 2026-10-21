import React, { useState } from 'react'
import {
  Shield,
  ShieldAlert,
  User,
  Info,
  ExternalLink,
} from 'lucide-react'
import { PageHeader, ConfirmDialog, StatusBadge } from '@/components/admin'
import { useToast } from '@/components/ui'
import { useAuth } from '@/features/auth'
import {
  useAdminProfiles,
  useUpdateUserRole,
} from '@/features/users/useAdminUsers'
import {
  ROLE_LABELS,
  type UserProfileRow,
  type UserRole,
} from '@/features/users/usersAdminService'

export const UsersPage: React.FC = () => {
  const { user: currentUser, isAdmin } = useAuth()
  const { success, error: toastError } = useToast()

  const { data: profiles = [], isLoading } = useAdminProfiles()
  const updateRoleMutation = useUpdateUserRole()

  const [roleChangeTarget, setRoleChangeTarget] = useState<{
    profile: UserProfileRow
    newRole: UserRole
  } | null>(null)

  if (!isAdmin) {
    return (
      <div className="bg-white rounded-card border border-feedback-error/20 p-12 text-center max-w-xl mx-auto space-y-4">
        <ShieldAlert className="w-12 h-12 text-feedback-error mx-auto" />
        <h2 className="text-base font-bold text-content-heading">
          غير مصرح لك بالوصول إلى هذه الصفحة
        </h2>
        <p className="text-xs text-content-muted leading-relaxed">
          إدارة فريق العمل وتعديل الصلاحيات مقتصرة حصرياً على مستخدمي النظام بصلاحية المسؤول (Admin).
        </p>
      </div>
    )
  }

  const handleRoleSelect = (profile: UserProfileRow, newRole: UserRole) => {
    if (profile.role === newRole) return

    // Show confirm dialog if demoting an admin or changing own role
    if (profile.role === 'admin' || profile.id === currentUser?.id) {
      setRoleChangeTarget({ profile, newRole })
      return
    }

    applyRoleUpdate(profile.id, newRole)
  }

  const applyRoleUpdate = async (userId: string, newRole: UserRole) => {
    try {
      await updateRoleMutation.mutateAsync({ userId, role: newRole })
      success('تم تحديث صلاحية المستخدم بنجاح')
      setRoleChangeTarget(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'حدث خطأ'
      toastError('فشل تحديث الصلاحية', msg)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="فريق العمل وصلاحيات المستخدمين"
        description="إدارة حسابات موظفي ومحرري لوحة التحكم وتعيين صلاحيات الوصول ومستويات الإدارة."
        backTo="/admin"
        backLabel="الرئيسية"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profiles Table (2 Cols) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-card border border-surface-border overflow-hidden shadow-xs">
            <div className="p-4 border-b border-surface-border flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-content-heading">حسابات فريق العمل</h2>
                <span className="text-[11px] text-content-muted">
                  إجمالي الحسابات المسجلة: {profiles.length}
                </span>
              </div>
            </div>

            {isLoading ? (
              <div className="p-12 text-center text-content-muted text-sm">
                جاري تحميل قائمة المستخدمين...
              </div>
            ) : profiles.length === 0 ? (
              <div className="p-12 text-center text-content-muted text-xs">
                لا يوجد مستخدمين مسجلين حالياً.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-start text-xs border-collapse">
                  <thead>
                    <tr className="bg-surface-soft border-b border-surface-border text-content-muted font-bold text-start">
                      <th className="py-3 px-4">المستخدم</th>
                      <th className="py-3 px-4">تاريخ التسجيل</th>
                      <th className="py-3 px-4">الصلاحية الحالية</th>
                      <th className="py-3 px-4 text-end">تغيير الصلاحية</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-surface-border">
                    {profiles.map((profile) => {
                      const isSelf = profile.id === currentUser?.id

                      return (
                        <tr
                          key={profile.id}
                          className="hover:bg-surface-soft/40 transition-colors"
                        >
                          {/* User info */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-brand-900 text-white flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden">
                                {profile.avatar_url ? (
                                  <img
                                    src={profile.avatar_url}
                                    alt={profile.full_name || ''}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <User className="w-4 h-4" />
                                )}
                              </div>

                              <div className="min-w-0">
                                <span className="font-bold text-content-heading block text-xs truncate">
                                  {profile.full_name || 'مستخدم لوحة التحكم'}
                                  {isSelf && (
                                    <span className="ms-1.5 text-[10px] font-semibold text-brand-600 bg-brand-50 px-1.5 py-0.2 rounded-sm">
                                      (حسابك الحالي)
                                    </span>
                                  )}
                                </span>
                                <span className="text-[10px] text-content-muted font-mono block truncate" dir="ltr">
                                  {profile.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Created date */}
                          <td className="py-3 px-4 whitespace-nowrap text-content-muted text-[11px]">
                            {new Date(profile.created_at).toLocaleDateString('ar-SA')}
                          </td>

                          {/* Current Role Badge */}
                          <td className="py-3 px-4 whitespace-nowrap">
                            <StatusBadge status={profile.role} />
                          </td>

                          {/* Role change dropdown */}
                          <td className="py-3 px-4 text-end whitespace-nowrap">
                            <select
                              value={profile.role}
                              onChange={(e) =>
                                handleRoleSelect(profile, e.target.value as UserRole)
                              }
                              disabled={updateRoleMutation.isPending}
                              aria-label="تحديد صلاحية المستخدم"
                              className="text-xs border border-surface-border rounded-control py-1 px-2.5 bg-white text-content-heading focus:outline-none focus:border-brand-600 cursor-pointer font-medium"
                            >
                              <option value="admin">مسؤول نظام (Admin)</option>
                              <option value="editor">محرّر محتوى (Editor)</option>
                              <option value="none">معطّل (بلا وصول)</option>
                            </select>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Instructions / Invitation Guide (1 Col) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-card border border-surface-border shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-surface-border text-brand-600">
              <Info className="w-5 h-5 shrink-0" />
              <h2 className="text-sm font-bold text-content-heading">
                كيفية دعوة مستخدم جديد
              </h2>
            </div>

            <p className="text-xs text-content-body leading-relaxed">
              وفقاً لمعايير الأمان المعتمدة في هذا المشروع، يتم إرسال دعوات التسجيل الرسمية من خلال لوحة تحكم Supabase لحماية النظام من أي تسجيل غير مصرّح به:
            </p>

            <ol className="space-y-3 text-xs text-content-body list-decimal list-inside">
              <li className="leading-relaxed">
                <span className="font-bold">سجّل الدخول</span> إلى مشروعك في Supabase Dashboard.
              </li>
              <li className="leading-relaxed">
                انتقل إلى قسم <strong>Authentication</strong> ثم اضغط على تبويب <strong>Users</strong>.
              </li>
              <li className="leading-relaxed">
                اضغط على زر <strong>Add User</strong> واختر <strong>Send Invite</strong>.
              </li>
              <li className="leading-relaxed">
                أدخل البريد الإلكتروني للموظف. سيتلقى رابطاً آمناً لتعيين كلمة المرور الخاصة به.
              </li>
              <li className="leading-relaxed">
                بمجرد تسجيل دخوله، سيظهر حسابه تلقائياً في هذه القائمة، حيث يمكنك ترقيته إلى <strong>محرّر محتوى (Editor)</strong> أو <strong>مسؤول نظام (Admin)</strong>.
              </li>
            </ol>

            <div className="pt-2">
              <a
                href="https://supabase.com/dashboard/project/flkydlhewzezfomfjrvi/auth/users"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-control text-xs font-bold text-brand-700 bg-brand-50 hover:bg-brand-100 border border-brand-200 transition-colors"
              >
                <span>فتح لوحة Supabase لإرسال دعوة</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Role definitions card */}
          <div className="bg-surface-soft p-5 rounded-card border border-surface-border space-y-3">
            <h3 className="text-xs font-bold text-content-heading flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-600" />
              <span>مستويات الصلاحيات المتاحة</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div>
                <p className="font-bold text-brand-700">مسؤول النظام (Admin):</p>
                <p className="text-[11px] text-content-muted leading-relaxed">
                  تحكم كامل بجميع أقسام لوحة الإدارة، وإدارة المستخدمين، وحذف السجلات، وإعدادات الموقع.
                </p>
              </div>

              <div>
                <p className="font-bold text-emerald-700">محرّر المحتوى (Editor):</p>
                <p className="text-[11px] text-content-muted leading-relaxed">
                  إدارة المقالات، وتوثيق المشاريع وسابقة الأعمال، وتعديل الشركاء ومكتبة الصور، ومتابعة رسائل العملاء. لا يمكنه دخول الإعدادات أو إدارة المستخدمين.
                </p>
              </div>

              <div>
                <p className="font-bold text-feedback-error">معطّل (None):</p>
                <p className="text-[11px] text-content-muted leading-relaxed">
                  الحساب مسجل في النظام ولكنه ممنوع تماماً من الوصول إلى أي بيانات في لوحة الإدارة.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Change Confirmation Dialog */}
      <ConfirmDialog
        isOpen={Boolean(roleChangeTarget)}
        onClose={() => setRoleChangeTarget(null)}
        onConfirm={() => {
          if (roleChangeTarget) {
            applyRoleUpdate(roleChangeTarget.profile.id, roleChangeTarget.newRole)
          }
        }}
        title="تأكيد تغيير الصلاحية"
        description={`هل أنت متأكد من تغيير صلاحية المستخدم "${roleChangeTarget?.profile.full_name || roleChangeTarget?.profile.id}" إلى "${ROLE_LABELS[roleChangeTarget?.newRole || 'none']?.ar}"؟`}
        confirmText="تأكيد التغيير"
        cancelText="إلغاء"
        isDestructive={roleChangeTarget?.newRole === 'none'}
        isLoading={updateRoleMutation.isPending}
      />
    </div>
  )
}
