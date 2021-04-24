/// <reference types="cypress" />

Cypress.Commands.add("waitGraphql", (operationName: string) => {
  cy.intercept("POST", "/graphql", (req) => {
    if (req.body.operationName.includes(operationName)) {
      req.alias = operationName;
    }
  });
  cy.wait(`@${operationName}`);
});

Cypress.Commands.add("login", (username: string, password: string) => {
  username = username || Cypress.env("username");
  password = password || Cypress.env("password");

  cy.get("input#username").clear().type(username);
  cy.get("input#password").clear().type(password).type("{enter}");
});

Cypress.Commands.add("logout", () => {
  cy.get('div').contains('cb').click();
  cy.contains('Sign out').click();
});
