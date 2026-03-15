"use client";

import React from "react";
import { authService } from "@/services/auth";
import type { LoginRequest } from "@/services/auth.types";

const TOKEN_KEY = "auth_token";
const USERNAME_KEY = "auth_username";

export type AuthState = Readonly<{
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
}>;

type AuthContextValue = Readonly<{
  auth: AuthState;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
}>;

function getStoredAuth(): Pick<AuthState, "isAuthenticated" | "username"> {
  if (typeof window === "undefined") {
    return { isAuthenticated: false, username: null };
  }
  const token = localStorage.getItem(TOKEN_KEY);
  const username = localStorage.getItem(USERNAME_KEY);
  return {
    isAuthenticated: Boolean(token),
    username: username ?? null,
  };
}

const initialState: AuthState = {
  ...getStoredAuth(),
  isLoading: false,
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: Readonly<{ children: React.ReactNode }>): React.ReactElement {
  const [auth, setAuth] = React.useState<AuthState>(() => initialState);

  const login = React.useCallback(async (credentials: LoginRequest): Promise<void> => {
    setAuth((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await authService.login(credentials);
      if (typeof window !== "undefined") {
        localStorage.setItem(TOKEN_KEY, res.token);
        localStorage.setItem(USERNAME_KEY, res.username);
      }
      setAuth({
        isAuthenticated: true,
        username: res.username,
        isLoading: false,
      });
    } catch (err) {
      setAuth((prev) => ({ ...prev, isLoading: false }));
      throw err;
    }
  }, []);

  const logout = React.useCallback(async (): Promise<void> => {
    setAuth((prev) => ({ ...prev, isLoading: true }));
    try {
      await authService.logout();
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USERNAME_KEY);
      }
      setAuth({
        isAuthenticated: false,
        username: null,
        isLoading: false,
      });
    }
  }, []);

  const value: AuthContextValue = React.useMemo(
    () => ({ auth, login, logout }),
    [auth, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
