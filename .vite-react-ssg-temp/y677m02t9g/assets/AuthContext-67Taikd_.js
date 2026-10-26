var _a;
import { jsx } from "react/jsx-runtime";
import { useState, useCallback, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { s as supabase } from "../main.mjs";
import { A as AuthContext } from "./authContextDef-DRZS3Rdw.js";
(_a = globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__) == null ? void 0 : _a.call(globalThis, "src/features/auth/AuthContext.tsx");
const AuthProvider = ({
  children
}) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchProfile = useCallback(async (userId) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
      if (error) {
        console.error("Error fetching user profile:", error);
        return null;
      }
      return data;
    } catch (err) {
      console.error("Unexpected error fetching profile:", err);
      return null;
    }
  }, []);
  const refreshProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      return;
    }
    const prof = await fetchProfile(user.id);
    setProfile(prof);
  }, [user, fetchProfile]);
  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(async ({ data: { session: initialSession } }) => {
      if (!mounted) return;
      setSession(initialSession);
      setUser((initialSession == null ? void 0 : initialSession.user) ?? null);
      if (initialSession == null ? void 0 : initialSession.user) {
        const prof = await fetchProfile(initialSession.user.id);
        if (mounted) setProfile(prof);
      } else {
        if (mounted) setProfile(null);
      }
      if (mounted) setIsLoading(false);
    });
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (!mounted) return;
      setSession(currentSession);
      setUser((currentSession == null ? void 0 : currentSession.user) ?? null);
      if (event === "SIGNED_IN" || event === "USER_UPDATED" || event === "TOKEN_REFRESHED") {
        if (currentSession == null ? void 0 : currentSession.user) {
          const prof = await fetchProfile(currentSession.user.id);
          if (mounted) setProfile(prof);
        }
      } else if (event === "SIGNED_OUT") {
        setProfile(null);
        queryClient.clear();
      }
      setIsLoading(false);
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile, queryClient]);
  const signIn = async (email, password) => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (!error && data.user) {
      setUser(data.user);
      setSession(data.session);
      const prof = await fetchProfile(data.user.id);
      setProfile(prof);
    }
    setIsLoading(false);
    return { error };
  };
  const signOut = async () => {
    setIsLoading(true);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error during sign out:", err);
    } finally {
      setUser(null);
      setSession(null);
      setProfile(null);
      queryClient.clear();
      setIsLoading(false);
    }
  };
  const requestPasswordReset = async (email) => {
    const redirectTo = typeof window !== "undefined" ? `${window.location.origin}/admin/reset-password` : void 0;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    });
    return { error };
  };
  const updatePassword = async (newPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });
    return { error };
  };
  const isStaff = (profile == null ? void 0 : profile.role) === "admin" || (profile == null ? void 0 : profile.role) === "editor";
  const isAdmin = (profile == null ? void 0 : profile.role) === "admin";
  return /* @__PURE__ */ jsx(
    AuthContext.Provider,
    {
      value: {
        user,
        session,
        profile,
        isLoading,
        isStaff,
        isAdmin,
        signIn,
        signOut,
        requestPasswordReset,
        updatePassword,
        refreshProfile
      },
      children
    }
  );
};
export {
  AuthProvider as A
};
