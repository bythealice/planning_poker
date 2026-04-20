import Image from "next/image";
import Link from "next/link";
import { BarChart3, CheckCircle2, History, LogOut, Settings2, Share2, Users, Vote } from "lucide-react";

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
  logout: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
};

export function RoomSidebar({ brand, navigation, participants, inviteTeam, logout }: RoomSidebarProps) {
  const navigationItems = [
    { label: navigation.voting, icon: Vote, active: false },
    { label: navigation.history, icon: History, active: false },
    { label: navigation.insights, icon: BarChart3, active: false },
    { label: navigation.settings, icon: Settings2, active: true },
  ] as const;

  return (
    <aside className="flex min-h-dvh flex-col overflow-hidden border-b border-login-card-border bg-[#111213] px-3 py-4 sm:px-4 sm:py-5 md:px-5 md:py-6 lg:sticky lg:top-0 lg:h-dvh lg:w-full lg:border-b-0 lg:border-r lg:px-4 lg:py-5 xl:px-5 xl:py-6">
      <header className="space-y-4 sm:space-y-5">
        <Link href="/login" className="inline-flex items-center justify-start" aria-label="Voltar para a tela de login">
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={brand.logoWidth}
            height={brand.logoHeight}
            priority
          />
        </Link>

        <nav aria-label="Navegação principal" className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                className={
                  item.active
                    ? "flex w-full items-center justify-between rounded-xl border border-login-accent/40 bg-login-accent/10 px-3 py-2.5 text-left text-sm font-semibold text-login-accent lg:px-3.5 lg:py-2.5"
                    : "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-login-footer transition-colors hover:bg-white/5 hover:text-login-card-foreground lg:px-3.5 lg:py-2.5"
                }
                aria-current={item.active ? "page" : undefined}
              >
                <span className="flex items-center gap-2">
                  <Icon className="size-4" aria-hidden />
                  {item.label}
                </span>
                {item.active && <CheckCircle2 className="size-4" aria-hidden />}
              </button>
            );
          })}
        </nav>
      </header>

      <section className="mt-5 rounded-3xl border border-login-card-border bg-login-card p-4 sm:mt-6 sm:p-4 md:p-5">
        <div className="mb-4 flex items-center gap-3 text-login-footer">
          <Users className="size-4 text-login-accent" aria-hidden />
          <h2 id="room-participants-title" className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] sm:text-xs">
            {participants.label}
          </h2>
        </div>
        <p className="text-2xl font-semibold tracking-tight text-login-card-foreground sm:text-[1.75rem]">{participants.activeCount}</p>
        <p className="mt-2 text-sm leading-6 text-login-footer">{participants.helper}</p>
      </section>

      <div className="mt-auto space-y-3 pt-5 sm:pt-6">
        <Button
          type="button"
          data-cy="room-invite-team"
          onClick={inviteTeam.onClick}
          disabled={inviteTeam.disabled}
          className="h-12 w-full rounded-2xl border border-login-accent/40 bg-login-accent px-3 text-sm font-semibold text-login-accent-foreground shadow-lg shadow-login-accent/20 transition-all hover:bg-login-accent/90 hover:shadow-login-accent/30 sm:h-13 sm:px-4 sm:text-base"
        >
          <Share2 className="mr-2 size-4" aria-hidden />
          {inviteTeam.label}
        </Button>

        <Button
          type="button"
          data-cy="room-logout"
          onClick={logout.onClick}
          disabled={logout.disabled}
          variant="ghost"
          className="h-11 w-full rounded-2xl border border-[#6f2b2b] bg-transparent px-3 text-sm font-semibold text-[#b85a5a] transition-colors hover:bg-[#6f2b2b]/10 hover:text-[#d06e6e]"
        >
          <LogOut className="mr-2 size-4" aria-hidden />
          {logout.label}
        </Button>
      </div>
    </aside>
  );
}
