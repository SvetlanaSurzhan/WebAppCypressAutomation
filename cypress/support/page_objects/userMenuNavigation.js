function openUserMenu(menuItem) {
    cy.get('.AppHeader-globalBar-end').find('.AppHeader-user').click()
    cy.wait(500)
    cy.get('[class="Dialog__Backdrop-sc-uaxjsn-0 dvTqVy"]').find('[class="List__ListBox-sc-1x7olzq-0 eoXvfR"]')
        .contains(`${menuItem}`).click()
    if (menuItem === 'Your profile') {
        cy.url().should('include', 'LanaSTest')
    } else if (menuItem === 'Your repositories') {
        cy.url().should('include', 'repositories')
    }
}
export class UserMenuNavigation {
    yourProfile() {
        openUserMenu('Your profile')
    }
    yourRepositories() {
        openUserMenu('Your repositories')
    }
}
export const navigateFromUserMenuTo = new UserMenuNavigation()