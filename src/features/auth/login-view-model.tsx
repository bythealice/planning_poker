"use client";

import { loginCopy } from "./content/login-copy";
import { LoginView } from "./components/login-view";
import { useLoginModel } from "./hooks/use-login-model";

export function LoginViewModel() {
  const vm = useLoginModel();

  return (
    <LoginView
      copy={loginCopy}
      form={{
        name: vm.name,
        email: vm.email,
        roomCode: vm.roomCode,
        isObserver: vm.isObserver,
        nameError: vm.nameError,
        emailError: vm.emailError,
        roomCodeError: vm.roomCodeError,
      }}
      status={{
        error: vm.error,
        success: vm.success,
        isLoading: vm.isLoading,
        canCreateRoom: vm.canCreateRoom,
        canJoinWithCode: vm.canJoinWithCode,
      }}
      actions={{
        onNameChange: vm.setName,
        onEmailChange: vm.setEmail,
        onRoomCodeChange: vm.setRoomCode,
        onObserverChange: vm.setIsObserver,
        onCreateRoom: vm.handleCreateRoom,
        onJoinWithCode: vm.handleJoinWithCode,
      }}
    />
  );
}

