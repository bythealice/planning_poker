import { mount } from "cypress/react";

import { RoomSettingsView } from "@/features/rooms/components/room-settings-view";
import { roomSettingsCopy } from "@/features/rooms/content/room-settings-copy";
import { getByCy } from "../support/commands";

describe("RoomSettingsView", () => {
  it("renders the room settings page and keeps the share code read-only", () => {
    const actions = {
      onRoomNameChange: cy.stub(),
      onEstimationSystemChange: cy.stub(),
      onShowTitleDuringVotingChange: cy.stub(),
      onShowParticipantCountChange: cy.stub(),
      onRevealCardsByChange: cy.stub(),
      onRoundTimerEnabledChange: cy.stub(),
      onRoundTimerSecondsChange: cy.stub(),
      onCopyRoomCode: cy.stub().as("onCopyRoomCode"),
      onInviteTeam: cy.stub().as("onInviteTeam"),
      onSaveAsDefault: cy.stub().as("onSaveAsDefault"),
      onApplySettings: cy.stub().as("onApplySettings"),
    };

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
        }}
        actions={actions}
      />,
    );

    getByCy("room-settings-page").should("be.visible");
    getByCy("room-code").should("have.value", "SPRINT-42");
    getByCy("room-code").should("have.attr", "readonly");
    getByCy("room-copy-code").click();
    cy.get("@onCopyRoomCode").should("have.been.calledOnce");
    getByCy("room-invite-team").click();
    cy.get("@onInviteTeam").should("have.been.calledOnce");
    getByCy("room-save-default").should("not.exist");
    getByCy("room-apply-settings").click();
    cy.get("@onApplySettings").should("have.been.calledOnce");
  });

  it("shows save as default for authenticated users", () => {
    const actions = {
      onRoomNameChange: cy.stub(),
      onEstimationSystemChange: cy.stub(),
      onShowTitleDuringVotingChange: cy.stub(),
      onShowParticipantCountChange: cy.stub(),
      onRevealCardsByChange: cy.stub(),
      onRoundTimerEnabledChange: cy.stub(),
      onRoundTimerSecondsChange: cy.stub(),
      onCopyRoomCode: cy.stub(),
      onInviteTeam: cy.stub(),
      onSaveAsDefault: cy.stub().as("onSaveAsDefault"),
      onApplySettings: cy.stub(),
    };

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
          isAuthenticated: true,
        }}
        status={{
          banner: null,
          error: null,
          success: null,
          isLoading: false,
          canCopyRoomCode: true,
          canInviteTeam: true,
          canApplySettings: true,
          canSaveAsDefault: true,
        }}
        actions={actions}
      />,
    );

    getByCy("room-save-default").should("be.visible").click();
    cy.get("@onSaveAsDefault").should("have.been.calledOnce");
  });
});

