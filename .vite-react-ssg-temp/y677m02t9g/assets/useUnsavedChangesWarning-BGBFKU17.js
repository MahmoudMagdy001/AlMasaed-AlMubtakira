var _a;
import { useEffect } from "react";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/hooks/useUnsavedChangesWarning.ts");
function useUnsavedChangesWarning(isDirty, message = "لديك تعديلات غير محفوظة. هل أنت متأكد من مغادرة الصفحة دون حفظ؟") {
  useEffect(() => {
    if (!isDirty) return;
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty, message]);
}
export {
  useUnsavedChangesWarning as u
};
