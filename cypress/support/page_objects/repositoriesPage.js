export class RepositoriesPage {
    filterRepositories(repoName) {
        cy.get('#your-repos-filter').type(`${repoName}`)
        cy.get('.user-repo-search-results-summary').should('contain', '1')
        cy.get('[itemprop="name codeRepository"]').should('contain', `${repoName}`)
    }
}
export const onRepositoriesPage = new RepositoriesPage()