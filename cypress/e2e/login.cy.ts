import { getByCy, visitLogin } from "../support/commands";

describe("Login flow", () => {
  it("redirects the root route to login", () => {
    cy.visit("/");

    cy.url().should("include", "/login");
    getByCy("login-page").should("be.visible");
  });

  it("creates a mock room and joins with the generated code in no-login mode", () => {
    visitLogin();

    getByCy("login-create-room").should("be.disabled");
    getByCy("login-join-room").should("be.disabled");

    getByCy("login-name").type("Alice");
    getByCy("login-email").should("not.exist");
    getByCy("login-room-step").should("be.visible");

    getByCy("login-create-room").should("be.enabled").click();

    cy.contains("Sala mockada criada com sucesso. Codigo:").should("be.visible");
    getByCy("login-room-code")
      .invoke("val")
      .then((value) => {
        expect(String(value)).to.match(/^[A-Z0-9]{5}$/);
      });

    getByCy("login-observer-mode").check({ force: true });
    getByCy("login-join-room").should("be.enabled").click();

    cy.contains("Entrada mockada realizada na sala").should("be.visible");
    cy.contains("observador").should("be.visible");
  });

  it("requires email and password first, then unlocks room actions in signin mode", () => {
    visitLogin();

    getByCy("login-mode-account").click();
    getByCy("login-name").should("not.exist");
    getByCy("login-room-step").should("not.exist");
    getByCy("login-create-room").should("not.exist");

    getByCy("login-email").type("alice@example.com");
    getByCy("login-password").type("secret123");
    getByCy("login-signin").click();

    getByCy("login-auth-mode-switch").should("not.exist");
    getByCy("login-signin-step-1").should("not.exist");
    getByCy("login-create-account-link").should("not.exist");
    getByCy("login-email").should("not.exist");
    getByCy("login-password").should("not.exist");
    getByCy("login-room-step").should("be.visible");
    getByCy("login-room-code").type("AB12");
    getByCy("login-join-room").should("be.enabled").click();
    cy.contains("Entrada mockada realizada na sala").should("be.visible");
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

