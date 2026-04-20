import { z } from "zod";

import { signupCopy } from "@/features/auth/content/signup-copy";

const emailPattern = /[^\s@]+@[^\s@]+\.[^\s@]+/;

export const signupSchema = z
  .object({
    name: z.string().trim().min(2, signupCopy.validation.name),
    email: z
      .string()
      .trim()
      .refine((value) => emailPattern.test(value), signupCopy.validation.email),
    password: z.string().min(8, signupCopy.validation.passwordMinLength),
    confirmPassword: z.string().min(8, signupCopy.validation.confirmPasswordRequired),
  })
  .superRefine((values, context) => {
    if (values.password !== values.confirmPassword) {
      context.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: signupCopy.validation.passwordMismatch,
      });
    }
  });

export type SignupFormData = z.infer<typeof signupSchema>;

