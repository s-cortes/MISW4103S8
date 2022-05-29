const { faker } = require('@faker-js/faker');
import { adminUrls } from "../../../fixtures/urls";

export class Tag {
    constructor(screenshotManager){
        this.screenshotManager = screenshotManager;
    }

    navigateToTags() {
        cy.visit(adminUrls.tagUrls.listUrl);
        cy.wait(300);
    }
    createNewTag() {
        cy.get('a.ember-view[href="#/tags/new/"]').first().click();
        cy.wait(300);
    }
    WriteTagName() {
        let name = faker.lorem.words();
        cy.get('#tag-name').type(name);
        cy.wait(300);
        return name;
    }
    ReadTagName(callback) {
        cy.get('#tag-name').val(val => {
            callback(val)}
        );
    }
    WriteTagDesc() {
        let desc = faker.lorem.word();
        cy.get('#tag-description').type(desc)
            .invoke('text', desc);
        cy.wait(300);
        
        return desc;
    }
    readTagDesc(callback) {
        cy.get('#tag-description').invoke('text').then(txt => {
            callback(txt)
        });
    }
    saveTag() {
        cy.get('button.ember-view[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]').click();
        cy.wait(300);
    }
}
