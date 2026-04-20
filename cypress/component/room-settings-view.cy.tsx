import { mount } from "cypress/react";

import { RoomSettingsView } from "@/features/rooms/components/room-settings-view";
import { roomSettingsCopy } from "@/features/rooms/content/room-settings-copy";
import type { RoomSettingsViewProps } from "@/features/rooms/components/room-settings-view";
import { getByCy } from "../support/commands";

describe("RoomSettingsView", () => {
  const buildActions = () => ({
    onRoomNameChange: cy.stub().as("onRoomNameChange"),
    onEstimationSystemChange: cy.stub().as("onEstimationSystemChange"),
    onShowTitleDuringVotingChange: cy.stub().as("onShowTitleDuringVotingChange"),
    onShowParticipantCountChange: cy.stub().as("onShowParticipantCountChange"),
    onRevealCardsByChange: cy.stub().as("onRevealCardsByChange"),
    onRoundTimerEnabledChange: cy.stub().as("onRoundTimerEnabledChange"),
    onRoundTimerSecondsChange: cy.stub().as("onRoundTimerSecondsChange"),
    onCopyRoomCode: cy.stub().as("onCopyRoomCode"),
    onInviteTeam: cy.stub().as("onInviteTeam"),
    onLogout: cy.stub().as("onLogout"),
    onSaveAsDefault: cy.stub().as("onSaveAsDefault"),
    onApplySettings: cy.stub().as("onApplySettings"),
    onDismissSuccess: cy.stub().as("onDismissSuccess"),
  });

  const mountView = (overrides?: {
    form?: Partial<RoomSettingsViewProps["form"]>;
    status?: Partial<RoomSettingsViewProps["status"]>;
  }) => {
    const actions = buildActions();

    mount(
      <RoomSettingsView
        copy={roomSettingsCopy}
        form={{
          roomCode: "SPRINT-42",
          roomName: "Sprint 42 Planning",
          estimationSystem: "fibonacci",
          showTitleDuringVoting: true,
          showParticipantCount: false,
          revealCardsBy: "host-only",
          roundTimerEnabled: true,
          roundTimerSeconds: 60,
          isAuthenticated: false,
          ...overrides?.form,
        }}
        status={{
          banner: "Sala aberta!",
          error: null,
          success: null,
          isLoading: false,
          canCopyRoomCode: true,
          canInviteTeam: true,
          canApplySettings: true,
          canSaveAsDefault: false,
          ...overrides?.status,
        }}
        actions={actions}
      />,
    );
  };

  it("renders the page and triggers primary actions", () => {
    mountView();

    getByCy("room-settings-page").should("be.visible");
    getByCy("room-code").should("have.value", "SPRINT-42");
    getByCy("room-code").should("have.attr", "readonly");

    getByCy("room-copy-code").click();
    cy.get("@onCopyRoomCode").should("have.been.calledOnce");

    getByCy("room-invite-team").click();
    cy.get("@onInviteTeam").should("have.been.calledOnce");

    getByCy("room-logout").click();
    cy.get("@onLogout").should("have.been.calledOnce");

    getByCy("room-save-default").should("not.exist");

    getByCy("room-apply-settings").click();
    cy.get("@onApplySettings").should("have.been.calledOnce");
  });

  it("shows save as default for authenticated users", () => {
    mountView({
      form: { isAuthenticated: true },
      status: { banner: null, canSaveAsDefault: true },
    });

    getByCy("room-save-default").should("be.visible").click();
    cy.get("@onSaveAsDefault").should("have.been.calledOnce");
  });

  it("shows and dismisses success toast", () => {
    mountView({ status: { success: "Configurações aplicadas com sucesso." } });

    getByCy("room-toast").should("be.visible");
    getByCy("room-toast-close").click();
    cy.get("@onDismissSuccess").should("have.been.calledOnce");
  });

  it("renders error feedback and disables actions when status blocks them", () => {
    mountView({
      status: {
        error: "Erro ao aplicar configurações.",
        canCopyRoomCode: false,
        canInviteTeam: false,
        canApplySettings: false,
      },
    });

    cy.contains("Erro ao aplicar configurações.").should("be.visible");
    getByCy("room-copy-code").should("be.disabled");
    getByCy("room-invite-team").should("be.disabled");
    getByCy("room-apply-settings").should("be.disabled");
  });

  it("renders timer tooltip with long values in a single line", () => {
    mountView({ form: { roundTimerSeconds: 270 } });

    cy.get("#timer-current-value")
      .should("have.class", "whitespace-nowrap")
      .and("contain.text", "4m 30s");

    cy.get('input[type="range"][aria-label="Cronômetro da rodada"]')
      .should("have.attr", "aria-valuetext", "4m 30s");
  });
});

