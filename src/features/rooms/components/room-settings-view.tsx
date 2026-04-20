import {
  CheckCircle2,
  Clock3,
  Copy,
  X,
} from "lucide-react";

import { Button, Input, Label } from "@/shared/ui";
import { RoomPageHeader, RoomSidebar } from "@/shared/navigation";
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
    onLogout: () => void;
    onSaveAsDefault: () => void;
    onApplySettings: () => void;
    onDismissSuccess: () => void;
  };
};

const timerMarks = [15, 300] as const;

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
      {status.success && (
        <div className="fixed right-4 top-4 z-50 w-[min(92vw,420px)]" data-cy="room-toast" role="status" aria-live="polite">
          <div className="flex items-start gap-3 rounded-2xl border border-login-accent/40 bg-login-card px-4 py-3 shadow-2xl shadow-black/40">
            <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-login-accent text-login-accent-foreground">
              <CheckCircle2 className="size-4" aria-hidden />
            </span>
            <p className="min-w-0 flex-1 text-sm font-medium text-login-card-foreground">{status.success}</p>
            <Button
              type="button"
              onClick={actions.onDismissSuccess}
              data-cy="room-toast-close"
              variant="ghost"
              className="size-7 rounded-full p-0 text-login-footer hover:bg-login-helper hover:text-login-card-foreground"
              aria-label="Fechar notificação"
            >
              <X className="size-4" aria-hidden />
            </Button>
          </div>
        </div>
      )}

      <div className="grid min-h-dvh w-full grid-cols-1 lg:grid-cols-[minmax(220px,250px)_minmax(0,1fr)] xl:grid-cols-[minmax(230px,260px)_minmax(0,1fr)] 2xl:grid-cols-[minmax(240px,280px)_minmax(0,1fr)]">
        <RoomSidebar
          brand={copy.brand}
          navigation={copy.navigation}
          participants={{
            label: copy.sidebar.participantsLabel,
            activeCount: copy.sidebar.activeParticipants,
            helper: "Equipe conectada e pronta para estimar.",
          }}
          inviteTeam={{
            label: copy.sidebar.inviteTeam,
            onClick: actions.onInviteTeam,
            disabled: !status.canInviteTeam,
          }}
          logout={{
            label: copy.buttons.logout,
            onClick: actions.onLogout,
          }}
        />

        <div className="flex min-w-0 flex-col px-3 py-3 sm:px-5 sm:py-4 md:px-6 md:py-5 lg:px-8 lg:py-6 xl:px-10 xl:py-7 2xl:px-12 2xl:py-8">
          <RoomPageHeader
            titleId="room-settings-title"
            brandLabel={copy.brand.logoAlt.replace("Logo do ", "")}
            moderatorLabel="Moderador"
            badge={copy.header.badge}
            title={copy.header.title}
            description={copy.header.description}
          />

          <form
            className="flex w-full flex-col gap-5 md:gap-6 lg:gap-7"
            onSubmit={(event) => {
              event.preventDefault();
              actions.onApplySettings();
            }}
            aria-describedby="room-settings-feedback"
          >
            <section className="grid gap-5 md:gap-6 lg:grid-cols-2 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
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
                      aria-label={copy.buttons.copyRoomCode}
                      className="h-14 rounded-2xl border border-login-card-border bg-login-field px-4 text-base font-semibold text-login-card-foreground transition-colors hover:bg-login-helper"
                    >
                      <Copy className="size-4" aria-hidden />
                      <span className="ml-2">{copy.buttons.copyRoomCode}</span>
                    </Button>
                  </CardContent>
                </Card>

                <section className="rounded-3xl border border-login-card-border bg-login-card p-5 md:p-6 shadow-2xl shadow-black/20" aria-labelledby="estimation-system-title">
                  <div className="space-y-2">
                    <h2 id="estimation-system-title" className="text-sm font-semibold uppercase tracking-[0.18em] text-login-card-foreground">
                      {copy.fields.estimationSystem.label}
                    </h2>
                    <p className="text-sm text-login-card-foreground/75">Escolha a escala que melhor combina com o seu time.</p>
                  </div>

                   <fieldset className="mt-5">
                     <legend className="sr-only">{copy.fields.estimationSystem.label}</legend>
                     <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                      {[
                        {
                          value: "fibonacci" as const,
                          title: copy.fields.estimationSystem.fibonacci.title,
                          description: copy.fields.estimationSystem.fibonacci.description,
                          values: copy.fields.estimationSystem.fibonacci.values,
                        },
                        {
                          value: "tshirt" as const,
                          title: copy.fields.estimationSystem.tshirt.title,
                          description: copy.fields.estimationSystem.tshirt.description,
                          values: copy.fields.estimationSystem.tshirt.values,
                        },
                        {
                          value: "powersOf2" as const,
                          title: copy.fields.estimationSystem.powersOf2.title,
                          description: copy.fields.estimationSystem.powersOf2.description,
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
                                <span className="min-w-0 text-lg font-semibold leading-tight">{option.title}</span>
                                {selected && <CheckCircle2 className="size-5 text-login-accent" aria-hidden />}
                              </div>
                              <p className="mt-4 text-sm leading-6 text-login-card-foreground/75">
                                {option.description}
                              </p>
                              <p className="mt-2 text-xs text-login-card-foreground/55">
                                Exemplo: {option.values.slice(0, 5).join(" · ")}
                                {option.values.length > 5 ? " ..." : ""}
                              </p>
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

                <section className="rounded-3xl border border-login-card-border bg-login-card p-5 md:p-6 shadow-2xl shadow-black/20" aria-labelledby="reveal-cards-title">
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

            <section className="grid gap-4 rounded-3xl border border-login-card-border bg-login-card p-5 md:p-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 shadow-2xl shadow-black/20" aria-labelledby="room-summary-title">
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
              {showDefaultSaveHint && (
                <p className="text-sm text-login-footer">
                  {copy.messages.authRequiredForDefault}
                </p>
              )}
            </div>

            <footer className="flex flex-col gap-3 border-t border-login-card-border pt-5 md:pt-6 sm:flex-row sm:items-center sm:justify-end md:gap-4">
              {form.isAuthenticated && (
                <Button
                  type="button"
                  data-cy="room-save-default"
                  onClick={actions.onSaveAsDefault}
                  disabled={!status.canSaveAsDefault}
                  className="h-14 w-full rounded-2xl border border-login-card-border bg-login-field px-6 text-base font-semibold text-login-card-foreground transition-colors hover:bg-login-helper sm:w-auto"
                >
                  {copy.buttons.saveAsDefault}
                </Button>
              )}

              <Button
                type="submit"
                data-cy="room-apply-settings"
                disabled={!status.canApplySettings}
                className="h-14 w-full rounded-2xl bg-login-accent px-6 text-base font-semibold text-login-accent-foreground hover:bg-login-accent/90 sm:w-auto"
              >
                {loadingLabel ?? copy.buttons.applySettings}
              </Button>
            </footer>
          </form>
        </div>
      </div>
    </main>
  );
}

