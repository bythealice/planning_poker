"use client";

import { SignupView } from "./components/signup-view";
import { signupCopy } from "./content/signup-copy";
import { useSignupModel } from "./hooks/use-signup-model";

export function SignupViewModel() {
  const vm = useSignupModel();

  return (
    <SignupView
      copy={signupCopy}
      form={{
        name: vm.name,
        email: vm.email,
        password: vm.password,
        confirmPassword: vm.confirmPassword,
        nameError: vm.nameError,
        emailError: vm.emailError,
        passwordError: vm.passwordError,
        confirmPasswordError: vm.confirmPasswordError,
      }}
      status={{
        success: vm.success,
        isLoading: vm.isLoading,
        canSubmit: vm.canSubmit,
      }}
      actions={{
        onNameChange: vm.setName,
        onEmailChange: vm.setEmail,
        onPasswordChange: vm.setPassword,
        onConfirmPasswordChange: vm.setConfirmPassword,
        onCreateAccount: vm.handleCreateAccount,
      }}
    />
  );
}

