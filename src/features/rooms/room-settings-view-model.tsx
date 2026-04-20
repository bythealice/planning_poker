"use client";

import { roomSettingsCopy } from "./content/room-settings-copy";
import { RoomSettingsView } from "./components/room-settings-view";
import { useRoomSettingsModel } from "./hooks/use-room-settings-model";

export type RoomSettingsViewModelProps = {
  roomCode: string;
  openedFromCreation?: boolean;
};

export function RoomSettingsViewModel({ roomCode, openedFromCreation }: RoomSettingsViewModelProps) {
  const vm = useRoomSettingsModel({ roomCode, openedFromCreation });

  return (
    <RoomSettingsView
      copy={roomSettingsCopy}
      form={{
        roomCode: vm.roomCode,
        roomName: vm.roomName,
        estimationSystem: vm.estimationSystem,
        showTitleDuringVoting: vm.showTitleDuringVoting,
        showParticipantCount: vm.showParticipantCount,
        revealCardsBy: vm.revealCardsBy,
        roundTimerEnabled: vm.roundTimerEnabled,
        roundTimerSeconds: vm.roundTimerSeconds,
        isAuthenticated: vm.isAuthenticated,
      }}
      status={{
        banner: vm.banner,
        error: vm.error,
        success: vm.success,
        isLoading: vm.isLoading,
        canCopyRoomCode: vm.canCopyRoomCode,
        canInviteTeam: vm.canInviteTeam,
        canApplySettings: vm.canApplySettings,
        canSaveAsDefault: vm.canSaveAsDefault,
      }}
      actions={{
        onRoomNameChange: vm.setRoomName,
        onEstimationSystemChange: vm.setEstimationSystem,
        onShowTitleDuringVotingChange: vm.setShowTitleDuringVoting,
        onShowParticipantCountChange: vm.setShowParticipantCount,
        onRevealCardsByChange: vm.setRevealCardsBy,
        onRoundTimerEnabledChange: vm.setRoundTimerEnabled,
        onRoundTimerSecondsChange: vm.setRoundTimerSeconds,
        onCopyRoomCode: vm.handleCopyRoomCode,
        onInviteTeam: vm.handleInviteTeam,
        onSaveAsDefault: vm.handleSaveAsDefault,
        onApplySettings: vm.handleApplySettings,
      }}
    />
  );
}

