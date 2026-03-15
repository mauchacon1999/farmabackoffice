"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { AuthError } from "@/services/auth";
import type { LoginFormProps } from "./LoginForm.types";

export function LoginForm({ onSuccess, onError }: LoginFormProps): React.ReactElement {
  const { login, auth } = useAuth();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [submitError, setSubmitError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmitError(null);
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      const msg = "Usuario y contraseña son obligatorios";
      setSubmitError(msg);
      onError?.(msg);
      return;
    }
    try {
      await login({ username: trimmedUsername, password });
      onSuccess?.();
    } catch (err) {
      const message = err instanceof AuthError ? err.message : "Error al iniciar sesión";
      setSubmitError(message);
      onError?.(message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-4 rounded-xl border border-border bg-background p-6 shadow-sm"
      noValidate
    >
      <h2 className="text-xl font-semibold text-foreground">Iniciar sesión</h2>

      <div className="flex flex-col gap-2">
        <label htmlFor="login-username" className="text-sm font-medium text-foreground">
          Usuario
        </label>
        <input
          id="login-username"
          type="text"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={auth.isLoading}
          className="rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Usuario"
          aria-invalid={Boolean(submitError)}
          aria-describedby={submitError ? "login-error" : undefined}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="login-password" className="text-sm font-medium text-foreground">
          Contraseña
        </label>
        <input
          id="login-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={auth.isLoading}
          className="rounded-lg border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline focus:ring-2 focus:ring-primary focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60"
          placeholder="Contraseña"
          aria-invalid={Boolean(submitError)}
        />
      </div>

      {submitError ? (
        <p
          id="login-error"
          role="alert"
          className="text-sm text-red-600"
        >
          {submitError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={auth.isLoading}
        className="mt-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-foreground transition-colors hover:bg-accent/90 focus-visible:outline focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {auth.isLoading ? "Iniciando sesión…" : "Entrar"}
      </button>
    </form>
  );
}
