import { userUrls } from "../../../../fixtures/urls";

export class UserHomePage {
    constructor(screenshotManager){
        this.screenshotManager = screenshotManager;
    }

    navigate() {
        cy.visit(userUrls.homeUrl);
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigateToHomePage');
    }
    getFirstPostByTitle(title, callback) {
        let postItem = cy.contains('a.post-card-content-link', title).first();
        this.screenshotManager.takeScreenshot('FindArticleByTitle');
        callback(postItem);
    }
    getFirstPostByExcerpt(excerpt, callback) {
        this.screenshotManager.takeScreenshot('FindArticleByExcerpt');
        let postItem = cy.contains('a.post-card-content-link', excerpt).first();
        callback(postItem);
    }
    hasPostsInList() {
        let contentList = cy.get('div.post-feed');
        return contentList.find('article').length > 0;
    }
    getPostListItems(callback) {
        cy.get('article.post-card')
            .each(($p, index, $list) => callback($p, index, $list));
    }
    findTitleOnPostItem(pItem, callback) {
        cy.wrap(pItem).find('h2.post-card-title').invoke('text').then(txt => {
            this.screenshotManager.takeScreenshot('FindArticleByTitle');
            callback(txt);
        });
    }
}