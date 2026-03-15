import { BaseService } from "./base";
import type { LoginRequest, LoginSuccessResponse, AuthErrorResponse } from "./auth.types";

const proxy = process.env.NEXT_PUBLIC_PROXY ?? process.env.PROXY;
const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? process.env.API_URL;

function getBaseUrl(): string {
  const base = `${apiUrl}/${proxy}`.replace(/\/+/g, "/");
  return base.endsWith("/") ? base.slice(0, -1) : base;
}

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly status: number
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export class AuthService extends BaseService {

  async login(credentials: LoginRequest): Promise<LoginSuccessResponse> {
    const response = await this.post<LoginSuccessResponse | AuthErrorResponse>("/auth/login", credentials);
    if ("error" in response) {
      throw new AuthError(response.error as string, 401);
    }
    return response as LoginSuccessResponse;
  }

  async logout(): Promise<void> {
    const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    const url = `${getBaseUrl()}/auth/logout`;
    await fetch(url, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  }
}

export const authService = new AuthService();
