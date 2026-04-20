import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Share2, Users } from "lucide-react";

import { Button } from "@/shared/ui";

export type RoomSidebarProps = {
  brand: {
    logoSrc: string;
    logoAlt: string;
    logoWidth: number;
    logoHeight: number;
  };
  navigation: {
    voting: string;
    history: string;
    insights: string;
    settings: string;
  };
  participants: {
    label: string;
    activeCount: string;
    helper: string;
  };
  inviteTeam: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
};

export function RoomSidebar({ brand, navigation, participants, inviteTeam }: RoomSidebarProps) {
  return (
    <aside className="flex flex-col border-b border-login-card-border bg-[#111213] px-5 py-6 lg:min-h-dvh lg:border-b-0 lg:border-r">
      <header className="space-y-6">
        <Link href="/login" className="inline-flex items-center justify-start" aria-label="Voltar para a tela de login">
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={brand.logoWidth}
            height={brand.logoHeight}
            priority
            className="h-auto w-auto"
          />
        </Link>

        <nav aria-label="Navegação principal" className="space-y-2">
          {[navigation.voting, navigation.history, navigation.insights, navigation.settings].map((item, index) => (
            <button
              key={item}
              type="button"
              className={
                index === 3
                  ? "flex w-full items-center justify-between rounded-xl border border-login-accent/40 bg-login-accent/10 px-4 py-3 text-left text-sm font-semibold text-login-accent"
                  : "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold text-login-footer transition-colors hover:bg-white/5 hover:text-login-card-foreground"
              }
              aria-current={index === 3 ? "page" : undefined}
            >
              <span>{item}</span>
              {index === 3 && <CheckCircle2 className="size-4" aria-hidden />}
            </button>
          ))}
        </nav>
      </header>

      <section className="mt-10 rounded-3xl border border-login-card-border bg-login-card p-5" aria-labelledby="room-participants-title">
        <div className="mb-5 flex items-center gap-3 text-login-footer">
          <Users className="size-5 text-login-accent" aria-hidden />
          <h2 id="room-participants-title" className="text-sm font-semibold uppercase tracking-[0.18em]">
            {participants.label}
          </h2>
        </div>
        <p className="text-3xl font-semibold tracking-tight text-login-card-foreground">{participants.activeCount}</p>
        <p className="mt-2 text-sm text-login-footer">{participants.helper}</p>
      </section>

      <div className="mt-auto pt-6">
        <Button
          type="button"
          data-cy="room-invite-team"
          onClick={inviteTeam.onClick}
          disabled={inviteTeam.disabled}
          className="h-14 w-full rounded-2xl bg-login-card text-base font-semibold text-login-card-foreground hover:bg-login-helper"
        >
          <Share2 className="mr-2 size-4" aria-hidden />
          {inviteTeam.label}
        </Button>
      </div>
    </aside>
  );
}

