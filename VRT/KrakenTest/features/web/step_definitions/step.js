const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai'); 
const fs = require('fs');
const { faker } = require('@faker-js/faker');
var counter = 0;
var prefix = '';
var version = '';

Given('I setup the Scenario {kraken-string} with {int} on {kraken-string}', async function (scenario, fSeed, sVersion) {
    counter = 0;
    prefix = scenario;
    version = sVersion;
    faker.seed(fSeed);        
    console.log('prefix: ' + prefix);
    console.log('version: ' + version);
});

When('I enter email {kraken-string}', async function (email) {
        let element = await this.driver.$('input[name="identification"]');          
        return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
        let element = await this.driver.$('input[name="password"]');
        return await element.setValue(password);
});

When('I click sing in', async function() {
        let element = await this.driver.$('button[type="submit"]');
        return await element.click();
});

When('I click on post', async function () {
    let element = await this.driver.$('a[href="#/posts/"]');
    let varClick = await element.click();
    takeScreenshot("NavigateToPosts", this.driver);
    return varClick;
});

When('I click on new post', async function () {
     let element = await this.driver.$('a[href="#/editor/post/"]');
     let varClick = await element.click();
     takeScreenshot("NavigateToNewPost", this.driver);
     return varClick;
});

When('I click on published post', async function () {
    let element = await this.driver.$('a[title="Published"]');
    let varClick = await element.click();
    takeScreenshot("ClickOnPublishedPost", this.driver);
    return varClick;
});

When('I click on the post title', async function () {
    let element = await this.driver.$('textarea.gh-editor-title');
    let varClick = await element.click();
    takeScreenshot("ClickOnPostTitle", this.driver);
    return varClick;
});

When('I copy a text {kraken-string}', async function ($name_1) {
    let element = await this.driver.$('textarea.gh-editor-title');
    await element.setValue($name_1);
    takeScreenshot("SetPostTitle", this.driver);
    return await element.click();
});

When('I click on the begin writing your ... section', async function () {
    let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    let varClick = await element.click();
    takeScreenshot("ClickOnPostContent", this.driver);
    return varClick;
});

When('I copy a text on the begin writing your ... section {kraken-string}', async function ($string_1) {
    let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    await element.setValue($string_1);
    takeScreenshot("SetPostContent", this.driver);
    return await element.click();
});

When('I preview it', async function () {
    let element = await this.driver.$('button[class="gh-btn gh-editor-preview-trigger"]');
    let varClick = await element.click();
    takeScreenshot("ClickOnPreview", this.driver);
    return varClick; 
});

Then('I should see the title {kraken-string}', async function ($name_1) {
    let frame= await this.driver.$('iframe.gh-pe-iframe');      
    this.driver.pause(5000);
    this.driver.switchToFrame(frame);
    let element = await this.driver.$('h1.article-title');   
    let actual = await element.getText();
    let expected = $name_1;
    await element.click();
    expect(actual.trim()).to.equal(expected); 
    this.driver.switchToParentFrame();
});

Then('I should see the tittle {kraken-string}', async function ($name_1) {
    let expected = $name_1;
    let element = await this.driver.$('article > header:nth-child(1) > h1:nth-child(1)');
    let actual = await element.getText();
    await element.click();
    expect(actual.trim()).to.equal(expected); 
});

When ('I go back', async function () {
    let element = await this.driver.$('button.gh-editor-back-button');
    let varClick = await element.click();
    takeScreenshot("ClickOnBackButton", this.driver);
    return varClick; 
});

When ('I Open the post settings', async function () { 
    let element = await this.driver.$('button[title="Settings"]'); //class="ghost-url-preview description ember-view"
    let varClick = await element.click();
    takeScreenshot("ClickOnPostSetting", this.driver);
    return varClick; 
});

When('I click on the publish option', async function () {
    let element = await this.driver.$('div[class="gh-publishmenu ember-view"] > div:nth-child(1)');
    let varClick = await element.click();
    takeScreenshot("ClickOnPublishOption", this.driver);
    return varClick; 
});

When('I click on publish button', async function () {
    let element = await this.driver.$('footer.gh-publishmenu-footer > button:nth-child(2)');
    let varClick = await element.click();
    takeScreenshot("ClickOnPublishButton", this.driver);
    return varClick; 
}); 

When('I publish it', async function () {
    let element = await this.driver.$('div.modal-footer > button:nth-child(2)');
    let varClick = await element.click();
    //takeScreenshot("ClickOnPublishConfirmation", this.driver);
    return varClick; 
}); 

When ('I clic on view post', async function () { 
    let element = await this.driver.$('a.post-view-link');
    let varClick = await element.click();
    takeScreenshot("ClickOnViewPost", this.driver);
    return varClick; 
});

Then('I should see the text body {kraken-string}', async function ($string_1) {
    let expected = $string_1;
    let element = await this.driver.$('.gh-content gh-canvas > p:nth-child(1)');
    let actual = await element.getText();   
    expect(actual.trim()).to.equal(expected);   
});
																								   
When ('I click on Tags', async function () { 
    let element = await this.driver.$('a[href="#/tags/"]');     
    let varClick = await element.click();
    takeScreenshot("NavigateToTags", this.driver);
    return varClick;                                             
});

When ('I click on New Tag option', async function () { 
    let element = await this.driver.$('a[href="#/tags/new/"]');     
    let varClick = await element.click();
    takeScreenshot("ClickOnNewTag", this.driver);
    return varClick;                                                         
});

When ('I click on Tag Name', async function () { 
    let element = await this.driver.$('input[class="ember-text-field gh-input ember-view"]');     
    let varClick = await element.click();
    takeScreenshot("ClickOnTagName", this.driver);
    return varClick;   
});

When ('I click on Tag description', async function () { 
    let element = await this.driver.$('textarea[name="description"]');     
    let varClick = await element.click();
    takeScreenshot("ClickOnTagDescription", this.driver);
    return varClick;  
});

When ('I click on Save', async function () { 
    let element = await this.driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');     
    let varClick = await element.click();
    takeScreenshot("ClickOnSaveTag", this.driver);
    return varClick; 
});

When ('I click on Tag option', async function () { 
    let element = await this.driver.$('input[class="ember-power-select-trigger-multiple-input"]');     
    let varClick = await element.click();
    takeScreenshot("ClickOnTagOption", this.driver);
    return varClick;
});

Then ('I clic on delete page option', async function () { 
    await this.driver.$('button[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]').scrollIntoView();
    let element = await this.driver.$('button.settings-menu-delete-button'); 
    let varClick = await element.click();
    takeScreenshot("ClickOnDeletePageOption", this.driver);
    return varClick;
});

When ('I clic on delete page button', async function () { 
    let element = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');     
    let varClick = await element.click();
    takeScreenshot("ClickOnDeletePageButton", this.driver);
    return varClick;
});

When ('I select the Tag {kraken-string}', async function (tag) { 
    let element = await this.driver.$('input[class="ember-power-select-trigger-multiple-input"]');     
    await element.setValue(tag+'\n');                                                
    let varClick = await element.click();
    takeScreenshot("ClickOnSelectTag", this.driver);
    return varClick;
});
                                                                                                
When ('I click on Tag Filter', async function () { 
    let element = await this.driver.$('div[class="gh-contentfilter-menu gh-contentfilter-tag "] > div:nth-child(1)');     
    let varClick = await element.click();
    takeScreenshot("ClickOnTagsFilterOption", this.driver);
    return varClick;
});

When ('I select Tag Filter val {kraken-string}', async function (val) {
    let xpath = '//li[text()="'+val+'"]';  
    let element = await this.driver.$(xpath);     
    let varClick = await element.click();
    takeScreenshot("ClickOnTagsFilterVal", this.driver);
    return varClick;
});

When ('I select the published post {kraken-string}', async function (val) {
    let xpath = '//h3[text()="'+val+'"]';  
    let element = await this.driver.$(xpath);     
    let varClick = await element.click();
    takeScreenshot("FindPublishedPost", this.driver);
    return varClick;
});
                                                                                                
Then ('I should see the created page {kraken-string}', async function ($name_1) {
    let expected = $name_1;
    let element = await this.driver.$('h3[class="gh-content-entry-title"]');     
    let actual = await element.getText();   
    expect(actual.trim()).to.equal(expected); 
});

When('I click on the Schedule it for later option', async function () {
    let element = await this.driver.$('div.gh-publishmenu-section > div:nth-child(2) > div:nth-child(1)');
    let varClick = await element.click();
    takeScreenshot("ClickOnScheduleOption", this.driver);
    return varClick;
});

When('I click on the Schedule button', async function () {
    let element = await this.driver.$('footer.gh-publishmenu-footer > button:nth-child(2)');
    let varClick = await element.click();
    takeScreenshot("ClickOnScheduleButton", this.driver);
    return varClick;
});

When('I click on the Schedule button from the modal', async function () {
    let element = await this.driver.$('div.modal-footer > button:nth-child(2)');
    let varClick = await element.click();
    takeScreenshot("ClickOnScheduleConfirmation", this.driver);
    return varClick;
});

Then('I preview it on mobile mode', async function () {
    let element = await this.driver.$('div.gh-post-preview-btn-group > div:nth-child(1) > button:nth-child(2)');
    let varClick = await element.click();
    takeScreenshot("ClickOnMobilePreview", this.driver);
    return varClick;
});

//Pages actions
When ('I click on Page', async function () {
    let element = await this.driver.$('a[href="#/pages/"]');    
    let varClick = await element.click();
    takeScreenshot("NavigateToPages", this.driver);
    return varClick;
});
    
When ('I click on New Page option', async function () {
    let element = await this.driver.$('a[href="#/editor/page/"]');
    let varClick = await element.click();
    takeScreenshot("ClickToNewPage", this.driver);
    return varClick;
});

When ('I click on page title', async function () {
    let element = await this.driver.$('textarea.gh-editor-title');
    let varClick = await element.click();
    takeScreenshot("ClickOnPageTitle", this.driver);
    return varClick;
});

When ('I click on the begin writing your page section', async function () {
    let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    let varClick = await element.click();
    takeScreenshot("ClickOnPageContent", this.driver);
    return varClick;
});

When ('Then I preview the page', async function () {
    let element = await this.driver.$('section.flex > div:nth-child(1) > button:nth-child(1)');
    let varClick = await element.click();
    takeScreenshot("ClickOnPagePreview", this.driver);
    return varClick;
});

// Post/Page Editor Step Commands -----------------------------------------------------------------
When('I write a title on the Editor {kraken-string}', async function($title) {
    let editorTitle = await this.driver.$('textarea.gh-editor-title');
    await editorTitle.click();
    let varClick = await editorTitle.setValue($title)
    takeScreenshot("WriteTitle", this.driver);
    return varClick;
});

When('I write the text content on the Editor {kraken-string}', async function($textContent) {
    let editorTextContent = await this.driver.$('article.koenig-editor > div > div > p');
    await editorTextContent.click();
    let varClick = await editorTextContent.setValue($textContent)
    takeScreenshot("WriteContent", this.driver);
    return varClick;
});

When('I exit the editor using the back button', async function() {
    let varClick = await this.driver.$('a.gh-editor-back-button').click();
    takeScreenshot("ClickOnEditorBackButton", this.driver);
    return varClick;
});

//Paso I exit the editor using the back button para la versión 3.42 de Ghost
When('I exit the editor using the back button on V3', async function() {
    let varClick = await this.driver.$('header.gh-editor-header > div > div > a').click();
    takeScreenshot("ClickOnEditorBackButton", this.driver);
    return varClick;
});

When('I click the Editor Settings menu', async function() {
    let varClick = await this.driver.$('button.settings-menu-toggle').click();
    takeScreenshot("ClickOnEditorSettings", this.driver);
    return varClick;
});

When('I modify the current URL slug {kraken-string}', async function($slug) {
    let editorSlug = await this.driver.$('input.post-setting-slug');
    let varClick =  editorSlug.setValue($slug);
    takeScreenshot("ClickOnEditorSettings", this.driver);
    return varClick;
});

When('I modify the current Excerpt {kraken-string}', async function($excerpt) {
    let editorExcerpt = await this.driver.$('textarea.post-setting-custom-excerpt');
    let varClick = await editorExcerpt.setValue($excerpt);
    takeScreenshot("ClickOnEditorSettings", this.driver);
    return varClick;
});

When('I click the button to delete the article', async function() {
    let varClick =  await this.driver.$('button.settings-menu-delete-button').click();
    takeScreenshot("ClickOnDeleteArticle", this.driver);
    return varClick;
});

When('I confirm the decision to delete the article', async function() {
    let varClick = await this.driver.$('div.modal-content > div.modal-footer > button.gh-btn-red')
        .click();
    takeScreenshot("ClickOnDeleteArticle", this.driver);
    return varClick;
});

Then('I should see in the Editor the text {kraken-string} that was written before', async function($textContent) {
    let textContent = await this.driver.$('article.koenig-editor > div > div > p').getText();
    expect(textContent.trim()).to.equal($textContent);
});

// Post Publish Step Commands -----------------------------------------------------------------
When('I click on publish post', async function() {
    let varClick = await this.driver.$('div[class="gh-publishmenu"]').click();
    takeScreenshot("ClickOnPublishPost", this.driver);
    return varClick;
});

When('I click on publish', async function() {
    let varClick = await this.driver.$('button[class="gh-publishmenu-button"]').click();
    takeScreenshot("ClickOnPublishPostButton", this.driver);
    return varClick;
});


When('I click on update', async function() {
    return await this.driver.$('div[class="gh-publishmenu-trigger"]').click();
});

When('I click on unpublished', async function() {
    return await this.driver.$('div[title="Unpublished"]').click();
});

When('I click on unpublish', async function() {
    return await this.driver.$('div.modal-content > div.modal-footer > button.gh-btn-black').click();
});

When('I click on schedule it for later', async function() {
    let varClick = await this.driver.$('div.gh-publishmenu-radio:contains("Schedule it for later")').click();
    takeScreenshot("ClickOnScheduleForLater", this.driver);
    return varClick;
});

When('I confirm publication', async function() {
    let varClick = await this.driver.$('div.modal-content > div.modal-footer > button.gh-btn-black').click();
    takeScreenshot("ClickOnConfirmPublication", this.driver);
    return varClick;
});

When('I write a wrong date', async function() {
    let postHour = await this.driver.$('div.gh-date-time-picker-time > input');
    await postHour.click();
    await postHour.setValue('');
    let varClick = await postHour.setValue("00:00")
    takeScreenshot("ClickOnWriteWrongDate", this.driver);
    return varClick;
});

When('I navigate to home as not admin', async function ($url, $slug) {
    let varClick = await this.driver.url(`${$url}/`);
    takeScreenshot("NavigateToHome", this.driver);
    return varClick;
});

Then('I should find the new Post {kraken-string} publish as the first list item', async function($title) {
    let postItem = await this.driver.$('h2.post-card-title');
    let titleFound = await postItem.getText();
    expect(titleFound.trim()).to.equal($title);
    return await postItem.click(); 
});

Then('I should find and advertizing title', async function() {
    let alertTitle = await this.driver.$('div.gh-date-time-picker-error');
    let alertText = await alertTitle.getText();
    return await expect(alertText.trim()).to.equal("Must be at least 2 mins in the future");
});



// Post List Step Commands ------------------------------------------------------------------------
Then('I should find the new Post {kraken-string} as the first list item', async function($title) {
    let postItem = await this.driver.$('h3.gh-content-entry-title');
    let titleFound = await postItem.getText();
    expect(titleFound.trim()).to.equal($title);
    return await postItem.click(); 
});

Then('I should not find the new Post {kraken-string} as the first list item', async function($title) {
    let postItem = await this.driver.$('h3.gh-content-entry-title');
    let titleFound = await postItem.getText();
    expect(titleFound.trim()).to.not.equal($title);
    return await postItem.click(); 
});

// Page List Step Commands ------------------------------------------------------------------------
When('I go to Pages List', async function() {
    let varClick = await this.driver.$('a.ember-view[href="#/pages/"]').click();
    takeScreenshot("NavigateToPagesList", this.driver);
    return varClick;
});

When('I create a new Page', async function() {
    let varClick = await this.driver.$('a.ember-view[href="#/editor/page/"]').click();
    takeScreenshot("NavigateToPagesList", this.driver);
    return varClick;
});

Then('I should find the new Page {kraken-string} as the first list item', async function($title) {
    let postItem = await this.driver.$('h3.gh-content-entry-title');
    let titleFound = await postItem.getText();
    expect(titleFound.trim()).to.equal($title);
    return await postItem.click(); 
});

Then('I click on deleting all content', async function(){
    let deleteAllContentBtn = await this.driver.$('.js-delete');
    return await deleteAllContentBtn.click();
});

Then('I confirm the decision to delete all content', async function(){
    let deleteAllContentBtn = await this.driver.$('div.modal-footer > .gh-btn-red');
    return await deleteAllContentBtn.click();
});

// (Not Admin) Home Page Commands -----------------------------------------------------------------
When('I visit a particular post {kraken-string} {kraken-string}', async function ($url, $slug) {
    let varClick = await this.driver.url(`${$url}/${$slug}`);
    takeScreenshot("NavigateToHomeSlug", this.driver);
    return varClick;
});

Then('I should find the new Excerpt {kraken-string} as the first item in the post list', async function($excerpt) {
    let postExcerpt = await this.driver.$('.post-card-excerpt > p');
    let ExcerptFound = await postExcerpt.getText();
    expect(ExcerptFound.trim()).to.equal($excerpt);
    return await postExcerpt.click(); 
});

When('I delete all content', async function() {
    let element = await this.driver.$('.js-delete');
    await element.click();
    let deleteContent = await this.driver.$('div.modal-footer > .gh-btn-red');
    await deleteContent.click();
    return await deleteContent; 
});

let takeScreenshot = async (stepName, driver) => {
    if (!fs.existsSync(`./screenshots/${version}/${prefix}`)) {
        fs.mkdirSync(`./screenshots/${version}/${prefix}`, { recursive: true });
    }
    await driver.saveScreenshot(`./screenshots/${version}/${prefix}/${counter}_${stepName}.png`);
    counter += 1;
};