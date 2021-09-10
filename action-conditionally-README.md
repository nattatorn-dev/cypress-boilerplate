Since I share some content about Cypress, some people sometimes ask me.

`Walmyr, how do I interact with an element only if it is visible, and if not, I move on?`

To answer this question, I will use an example application in which there are two logout scenarios.

1 Logout with a viewport width greater than 767px
2 Logout with a viewport width less than or equal to 767px
In scenario 1, the logout link is displayed in the top-right menu, and it can be clicked right after logging in.

In scenario 2, after logging in, the user must first open the top-right menu; then, he (or she) will be able to click on the logout link.

The test will be the same. That is, we will not have a test for the viewport with a width greater than 767px and another for the viewport with a width less than or equal to 767px, but a test that adapts to the viewport in use.

Let's look at the test code to make it easier to understand.
```js
describe('Logout', () => {
  beforeEach(() => cy.login())

  it('logs out successfully', () => {
    if (Cypress.config("viewportWidth") < Cypress.env("viewportWidthBreakpoint")) {
      cy.get('.navbar-toggle.collapsed')
        .should('be.visible')
        .click()
    }

    cy.contains('Logout')
      .should('be.visible')
      .click()

    cy.contains('Login')
      .should('be.visible')
  })
})
```
The configuration file would look like this.
```js
{
  "baseUrl": "https://example.com/",
  "env": {
    "viewportWidthBreakpoint": 768
  }
}
```
Note: It is worth remembering that by default, Cypress uses a width of 1000px and a height of 660px.

Finally, this is how package.json's test scripts would look like.
```sh
"scripts": {
  "test": "cypress run",
  "test:tablet": "cypress run --config viewportWidth=767,viewportHeight=480"
}
```
With that, when the test is run with the npm test command, it will run with the default width and height settings, and therefore the condition Cypress.config("viewportWidth") < Cypress.env("viewportWidthBreakpoint") will return false. In this case, the code snippet inside of the if block will not be executed.

When the test is run with the command npm run test:tablet, the viewport settings will be overwritten. In this case, the condition Cypress.config("viewportWidth") < Cypress.env("viewportWidthBreakpoint") will return true, and consequently, the code snippet inside of the if block will be executed.

In this way, the same test will work in both viewports.

Note 2: To improve the readability and organization of the code, the steps for logging out could be moved to a custom command (inside the file cypress/support/commands.js), and we could have a utility function called isTablet, which would return true or false depending on the same condition used in the example just demonstrated.

Attention: be careful with the use of conditionals in your tests! To better understand, I recommend reading the official documentation.

credit: Walmyr Filho
