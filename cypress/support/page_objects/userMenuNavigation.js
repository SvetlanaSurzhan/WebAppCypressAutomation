export class UserMenuNavigation {
    yourRepositories() {
        cy.get('.AppHeader-globalBar-end').find('.AppHeader-user').click()
        cy.get('ul, [class="List__ListBox-sc-1x7olzq-0 eoXvfR"]').contains('li', 'Your repositories').click()
        cy.url().should('include', 'repositories')
    }
    yourProfile(userName) {
        cy.get('.AppHeader-globalBar-end').find('.AppHeader-user').click()
        cy.get('ul, [class="List__ListBox-sc-1x7olzq-0 eoXvfR"]').contains('li', 'Your profile').click()
        cy.url().should('include', `/${userName}`)
    }
}
export const navigateFromUserMenuTo = new UserMenuNavigation()