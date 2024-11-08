export class RepoPage {

    updateRepoVisibility(repoName) {
        cy.get('.AppHeader-localBar').contains('Settings').click()
        cy.url().should('include', `/${repoName}/settings`)
        cy.get('[class="Box color-border-danger"]').contains('li', 'Change visibility').click()
        cy.get('.Overlay-backdrop--anchor').find('[data-show-dialog-id="visibility-menu-dialog-public"]').click({ force: true })
        cy.get('[aria-describedby="visibility-menu-dialog-public-description"]').find('#repo-visibility-proceed-button-public-container').click()
        cy.get('[aria-describedby="visibility-menu-dialog-public-description"]').contains('button', 'I have read and understand these effects').click()
        cy.get('[aria-describedby="visibility-menu-dialog-public-description"]').contains('button', 'Make this repository public').click()
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