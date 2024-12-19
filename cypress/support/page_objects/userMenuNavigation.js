/// <reference types="cypress" />
function openUserMenu(menuItem) {
    cy.get('.AppHeader-globalBar-end').find('.AppHeader-user').click()
    cy.wait(1000)
    cy.getUserMenuListItem().contains(`${menuItem}`).click()
    if (menuItem === 'Your profile') {
        cy.url().should('include', 'LanaSTest')
    } else if (menuItem === 'Your repositories') {
        cy.url().should('include', 'repositories')
    } //else if (menuItem === 'Your Copilot') {
    //     cy.url().should('include', 'copilot')
    // }
    
}
export class UserMenuNavigation {
    yourProfile() {
        openUserMenu('Your profile')
    }
    yourRepositories() {
        openUserMenu('Your repositories')
    }
    // yourCopilot() {
    //     openUserMenu('Your Copilot')
    // }
}
export const navigateFromUserMenuTo = new UserMenuNavigation()