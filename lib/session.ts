import type { AuthTokens } from "@/lib/auth";

const SESSION_KEY = "livelo.auth.session";

export function getStoredSession(): AuthTokens | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as Partial<AuthTokens>;
    if (!session.access_token || !session.refresh_token) return null;
    return {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    };
  } catch {
    return null;
  }
}

export function storeSession(tokens: AuthTokens) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(tokens));
}

export function clearStoredSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(SESSION_KEY);
}
