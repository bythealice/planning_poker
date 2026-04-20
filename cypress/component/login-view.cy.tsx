import { mount } from "cypress/react";

import { LoginView } from "@/features/auth/components/login-view";
import { loginCopy } from "@/features/auth/content/login-copy";
import { getByCy } from "../support/commands";

describe("LoginView", () => {
  it("renders the login card and triggers actions", () => {
    const actions = {
      onAuthModeChange: cy.stub().as("onAuthModeChange"),
      onNameChange: cy.stub().as("onNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onPasswordChange: cy.stub().as("onPasswordChange"),
      onRoomCodeChange: cy.stub().as("onRoomCodeChange"),
      onObserverChange: cy.stub().as("onObserverChange"),
      onSignIn: cy.stub().as("onSignIn"),
      onCreateRoom: cy.stub().as("onCreateRoom"),
      onJoinWithCode: cy.stub().as("onJoinWithCode"),
    };

    mount(
      <LoginView
        copy={loginCopy}
        form={{
          authMode: "signin",
          name: "",
          email: "alice@example.com",
          password: "secret123",
          roomCode: "ABCD1",
          isObserver: true,
          isRoomStepVisible: true,
          isAccountVerified: true,
        }}
        status={{
          error: null,
          success: null,
          isLoading: false,
          canSignIn: true,
          canCreateRoom: true,
          canJoinWithCode: true,
        }}
        actions={actions}
      />,
    );

    getByCy("login-card").should("be.visible");
    getByCy("login-brand").find("img").should("have.attr", "alt", "Logo do Planning Poker");
    getByCy("login-auth-mode-switch").should("not.exist");
    getByCy("login-signin-step-1").should("not.exist");
    getByCy("login-email").should("not.exist");
    getByCy("login-password").should("not.exist");
    getByCy("login-create-account-link").should("not.exist");
    getByCy("login-room-step").should("be.visible");
    getByCy("login-room-code").should("have.value", "ABCD1");
    getByCy("login-observer-mode").should("be.checked");

    getByCy("login-create-room").click();
    cy.get("@onCreateRoom").should("have.been.calledOnce");

    getByCy("login-join-room").click();
    cy.get("@onJoinWithCode").should("have.been.calledOnce");

    cy.contains("Desenvolvido por Alice Ramalho").should("be.visible");
  });
});
