How to use fixtures with Cypress to isolate the frontend tests

```js
// cypress/integration/listOfNotes.spec.js

describe('Notes list', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/notes', { fixture: 'notes' })
      .as('getNotes')
    cy.login()
    cy.wait('@getNotes')
  })

  it('renders 6 ".list-group-item"s, being the first one a button to create a new note', () => {
    cy.get('.list-group-item')
      .should('have.length', 6)
      .first()
      .should('contain', 'Create new note')
  })
})
```

And in the cypress/fixtures/ directory, there would be a file called notes.json, which would contain the following content.
```json
[
  { "content": "Sample content 1"},
  { "content": "Sample content 2"},
  { "content": "Sample content 3"},
  { "content": "Sample content 4"},
  { "content": "Sample content 5"}
]
```

Note: It is worth remembering that this is the data structure that such a frontend application would normally receive from the backend via API.

That's it.

The test now intercepts a GET request to the '**/notes' route, and the frontend then renders the contents of the cypress/fixtures/notes.json file.

Since in this file we have 5 notes, our assertions (that 6 'list-group-item's are rendered, and that the first item in the list is the button for creating a new note) pass.
