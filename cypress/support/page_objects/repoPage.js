export class RepoPage {
    createIssue(repoName, issueName, issueDescription) {
        cy.get('.AppHeader-localBar').contains('Issues').click()
        cy.url().should('include', `/${repoName}/issues`)
        cy.get('main, #js-repo-pjax-container').contains('New issue').click()
        cy.url().should('include', `/${repoName}/issues/new`)
        cy.get('.js-slash-command-surface').then(newIssueData => {
            cy.wrap(newIssueData).find('[placeholder="Title"]').type(`${issueName}`)
            cy.wrap(newIssueData).get('.CommentBox-container').find('textarea, #issue_body').type(`${issueDescription}`)
        })
        cy.get('.js-slash-command-surface').contains('button', 'Submit new issue').click()
        cy.url().should('include', `/${repoName}/issues/`)
    }
}
export const onRepoPage = new RepoPage()