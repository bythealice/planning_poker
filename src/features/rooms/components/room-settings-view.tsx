import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  Copy,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

import { Button, Input, Label } from "@/shared/ui";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Slider } from "@/shared/ui/slider";
import { Switch } from "@/shared/ui/switch";

import type { RoomSettingsCopy } from "../content/room-settings-copy";
import type { RoomSettingsFormData } from "../types/room-settings-schema";

export type RoomSettingsViewProps = {
  copy: RoomSettingsCopy;
  form: {
    roomCode: string;
    roomName: string;
    estimationSystem: RoomSettingsFormData["estimationSystem"];
    showTitleDuringVoting: boolean;
    showParticipantCount: boolean;
    revealCardsBy: RoomSettingsFormData["revealCardsBy"];
    roundTimerEnabled: boolean;
    roundTimerSeconds: number;
    isAuthenticated: boolean;
  };
  status: {
    banner?: string | null;
    error?: string | null;
    success?: string | null;
    isLoading?: boolean;
    canCopyRoomCode?: boolean;
    canInviteTeam?: boolean;
    canApplySettings?: boolean;
    canSaveAsDefault?: boolean;
  };
  actions: {
    onRoomNameChange: (value: string) => void;
    onEstimationSystemChange: (value: RoomSettingsFormData["estimationSystem"]) => void;
    onShowTitleDuringVotingChange: (value: boolean) => void;
    onShowParticipantCountChange: (value: boolean) => void;
    onRevealCardsByChange: (value: RoomSettingsFormData["revealCardsBy"]) => void;
    onRoundTimerEnabledChange: (value: boolean) => void;
    onRoundTimerSecondsChange: (value: number) => void;
    onCopyRoomCode: () => void;
    onInviteTeam: () => void;
    onSaveAsDefault: () => void;
    onApplySettings: () => void;
  };
};

const timerMarks = [15, 60, 300] as const;

function formatTimerLabel(seconds: number) {
  if (seconds >= 60 && seconds % 60 === 0) {
    return `${seconds / 60}m`;
  }

  return `${seconds}s`;
}

export function RoomSettingsView({ copy, form, status, actions }: RoomSettingsViewProps) {
  const loadingLabel = status.isLoading ? copy.buttons.loading : null;
  const showDefaultSaveHint = !form.isAuthenticated;

  return (
    <main className="min-h-dvh bg-login-bg text-login-card-foreground" data-cy="room-settings-page" aria-labelledby="room-settings-title">
      <div className="mx-auto grid min-h-dvh max-w-430 lg:grid-cols-[286px_minmax(0,1fr)]">
        <aside className="flex flex-col border-b border-login-card-border bg-[#111213] px-5 py-6 lg:min-h-dvh lg:border-b-0 lg:border-r">
          <header className="space-y-6">
            <Link href="/login" className="inline-flex items-center justify-start" aria-label="Voltar para a tela de login">
              <Image
                src={copy.brand.logoSrc}
                alt={copy.brand.logoAlt}
                width={copy.brand.logoWidth}
                height={copy.brand.logoHeight}
                priority
                className="h-auto w-auto"
              />
            </Link>

            <nav aria-label="Navegação principal" className="space-y-2">
              {[
                copy.navigation.voting,
                copy.navigation.history,
                copy.navigation.insights,
                copy.navigation.settings,
              ].map((item, index) => (
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
                {copy.sidebar.participantsLabel}
              </h2>
            </div>
            <p className="text-3xl font-semibold tracking-tight text-login-card-foreground">
              {copy.sidebar.activeParticipants}
            </p>
            <p className="mt-2 text-sm text-login-footer">Equipe conectada e pronta para estimar.</p>
          </section>

          <div className="mt-auto pt-6">
            <Button
              type="button"
              data-cy="room-invite-team"
              onClick={actions.onInviteTeam}
              disabled={!status.canInviteTeam}
              className="h-14 w-full rounded-2xl bg-login-card text-base font-semibold text-login-card-foreground hover:bg-login-helper"
            >
              <Share2 className="mr-2 size-4" aria-hidden />
              {copy.sidebar.inviteTeam}
            </Button>
          </div>
        </aside>

        <div className="flex flex-col px-4 py-6 sm:px-6 lg:px-10 lg:py-8">
          <header className="mx-auto mb-8 flex w-full max-w-5xl flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              {status.banner ? (
                <div className="inline-flex items-center gap-3 rounded-full border border-login-card-border bg-login-card px-4 py-3 text-sm font-semibold text-login-card-foreground shadow-2xl shadow-black/20">
                  <span className="inline-flex size-6 items-center justify-center rounded-full bg-login-accent text-login-accent-foreground">
                    <CheckCircle2 className="size-4" aria-hidden />
                  </span>
                  {status.banner}
                  <span className="text-login-footer">{form.roomCode}</span>
                </div>
              ) : (
                <div />
              )}

              <div className="flex items-center gap-3">
                <div className="rounded-full border border-login-card-border bg-login-card px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                  {copy.brand.logoAlt.replace("Logo do ", "")}
                </div>
                <div className="rounded-full border border-login-accent/40 bg-login-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-login-accent">
                  Moderador
                </div>
              </div>
            </div>

            <div className="max-w-3xl space-y-3">
              <p className="inline-flex items-center gap-2 rounded-full border border-login-accent/30 bg-login-accent/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-login-accent">
                <Sparkles className="size-4" aria-hidden />
                {copy.header.badge}
              </p>
              <h1 id="room-settings-title" className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {copy.header.title}
              </h1>
              <p className="max-w-2xl text-base text-login-footer sm:text-lg">
                {copy.header.description}
              </p>
            </div>
          </header>

          <form
            className="mx-auto flex w-full max-w-5xl flex-col gap-6"
            onSubmit={(event) => {
              event.preventDefault();
              actions.onApplySettings();
            }}
            aria-describedby="room-settings-feedback"
          >
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
              <div className="space-y-6">
                <Card aria-labelledby="room-name-title">
                  <CardHeader className="space-y-1">
                    <CardTitle id="room-name-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                      {copy.fields.roomName.label}
                    </CardTitle>
                    <CardDescription className="text-login-card-foreground/75">{copy.fields.roomName.helper}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Label htmlFor="room-name" className="sr-only">
                      {copy.fields.roomName.label}
                    </Label>
                    <Input
                      id="room-name"
                      data-cy="room-name"
                      value={form.roomName}
                      onChange={(event) => actions.onRoomNameChange(event.target.value)}
                      placeholder={copy.fields.roomName.placeholder}
                      className="h-14 rounded-2xl border-login-card-border bg-login-field px-4 text-base text-login-field-foreground placeholder:text-login-field-placeholder"
                    />
                  </CardContent>
                </Card>

                <Card aria-labelledby="room-code-title">
                  <CardHeader className="space-y-1">
                    <CardTitle id="room-code-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                      {copy.fields.roomCode.label}
                    </CardTitle>
                    <CardDescription className="text-login-card-foreground/75">{copy.fields.roomCode.helper}</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                    <Input
                      id="room-code"
                      data-cy="room-code"
                      value={form.roomCode}
                      readOnly
                      aria-readonly="true"
                      className="h-14 rounded-2xl border-login-card-border bg-login-field px-4 font-mono text-xl font-semibold uppercase tracking-[0.22em] text-login-card-foreground placeholder:text-login-card-foreground/30"
                    />
                    <Button
                      type="button"
                      data-cy="room-copy-code"
                      onClick={actions.onCopyRoomCode}
                      disabled={!status.canCopyRoomCode}
                      variant="outline"
                      aria-label={copy.buttons.copyRoomCode}
                      className="h-14 rounded-2xl border border-login-card-border bg-login-field px-4 text-sm font-semibold text-login-card-foreground transition-colors hover:bg-login-helper"
                    >
                      <Copy className="size-4" aria-hidden />
                      <span className="ml-2">{copy.buttons.copyRoomCode}</span>
                    </Button>
                  </CardContent>
                </Card>

                <section className="rounded-3xl border border-login-card-border bg-login-card p-6 shadow-2xl shadow-black/20" aria-labelledby="estimation-system-title">
                  <div className="space-y-2">
                    <h2 id="estimation-system-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                      {copy.fields.estimationSystem.label}
                    </h2>
                    <p className="text-sm text-login-card-foreground/75">Escolha a escala que melhor combina com o seu time.</p>
                  </div>

                  <fieldset className="mt-5">
                    <legend className="sr-only">{copy.fields.estimationSystem.label}</legend>
                    <ul className="grid gap-3 md:grid-cols-3">
                      {[
                        {
                          value: "fibonacci" as const,
                          title: copy.fields.estimationSystem.fibonacci.title,
                          values: copy.fields.estimationSystem.fibonacci.values,
                        },
                        {
                          value: "tshirt" as const,
                          title: copy.fields.estimationSystem.tshirt.title,
                          values: copy.fields.estimationSystem.tshirt.values,
                        },
                        {
                          value: "powersOf2" as const,
                          title: copy.fields.estimationSystem.powersOf2.title,
                          values: copy.fields.estimationSystem.powersOf2.values,
                        },
                      ].map((option) => {
                        const selected = form.estimationSystem === option.value;

                        return (
                          <li key={option.value}>
                            <label
                              className={
                                selected
                                  ? "flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-login-accent bg-login-accent/10 p-5 text-login-card-foreground"
                                  : "flex h-full cursor-pointer flex-col justify-between rounded-3xl border border-login-card-border bg-login-field p-5 text-login-card-foreground/50 transition-colors hover:border-login-accent/50 hover:bg-login-helper hover:text-login-card-foreground"
                              }
                            >
                              <input
                                type="radio"
                                name="estimation-system"
                                value={option.value}
                                checked={selected}
                                onChange={() => actions.onEstimationSystemChange(option.value)}
                                className="sr-only"
                              />
                              <div className="flex items-start justify-between gap-3">
                                <span className="text-lg font-semibold">{option.title}</span>
                                {selected && <CheckCircle2 className="size-5 text-login-accent" aria-hidden />}
                              </div>
                              <div className="mt-6 flex gap-2">
                                {option.values.map((value) => (
                                  <span
                                    key={value}
                                    className="inline-flex min-w-10 items-center justify-center rounded-lg bg-[#202123] px-3 py-2 font-mono text-sm text-login-card-foreground"
                                  >
                                    {value}
                                  </span>
                                ))}
                              </div>
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </fieldset>
                </section>
              </div>

              <div className="space-y-6">
                <Card aria-labelledby="visibility-title">
                  <CardHeader className="space-y-1">
                    <CardTitle id="visibility-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                      {copy.fields.visibility.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-login-field px-4 py-4">
                      <span className="space-y-1">
                        <span className={form.showTitleDuringVoting ? "block font-semibold text-login-card-foreground" : "block font-semibold text-login-card-foreground/65"}>
                          {copy.fields.visibility.showTitle.label}
                        </span>
                        <span className={form.showTitleDuringVoting ? "block text-sm text-login-card-foreground/70" : "block text-sm text-login-card-foreground/45"}>
                          {copy.fields.visibility.showTitle.helper}
                        </span>
                      </span>
                      <Switch
                        checked={form.showTitleDuringVoting}
                        onCheckedChange={actions.onShowTitleDuringVotingChange}
                        aria-label={copy.fields.visibility.showTitle.label}
                      />
                    </Label>

                    <Label className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl bg-login-field px-4 py-4">
                      <span className="space-y-1">
                        <span className={form.showParticipantCount ? "block font-semibold text-login-card-foreground" : "block font-semibold text-login-card-foreground/65"}>
                          {copy.fields.visibility.showParticipantCount.label}
                        </span>
                        <span className={form.showParticipantCount ? "block text-sm text-login-card-foreground/70" : "block text-sm text-login-card-foreground/45"}>
                          {copy.fields.visibility.showParticipantCount.helper}
                        </span>
                      </span>
                      <Switch
                        checked={form.showParticipantCount}
                        onCheckedChange={actions.onShowParticipantCountChange}
                        aria-label={copy.fields.visibility.showParticipantCount.label}
                      />
                    </Label>
                  </CardContent>
                </Card>

                <section className="rounded-3xl border border-login-card-border bg-login-card p-6 shadow-2xl shadow-black/20" aria-labelledby="reveal-cards-title">
                  <div className="space-y-2">
                    <h2 id="reveal-cards-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                      {copy.fields.revealCards.title}
                    </h2>
                  </div>

                  <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
                    <legend className="sr-only">{copy.fields.revealCards.title}</legend>
                    {[
                      {
                        value: "host-only" as const,
                        label: copy.fields.revealCards.hostOnly,
                      },
                      {
                        value: "anyone" as const,
                        label: copy.fields.revealCards.anyone,
                      },
                    ].map((option) => {
                      const selected = form.revealCardsBy === option.value;

                      return (
                        <label
                          key={option.value}
                          className={
                            selected
                              ? "flex cursor-pointer items-center gap-3 rounded-2xl border border-login-accent bg-login-accent/10 px-4 py-4 font-semibold text-login-card-foreground"
                              : "flex cursor-pointer items-center gap-3 rounded-2xl border border-login-card-border bg-login-field px-4 py-4 font-semibold text-login-card-foreground/50 transition-colors hover:border-login-accent/50 hover:bg-login-helper hover:text-login-card-foreground"
                          }
                        >
                          <input
                            type="radio"
                            name="reveal-cards-by"
                            value={option.value}
                            checked={selected}
                            onChange={() => actions.onRevealCardsByChange(option.value)}
                            className="sr-only"
                          />
                          <span
                            className={
                              selected
                                ? "inline-flex size-5 items-center justify-center rounded-full border-2 border-login-accent bg-login-accent/20"
                                : "inline-flex size-5 items-center justify-center rounded-full border-2 border-login-footer"
                            }
                          >
                            <span
                              className={
                                selected
                                  ? "size-2.5 rounded-full bg-login-accent"
                                  : "size-2.5 rounded-full bg-transparent"
                              }
                            />
                          </span>
                          <span>{option.label}</span>
                        </label>
                      );
                    })}
                  </fieldset>
                </section>

                <Card aria-labelledby="timer-title">
                  <CardHeader className="flex-row items-start justify-between gap-4 space-y-0">
                    <div className="space-y-1">
                      <CardTitle id="timer-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                        {copy.fields.roundTimer.title}
                      </CardTitle>
                      <CardDescription className="text-login-card-foreground/75">{copy.fields.roundTimer.helper}</CardDescription>
                    </div>
                    <Switch
                      checked={form.roundTimerEnabled}
                      onCheckedChange={actions.onRoundTimerEnabledChange}
                      aria-label={copy.fields.roundTimer.title}
                    />
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Slider
                      min={15}
                      max={300}
                      step={15}
                      value={form.roundTimerSeconds}
                      onValueChange={actions.onRoundTimerSecondsChange}
                      disabled={!form.roundTimerEnabled}
                      aria-label={copy.fields.roundTimer.title}
                    />
                    <div className="flex items-center justify-between text-xs text-login-card-foreground/60">
                      {timerMarks.map((mark) => (
                        <span key={mark} className={mark === form.roundTimerSeconds ? "text-login-accent" : undefined}>
                          {formatTimerLabel(mark)}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="grid gap-4 rounded-3xl border border-login-card-border bg-login-card p-6 shadow-2xl shadow-black/20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" aria-labelledby="room-summary-title">
              <div className="space-y-2">
                <h2 id="room-summary-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                  Resumo da sala
                </h2>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-login-footer">Sistema</dt>
                    <dd className="mt-1 font-semibold capitalize text-login-card-foreground">{form.estimationSystem}</dd>
                  </div>
                  <div>
                    <dt className="text-login-footer">Cartas</dt>
                    <dd className="mt-1 font-semibold text-login-card-foreground">{form.revealCardsBy === "host-only" ? copy.fields.revealCards.hostOnly : copy.fields.revealCards.anyone}</dd>
                  </div>
                  <div>
                    <dt className="text-login-footer">Título visível</dt>
                    <dd className="mt-1 font-semibold text-login-card-foreground">{form.showTitleDuringVoting ? "Sim" : "Não"}</dd>
                  </div>
                  <div>
                    <dt className="text-login-footer">Participantes visíveis</dt>
                    <dd className="mt-1 font-semibold text-login-card-foreground">{form.showParticipantCount ? "Sim" : "Não"}</dd>
                  </div>
                </dl>
              </div>

              <div className="space-y-2 rounded-3xl border border-login-card-border bg-login-field p-5">
                <div className="flex items-center gap-2 text-login-accent">
                  <Clock3 className="size-5" aria-hidden />
                  <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">Cronômetro</h2>
                </div>
                <p className="text-sm text-login-card-foreground/75">
                  {form.roundTimerEnabled ? `Rodada automática em ${formatTimerLabel(form.roundTimerSeconds)}` : "Cronômetro desativado"}
                </p>
              </div>
            </section>

            <div id="room-settings-feedback" className="space-y-3">
              {status.error && (
                <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert" aria-live="assertive">
                  {status.error}
                </p>
              )}
              {status.success && (
                <p className="rounded-2xl border border-login-accent/30 bg-login-accent/10 px-4 py-3 text-sm text-login-card-foreground" role="status" aria-live="polite">
                  {status.success}
                </p>
              )}
              {showDefaultSaveHint && (
                <p className="text-sm text-login-footer">
                  {copy.messages.authRequiredForDefault}
                </p>
              )}
            </div>

            <footer className="flex flex-col gap-3 border-t border-login-card-border pt-6 sm:flex-row sm:items-center sm:justify-end">
              <Button
                type="submit"
                data-cy="room-apply-settings"
                disabled={!status.canApplySettings}
                className="h-14 w-full rounded-2xl border border-login-card-border bg-login-field px-6 text-base font-semibold text-login-card-foreground transition-colors hover:bg-login-helper sm:w-auto"
              >
                {loadingLabel ?? copy.buttons.applySettings}
              </Button>

              {form.isAuthenticated && (
                <Button
                  type="button"
                  data-cy="room-save-default"
                  onClick={actions.onSaveAsDefault}
                  disabled={!status.canSaveAsDefault}
                  className="h-14 w-full rounded-2xl bg-login-accent px-6 text-base font-semibold text-login-accent-foreground hover:bg-login-accent/90 sm:w-auto"
                >
                  {copy.buttons.saveAsDefault}
                </Button>
              )}
            </footer>
          </form>
        </div>
      </div>
    </main>
  );
}

