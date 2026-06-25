"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { ApiError } from "@/lib/api";
import { authApi, type AuthResponse, type AuthTokens, type CompleteRegisterPayload, type UserProfile } from "@/lib/auth";
import { clearStoredSession, getStoredSession, storeSession } from "@/lib/session";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface AuthContextValue {
  status: AuthStatus;
  user: UserProfile | null;
  tokens: AuthTokens | null;
  login: (email: string, password: string) => Promise<UserProfile>;
  completeRegister: (payload: CompleteRegisterPayload) => Promise<UserProfile>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<UserProfile | null>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function authStateFromResponse(response: AuthResponse) {
  const tokens = {
    access_token: response.access_token,
    refresh_token: response.refresh_token,
  };
  storeSession(tokens);
  return { tokens, user: response.user };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>(() => (getStoredSession() ? "loading" : "unauthenticated"));
  const [user, setUser] = useState<UserProfile | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);

  const clearSession = useCallback(() => {
    clearStoredSession();
    setTokens(null);
    setUser(null);
    setStatus("unauthenticated");
  }, []);

  const loadUser = useCallback(async (session: AuthTokens) => {
    try {
      const profile = await authApi.me(session.access_token);
      setTokens(session);
      setUser(profile);
      setStatus("authenticated");
      return profile;
    } catch (error) {
      if (!(error instanceof ApiError) || error.status !== 401) throw error;

      const refreshed = await authApi.refresh(session.refresh_token);
      storeSession(refreshed);
      const profile = await authApi.me(refreshed.access_token);
      setTokens(refreshed);
      setUser(profile);
      setStatus("authenticated");
      return profile;
    }
  }, []);

  useEffect(() => {
    const session = getStoredSession();
    if (!session) return;

    void Promise.resolve()
      .then(() => loadUser(session))
      .catch(() => clearSession());
  }, [clearSession, loadUser]);

  const login = useCallback(async (email: string, password: string) => {
    const response = await authApi.login(email, password);
    const next = authStateFromResponse(response);
    setTokens(next.tokens);
    setUser(next.user);
    setStatus("authenticated");
    return next.user;
  }, []);

  const completeRegister = useCallback(async (payload: CompleteRegisterPayload) => {
    const response = await authApi.completeRegister(payload);
    const next = authStateFromResponse(response);
    setTokens(next.tokens);
    setUser(next.user);
    setStatus("authenticated");
    return next.user;
  }, []);

  const logout = useCallback(async () => {
    const accessToken = tokens?.access_token;
    clearSession();
    if (!accessToken) return;

    try {
      await authApi.logout(accessToken);
    } catch {
      // Local logout still wins if the server session is already invalid.
    }
  }, [clearSession, tokens?.access_token]);

  const refreshUser = useCallback(async () => {
    const session = getStoredSession();
    if (!session) {
      clearSession();
      return null;
    }

    try {
      return await loadUser(session);
    } catch {
      clearSession();
      return null;
    }
  }, [clearSession, loadUser]);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      user,
      tokens,
      login,
      completeRegister,
      logout,
      refreshUser,
    }),
    [completeRegister, login, logout, refreshUser, status, tokens, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
  return context;
}
