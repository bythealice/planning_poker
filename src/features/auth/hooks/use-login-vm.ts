"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { authSelectors, useAuthStore } from "@/core/store";
import { authService } from "@/features/auth/services/auth-api";
import {
  type AuthRepository,
  type LoginFormData,
  loginSchema,
} from "@/features/auth/types";

type UseLoginVMDependencies = {
  repository?: AuthRepository;
};

export function useLoginVM({ repository = authService }: UseLoginVMDependencies = {}) {
  const [error, setError] = useState<string | null>(null);
  const setSession = useAuthStore(authSelectors.setSession);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
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
      form.setValue("email", value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [form],
  );

  const handleLogin = form.handleSubmit(async ({ email }) => {
    setError(null);

    try {
      const session = await repository.login(email);
      setSession(session);
    } catch {
      setError("Falha ao entrar. Verifique seu e-mail.");
    }
  });

  return {
    email,
    setEmail,
    fieldError: form.formState.errors.email?.message,
    error,
    isLoading,
    handleLogin,
    canSubmit: form.formState.isValid && !isLoading,
  };
}

