export class DashboardPage {
    createNewRepo(newRepoName) {
        cy.get('#dashboard').find('[aria-label="Start a new repository"]').then(createRepo => {
            cy.wrap(createRepo).get('form, [action="/repositories"]').find('[placeholder="name your new repository..."]').type(newRepoName, { force: true })
            cy.wrap(createRepo).get('button, [data-disable-with="Create a new repository"]').contains('Create a new repository').click({ force: true })
        })
        cy.url().should('include', `/${newRepoName}`)
    }

    deleteRepo(newRepoName, userName) {
        //find repo
        cy.get('aside, [aria-label="Account"]').find('[class="dashboard-sidebar"]').then(selectRepo => {
            cy.wrap(selectRepo).find('[placeholder="Find a repository…"]').type(newRepoName, { force: true })
            cy.wrap(selectRepo).find('ul', 'li', '[class="private source no-description"]').contains('a', `${newRepoName}`).click({ force: true })
        })
        cy.url().should('include', `/${newRepoName}`)
        //open settings for repo
        cy.get('nav, [aria-label="Repository"]').contains('Settings').click()
        cy.url().should('include', `/${newRepoName}/settings`)
        //delete repo
        cy.get('[class="Box color-border-danger"]').find('#dialog-show-repo-delete-menu-dialog').click()
        cy.get('#repo-delete-menu-dialog').contains('span', 'I want to delete this repository').click({ force: true }).then(confirmDelition => {
            cy.wrap(confirmDelition).get('#repo-delete-menu-dialog').find('[class="js-repo-delete-proceed-button Button--secondary Button--medium Button Button--fullWidth"]').click()
            cy.wrap(confirmDelition).get('#verification_field').type(`${userName}/${newRepoName}`, { force: true })
            cy.wrap(confirmDelition).wait(500)
            cy.wrap(confirmDelition).get('#repo-delete-proceed-button').click()
        })
        cy.url().should('include', 'repositories')
        // checking deleted repo in the list of existing repos
        cy.get('#your-repos-filter').type(`${newRepoName}`)
        cy.get('.user-repo-search-results-summary').should('contain', '0')
        cy.get('.blankslate-heading').should('contain', userName + ' doesn’t have any repositories that match')

    }
}
export const onDashboardPage = new DashboardPage()