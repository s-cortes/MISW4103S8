const { faker } = require('@faker-js/faker');
import { adminUrls } from "../../../../fixtures/urls";

export class Tag {
    constructor(screenshotManager){
        this.screenshotManager = screenshotManager;
    }

    navigateToTags() {
        cy.visit(adminUrls.tagUrls.listUrl);
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigateTags');
    }
    createNewTag() {
        cy.get('a.ember-view[href="#/tags/new/"]').first().click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot('CreateNewTag');
    }
    WriteTagName() {
        let name = faker.lorem.words();
        cy.get('#tag-name').type(name);
        cy.wait(300);
        this.screenshotManager.takeScreenshot('WriteTagNames');
        return name;
    }
    ReadTagName(callback) {
        cy.get('#tag-name').val(val => {
            this.screenshotManager.takeScreenshot('ReadTagNames');
            callback(val)}
        );
    }
    WriteTagDesc() {
        let desc = faker.lorem.word();
        cy.get('#tag-description').type(desc)
            .invoke('text', desc);
        cy.wait(300);
        
        this.screenshotManager.takeScreenshot('WriteTagDescription');
        return desc;
    }
    readTagDesc(callback) {
        cy.get('#tag-description').invoke('text').then(txt => {
            this.screenshotManager.takeScreenshot('ReadTagDescription');
            callback(txt)
        });
    }
    saveTag() {
        cy.get('button.ember-view[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot('SaveTag');
    }
}
