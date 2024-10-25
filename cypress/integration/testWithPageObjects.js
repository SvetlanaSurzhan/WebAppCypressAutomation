

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
        //find repo
        cy.get('aside, [aria-label="Account"]').then(selectRepo => {
            cy.wrap(selectRepo).find('[placeholder="Find a repository…"]').type('My-first-repo')
            cy.wrap(selectRepo).find('li').first().click()
        })
        cy.url().should('include', '/My-first-repo')
        //open settings for repo
        cy.get('nav, [aria-label="Repository"]').contains('Settings').click()
        cy.url().should('include', '/My-first-repo/settings')
        //delete repo
        cy.get('[class="Box color-border-danger"]').find('#dialog-show-repo-delete-menu-dialog').click()
        cy.get('#repo-delete-menu-dialog').find('#repo-delete-proceed-button').click().then(confirmDelition => {
            cy.wrap(confirmDelition).get('#repo-delete-menu-dialog').contains('I have read and understand these effects').click()
            cy.wrap(confirmDelition).get('#verification_field').type('LanaSTest/My-first-repo', { force: true })
            cy.wrap(confirmDelition).wait(500)
            cy.wrap(confirmDelition).get('#repo-delete-proceed-button').click()
        })





    })



})