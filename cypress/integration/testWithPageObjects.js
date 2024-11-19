import { onDashboardPage } from "../support/page_objects/dashboardPage"
import { navigateFromUserMenuTo } from "../support/page_objects/userMenuNavigation"
import { onRepositoriesPage } from "../support/page_objects/repositoriesPage"
import { navigateFromMainMenuTo } from "../support/page_objects/mainMenuNavigation"
import { onRepoPage } from "../support/page_objects/repoPage"

describe('Test with Page Objects', () => {
    beforeEach('login to application', () => {
        cy.loginToApplication()
    })

    beforeEach('handle an uncaught exception', () => {
        cy.on("uncaught:exception", (e, runnable) => {
            console.log("error", e);
            console.log("runnable", runnable);
            console.log("error", e.message);
            return false;
        });
    })

    const repoName = 'MyFirstRepo'
    const userName = 'LanaSTest'

    it('verify user can create new repo', () => {
        onDashboardPage.createNewRepo(repoName)
    })

    it('verify user can navigate to pages', () => {
        navigateFromUserMenuTo.yourRepositories()
        navigateFromUserMenuTo.yourProfile(userName)
        navigateFromMainMenuTo.homePage()
        navigateFromMainMenuTo.issuesPage()
    })

    it('verify user can filter list of repos', () => {
        navigateFromUserMenuTo.yourRepositories()
        onRepositoriesPage.filterRepositories(repoName, userName)
    })

    it('verify user can update visibility of existing repo', () => {
        navigateFromMainMenuTo.repoPage(repoName)
        onRepoPage.updateRepoVisibility(repoName)
    })

    const issueName = 'Issue1'
    const issueDescription = 'This is description of my issue'
    const updatedIssueName = 'Updated Issue Name'

    it('verify user can create new issue for existing repo', () => {
        navigateFromMainMenuTo.repoPage(repoName)
        onRepoPage.createIssue(repoName, issueName, issueDescription)
    })

    it('verify user can update issue data', () => {
        navigateFromMainMenuTo.repoPage(repoName)
        onRepoPage.updateIssueName(repoName, issueName, updatedIssueName)
    })

    it('verify user can filter list of issues', () => {
        navigateFromMainMenuTo.repoPage(repoName)
        onRepoPage.filterIssues(repoName, updatedIssueName)
    })

    it('verify user can close existing issue', () => {
        navigateFromMainMenuTo.repoPage(repoName)
        onRepoPage.closeIssue(repoName, updatedIssueName)
    })

    it('verify user can delete existing repo', () => {
        onDashboardPage.deleteRepo(repoName, userName)
    })
})