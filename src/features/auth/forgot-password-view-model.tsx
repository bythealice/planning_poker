"use client";

import { ForgotPasswordView } from "./components/forgot-password-view";
import { forgotPasswordCopy } from "./content/forgot-password-copy";
import { useForgotPasswordModel } from "./hooks/use-forgot-password-model";

export function ForgotPasswordViewModel() {
  const vm = useForgotPasswordModel();

  return (
    <ForgotPasswordView
      copy={forgotPasswordCopy}
      form={{
        email: vm.email,
        emailError: vm.emailError,
      }}
      status={{
        success: vm.success,
        isLoading: vm.isLoading,
        canSubmit: vm.canSubmit,
      }}
      actions={{
        onEmailChange: vm.setEmail,
        onSendRecovery: vm.handleSendRecovery,
      }}
    />
  );
}

