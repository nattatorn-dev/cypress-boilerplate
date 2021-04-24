/// <reference path="../support/index.d.ts" />

describe("Authentication", () => {
  it("should login successfully", () => {
    cy.visit("/");
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    cy.login(username, password);
  });

  it("should logout successfully", () => {
    cy.visit("/");
    const username = Cypress.env("username");
    const password = Cypress.env("password");
    cy.login(username, password);
    cy.logout();
  });
});
