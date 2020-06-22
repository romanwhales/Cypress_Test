describe('Input form',() => {
    beforeEach(() => {
        cy.seedAndVisit([]);
    })
    it('focuses input on load',() => {
        
        cy.focused().should('have.class','new-todo');

    })

    it('accepts input',() => {
        const typedText = 'Buy Milk';
        
        cy.get('.new-todo')
            .type(typedText)
            .should('have.value',typedText)
    })

    context('Form Submission',() => {
        beforeEach(() => {
            cy.server()
        })
        it('Adds a new todo on submit',() => {
            
            cy.route('POST','/api/todos',{
                name: 'Buy Eggs',
                isComplete: false
            })
            cy.get('.new-todo')
                .type('Buy Eggs')
                .type('{enter}')
                .should('have.value','')
            // cy.get('#todoForm').submit()
            cy.get('.todo-list li')
                .should('have.length',1)
                .and('contain','Buy Eggs')
                
        })
        it('Shows an error message on a failed submission',() => {
            cy.route({
                url: '/api/todos',
                method: 'POST',
                status: 500,
                response:{}
            })
            cy.get('.new-todo').type('test{enter}')
            // cy.get('.todo-list li').should('not.exist')
            cy.get('.error').should('be.visible');
        })
    })
})