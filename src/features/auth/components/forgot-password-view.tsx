import Link from "next/link";

import { Button, Input } from "@/shared/ui";

import type { ForgotPasswordCopy } from "../content/forgot-password-copy";

export type ForgotPasswordViewProps = {
  copy: ForgotPasswordCopy;
  form: {
    email: string;
    emailError?: string;
  };
  status: {
    success?: string | null;
    isLoading?: boolean;
    canSubmit?: boolean;
  };
  actions: {
    onEmailChange: (value: string) => void;
    onSendRecovery: () => void;
  };
};

export function ForgotPasswordView({ copy, form, status, actions }: ForgotPasswordViewProps) {
  const submitLabel = status.isLoading ? copy.buttons.loading : copy.buttons.send;
  const emailErrorId = form.emailError ? "forgot-password-email-error" : undefined;

  return (
    <article
      className="w-full max-w-login-card rounded-2xl border border-login-card-border bg-login-card p-8 text-login-card-foreground shadow-2xl shadow-black/40"
      data-cy="forgot-password-card"
      aria-labelledby="forgot-password-title"
    >
      <header className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold" data-cy="forgot-password-title" id="forgot-password-title">
          {copy.title}
        </h1>
        <p className="text-sm text-login-footer">{copy.subtitle}</p>
      </header>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          actions.onSendRecovery();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="forgot-password-email" className="text-xs font-semibold tracking-[0.16em] text-login-label">
            {copy.fields.email.label}
          </label>
          <Input
            id="forgot-password-email"
            data-cy="forgot-password-email"
            type="email"
            value={form.email}
            onChange={(event) => actions.onEmailChange(event.target.value)}
            placeholder={copy.fields.email.placeholder}
            aria-invalid={Boolean(form.emailError)}
            aria-describedby={["forgot-password-email-helper", emailErrorId].filter(Boolean).join(" ")}
            className="h-12 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder"
          />
          {form.emailError && (
            <p id="forgot-password-email-error" className="text-sm text-destructive" role="alert">
              {form.emailError}
            </p>
          )}
          <p id="forgot-password-email-helper" className="text-xs text-login-footer">
            {copy.fields.email.helper}
          </p>
        </div>

        {status.success && (
          <p className="rounded-md bg-login-success/10 px-3 py-2 text-sm text-login-success" data-cy="forgot-password-success" role="status" aria-live="polite">
            {status.success}
          </p>
        )}

        <Button
          type="submit"
          data-cy="forgot-password-submit"
          disabled={!status.canSubmit}
          className="h-12 w-full rounded-xl bg-login-accent text-base font-semibold text-login-accent-foreground hover:bg-login-accent/90"
        >
          {submitLabel}
        </Button>

        <Link href="/login" data-cy="forgot-password-back-login" className="block text-center text-sm text-login-accent underline-offset-4 hover:underline">
          {copy.buttons.backToLogin}
        </Link>
      </form>
    </article>
  );
}

