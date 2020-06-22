describe('Smoke Tests',() => {
    beforeEach(() => {
        cy.request('GET','/api/todos')
            .its('body')
            .each(todo => cy.request('DELETE',`/api/todos/${todo.id}`))
    })
    context('With no todos',() => {
        it.only('Saves new todos',() => {
            const items = [
                {text: 'Buy Milk',expectedLength:1},
                {text: 'Buy Eggs',expectedLength:2},
                {text: 'Buy Bread',expectedLength:3}
            ]
            cy.visit('/')
            cy.server()
            cy.route('POST','/api/todos')
                .as('create')

            cy.wrap(items)
                .each(todo => {
                    cy.focused()
                        .type(todo.text)
                        .type('{enter}')
                    cy.wait('@create')
                    cy.get('.todo-list li')
                        .should('have.length',todo.expectedLength)
                })
            
        })
    })

    context('with active todos',() => {
        beforeEach(() => {
            cy.fixture('todos')
                .each(todo => {
                    const newTodo = Cypress._.merge(todo,{isComplete: false})
                    cy.request('POST','/api/todos',newTodo); 
                })
            cy.visit('/')
        })
        it('Loads existing data from the DB',() => {
            cy.get('.todo-list li')
                .should('have.length',4)
        })
        it('Deletes todos',() => {
            cy.server()
            cy.route('DELETE','/api/todos/*')
                .as('delete')
            cy.get('.todo-list li')
                .each($el => {
                    cy.wrap($el)
                        .find('.destroy')
                        .invoke('show')
                        .click()
                    cy.wait('@delete')
                })
                .should('not.exist')
        })
        it('Toggles Todo',() => {
            const clickAndWait = ($el) => {
                cy.wrap($el)
                        .as('item')
                        .find('.toggle')
                        .click()
                cy.wait('@update')
            }
            cy.server()
            cy.route('PUT','/api/todos/*')
                .as('update')
            cy.get('.todo-list li')
                .each($el => {
                    clickAndWait($el)
                    cy.get('@item')
                        .should('have.class','completed')
                })
                .each($el => {
                    clickAndWait($el)
                    cy.get('@item')
                        .should('not.have.class','completed')
                })
        })
    })
})