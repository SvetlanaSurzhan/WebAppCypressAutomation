
describe('Test with Page Objects', () => {
    beforeEach('login to application', () => {
        cy.loginToApplication()
    })
    beforeEach('handle an uncaught exception', () => {
        cy.on("uncaught:exception", (e, runnable) => {
            console.log("error", e);
            console.log("runnable", runnable);
            console.log("error", e.message);
            return false;
        });
    })

    it('Create new repo', () => {
        cy.get('#dashboard').find('[aria-label="Start a new repository"]').then(createNewRepo => {
            cy.wrap(createNewRepo).get('form').find('[placeholder="name your new repository..."]').type('My first repo')
            cy.wrap(createNewRepo).get('form').contains('button', 'Create a new repository').click()

        })
    })

    it.only('Delete existing repo', () => {
        cy.get('aside').then(selectRepo => {
            cy.wrap(selectRepo).find('[placeholder="Find a repository…"]').type('My-first-repo')
            cy.wrap(selectRepo).find('li').first().click()
        })
        cy.url().should('include', '/My-first-repo')
    })



})