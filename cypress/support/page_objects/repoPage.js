export class RepoPage {

    updateRepoVisibility(repoName) {
        cy.get('.AppHeader-localBar').contains('Settings').click()
        cy.url().should('include', `/${repoName}/settings`)
        //checking current visibility:
        cy.get('[class="Box color-border-danger"]').contains('div', 'This repository is currently').invoke('text').should('contain', 'This repository is currently public.')

        cy.get('[class="Box color-border-danger"]').contains('li', 'Change visibility').click()
        cy.wait(500)
        cy.get('.Overlay-backdrop--anchor').contains('button', 'Change to ').click({ force: true })
        cy.wait(500)
        cy.get('dialog, #visibility-menu-dialog-private').contains('I want to make this repository ').click()
        cy.get('dialog, #visibility-menu-dialog-private').contains('button', 'I have read and understand these effects').click()
        cy.get('dialog, #visibility-menu-dialog-private').contains('button', 'Make this repository ').click()

        //checking visibility after changing it:
        cy.get('[class="Box color-border-danger"]').contains('div', 'This repository is currently').invoke('text').should('contain', 'This repository is currently private.')
    }

    createIssue(repoName, issueName, issueDescription) {
        cy.get('.AppHeader-localBar').contains('Issues').click()
        cy.url().should('include', `/${repoName}/issues`)
        cy.get('main, #js-repo-pjax-container').contains('New issue').click()
        cy.url().should('include', `/${repoName}/issues/new`)
        cy.get('.js-slash-command-surface').then(newIssueData => {
            cy.wrap(newIssueData).wait(500)
            cy.wrap(newIssueData).get('[placeholder="Title"]').type(`${issueName}`)
            cy.wrap(newIssueData).get('.CommentBox-container').find('textarea, #issue_body').type(`${issueDescription}`)
        })
        cy.get('.js-slash-command-surface').contains('button', 'Submit new issue').click()
        cy.url().should('include', `/${repoName}/issues/`)
    }

    deleteIssue() {

    }
}
export const onRepoPage = new RepoPage()