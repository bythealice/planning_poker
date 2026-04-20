export { loginSchema } from "./login-schema";
export type { LoginFormData } from "./login-schema";
export { forgotPasswordSchema } from "./forgot-password-schema";
export type { ForgotPasswordFormData } from "./forgot-password-schema";
export { signupSchema } from "./signup-schema";
export type { SignupFormData } from "./signup-schema";

export type AuthMode = "visitor" | "signin";

export type SignInSession = {
  email: string;
  token: string;
};

export interface AuthRepository {
  signIn(email: string, password: string): Promise<SignInSession>;
}


