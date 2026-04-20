import { z } from "zod";

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, "Digite seu nome."),
    email: z
      .string()
      .trim()
      .refine((value) => emailPattern.test(value), "Digite um e-mail valido."),
    password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres."),
    confirmPassword: z.string().min(8, "Confirme a senha."),
  })
  .superRefine((values, context) => {
    if (values.password !== values.confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "As senhas nao conferem.",
      });
    }
  });

export type SignupFormData = z.infer<typeof signupSchema>;

