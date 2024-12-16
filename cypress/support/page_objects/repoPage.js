export class RepoPage {

    updateRepoVisibility(repoName) {
        //open settings tab
        cy.get('.AppHeader-localBar').contains('Settings').click()
        cy.url().should('include', `/${repoName}/settings`)
        //checking current visibility:
        cy.get('[class="Box color-border-danger"]').contains('div', 'This repository is currently')
            .invoke('text').should('contain', 'This repository is currently private.')

        cy.get('[class="Box color-border-danger"]').contains('li', 'Change visibility').click()
        cy.wait(500)
        cy.get('.Overlay-backdrop--anchor').contains('button', 'Change to ').click({ force: true })
        cy.wait(500)
        cy.get('dialog, #visibility-menu-dialog-private').contains('I want to make this repository ').click()
        cy.get('dialog, #visibility-menu-dialog-private').contains('button', 'I have read and understand these effects').click()
        cy.get('dialog, #visibility-menu-dialog-private').contains('button', 'Make this repository ').click()

        //checking visibility after changing it:
        cy.get('[class="Box color-border-danger"]').contains('div', 'This repository is currently').invoke('text').should('contain', 'This repository is currently public.')
    }

    createIssue(repoName, issueName, issueDescription) {
        //open issues tab
        cy.get('.AppHeader-localBar').contains('Issues').click()
        cy.url().should('include', `/${repoName}/issues`)
        //create new issue
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

    updateIssueName(repoName, issueName, updatedIssueName) {
        //open issues tab
        cy.get('.AppHeader-localBar').contains('Issues').click()
        cy.url().should('include', `/${repoName}/issues`)
        //find issue
        cy.get('div, [aria-label="Issues"]').contains(`${issueName}`).click()
        cy.url().should('include', `/${repoName}/issues/1`)
        //update description
        cy.get('#partial-discussion-header, .gh-header-show').contains('span', 'Edit').click()
        cy.wait(1000)
        //update issue name
        cy.get('#partial-discussion-header, .gh-header-edit mb-2 position-relative').find('[aria-label="Issue title"]')
            .clear().type(`${updatedIssueName}`, { force: true })
        cy.get('#partial-discussion-header, .gh-header-edit mb-2 position-relative').contains('Save').click()
        //assertion for updated issue name
        cy.get('#partial-discussion-header').find('bdi', '.js-issue-title markdown-title').should('contain', `${updatedIssueName}`)
    }

    closeIssue(repoName, updatedIssueName) {
        //open issues tab
        cy.get('.AppHeader-localBar').contains('Issues').click()
        cy.url().should('include', `/${repoName}/issues`)
        //find issue
        cy.get('div, [aria-label="Issues"]').contains(`${updatedIssueName}`).click()
        cy.url().should('include', `/${repoName}/issues/1`)
        //close issue
        cy.get('#show_issue').find('#new_comment_form').contains('Close issue').click()
        //assertion of current status of the issue
        cy.wait(2500)
        cy.get('#partial-discussion-header').then(checkStatus => {
            cy.wrap(checkStatus).find('bdi', '.js-issue-title markdown-title').should('contain', `${updatedIssueName}`)
            cy.wrap(checkStatus).get('span, [title="Status:]').should('contain', 'Closed')
        })
    }

    filterIssues(repoName, updatedIssueName) {
        //open issues tab
        cy.get('.AppHeader-localBar').contains('Issues').click()
        cy.url().should('include', `/${repoName}/issues`)
        cy.wait(500)
        //filter list of existing issues
        cy.get('[class="d-flex flex-justify-between mb-md-3 flex-column-reverse flex-md-row flex-items-end"]').find('[placeholder="Search all issues"]').type('{enter}' + updatedIssueName)
        //assertion
        cy.wait(1000)
        cy.get('[class="Box mt-3 Box--responsive hx_Box--firstRowRounded0"]').find('[class="flex-auto d-none d-lg-block no-wrap"]').should('contain', '1 Open')
        cy.get('[class="Box mt-3 Box--responsive hx_Box--firstRowRounded0"]').find('[aria-label="Issues"]').should('contain', `${updatedIssueName}`)
    }
}
export const onRepoPage = new RepoPage()