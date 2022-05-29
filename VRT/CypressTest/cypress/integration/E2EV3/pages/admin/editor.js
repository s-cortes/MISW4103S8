const { faker } = require('@faker-js/faker');
import { adminUrls } from "../../../../fixtures/urls";

class Editor {
    constructor(screenshotManager){
        this.screenshotManager = screenshotManager;
    }

    navigateToEditor() {
        cy.visit(`${adminUrls.editorUrl}/${this.editPage.toLowerCase()}`);
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`Navigate${this.editPage}Editor`);
    }
    exitEditorWithBackButton() {
        cy.get('header.gh-editor-header > div > div > a').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`${this.editPage}EditorBackButton`);
    }
    // Article (Page/Post) Content edition --------------------------------------------------------
    writeTitle() {
        let title = faker.lorem.words();
        cy.get('textarea.gh-editor-title').type(title);
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`Write${this.editPage}Title`);
        return title;
    }
    readTitle(callback) {
        this.screenshotManager.takeScreenshot(`EditorRead${this.editPage}Title`);
        cy.get('textarea.gh-editor-title').val(val => callback(val));
    }
    writeArticle() {
        let paragraph = faker.lorem.paragraphs();
        cy.get('article.koenig-editor > div > div > p')
            .invoke('text', paragraph);
        this.screenshotManager.takeScreenshot(`EditorWrite${this.editPage}Content`);
        return paragraph;
    }
    readArticle(callback) {
        this.screenshotManager.takeScreenshot(`EditorRead${this.editPage}Content`);
        cy.get('article.koenig-editor > div > div > p')
            .invoke('text').then(txt => callback(txt));
    }
    // Article (Page/Post) Publication ------------------------------------------------------------
    #clickPublishButton() {
        cy.get('div.gh-publishmenu-trigger').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`EditorClickPublish${this.editPage}`);
    }
    #clickOnFirstPublishOption() {
        cy.get('div.gh-publishmenu-radio').first().click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`EditorPublish${this.editPage}Now`);
    }
    #clickPublishOptionConfirmation() {
        cy.get('button.gh-publishmenu-button').click();
        cy.wait(1000);
        this.screenshotManager.takeScreenshot(`EditorConfirm${this.editPage}PublishOption`);
    }
    #clickPublishModalConfirmation() {
        cy.get('div.modal-content > div.modal-footer > button.gh-btn-black')
            .click();
        cy.wait(300)
        this.screenshotManager.takeScreenshot(`EditorConfirm${this.editPage}Publication`);
    }
    publishNow() {
        this.#clickPublishButton();
        this.#clickOnFirstPublishOption();
        this.#clickPublishOptionConfirmation();

    }

    #publishOnSchedule() {
        cy.contains('div.gh-publishmenu-radio-label', "Schedule it for later").first().click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`EditorPublish${this.editPage}Schedule`);
    }
    #setPublishingDate(publishingDate) {
        cy.get('div.gh-date-time-picker-time > input').clear().type(publishingDate);
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`EditorPublish${this.editPage}OnShedule`);
    }
    #setSheduleForLaterDate(timeString, shouldFail) {
        let hours = timeString.split(':');
        let actualDate = new Date(Date.UTC(2020, 0, 1, hours[0], hours[1], 0));
        let newDateMilli = actualDate.getTime();
        newDateMilli = shouldFail ? newDateMilli - (3*60000) : newDateMilli + (3*60000);
        let scheduledDate = new Date(newDateMilli);
        cy.wait(500);
        let hplusm = scheduledDate.getUTCHours() + ':' + scheduledDate.getUTCMinutes();
        return hplusm;
    }
    getTimeErrorPost(callback){
        cy.get('div.gh-date-time-picker-error').first().then((item => callback(item)));
    }
    
    publishScheduleForLater(shouldFail=false) {
        this.#clickPublishButton();
        this.#publishOnSchedule();

        this.#clickPublishOptionConfirmation();
    }

    unPublish() { 
        this.#clickPublishButton();
        this.#clickOnFirstPublishOption();
    }
    // Article (Page/Post) Preview ----------------------------------------------------------------
    getPreview(){
        cy.get('button[class="gh-btn gh-editor-preview-trigger"]').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`EditorPreview${this.editPage}`);
    }
    getPreviewContent(title, callback) {
        let previewItem = cy.get('iframe.gh-pe-iframe').first().its('0');
        callback(previewItem);
    }
    exitPriview(){
        cy.get('button.gh-editor-back-button').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`EditorPreview${this.editPage}Exit`);
    }
    // Article (Page/Post) Settings ---------------------------------------------------------------
    clickEditorSettingsToggle() {
        cy.get('button.settings-menu-toggle').click();
        cy.wait(300);
    }
    writeUrlSlug() {
        let slug = faker.lorem.slug();
        cy.get('input.post-setting-slug').clear().type(slug, {force: true});
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`Editor${this.editPage}SettingsURL`);
        return slug;
    }
    clickEditorSettingsView(){
        cy.get('a.post-view-link').click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`Editor${this.editPage}ViewSettings`);
    }
    setTagPage(tagName){
        cy.get('#tag-input').clear().type(tagName).type('{enter}');
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`Editor${this.editPage}SettingsTag`);
    }
    writeExcerpt() {
        let excerpt = faker.lorem.paragraph();
        cy.get('textarea.post-setting-custom-excerpt')
            .clear().type(excerpt, {force: true});
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`Editor${this.editPage}SettingsExcerpt`);
        return excerpt;
    }
    deleteArticle() {
        cy.get('button.settings-menu-delete-button').then(btn => {
            this.screenshotManager.takeScreenshot(`Editor${this.editPage}Delete`);
            cy.wrap(btn).click();
            cy.wait(1000);

            this.screenshotManager.takeScreenshot(`Editor${this.editPage}DeleteConfirmation`);

            cy.get('div.modal-content > div.modal-footer > button.gh-btn-red')
            .click();
            cy.wait(300)
            this.screenshotManager.takeScreenshot(`${this.editPage}DeleteSuccess`);
        });
    }
}

class Post extends Editor {
    editPage = 'Post';
    constructor(screenshotManager){
        super(screenshotManager);
    }

    navigateToPosts() {
        cy.visit(adminUrls.postUrls.listUrl);
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigatePosts');
    }
    hasPostsInList() {
        let contentList = cy.get('ol.posts-list');
        return contentList.find('li').length > 0;
    }
    getPostListItems(callback) {
        cy.get('li.gh-posts-list-item')
            .each(($p, index, $list) => callback($p, index, $list));
    }
    findTitleOnPostItem(pItem, callback) {
        cy.wrap(pItem).find('h3.gh-content-entry-title')
            .invoke('text').then(txt => callback(txt));
    }
    getPostFromListByTitle(title, callback) {
        this.screenshotManager.takeScreenshot(`Get${this.editPage}FromList`);
        let postItem = cy.contains('li', title).first();
        callback(postItem);
    }
    goPostFromListByTitle(title) {
        cy.contains('h3.gh-content-entry-title', title).first().click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`Get${this.editPage}ByTitle`);
    }
    getPostByTitleFromHome(title, callback) {
        let postItem = cy.contains('article', title).first();
        callback(postItem);
    }
}

class Page extends Editor {
    editPage = 'Page';
    constructor(screenshotManager){
        super(screenshotManager);
    }

    navigateToPages() {
        cy.visit(adminUrls.pageUrls.listUrl);
        cy.wait(300);
        this.screenshotManager.takeScreenshot('NavigatePages');
    }
    createNewPage() {
        cy.get('a.ember-view[href="#/editor/page/"]').first().click();
        cy.wait(300);
        this.screenshotManager.takeScreenshot(`CreateNew${this.editPage}FromList`);
    }
    getListItems(callback) {
        cy.get('li.gh-posts-list-item').then(posts => {
            this.screenshotManager.takeScreenshot(`Get${this.editPage}Items`);
            callback(posts);
        });
    }
    getFirstFromListByTitle(title, callback) {
        this.screenshotManager.takeScreenshot(`Get${this.editPage}FromList`);
        let postItem = cy.contains('li', title).first();
        callback(postItem);
    }
    getPageListItems(callback) {
        cy.get('li.gh-posts-list-item')
            .each(($p, index, $list) => callback($p, index, $list));
    }
    getPageFromListByTitle(title, callback) {
        let postItem = cy.contains('li', title).first();
        callback(postItem);
        this.screenshotManager.takeScreenshot(`Get${this.editPage}ByTitle`);
    }
}

export {Post, Page};