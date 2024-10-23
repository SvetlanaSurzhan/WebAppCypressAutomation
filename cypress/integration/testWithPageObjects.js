
describe('Test with Page Objects', () => {
    beforeEach('login to application', () => {
        cy.loginToApplication()
    })

    it('Create new repo', () => {
        cy.get('#dashboard').find('[aria-label="Start a new repository"]').then(createNewRepo => {
            cy.wrap(createNewRepo).get('form').find('[placeholder="name your new repository..."]').type('My first repo')
            cy.wrap(createNewRepo).get('form').contains('button', 'Create a new repository').click()

        })
    })

    it.only('Delete existing repo', () => {
        cy.get('aside').find('[placeholder="Find a repository…"]').type('My-first-repo').then(foundRepo => {
            cy.wrap(foundRepo).get('ul').find('li').first().click()
            cy.wrap(foundRepo).url().should('include', '/My-first-repo')
        })

    })
})