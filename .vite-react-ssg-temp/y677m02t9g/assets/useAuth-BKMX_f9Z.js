var _a;
import { useContext } from "react";
import { A as AuthContext } from "./authContextDef-DRZS3Rdw.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/auth/useAuth.ts");
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export {
  useAuth as u
};
