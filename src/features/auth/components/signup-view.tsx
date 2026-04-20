import Link from "next/link";

import { Button, Input } from "@/shared/ui";

import type { SignupCopy } from "../content/signup-copy";

export type SignupViewProps = {
  copy: SignupCopy;
  form: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    nameError?: string;
    emailError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
  };
  status: {
    success?: string | null;
    isLoading?: boolean;
    canSubmit?: boolean;
  };
  actions: {
    onNameChange: (value: string) => void;
    onEmailChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onConfirmPasswordChange: (value: string) => void;
    onCreateAccount: () => void;
  };
};

export function SignupView({ copy, form, status, actions }: SignupViewProps) {
  const submitLabel = status.isLoading ? copy.buttons.loading : copy.buttons.create;
  const nameErrorId = form.nameError ? "signup-name-error" : undefined;
  const emailErrorId = form.emailError ? "signup-email-error" : undefined;
  const passwordErrorId = form.passwordError ? "signup-password-error" : undefined;
  const confirmPasswordErrorId = form.confirmPasswordError ? "signup-confirm-password-error" : undefined;

  return (
    <article className="w-full max-w-login-card rounded-2xl border border-login-card-border bg-login-card p-8 text-login-card-foreground shadow-2xl shadow-black/40" data-cy="signup-card" aria-labelledby="signup-title">
      <header className="mb-6 space-y-2">
        <h1 className="text-2xl font-semibold" data-cy="signup-title">{copy.title}</h1>
        <p className="text-sm text-login-footer">{copy.subtitle}</p>
      </header>

      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          actions.onCreateAccount();
        }}
      >
        <div className="space-y-2">
          <label htmlFor="signup-name" className="text-xs font-semibold tracking-[0.16em] text-login-label">{copy.fields.name.label}</label>
          <Input id="signup-name" data-cy="signup-name" value={form.name} onChange={(event) => actions.onNameChange(event.target.value)} placeholder={copy.fields.name.placeholder} aria-invalid={Boolean(form.nameError)} aria-describedby={nameErrorId} className="h-12 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder" />
          {form.nameError && <p id="signup-name-error" className="text-sm text-destructive" role="alert">{form.nameError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-email" className="text-xs font-semibold tracking-[0.16em] text-login-label">{copy.fields.email.label}</label>
          <Input id="signup-email" data-cy="signup-email" type="email" value={form.email} onChange={(event) => actions.onEmailChange(event.target.value)} placeholder={copy.fields.email.placeholder} aria-invalid={Boolean(form.emailError)} aria-describedby={emailErrorId} className="h-12 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder" />
          {form.emailError && <p id="signup-email-error" className="text-sm text-destructive" role="alert">{form.emailError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-password" className="text-xs font-semibold tracking-[0.16em] text-login-label">{copy.fields.password.label}</label>
          <Input id="signup-password" data-cy="signup-password" type="password" value={form.password} onChange={(event) => actions.onPasswordChange(event.target.value)} placeholder={copy.fields.password.placeholder} aria-invalid={Boolean(form.passwordError)} aria-describedby={passwordErrorId} className="h-12 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder" />
          {form.passwordError && <p id="signup-password-error" className="text-sm text-destructive" role="alert">{form.passwordError}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="signup-confirm-password" className="text-xs font-semibold tracking-[0.16em] text-login-label">{copy.fields.confirmPassword.label}</label>
          <Input id="signup-confirm-password" data-cy="signup-confirm-password" type="password" value={form.confirmPassword} onChange={(event) => actions.onConfirmPasswordChange(event.target.value)} placeholder={copy.fields.confirmPassword.placeholder} aria-invalid={Boolean(form.confirmPasswordError)} aria-describedby={confirmPasswordErrorId} className="h-12 rounded-xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder" />
          {form.confirmPasswordError && <p id="signup-confirm-password-error" className="text-sm text-destructive" role="alert">{form.confirmPasswordError}</p>}
        </div>

        {status.success && <p className="rounded-md bg-login-success/10 px-3 py-2 text-sm text-login-success" data-cy="signup-success" role="status" aria-live="polite">{status.success}</p>}

        <Button type="submit" data-cy="signup-submit" disabled={!status.canSubmit} className="h-12 w-full rounded-xl bg-login-accent text-base font-semibold text-login-accent-foreground hover:bg-login-accent/90">{submitLabel}</Button>

        <Link href="/login" data-cy="signup-back-login" className="block text-center text-sm text-login-accent underline-offset-4 hover:underline">{copy.buttons.backToLogin}</Link>
      </form>
    </article>
  );
}

