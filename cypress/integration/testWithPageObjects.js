import { onDashboardPage } from "../support/page_objects/dashboardPage"

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
    it('verify user can create new repo', () => {
        onDashboardPage.createNewRepo(repoName)
    })

    it('Delete existing repo', () => {
        onDashboardPage.deleteRepo(repoName)

    })
    it('filter list of repos', () => {

    })


})