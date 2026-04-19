export { loginSchema } from "./login-schema";
export type { LoginFormData } from "./login-schema";

export type AuthSession = {
  token: string;
  email: string;
};

export interface AuthRepository {
  login(email: string): Promise<AuthSession>;
}


