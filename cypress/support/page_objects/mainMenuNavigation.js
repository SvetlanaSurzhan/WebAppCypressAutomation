
function openMainMenu(itemInMainMenu) {
    cy.get('.AppHeader-globalBar-start').find('[aria-label="Open global navigation menu"]').click()
    cy.wait(500)
    cy.get('[data-target="deferred-side-panel.panel"]').contains('li', `${itemInMainMenu}`).click()
    if (itemInMainMenu === 'Home') {
        cy.url().should('include', '/dashboard')
    } else if (itemInMainMenu === 'Issues') {
        cy.url().should('include', '/issues')
    } else if (itemInMainMenu === 'MyFirstRepo') {
        cy.url().should('include', '/MyFirstRepo')
    }
}
export class MainMenuNavigation {
    homePage() {
        openMainMenu('Home')
    }
    issuesPage() {
        openMainMenu('Issues')
    }
    repoPage(repoName) {
        openMainMenu('MyFirstRepo')
    }
}
export const navigateFromMainMenuTo = new MainMenuNavigation()