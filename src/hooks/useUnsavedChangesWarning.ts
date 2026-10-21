import { useEffect } from 'react'

export function useUnsavedChangesWarning(
  isDirty: boolean,
  message = 'لديك تعديلات غير محفوظة. هل أنت متأكد من مغادرة الصفحة دون حفظ؟',
) {
  useEffect(() => {
    if (!isDirty) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = message
      return message
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty, message])
}
