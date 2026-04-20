import { mount } from "cypress/react";

import { ForgotPasswordView } from "@/features/auth/components/forgot-password-view";
import { forgotPasswordCopy } from "@/features/auth/content/forgot-password-copy";
import { getByCy } from "../support/commands";

describe("ForgotPasswordView", () => {
  it("renders and triggers recovery action", () => {
    const actions = {
      onEmailChange: cy.stub().as("onEmailChange"),
      onSendRecovery: cy.stub().as("onSendRecovery"),
    };

    mount(
      <ForgotPasswordView
        copy={forgotPasswordCopy}
        form={{
          email: "alice@example.com",
        }}
        status={{
          success: null,
          isLoading: false,
          canSubmit: true,
        }}
        actions={actions}
      />,
    );

    getByCy("forgot-password-card").should("be.visible");
    getByCy("forgot-password-title").should("contain.text", "Recuperar senha");
    getByCy("forgot-password-email").should("have.value", "alice@example.com");

    getByCy("forgot-password-submit").click();
    cy.get("@onSendRecovery").should("have.been.calledOnce");

    getByCy("forgot-password-back-login").should("be.visible");
  });
});

