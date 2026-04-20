import { z } from "zod";

import { roomCode } from "@/features/auth/utils/room-code";

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export const loginSchema = z
  .object({
    authMode: z.enum(["visitor", "signin"]),
    name: z.string().trim(),
    email: z
      .string()
      .trim()
      .refine((value) => value.length === 0 || emailPattern.test(value), "Digite um e-mail valido."),
    password: z.string(),
    roomCode: z
      .string()
      .trim()
      .transform(roomCode.normalize)
      .refine(
        (value) => value.length === 0 || roomCode.pattern.test(value),
        "Use de 4 a 8 caracteres alfanumericos.",
      ),
    isObserver: z.boolean(),
  })
  .superRefine((values, context) => {
    if (values.authMode === "visitor" && values.name.length < 2) {
      context.addIssue({
        code: "custom",
        path: ["name"],
        message: "Digite seu nome.",
      });
    }

    if (values.authMode === "signin" && values.email.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["email"],
        message: "Digite um e-mail para continuar com conta.",
      });
    }

    if (values.authMode === "signin" && values.password.trim().length === 0) {
      context.addIssue({
        code: "custom",
        path: ["password"],
        message: "Digite sua senha para entrar.",
      });
    }
  });

export type LoginFormData = z.infer<typeof loginSchema>;

