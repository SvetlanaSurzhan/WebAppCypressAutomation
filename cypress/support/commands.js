// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//login to GitHub:
Cypress.Commands.add('loginToApplication', () => {
    cy.visit('/login')
    cy.get('form').find('#login_field').clear().type('LanaSTest')
    cy.get('form').find('#password').clear().type('DnxCnr3x-Nxd9Z+')
    cy.get('form').find('[value="Sign in"]').click()
    //verify user logged in and Home/Dashboard page is displayed:
    cy.url().should('eq', 'https://github.com/')
    cy.get('.AppHeader-globalBar-start').should('contain', 'Dashboard')
})
//find items from user menu:
Cypress.Commands.add('getUserMenuListItem', () => {
    return cy.get('[class="Box-sc-g0xbh4-0 hdShgm DialogOverflowWrapper"]').find('ul')
})