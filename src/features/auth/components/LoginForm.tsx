"use client";

import { Button, Input } from "@/shared/ui";

import { useLoginVM } from "@/features/auth/hooks/use-login-vm";

export function LoginForm() {
  const vm = useLoginVM();
  const emailInputId = "login-email";

  return (
    <form
      onSubmit={vm.handleLogin}
      noValidate
      className="w-full max-w-sm space-y-4 rounded-lg border border-border bg-card p-5"
    >
      <div className="space-y-2">
        <h1 className="text-lg font-semibold">Entrar</h1>
        <p className="text-sm text-muted-foreground">
          Use seu e-mail para iniciar no Planning Poker.
        </p>
      </div>

      <div className="space-y-1.5">
        <label htmlFor={emailInputId} className="text-sm font-medium">
          E-mail
        </label>
        <Input
          id={emailInputId}
          type="email"
          value={vm.email}
          onChange={(event) => vm.setEmail(event.target.value)}
          placeholder="voce@empresa.com"
        />
        {vm.fieldError && (
          <p className="text-sm text-destructive" role="alert">
            {vm.fieldError}
          </p>
        )}
      </div>

      {vm.error && (
        <p className="text-sm text-destructive" role="alert">
          {vm.error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={!vm.canSubmit}>
        {vm.isLoading ? "Carregando..." : "Entrar"}
      </Button>
    </form>
  );
}

