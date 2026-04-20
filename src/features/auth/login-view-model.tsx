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
        authMode: vm.authMode,
        name: vm.name,
        email: vm.email,
        password: vm.password,
        roomCode: vm.roomCode,
        isObserver: vm.isObserver,
        isRoomStepVisible: vm.isRoomStepVisible,
        isAccountVerified: vm.isAccountVerified,
        nameError: vm.nameError,
        emailError: vm.emailError,
        passwordError: vm.passwordError,
        roomCodeError: vm.roomCodeError,
      }}
      status={{
        error: vm.error,
        success: vm.success,
        isLoading: vm.isLoading,
        canSignIn: vm.canSignIn,
        canCreateRoom: vm.canCreateRoom,
        canJoinWithCode: vm.canJoinWithCode,
      }}
      actions={{
        onAuthModeChange: vm.setAuthMode,
        onNameChange: vm.setName,
        onEmailChange: vm.setEmail,
        onPasswordChange: vm.setPassword,
        onRoomCodeChange: vm.setRoomCode,
        onObserverChange: vm.setIsObserver,
        onSignIn: vm.handleSignIn,
        onCreateRoom: vm.handleCreateRoom,
        onJoinWithCode: vm.handleJoinWithCode,
      }}
    />
  );
}

