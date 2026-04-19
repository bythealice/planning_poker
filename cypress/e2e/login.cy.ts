import { getByCy, visitLogin } from "../support/commands";

describe("Login flow", () => {
  it("redirects the root route to login", () => {
    cy.visit("/");

    cy.url().should("include", "/login");
    getByCy("login-page").should("be.visible");
  });

  it("creates a mock room and joins with the generated code", () => {
    visitLogin();

    getByCy("login-create-room").should("be.disabled");
    getByCy("login-join-room").should("be.disabled");

    getByCy("login-name").type("Alice");
    getByCy("login-email").type("alice@example.com");

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
});

