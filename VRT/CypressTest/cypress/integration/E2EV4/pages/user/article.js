import { userUrls } from "../../../../fixtures/urls";

export class Article {
    constructor(screenshotManager){
        this.screenshotManager = screenshotManager;
    }

    navigateToArticle(slug) {
        cy.visit(`${userUrls.homeUrl}/${slug}`);
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigateToArticle');
    }
    readTitle(callback) {
        cy.get('header.article-header > h1.article-title').invoke('text').then(title => {
            this.screenshotManager.takeScreenshot('NavigateToArticle');
            callback(title)
        });
    }
    readContent(callback) {
        cy.get('section.gh-content > p')
            .each(($p, index, $list) => {
                cy.wrap($p).invoke('text').then(txt => callback(txt));
            });
    }
}