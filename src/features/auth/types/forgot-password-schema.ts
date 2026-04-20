import { z } from "zod";

import { forgotPasswordCopy } from "@/features/auth/content/forgot-password-copy";

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .refine((value) => emailPattern.test(value), forgotPasswordCopy.validation.email),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

