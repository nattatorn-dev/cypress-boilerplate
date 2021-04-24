/// <reference path="../support/index.d.ts" />

describe("Vehicle", () => {
  beforeEach(() => {
    cy.visit("vehicle-management/create");

    const username = Cypress.env("username");
    const password = Cypress.env("password");

    cy.login(username, password);
  });

  afterEach(() => {
    cy.logout();
  });

  it("should save vehicle information section correctly", () => {
    cy.get('[data-testid="registration.registerNo-field"]')
      .clear()
      .type("กก 0001");

    cy.get('[data-testid="province-field"]').click();
    cy.get('[role="option"]').contains("กระบี่").click();
  });
});
