import { onDashboardPage } from "../support/page_objects/dashboardPage"

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

    it.only('verify user can create new repo', () => {
        onDashboardPage.createNewRepo('MyFirstRepo')
    })

    it('Delete existing repo', () => {
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
        cy.url().should('include', 'repositories')
        // checking deleted repo in the list of existing repos
        // cy.get('#your-repos-filter').type('My first repo')
        // cy.get('.user-repo-search-results-summary').invoke('attr', 'class').then(classValue => {
        //     expect(classValue).to.equal('0 results for repositories matching My first repo sorted by last updated')
        // })
    })
    it('filter list of repos', () => {

    })


})