import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Digite um e-mail valido."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export type AuthSession = {
  token: string;
  email: string;
};

export interface AuthRepository {
  login(email: string): Promise<AuthSession>;
}


