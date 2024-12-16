
function openMainMenu(itemInMainMenu) {
    let repoName =
        cy.get('.AppHeader-globalBar-start').find('[aria-label="Open global navigation menu"]').click()
    if (itemInMainMenu === 'Home') {
        cy.get('[data-target="deferred-side-panel.panel"]').find('[data-target="nav-list.topLevelList"]').contains('li', 'Home').click()
    } else if (itemInMainMenu === 'Issues') {
        cy.get('[data-target="deferred-side-panel.panel"]').find('[data-target="nav-list.topLevelList"]').contains('li', 'Issues').click()
    } else if (itemInMainMenu === 'MyFirstRepo') {
        cy.get('[data-target="deferred-side-panel.panel"]').find('[data-target="nav-list.topLevelList"]').contains('/MyFirstRepo').click()
    }
}

export class MainMenuNavigation {
    homePage() {
        openMainMenu('Home')
        cy.url().should('include', '/dashboard')
    }
    issuesPage() {
        openMainMenu('Issues')
        cy.url().should('include', '/issues')
    }
    repoPage(repoName) {
        openMainMenu('MyFirstRepo')
        cy.url().should('include', '/MyFirstRepo')
    }
}
export const navigateFromMainMenuTo = new MainMenuNavigation()