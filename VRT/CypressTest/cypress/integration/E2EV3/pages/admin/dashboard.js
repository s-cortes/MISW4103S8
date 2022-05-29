import { adminUrls } from "../../../../fixtures/urls";

export class AdminDashboard {
    constructor(screenshotManager){
        this.screenshotManager = screenshotManager;
    }
    navigate() {
        cy.visit(adminUrls.dasboardUrl);
        cy.wait(300);
    }
    createPost() {
        cy.get('a.gh-nav-new-post').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigatePostEditor');
    }
    getPosts() {
        cy.get('a.ember-view[href="#/posts/"]').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigatePosts');
    }
    getPages() {
        cy.get('a.ember-view[href="#/pages/"]').first().click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigatePages');
    }
    getTags() {
        cy.get('a.ember-view[href="#/tags/"]').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigateTags');
    }
    getMembers() {
        cy.get('a.ember-view[href="#/members/"]').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigateMembers');
    }
} 