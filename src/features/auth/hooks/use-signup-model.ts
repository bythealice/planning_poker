"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { signupCopy } from "@/features/auth/content/signup-copy";
import { type SignupFormData, signupSchema } from "@/features/auth/types";

const signupDelayInMs = 700;
const signupDefaultValues: SignupFormData = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const signupSetValueOptions = {
  shouldDirty: true,
  shouldTouch: true,
  shouldValidate: true,
} as const;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useSignupModel() {
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: signupDefaultValues,
    mode: "onChange",
  });

  const name = useWatch({
    control: form.control,
    name: "name",
    defaultValue: signupDefaultValues.name,
  });
  const email = useWatch({
    control: form.control,
    name: "email",
    defaultValue: signupDefaultValues.email,
  });
  const password = useWatch({
    control: form.control,
    name: "password",
    defaultValue: signupDefaultValues.password,
  });
  const confirmPassword = useWatch({
    control: form.control,
    name: "confirmPassword",
    defaultValue: signupDefaultValues.confirmPassword,
  });

  const isLoading = form.formState.isSubmitting;

  const setField = useCallback(
    (field: keyof SignupFormData, value: string) => {
      setSuccess(null);
      form.setValue(field, value, signupSetValueOptions);
    },
    [form],
  );

  const handleCreateAccount = form.handleSubmit(async () => {
    setSuccess(null);
    await wait(signupDelayInMs);
    setSuccess(signupCopy.messages.created);
  });

  return {
    name,
    email,
    password,
    confirmPassword,
    setName: (value: string) => setField("name", value),
    setEmail: (value: string) => setField("email", value),
    setPassword: (value: string) => setField("password", value),
    setConfirmPassword: (value: string) => setField("confirmPassword", value),
    nameError: form.formState.errors.name?.message,
    emailError: form.formState.errors.email?.message,
    passwordError: form.formState.errors.password?.message,
    confirmPasswordError: form.formState.errors.confirmPassword?.message,
    success,
    isLoading,
    canSubmit: !isLoading,
    handleCreateAccount,
  };
}

