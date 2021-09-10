Imagine a search functionality. When such functionality is invoked, an HTTP request is triggered for an external API, and while the API does not answer, the text Loading... is displayed along with an icon.

Sometimes, the request's response is quick, and you can barely see the application's status while it is loading. However, in other cases, the response takes a while, and then you can see the status of Loading...

But what if I want to test exactly this intermediate state, that is, I want to test when the Loading... is being displayed?

In this case, I want to ensure that a certain delay occurs, so that Cypress always finds the element of Loading... and so I avoid flaky tests, meaning those tests that sometimes pass and sometimes fail, without any code changes.

Let's look at an example below.
```js
context('Delay simulation', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '**/search?query=cypress',
      {
        delay: 1000,
        fixture: 'stories'
      }
    ).as('getDelayedStories')
  })

  it('shows a loading state before showing the results', () => {
    cy.visit('https://example.com/search')

    cy.get('[data-cy="search-field"]')
      .should('be.visible')
      .type('cypress{enter}')

    cy.get('p:contains(Loading...)')
      .should('be.visible')
    cy.get('.loading-icon')
      .should('be.visible')

   cy.wait('@getDelayedStories')
  }) 
})
```
To simulate the request delay, I use the cy.intercept() functionality, where in addition to passing the GET method and the endpoint **/search?query=cypress as arguments, I also pass an object with the delay property with the value of 1000 milliseconds (1 second). I also pass a fixture to the same object, as I don't want to depend on the API since I'm testing the frontend's behavior only.

Then I search, and during this one-second delay, I test that a paragraph with the text Loading... and an element with the class loading-icon are displayed.

Finally, I wait for the request to end.

And this is how you can simulate the delay in a request with Cypress. Cool huh?

I hope the post is useful if you need to deal with a situation like this.

For more details on the cy.intercept() functionality, I recommend reading the official Cypress documentation.
