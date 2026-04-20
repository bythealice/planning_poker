import { Sparkles } from "lucide-react";

export type RoomPageHeaderProps = {
  titleId: string;
  brandLabel: string;
  moderatorLabel: string;
  badge: string;
  title: string;
  description: string;
};

export function RoomPageHeader({ titleId, brandLabel, moderatorLabel, badge, title, description }: RoomPageHeaderProps) {
  return (
    <header className="mb-5 flex w-full flex-col items-start gap-2 sm:mb-6 sm:gap-3">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <p className="inline-flex items-center rounded-full border border-login-accent/30 bg-login-accent/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-login-accent sm:px-4 sm:text-xs">
          <Sparkles className="mr-2 size-4" aria-hidden />
          {badge}
        </p>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <div className="rounded-full border border-login-card-border bg-login-card px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-login-card-foreground sm:px-4 sm:text-xs">
            {brandLabel}
          </div>
          <div className="rounded-full border border-login-accent/40 bg-login-accent/10 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-login-accent sm:px-4 sm:text-xs">
            {moderatorLabel}
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl space-y-2 sm:space-y-3">
        <h1 id={titleId} className="text-3xl font-semibold tracking-tight sm:text-4xl xl:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-login-footer sm:text-base sm:leading-7">{description}</p>
      </div>
    </header>
  );
}

