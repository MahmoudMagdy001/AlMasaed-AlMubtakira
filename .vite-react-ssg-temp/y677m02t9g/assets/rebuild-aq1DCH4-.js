var _a;
import { s as supabase } from "../main.mjs";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/lib/rebuild.ts");
const REBUILD_NOTICE = "سيتم تطبيق التعديلات على الموقع العام خلال 1-2 دقيقة (عند اكتمال إعادة البناء تلقائياً).";
async function requestRebuild(reason = "content-update") {
  try {
    const { data, error } = await supabase.functions.invoke("trigger-rebuild", {
      body: { reason }
    });
    if (error) {
      return {
        success: true,
        triggered: false,
        message: REBUILD_NOTICE
      };
    }
    return {
      success: true,
      triggered: Boolean(data == null ? void 0 : data.triggered),
      message: REBUILD_NOTICE
    };
  } catch {
    return {
      success: true,
      triggered: false,
      message: REBUILD_NOTICE
    };
  }
}
export {
  REBUILD_NOTICE as R,
  requestRebuild as r
};
