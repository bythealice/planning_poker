import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";

import { Button, Input } from "@/shared/ui";

import type { LoginCopy } from "../content/login-copy";
import type { AuthMode } from "../types";

export type LoginViewProps = {
  copy: LoginCopy;
  form: {
    authMode: AuthMode;
    name: string;
    email: string;
    password: string;
    roomCode: string;
    isObserver: boolean;
    isRoomStepVisible: boolean;
    isAccountVerified: boolean;
    nameError?: string;
    emailError?: string;
    passwordError?: string;
    roomCodeError?: string;
  };
  status: {
    error?: string | null;
    success?: string | null;
    isLoading?: boolean;
    canSignIn?: boolean;
    canCreateRoom?: boolean;
    canJoinWithCode?: boolean;
  };
  actions: {
    onAuthModeChange: (value: AuthMode) => void;
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onRoomCodeChange: (value: string) => void;
    onObserverChange: (value: boolean) => void;
    onSignIn: () => void;
    onCreateRoom: () => void;
    onJoinWithCode: () => void;
  };
};

export function LoginView({ copy, form, status, actions }: LoginViewProps) {
  const loadingLabel = status.isLoading ? copy.buttons.loading : null;
  const isSigninMode = form.authMode === "signin";
  const isSigninStep2 = isSigninMode && form.isRoomStepVisible;
  const nameErrorId = form.nameError ? "login-name-error" : undefined;
  const emailErrorId = form.emailError ? "login-email-error" : undefined;
  const passwordErrorId = form.passwordError ? "login-password-error" : undefined;
  const roomCodeErrorId = form.roomCodeError ? "login-room-code-error" : undefined;

  return (
    <article className="flex w-full flex-col items-center" data-cy="login-view" aria-labelledby="login-title">
      <section
        className="w-full max-w-login-card rounded-2xl border border-login-card-border bg-login-card p-8 text-login-card-foreground shadow-2xl shadow-black/40"
        data-cy="login-card"
      >
        <header className="mb-8 flex justify-center" data-cy="login-brand">
          <h1 id="login-title" className="sr-only">Acesso ao Planning Poker</h1>
          <Image
            src={copy.brand.logoSrc}
            alt={copy.brand.logoAlt}
            width={copy.brand.logoWidth}
            height={copy.brand.logoHeight}
            priority
            className="h-auto w-auto"
          />
        </header>

        <div className="space-y-5">
          {!isSigninStep2 && <fieldset className="space-y-2" aria-describedby="login-mode-hint">
            <legend className="text-xs font-semibold tracking-[0.16em] text-login-label">{copy.authMode.label}</legend>
            <div className="grid grid-cols-2 gap-2" data-cy="login-auth-mode-switch" role="radiogroup" aria-label={copy.authMode.label}>
              <Button
                type="button"
                data-cy="login-mode-ghost"
                onClick={() => actions.onAuthModeChange("visitor")}
                className={
                  form.authMode === "visitor"
                    ? "h-11 rounded-lg bg-login-accent text-login-accent-foreground"
                    : "h-11 rounded-lg border border-login-card-border bg-login-field text-login-card-foreground hover:bg-login-helper"
                }
              >
                {copy.authMode.visitor}
              </Button>
              <Button
                type="button"
                data-cy="login-mode-account"
                onClick={() => actions.onAuthModeChange("signin")}
                className={
                  form.authMode === "signin"
                    ? "h-11 rounded-lg bg-login-accent text-login-accent-foreground"
                    : "h-11 rounded-lg border border-login-card-border bg-login-field text-login-card-foreground hover:bg-login-helper"
                }
              >
                {copy.authMode.signin}
              </Button>
            </div>
            <div id="login-mode-hint" className="flex items-center gap-2 rounded-md bg-login-helper px-3 py-2 text-sm text-login-helper-foreground">
              <Info className="size-4 text-login-accent" aria-hidden />
              <span>{isSigninMode ? copy.authMode.signinHint : copy.authMode.visitorHint}</span>
            </div>
          </fieldset>}

          {!isSigninMode && (
            <section className="space-y-2" data-cy="login-visitor-name-section" aria-labelledby="login-name-label">
              <label htmlFor="login-name" className="text-xs font-semibold tracking-[0.16em] text-login-label">
                <span id="login-name-label">{copy.fields.name.label}</span>
              </label>
              <Input
                id="login-name"
                data-cy="login-name"
                value={form.name}
                onChange={(event) => actions.onNameChange(event.target.value)}
                placeholder={copy.fields.name.placeholder}
                aria-invalid={Boolean(form.nameError)}
                aria-describedby={["login-name-helper", nameErrorId].filter(Boolean).join(" ")}
                className="h-14 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder"
              />
              {form.nameError && <p id="login-name-error" className="text-sm text-destructive" role="alert">{form.nameError}</p>}
              <p id="login-name-helper" className="text-xs text-login-footer">{copy.fields.name.helper}</p>
            </section>
          )}

          {isSigninMode && !isSigninStep2 && (
            <form
              className="space-y-2"
              data-cy="login-signin-step-1"
              aria-labelledby="login-signin-title"
              onSubmit={(event) => {
                event.preventDefault();
                actions.onSignIn();
              }}
            >
              <h2 id="login-signin-title" className="sr-only">Entrar com e-mail e senha</h2>
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
                aria-invalid={Boolean(form.emailError)}
                aria-describedby={emailErrorId}
                className="h-14 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder"
              />
              {form.emailError && <p id="login-email-error" className="text-sm text-destructive" role="alert">{form.emailError}</p>}
              <label htmlFor="login-password" className="text-xs font-semibold tracking-[0.16em] text-login-label">
                {copy.fields.password.label}
              </label>
              <Input
                id="login-password"
                type="password"
                data-cy="login-password"
                value={form.password}
                onChange={(event) => actions.onPasswordChange(event.target.value)}
                placeholder={copy.fields.password.placeholder}
                aria-invalid={Boolean(form.passwordError)}
                aria-describedby={passwordErrorId}
                className="h-14 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder"
              />
              {form.passwordError && <p id="login-password-error" className="text-sm text-destructive" role="alert">{form.passwordError}</p>}
              <div className="flex justify-end">
                <Link
                  href="#"
                  data-cy="login-forgot-password-link"
                  className="text-xs text-login-footer underline-offset-4 hover:text-login-card-foreground hover:underline"
                >
                  {copy.buttons.forgotPassword}
                </Link>
              </div>
              <Button
                type="submit"
                data-cy="login-signin"
                disabled={!status.canSignIn}
                className="h-14 w-full rounded-xl bg-login-accent text-lg font-semibold text-login-accent-foreground hover:bg-login-accent/90"
              >
                {loadingLabel ?? copy.buttons.signIn}
              </Button>
              <Link
                href="/signup"
                data-cy="login-create-account-link"
                className="flex h-12 w-full items-center justify-center rounded-xl border border-login-card-border bg-login-field text-base font-semibold text-login-card-foreground transition-colors hover:bg-login-helper"
              >
                {copy.buttons.createAccount}
              </Link>
            </form>
          )}

          {form.isRoomStepVisible && (
            <section aria-labelledby="login-room-title">
              <div className="h-px bg-login-card-border" />

              <h2 id="login-room-title" className="sr-only">Acoes da sala</h2>
              <div className="space-y-2" data-cy="login-room-step">
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
                  aria-invalid={Boolean(form.roomCodeError)}
                  aria-describedby={roomCodeErrorId}
                  className="h-14 rounded-xl border-login-card-border bg-login-field px-4 text-base uppercase text-login-field-foreground placeholder:text-login-field-placeholder"
                />
                {form.roomCodeError && <p id="login-room-code-error" className="text-sm text-destructive" role="alert">{form.roomCodeError}</p>}
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
            </section>
          )}

          {status.error && <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive" role="alert" aria-live="assertive">{status.error}</p>}
          {status.success && <p className="rounded-md bg-login-success/10 px-3 py-2 text-sm text-login-success" role="status" aria-live="polite">{status.success}</p>}

          {form.isRoomStepVisible && <form
            className="space-y-3 pt-2"
            onSubmit={(event) => {
              event.preventDefault();
              actions.onJoinWithCode();
            }}
          >
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
              type="submit"
              data-cy="login-join-room"
              disabled={!status.canJoinWithCode}
              className="h-14 w-full rounded-xl border border-login-card-border bg-login-field text-lg font-semibold text-login-card-foreground hover:bg-login-helper"
            >
              {loadingLabel ?? copy.buttons.joinRoom}
            </Button>
          </form>}
        </div>
      </section>

      <footer className="mt-8 text-xs text-login-footer" data-cy="login-footer">
        {copy.footer.prefix} <span className="mx-2">{copy.footer.separator}</span> {copy.footer.linkLabel}
      </footer>
    </article>
  );
}

