import { z } from "zod";

import { roomCode } from "@/features/auth/utils/room-code";

export const loginSchema = z.object({
  name: z.string().trim().min(2, "Digite seu nome."),
  email: z
    .string()
    .trim()
    .refine(
      (value) => value.length === 0 || /[^\s@]+@[^\s@]+\.[^\s@]+/.test(value),
      "Digite um e-mail valido.",
    ),
  roomCode: z
    .string()
    .trim()
    .transform(roomCode.normalize)
    .refine(
      (value) => value.length === 0 || roomCode.pattern.test(value),
      "Use de 4 a 8 caracteres alfanumericos.",
    ),
  isObserver: z.boolean(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

