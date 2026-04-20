import { z } from "zod";

import { loginCopy } from "@/features/auth/content/login-copy";
import { roomCode } from "@/features/auth/utils/room-code";

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export const loginSchema = z
  .object({
    authMode: z.enum(["visitor", "signin"]),
    name: z.string().trim(),
    email: z
      .string()
      .trim()
      .refine((value) => value.length === 0 || emailPattern.test(value), loginCopy.validation.email),
    password: z.string(),
    roomCode: z
      .string()
      .trim()
      .transform(roomCode.normalize)
      .refine(
        (value) => value.length === 0 || roomCode.pattern.test(value),
        loginCopy.validation.roomCode,
      ),
    isObserver: z.boolean(),
  })
  .superRefine((values, context) => {
    if (values.authMode === "visitor" && values.name.length < 2) {
      context.addIssue({
        code: "custom",
        path: ["name"],
        message: loginCopy.validation.name,
      });
    }

    if (values.authMode === "signin" && values.email.length === 0) {
      context.addIssue({
        code: "custom",
        path: ["email"],
        message: loginCopy.validation.emailRequiredForAccount,
      });
    }

    if (values.authMode === "signin" && values.password.trim().length === 0) {
      context.addIssue({
        code: "custom",
        path: ["password"],
        message: loginCopy.validation.password,
      });
    }
  });

export type LoginFormData = z.infer<typeof loginSchema>;

