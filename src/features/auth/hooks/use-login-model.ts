"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { loginCopy } from "@/features/auth/content/login-copy";
import { authService } from "@/features/auth/services/auth-api";
import type { AuthMode } from "@/features/auth/types";
import { type LoginFormData, loginSchema } from "@/features/auth/types";
import { roomCode as roomCodeUtils } from "@/features/auth/utils/room-code";

const mockDelayInMs = 700;
const profileStorageKey = "planning-poker:login-profile";

type PersistedProfile = {
  authMode: AuthMode;
  name: string;
};

function readPersistedProfile(): PersistedProfile {
  if (typeof window === "undefined") {
    return { authMode: "visitor", name: "" };
  }

  const rawProfile = window.localStorage.getItem(profileStorageKey);

  if (!rawProfile) {
    return { authMode: "visitor", name: "" };
  }

  try {
    const parsed = JSON.parse(rawProfile) as {
      authMode?: string;
      name?: unknown;
    };

    const storedMode = parsed.authMode;

    return {
      authMode:
        storedMode === "signin" || storedMode === "account"
          ? "signin"
          : "visitor",
      name: typeof parsed.name === "string" ? parsed.name : "",
    };
  } catch {
    return { authMode: "visitor", name: "" };
  }
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useLoginModel() {
  const persistedProfile = useMemo(() => readPersistedProfile(), []);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      authMode: persistedProfile.authMode,
      name: persistedProfile.name,
      email: "",
      password: "",
      roomCode: "",
      isObserver: false,
    },
    mode: "onChange",
  });

  const authMode = useWatch({
    control: form.control,
    name: "authMode",
    defaultValue: persistedProfile.authMode,
  });
  const name = useWatch({
    control: form.control,
    name: "name",
    defaultValue: persistedProfile.name,
  });
  const email = useWatch({
    control: form.control,
    name: "email",
    defaultValue: "",
  });
  const password = useWatch({
    control: form.control,
    name: "password",
    defaultValue: "",
  });
  const roomCode = useWatch({
    control: form.control,
    name: "roomCode",
    defaultValue: "",
  });
  const isObserver = useWatch({
    control: form.control,
    name: "isObserver",
    defaultValue: false,
  });

  const isLoading = form.formState.isSubmitting || isAuthenticating;
  const isSigninMode = authMode === "signin";
  const normalizedEmail = email.trim().toLowerCase();
  const isAccountVerified = !isSigninMode || isAuthenticated;
  const isRoomStepVisible = !isSigninMode || isAuthenticated;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const profileToPersist: PersistedProfile = {
      authMode,
      name: name.trim(),
    };

    window.localStorage.setItem(profileStorageKey, JSON.stringify(profileToPersist));
  }, [authMode, name]);

  useEffect(() => {
    if (!isSigninMode) {
      form.clearErrors("email");
      form.clearErrors("password");
    }
  }, [form, isSigninMode]);

  const setAuthMode = useCallback(
    (value: AuthMode) => {
      setError(null);
      setSuccess(null);
      setIsAuthenticated(false);

      form.setValue("authMode", value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [form],
  );

  const setName = useCallback(
    (value: string) => {
      form.setValue("name", value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [form],
  );

  const setEmail = useCallback(
    (value: string) => {
      form.setValue("email", value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setIsAuthenticated(false);
    },
    [form],
  );

  const setPassword = useCallback(
    (value: string) => {
      form.setValue("password", value, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
      setIsAuthenticated(false);
    },
    [form],
  );

  const setRoomCode = useCallback(
    (value: string) => {
      form.setValue("roomCode", roomCodeUtils.normalize(value), {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    },
    [form],
  );

  const setIsObserver = useCallback(
    (value: boolean) => {
      form.setValue("isObserver", value, {
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [form],
  );

  const handleSignIn = useCallback(async () => {
    setError(null);
    setSuccess(null);

    const signinFieldsAreValid = await form.trigger(["email", "password"]);
    const currentEmail = form.getValues("email").trim().toLowerCase();
    const currentPassword = form.getValues("password");

    if (!signinFieldsAreValid || currentEmail.length === 0) {
      form.setError("email", {
        type: "manual",
        message: loginCopy.validation.emailRequiredForAccount,
      });
      return;
    }

    if (currentPassword.trim().length === 0) {
      form.setError("password", {
        type: "manual",
        message: loginCopy.validation.passwordRequiredForAccount,
      });
      return;
    }

    setIsAuthenticating(true);

    try {
      const session = await authService.signIn(currentEmail, currentPassword);

      if (!session.token) {
        setError(loginCopy.validation.signinSessionInvalid);
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
    } catch {
      setError(loginCopy.validation.signinFailed);
    } finally {
      setIsAuthenticating(false);
    }
  }, [form]);

  const handleCreateRoom = form.handleSubmit(async () => {
    setError(null);
    setSuccess(null);

    if (!isAccountVerified) {
      setError(loginCopy.validation.accountVerificationRequired);
      return;
    }

    await wait(mockDelayInMs);
    const generatedCode = roomCodeUtils.createDemoCode();

    form.setValue("roomCode", generatedCode, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });

    setSuccess(loginCopy.messages.created(generatedCode));
  });

  const handleJoinWithCode = form.handleSubmit(async ({ roomCode: currentRoomCode, isObserver: observerMode }) => {
    setError(null);
    setSuccess(null);

    if (!isAccountVerified) {
      setError(loginCopy.validation.accountVerificationRequired);
      return;
    }

    const normalizedRoomCode = currentRoomCode.trim().toUpperCase();

    if (!normalizedRoomCode) {
      form.setError("roomCode", {
        type: "manual",
        message: loginCopy.validation.roomCodeRequired,
      });
      return;
    }

    if (!roomCodeUtils.isValid(normalizedRoomCode)) {
      form.setError("roomCode", {
        type: "manual",
        message: loginCopy.validation.roomCode,
      });
      return;
    }

    await wait(mockDelayInMs);
    const role = observerMode ? "observador" : "participante";

    setSuccess(loginCopy.messages.joined(normalizedRoomCode, role));
  });

  return {
    authMode,
    name,
    email,
    password,
    roomCode,
    isObserver,
    isRoomStepVisible,
    isAccountVerified,
    setAuthMode,
    setName,
    setEmail,
    setPassword,
    setRoomCode,
    setIsObserver,
    nameError: form.formState.errors.name?.message,
    emailError: form.formState.errors.email?.message,
    passwordError: form.formState.errors.password?.message,
    roomCodeError: form.formState.errors.roomCode?.message,
    error,
    success,
    isLoading,
    handleSignIn,
    handleCreateRoom,
    handleJoinWithCode,
    canSignIn: isSigninMode && normalizedEmail.length > 0 && password.length > 0 && !isLoading,
    canCreateRoom:
      (isSigninMode ? true : name.trim().length >= 2) &&
      isRoomStepVisible &&
      !isLoading,
    canJoinWithCode:
      (isSigninMode ? true : name.trim().length >= 2) &&
      roomCode.trim().length > 0 &&
      isRoomStepVisible &&
      !isLoading,
  };
}

