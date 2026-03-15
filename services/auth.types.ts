export type LoginRequest = Readonly<{
  username: string;
  password: string;
}>;

export type LoginSuccessResponse = Readonly<{
  token: string;
  username: string;
}>;

export type AuthErrorResponse = Readonly<{
  error: string;
}>;
