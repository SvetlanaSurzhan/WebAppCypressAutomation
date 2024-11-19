export class DashboardPage {
    createNewRepo(repoName) {
        cy.get('#dashboard').find('[aria-label="Start a new repository"]').then(createRepo => {
            cy.wrap(createRepo).get('form, [action="/repositories"]').find('[placeholder="name your new repository..."]').type(repoName, { force: true })
            cy.wrap(createRepo).get('button, [data-disable-with="Create a new repository"]').contains('Create a new repository').click({ force: true })
        })
        cy.url().should('include', `/${repoName}`)
    }

    deleteRepo(repoName, userName) {
        //find repo
        cy.get('aside, [aria-label="Account"]').find('[class="dashboard-sidebar"]').then(selectRepo => {
            cy.wrap(selectRepo).find('[placeholder="Find a repository…"]').type(repoName, { force: true })
            cy.wrap(selectRepo).find('ul', 'li', '[class="private source no-description"]').contains('a', `${repoName}`).click({ force: true })
        })
        cy.url().should('include', `/${repoName}`)
        //open settings for repo
        cy.get('nav, [aria-label="Repository"]').contains('Settings').click()
        cy.url().should('include', `/${repoName}/settings`)
        //delete repo
        cy.get('[class="Box color-border-danger"]').find('#dialog-show-repo-delete-menu-dialog').click()
        cy.get('#repo-delete-menu-dialog').contains('span', 'I want to delete this repository').click({ force: true }).then(confirmDelition => {
            cy.wrap(confirmDelition).get('#repo-delete-menu-dialog').contains('I have read and understand these effects').click({ force: true })
            cy.wrap(confirmDelition).get('#verification_field').type(`${userName}/${repoName}`, { force: true })
            cy.wrap(confirmDelition).wait(500)
            cy.wrap(confirmDelition).get('#repo-delete-proceed-button').click({ force: true })
        })
        cy.url().should('include', 'repositories')
        // checking deleted repo in the list of existing repos
        cy.get('#your-repos-filter').type(`${repoName}`)
        cy.get('.user-repo-search-results-summary').should('contain', '0')
        cy.get('.blankslate-heading').should('contain', userName + ' doesn’t have any repositories that match')

    }
}
export const onDashboardPage = new DashboardPage()