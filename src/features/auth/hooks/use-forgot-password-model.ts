"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { forgotPasswordCopy } from "@/features/auth/content/forgot-password-copy";
import { type ForgotPasswordFormData, forgotPasswordSchema } from "@/features/auth/types";

const recoveryDelayInMs = 700;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useForgotPasswordModel() {
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onChange",
  });

  const email = useWatch({
    control: form.control,
    name: "email",
    defaultValue: "",
  });

  const isLoading = form.formState.isSubmitting;

  const setEmail = useCallback(
    (value: string) => {
      setSuccess(null);
      form.setValue("email", value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [form],
  );

  const handleSendRecovery = form.handleSubmit(async () => {
    setSuccess(null);
    await wait(recoveryDelayInMs);
    setSuccess(forgotPasswordCopy.messages.sent);
  });

  return {
    email,
    emailError: form.formState.errors.email?.message,
    success,
    isLoading,
    canSubmit: email.trim().length > 0 && !isLoading,
    setEmail,
    handleSendRecovery,
  };
}

