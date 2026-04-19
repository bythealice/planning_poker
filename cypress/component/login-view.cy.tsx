import { mount } from "cypress/react";

import { LoginView } from "@/features/auth/components/login-view";
import { loginCopy } from "@/features/auth/content/login-copy";
import { getByCy } from "../support/commands";

describe("LoginView", () => {
  it("renders the login card and triggers actions", () => {
    const actions = {
      onNameChange: cy.stub().as("onNameChange"),
      onEmailChange: cy.stub().as("onEmailChange"),
      onRoomCodeChange: cy.stub().as("onRoomCodeChange"),
      onObserverChange: cy.stub().as("onObserverChange"),
      onCreateRoom: cy.stub().as("onCreateRoom"),
      onJoinWithCode: cy.stub().as("onJoinWithCode"),
    };

    mount(
      <LoginView
        copy={loginCopy}
        form={{
          name: "Alice",
          email: "alice@example.com",
          roomCode: "ABCD1",
          isObserver: true,
        }}
        status={{
          error: null,
          success: null,
          isLoading: false,
          canCreateRoom: true,
          canJoinWithCode: true,
        }}
        actions={actions}
      />,
    );

    getByCy("login-card").should("be.visible");
    getByCy("login-brand").find("img").should("have.attr", "alt", "Planning Poker");
    getByCy("login-name").should("have.value", "Alice");
    getByCy("login-email").should("have.value", "alice@example.com");
    getByCy("login-room-code").should("have.value", "ABCD1");
    getByCy("login-observer-mode").should("be.checked");

    getByCy("login-create-room").click();
    cy.get("@onCreateRoom").should("have.been.calledOnce");

    getByCy("login-join-room").click();
    cy.get("@onJoinWithCode").should("have.been.calledOnce");

    cy.contains("Powered by Appwrite").should("be.visible");
  });
});

