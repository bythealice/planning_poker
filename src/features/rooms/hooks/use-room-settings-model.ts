"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { useAuthStore } from "@/core/store";
import { roomCode as roomCodeUtils } from "@/features/auth/utils/room-code";

import { roomSettingsCopy } from "../content/room-settings-copy";
import { type RoomSettingsFormData, roomSettingsSchema } from "../types/room-settings-schema";

const roomSettingsStorageKey = "planning-poker:room-settings-default";
const mockDelayInMs = 450;

type PersistedRoomSettings = Omit<RoomSettingsFormData, "roomCode">;

type RoomSettingsModelOptions = {
  roomCode: string;
  openedFromCreation?: boolean;
};

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function titleCase(value: string) {
  return value
    .split(/[\s_-]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function deriveRoomName(roomCode: string) {
  const normalized = titleCase(roomCode.replace(/[^A-Za-z0-9]+/g, " ").trim());

  if (!normalized) {
    return "Sala de planejamento";
  }

  return normalized.toLowerCase().endsWith("planning") ? normalized : `${normalized} Planning`;
}

function readPersistedSettings(): Partial<PersistedRoomSettings> | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawSettings = window.localStorage.getItem(roomSettingsStorageKey);

  if (!rawSettings) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawSettings) as Partial<PersistedRoomSettings>;

    return {
      roomName: typeof parsed.roomName === "string" ? parsed.roomName : undefined,
      estimationSystem:
        parsed.estimationSystem === "fibonacci" ||
        parsed.estimationSystem === "tshirt" ||
        parsed.estimationSystem === "powersOf2"
          ? parsed.estimationSystem
          : undefined,
      showTitleDuringVoting: typeof parsed.showTitleDuringVoting === "boolean" ? parsed.showTitleDuringVoting : undefined,
      showParticipantCount: typeof parsed.showParticipantCount === "boolean" ? parsed.showParticipantCount : undefined,
      revealCardsBy: parsed.revealCardsBy === "host-only" || parsed.revealCardsBy === "anyone" ? parsed.revealCardsBy : undefined,
      roundTimerEnabled: typeof parsed.roundTimerEnabled === "boolean" ? parsed.roundTimerEnabled : undefined,
      roundTimerSeconds:
        typeof parsed.roundTimerSeconds === "number" && Number.isFinite(parsed.roundTimerSeconds)
          ? parsed.roundTimerSeconds
          : undefined,
    };
  } catch {
    return null;
  }
}

function writePersistedSettings(settings: PersistedRoomSettings) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(roomSettingsStorageKey, JSON.stringify(settings));
}

export function useRoomSettingsModel({ roomCode, openedFromCreation = false }: RoomSettingsModelOptions) {
  const normalizedRoomCode = useMemo(() => roomCodeUtils.normalize(roomCode), [roomCode]);
  const persistedSettings = useMemo(() => readPersistedSettings(), []);
  const isAuthenticated = Boolean(useAuthStore((state) => state.session));
  const [banner, setBanner] = useState<string | null>(openedFromCreation ? roomSettingsCopy.messages.roomOpened : null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues = useMemo<RoomSettingsFormData>(
    () => ({
      roomCode: normalizedRoomCode,
      roomName: persistedSettings?.roomName?.trim() || deriveRoomName(normalizedRoomCode),
      estimationSystem: persistedSettings?.estimationSystem ?? "fibonacci",
      showTitleDuringVoting: persistedSettings?.showTitleDuringVoting ?? true,
      showParticipantCount: persistedSettings?.showParticipantCount ?? false,
      revealCardsBy: persistedSettings?.revealCardsBy ?? "host-only",
      roundTimerEnabled: persistedSettings?.roundTimerEnabled ?? true,
      roundTimerSeconds: persistedSettings?.roundTimerSeconds ?? 60,
    }),
    [normalizedRoomCode, persistedSettings],
  );

  const setValueOptions = useMemo(
    () => ({
      withValidation: {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
      withoutValidation: {
        shouldDirty: true,
        shouldTouch: true,
      },
    }),
    [],
  );

  const form = useForm<RoomSettingsFormData>({
    resolver: zodResolver(roomSettingsSchema),
    defaultValues,
    mode: "onChange",
  });


  useEffect(() => {
    setBanner(openedFromCreation ? roomSettingsCopy.messages.roomOpened : null);
  }, [openedFromCreation]);

  useEffect(() => {
    if (!success) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccess(null);
    }, 3200);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [success]);

  const updateField = useCallback(
    <K extends keyof RoomSettingsFormData>(name: K, value: RoomSettingsFormData[K], shouldValidate: boolean) => {
      form.setValue(
        name as never,
        value as never,
        shouldValidate ? setValueOptions.withValidation : setValueOptions.withoutValidation,
      );
    },
    [form, setValueOptions.withValidation, setValueOptions.withoutValidation],
  );

  const clearFeedback = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const dismissSuccess = useCallback(() => {
    setSuccess(null);
  }, []);

  const roomName = useWatch({ control: form.control, name: "roomName", defaultValue: defaultValues.roomName });
  const estimationSystem = useWatch({ control: form.control, name: "estimationSystem", defaultValue: defaultValues.estimationSystem });
  const showTitleDuringVoting = useWatch({ control: form.control, name: "showTitleDuringVoting", defaultValue: defaultValues.showTitleDuringVoting });
  const showParticipantCount = useWatch({ control: form.control, name: "showParticipantCount", defaultValue: defaultValues.showParticipantCount });
  const revealCardsBy = useWatch({ control: form.control, name: "revealCardsBy", defaultValue: defaultValues.revealCardsBy });
  const roundTimerEnabled = useWatch({ control: form.control, name: "roundTimerEnabled", defaultValue: defaultValues.roundTimerEnabled });
  const roundTimerSeconds = useWatch({ control: form.control, name: "roundTimerSeconds", defaultValue: defaultValues.roundTimerSeconds });

  const isLoading = form.formState.isSubmitting || isSubmitting;
  const canCopyRoomCode = normalizedRoomCode.length > 0 && !isLoading;
  const canInviteTeam = normalizedRoomCode.length > 0 && !isLoading;
  const canApplySettings = roomName.trim().length >= 2 && !isLoading;
  const canSaveAsDefault = isAuthenticated && !isLoading;

  const roomInviteUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return `/rooms/${normalizedRoomCode}`;
    }

    return `${window.location.origin}/rooms/${normalizedRoomCode}`;
  }, [normalizedRoomCode]);

  const setRoomName = useCallback(
    (value: string) => updateField("roomName", value, true),
    [updateField],
  );

  const setEstimationSystem = useCallback(
    (value: RoomSettingsFormData["estimationSystem"]) => updateField("estimationSystem", value, true),
    [updateField],
  );

  const setShowTitleDuringVoting = useCallback(
    (value: boolean) => updateField("showTitleDuringVoting", value, false),
    [updateField],
  );

  const setShowParticipantCount = useCallback(
    (value: boolean) => updateField("showParticipantCount", value, false),
    [updateField],
  );

  const setRevealCardsBy = useCallback(
    (value: RoomSettingsFormData["revealCardsBy"]) => updateField("revealCardsBy", value, true),
    [updateField],
  );

  const setRoundTimerEnabled = useCallback(
    (value: boolean) => updateField("roundTimerEnabled", value, false),
    [updateField],
  );

  const setRoundTimerSeconds = useCallback(
    (value: number) => updateField("roundTimerSeconds", value, true),
    [updateField],
  );

  const handleCopyRoomCode = useCallback(async () => {
    clearFeedback();

    if (!canCopyRoomCode) {
      setError(roomSettingsCopy.messages.copyFailed);
      return;
    }

    try {
      await navigator.clipboard.writeText(normalizedRoomCode);
      setSuccess(roomSettingsCopy.messages.roomCodeCopied);
    } catch {
      setError(roomSettingsCopy.messages.copyFailed);
    }
  }, [canCopyRoomCode, clearFeedback, normalizedRoomCode]);

  const handleInviteTeam = useCallback(async () => {
    clearFeedback();

    if (!canInviteTeam) {
      setError(roomSettingsCopy.messages.copyFailed);
      return;
    }

    try {
      await navigator.clipboard.writeText(roomInviteUrl);
      setSuccess(roomSettingsCopy.messages.inviteCopied);
    } catch {
      setError(roomSettingsCopy.messages.copyFailed);
    }
  }, [canInviteTeam, clearFeedback, roomInviteUrl]);

  const handleSaveAsDefault = useCallback(async () => {
    clearFeedback();

    if (!isAuthenticated) {
      setError(roomSettingsCopy.messages.authRequiredForDefault);
      return;
    }

    const currentValues = form.getValues();

    writePersistedSettings({
      roomName: currentValues.roomName.trim(),
      estimationSystem: currentValues.estimationSystem,
      showTitleDuringVoting: currentValues.showTitleDuringVoting,
      showParticipantCount: currentValues.showParticipantCount,
      revealCardsBy: currentValues.revealCardsBy,
      roundTimerEnabled: currentValues.roundTimerEnabled,
      roundTimerSeconds: currentValues.roundTimerSeconds,
    });

    await wait(mockDelayInMs / 2);
    setSuccess(roomSettingsCopy.messages.savedAsDefault);
  }, [clearFeedback, form, isAuthenticated]);

  const handleApplySettings = form.handleSubmit(async (values) => {
    clearFeedback();
    setIsSubmitting(true);

    try {
      writePersistedSettings({
        roomName: values.roomName.trim(),
        estimationSystem: values.estimationSystem,
        showTitleDuringVoting: values.showTitleDuringVoting,
        showParticipantCount: values.showParticipantCount,
        revealCardsBy: values.revealCardsBy,
        roundTimerEnabled: values.roundTimerEnabled,
        roundTimerSeconds: values.roundTimerSeconds,
      });

      await wait(mockDelayInMs);
      setSuccess(roomSettingsCopy.messages.applied);
    } finally {
      setIsSubmitting(false);
    }
  });

  return {
    roomCode: normalizedRoomCode,
    roomInviteUrl,
    roomName,
    estimationSystem,
    showTitleDuringVoting,
    showParticipantCount,
    revealCardsBy,
    roundTimerEnabled,
    roundTimerSeconds,
    isAuthenticated,
    banner,
    error,
    success,
    isLoading,
    canCopyRoomCode,
    canInviteTeam,
    canApplySettings,
    canSaveAsDefault,
    setRoomName,
    setEstimationSystem,
    setShowTitleDuringVoting,
    setShowParticipantCount,
    setRevealCardsBy,
    setRoundTimerEnabled,
    setRoundTimerSeconds,
    handleCopyRoomCode,
    handleInviteTeam,
    handleSaveAsDefault,
    handleApplySettings,
    dismissSuccess,
  };
}

