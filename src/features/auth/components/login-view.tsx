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
    <div className="flex w-full flex-col items-center">
      <section className="w-full max-w-107.5 rounded-2xl border border-white/10 bg-[#0e121b]/95 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
        <div className="mb-8 flex justify-center">
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
            <label htmlFor="login-name" className="text-xs font-semibold tracking-[0.16em] text-zinc-300">
              {copy.fields.name.label}
            </label>
            <Input
              id="login-name"
              value={form.name}
              onChange={(event) => actions.onNameChange(event.target.value)}
              placeholder={copy.fields.name.placeholder}
              className="h-14 rounded-xl border-white/5 bg-[#151b26] px-4 text-base text-zinc-100 placeholder:text-zinc-500"
            />
            {form.nameError && <p className="text-sm text-red-400" role="alert">{form.nameError}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="login-email" className="text-xs font-semibold tracking-[0.16em] text-zinc-300">
              {copy.fields.email.label}
            </label>
            <Input
              id="login-email"
              type="email"
              value={form.email}
              onChange={(event) => actions.onEmailChange(event.target.value)}
              placeholder={copy.fields.email.placeholder}
              className="h-14 rounded-xl border-white/5 bg-[#151b26] px-4 text-base text-zinc-100 placeholder:text-zinc-500"
            />
            {form.emailError && <p className="text-sm text-red-400" role="alert">{form.emailError}</p>}
            <div className="flex items-center gap-2 rounded-md bg-[#1b2231] px-3 py-2 text-sm text-zinc-300">
              <Info className="size-4 text-[#20dbc6]" aria-hidden />
              <span>{copy.fields.email.helper}</span>
            </div>
          </div>

          <div className="h-px bg-white/20" />

          <div className="space-y-2">
            <label htmlFor="room-code" className="text-xs font-semibold tracking-[0.16em] text-zinc-300">
              {copy.fields.roomCode.label}
            </label>
            <Input
              id="room-code"
              value={form.roomCode}
              onChange={(event) => actions.onRoomCodeChange(event.target.value)}
              placeholder={copy.fields.roomCode.placeholder}
              maxLength={8}
              className="h-14 rounded-xl border-white/5 bg-[#151b26] px-4 text-base uppercase text-zinc-100 placeholder:text-zinc-500"
            />
            {form.roomCodeError && <p className="text-sm text-red-400" role="alert">{form.roomCodeError}</p>}
          </div>

          <label htmlFor="observer-mode" className="flex cursor-pointer items-center justify-between py-1 text-zinc-200">
            <span>{copy.fields.observer.label}</span>
            <span className="relative inline-flex items-center">
              <input
                id="observer-mode"
                type="checkbox"
                checked={form.isObserver}
                onChange={(event) => actions.onObserverChange(event.target.checked)}
                className="peer sr-only"
              />
              <span className="h-6 w-11 rounded-full bg-zinc-600 transition-colors peer-checked:bg-[#17d9c4]" />
              <span className="pointer-events-none absolute left-1 size-4 rounded-full bg-white transition-transform peer-checked:translate-x-5" />
            </span>
          </label>

          {status.error && <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300" role="alert">{status.error}</p>}
          {status.success && <p className="rounded-md bg-emerald-500/10 px-3 py-2 text-sm text-emerald-300" role="status">{status.success}</p>}

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              onClick={actions.onCreateRoom}
              disabled={!status.canCreateRoom}
              className="h-14 w-full rounded-xl bg-[#15d2be] text-lg font-semibold text-[#05130f] hover:bg-[#2ce4d1]"
            >
              {loadingLabel ?? copy.buttons.createRoom}
            </Button>
            <Button
              type="button"
              onClick={actions.onJoinWithCode}
              disabled={!status.canJoinWithCode}
              className="h-14 w-full rounded-xl border border-white/5 bg-[#151b26] text-lg font-semibold text-zinc-100 hover:bg-[#1b2231]"
            >
              {loadingLabel ?? copy.buttons.joinRoom}
            </Button>
          </div>
        </div>
      </section>

      <footer className="mt-8 text-xs text-zinc-500">
        {copy.footer.prefix} <span className="mx-2">{copy.footer.separator}</span> {copy.footer.linkLabel}
      </footer>
    </div>
  );
}

