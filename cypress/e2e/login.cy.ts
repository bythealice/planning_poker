import { getByCy, visitLogin } from "../support/commands";

describe("Login flow", () => {
  it("redirects the root route to login", () => {
    cy.visit("/");

    cy.url().should("include", "/login");
    getByCy("login-page").should("be.visible");
  });

  it("creates a room from the visitor flow and opens the settings screen", () => {
    visitLogin();

    getByCy("login-name").type("Alice");
    getByCy("login-email").should("not.exist");
    getByCy("login-room-step").should("be.visible");

    getByCy("login-create-room").should("be.enabled").click();

    cy.url().should("match", /\/rooms\/[A-Z0-9]+/);
    getByCy("room-settings-page").should("be.visible");
    getByCy("room-code").should("have.attr", "readonly");
    getByCy("room-apply-settings").should("be.enabled").click();
    cy.contains("Configurações aplicadas com sucesso.").should("be.visible");
  });

  it("shows save as default after sign in and opens the room settings screen", () => {
    visitLogin();

    getByCy("login-mode-account").click();
    getByCy("login-name").should("not.exist");
    getByCy("login-room-step").should("not.exist");

    getByCy("login-email").type("alice@example.com");
    getByCy("login-password").type("secret123");
    getByCy("login-signin").click();

    getByCy("login-auth-mode-switch").should("not.exist");
    getByCy("login-signin-step-1").should("not.exist");
    getByCy("login-create-account-link").should("not.exist");
    getByCy("login-email").should("not.exist");
    getByCy("login-password").should("not.exist");
    getByCy("login-room-step").should("be.visible");
    getByCy("login-create-room").should("be.enabled").click();

    cy.url().should("match", /\/rooms\/[A-Z0-9]+/);
    getByCy("room-settings-page").should("be.visible");
    getByCy("room-save-default").should("be.visible");
    getByCy("room-save-default").click();
    cy.contains("Configurações salvas como padrão com sucesso.").should("be.visible");
  });

  it("navigates to create-account screen", () => {
    visitLogin();

    getByCy("login-mode-account").click();
    getByCy("login-create-account-link").click();

    cy.url().should("include", "/signup");
    getByCy("signup-page").should("be.visible");
    getByCy("signup-title").should("contain.text", "Criar conta");
  });

  it("navigates to forgot-password screen", () => {
    visitLogin();

    getByCy("login-mode-account").click();
    getByCy("login-forgot-password-link").click();

    cy.url().should("include", "/forgot-password");
    getByCy("forgot-password-page").should("be.visible");
    getByCy("forgot-password-title").should("contain.text", "Recuperar senha");
  });
});
