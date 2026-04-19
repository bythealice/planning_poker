"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { loginCopy } from "@/features/auth/content/login-copy";
import { type LoginFormData, loginSchema } from "@/features/auth/types";
import { roomCode as roomCodeUtils } from "@/features/auth/utils/room-code";

const mockDelayInMs = 700;

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useLoginModel() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      name: "",
      email: "",
      roomCode: "",
      isObserver: false,
    },
    mode: "onChange",
  });

  const name = useWatch({
    control: form.control,
    name: "name",
    defaultValue: "",
  });
  const email = useWatch({
    control: form.control,
    name: "email",
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

  const isLoading = form.formState.isSubmitting;

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

  const handleCreateRoom = form.handleSubmit(async () => {
    setError(null);
    setSuccess(null);

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
    name,
    email,
    roomCode,
    isObserver,
    setName,
    setEmail,
    setRoomCode,
    setIsObserver,
    nameError: form.formState.errors.name?.message,
    emailError: form.formState.errors.email?.message,
    roomCodeError: form.formState.errors.roomCode?.message,
    error,
    success,
    isLoading,
    handleCreateRoom,
    handleJoinWithCode,
    canCreateRoom: name.trim().length >= 2 && !isLoading,
    canJoinWithCode: name.trim().length >= 2 && roomCode.trim().length > 0 && !isLoading,
  };
}

