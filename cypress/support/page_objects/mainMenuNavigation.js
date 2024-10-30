export class MainMenuNavigation {
    homePage() {
        cy.get('.AppHeader-globalBar-start').find('[aria-label="Open global navigation menu"]').click().then(goToHomePage => {
            cy.wrap(goToHomePage).get('ul, [data-target="nav-list.topLevelList"]').contains('li', 'Home').click()
        })

        cy.url().should('include', '/dashboard')
    }
    issuesPage() {

    }
}
export const navigateFromMainMenuTo = new MainMenuNavigation()