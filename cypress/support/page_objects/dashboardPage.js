export class DashboardPage {
    createNewRepo(repoName) {
        cy.get('#dashboard').find('[aria-label="Start a new repository"]').then(createRepo => {
            cy.wrap(createRepo).get('form, [action="/repositories"]').find('[placeholder="name your new repository..."]').type(repoName, { force: true })
            cy.wrap(createRepo).contains('Create a new repository').click()
        })
        cy.url().should('include', `/${repoName}`)
    }
}
export const onDashboardPage = new DashboardPage()