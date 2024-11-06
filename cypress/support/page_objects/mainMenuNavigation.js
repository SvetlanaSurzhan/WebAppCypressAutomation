export class MainMenuNavigation {
    homePage() {
        cy.get('.AppHeader-globalBar-start').find('[aria-label="Open global navigation menu"]').click().then(goToHomePage => {
            cy.wrap(goToHomePage).get('ul, [data-target="nav-list.topLevelList"]').contains('li', 'Home').click()
        })

        cy.url().should('include', '/dashboard')
    }
    issuesPage() {
        cy.get('.AppHeader-globalBar-start').find('[aria-label="Open global navigation menu"]').click().then(goToIssues => {
            cy.wrap(goToIssues).get('ul, [data-target="nav-list.topLevelList"]').contains('li', 'Issues').click()
        })
        cy.url().should('include', '/issues')
    }
    repoPage(repoName) {
        cy.get('.AppHeader-globalBar-start').find('[aria-label="Open global navigation menu"]').click().then(goToRepo => {
            cy.wrap(goToRepo).get('ul, [data-target="nav-list.topLevelList"]').contains(`/${repoName}`).click()
        })
        cy.url().should('include', `/${repoName}`)
    }
}
export const navigateFromMainMenuTo = new MainMenuNavigation()