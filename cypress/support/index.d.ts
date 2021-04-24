/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    waitGraphql(value: string): void
    login(username: string, password: string): void
    logout(): void
  }
}
