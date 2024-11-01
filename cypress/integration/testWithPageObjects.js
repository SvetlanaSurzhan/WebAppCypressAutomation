import { onDashboardPage } from "../support/page_objects/dashboardPage"
import { navigateFromUserMenuTo } from "../support/page_objects/userMenuNavigation"
import { onRepositoriesPage } from "../support/page_objects/repositoriesPage"
import { navigateFromMainMenuTo } from "../support/page_objects/mainMenuNavigation"

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
    const repoName = 'MySecondRepo'
    it('verify user can create new repo', () => {
        onDashboardPage.createNewRepo(repoName)
    })

    it('verify user can delete existing repo', () => {
        onDashboardPage.deleteRepo(repoName)

    })

    it('verify user can navigate to pages', () => {
        navigateFromUserMenuTo.yourRepositories()
        navigateFromMainMenuTo.homePage()
    })

    it.only('verify user can filter list of repos', () => {
        navigateFromUserMenuTo.yourRepositories()
        onRepositoriesPage.filterRepositories(repoName)
    })




})