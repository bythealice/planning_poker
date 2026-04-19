import Image from "next/image";
import { Info } from "lucide-react";

import { Button, Input } from "@/shared/ui";

import type { LoginCopy } from "../content/login-copy";

export type LoginViewProps = {
  copy: LoginCopy;
  form: {
    name: string;
    email: string;
    roomCode: string;
    isObserver: boolean;
    nameError?: string;
    emailError?: string;
    roomCodeError?: string;
  };
  status: {
    error?: string | null;
    success?: string | null;
    isLoading?: boolean;
    canCreateRoom?: boolean;
    canJoinWithCode?: boolean;
  };
  actions: {
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onRoomCodeChange: (value: string) => void;
    onObserverChange: (value: boolean) => void;
    onCreateRoom: () => void;
    onJoinWithCode: () => void;
  };
};

export function LoginView({ copy, form, status, actions }: LoginViewProps) {
  const loadingLabel = status.isLoading ? copy.buttons.loading : null;

  return (
    <div className="flex w-full flex-col items-center" data-cy="login-view">
      <section
        className="w-full max-w-login-card rounded-2xl border border-login-card-border bg-login-card p-8 text-login-card-foreground shadow-2xl shadow-black/40"
        data-cy="login-card"
      >
        <div className="mb-8 flex justify-center" data-cy="login-brand">
          <Image
            src={copy.brand.logoSrc}
            alt={copy.brand.logoAlt}
            width={copy.brand.logoWidth}
            height={copy.brand.logoHeight}
            priority
            className="h-auto w-auto"
          />
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="login-name" className="text-xs font-semibold tracking-[0.16em] text-login-label">
              {copy.fields.name.label}
            </label>
            <Input
              id="login-name"
              data-cy="login-name"
              value={form.name}
              onChange={(event) => actions.onNameChange(event.target.value)}
              placeholder={copy.fields.name.placeholder}
              className="h-14 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder"
            />
            {form.nameError && <p className="text-sm text-destructive" role="alert">{form.nameError}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="login-email" className="text-xs font-semibold tracking-[0.16em] text-login-label">
              {copy.fields.email.label}
            </label>
            <Input
              id="login-email"
              type="email"
              data-cy="login-email"
              value={form.email}
              onChange={(event) => actions.onEmailChange(event.target.value)}
              placeholder={copy.fields.email.placeholder}
              className="h-14 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder"
            />
            {form.emailError && <p className="text-sm text-destructive" role="alert">{form.emailError}</p>}
            <div className="flex items-center gap-2 rounded-md bg-login-helper px-3 py-2 text-sm text-login-helper-foreground">
              <Info className="size-4 text-login-accent" aria-hidden />
              <span>{copy.fields.email.helper}</span>
            </div>
          </div>

          <div className="h-px bg-login-card-border" />

          <div className="space-y-2">
            <label htmlFor="room-code" className="text-xs font-semibold tracking-[0.16em] text-login-label">
              {copy.fields.roomCode.label}
            </label>
            <Input
              id="room-code"
              data-cy="login-room-code"
              value={form.roomCode}
              onChange={(event) => actions.onRoomCodeChange(event.target.value)}
              placeholder={copy.fields.roomCode.placeholder}
              maxLength={8}
              className="h-14 rounded-xl border-login-card-border bg-login-field px-4 text-base uppercase text-login-field-foreground placeholder:text-login-field-placeholder"
            />
            {form.roomCodeError && <p className="text-sm text-destructive" role="alert">{form.roomCodeError}</p>}
          </div>

          <label htmlFor="observer-mode" className="flex cursor-pointer items-center justify-between py-1 text-login-card-foreground">
            <span>{copy.fields.observer.label}</span>
            <span className="relative inline-flex items-center">
              <input
                id="observer-mode"
                type="checkbox"
                data-cy="login-observer-mode"
                checked={form.isObserver}
                onChange={(event) => actions.onObserverChange(event.target.checked)}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-login-toggle-track transition-colors peer-checked:bg-login-accent" />
              <span className="pointer-events-none absolute left-1 size-4 rounded-full bg-login-toggle-thumb transition-transform peer-checked:translate-x-5" />
            </span>
          </label>

          {status.error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert">{status.error}</p>}
          {status.success && <p className="rounded-md bg-login-success/10 px-3 py-2 text-sm text-login-success" role="status">{status.success}</p>}

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              data-cy="login-create-room"
              onClick={actions.onCreateRoom}
              disabled={!status.canCreateRoom}
              className="h-14 w-full rounded-xl bg-login-accent text-lg font-semibold text-login-accent-foreground hover:bg-login-accent/90"
            >
              {loadingLabel ?? copy.buttons.createRoom}
            </Button>
            <Button
              type="button"
              data-cy="login-join-room"
              onClick={actions.onJoinWithCode}
              disabled={!status.canJoinWithCode}
              className="h-14 w-full rounded-xl border border-login-card-border bg-login-field text-lg font-semibold text-login-card-foreground hover:bg-login-helper"
            >
              {loadingLabel ?? copy.buttons.joinRoom}
            </Button>
          </div>
        </div>
      </section>

      <footer className="mt-8 text-xs text-login-footer" data-cy="login-footer">
        {copy.footer.prefix} <span className="mx-2">{copy.footer.separator}</span> {copy.footer.linkLabel}
      </footer>
    </div>
  );
}

