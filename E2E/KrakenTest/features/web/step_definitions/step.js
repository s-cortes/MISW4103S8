const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('chai'); 

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
    return await element.click();
});

When('I click on new post', async function () {
     let element = await this.driver.$('a[href="#/editor/post/"]');
     return await element.click();
});

When('I click on published post', async function () {
    let element = await this.driver.$('a[title="Published"]');
     return await element.click();
});

When('I click on the post title', async function () {
    let element = await this.driver.$('textarea[placeholder="Post title"]');
    return await element.click();
});

When('I copy a text {kraken-string}', async function ($name_1) {
    let element = await this.driver.$('textarea[placeholder="Post title"]');
    await element.setValue($name_1);
    return await element.click();
});

When('I click on the begin writing your ... section', async function () {
    let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    return await element.click();
});

When('I copy a text on the begin writing your ... section {kraken-string}', async function ($string_1) {
    let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    await element.setValue($string_1);
    return await element.click();
});

When('I preview it', async function () {
    let element = await this.driver.$('button[class="gh-btn gh-editor-preview-trigger"]');
    return await element.click();    
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

When ('I go back', async function () {
    let element = await this.driver.$('button.gh-editor-back-button');
    return await element.click();
});

When ('I Open the post settings', async function () { 
    let element = await this.driver.$('button[title="Settings"]'); //class="ghost-url-preview description ember-view"
    return await element.click();
});

When('I click on the publish option', async function () {
    let element = await this.driver.$('div[class="gh-publishmenu ember-view"] > div:nth-child(1)');
    return await element.click();
});

When('I click on publish button', async function () {
    let element = await this.driver.$('footer.gh-publishmenu-footer > button:nth-child(2)');
    return await element.click();
}); 

When('I publish it', async function () {
    let element = await this.driver.$('div.modal-footer > button:nth-child(2)');
    return await element.click();
}); 

When ('I clic on view post', async function () { 
    let element = await this.driver.$('a.post-view-link');
    return await element.click();
});

Then('I should see the text body {kraken-string}', async function ($string_1) {
    let expected = $string_1;
    let element = await this.driver.$('.gh-content gh-canvas > p:nth-child(1)');
    let actual = await element.getText();   
    expect(actual.trim()).to.equal(expected);   
});
																								   
When ('I click on Tags', async function () { 
    let element = await this.driver.$('a[href="#/tags/"]');     
    return await element.click();
                                            
});

When ('I click on New Tag option', async function () { 
    let element = await this.driver.$('a[href="#/tags/new/"]');     
    return await element.click();
                                                        
});

When ('I click on Tag Name', async function () { 
    let element = await this.driver.$('input[class="ember-text-field gh-input ember-view"]');     
    return await element.click();
});

When ('I click on Tag description', async function () { 
    let element = await this.driver.$('textarea[name="description"]');     
    return await element.click();
});

When ('I click on Save', async function () { 
    let element = await this.driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]');     
    return await element.click();
});

When ('I click on Tag option', async function () { 
    let element = await this.driver.$('input[class="ember-power-select-trigger-multiple-input"]');     
    return await element.click();
});

Then ('I clic on delete page option', async function () { 
    let element = await this.driver.$('button[class="gh-btn gh-btn-hover-red gh-btn-icon settings-menu-delete-button"]');     
    return await element.click();
});

When ('I clic on delete page button', async function () { 
    let element = await this.driver.$('button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]');     
    return await element.click();
});

When ('I select the Tag {kraken-string}', async function (tag) { 
    let element = await this.driver.$('input[class="ember-power-select-trigger-multiple-input"]');     
    await element.setValue(tag+'\n');
                                                
    return await element.click();
});
                                                                                                
When ('I click on Tag Filter', async function () { 
    let element = await this.driver.$('div[class="gh-contentfilter-menu gh-contentfilter-tag "] > div:nth-child(1)');     
    return await element.click();
});

When ('I select Tag Filter val {kraken-string}', async function (val) {
    let xpath = '//li[text()="'+val+'"]';  
    let element = await this.driver.$(xpath);     
    return await element.click();
});

When ('I select the published post {kraken-string}', async function (val) {
    let xpath = '//li/a[1]/h3[text()="'+val+'"]';  
    let element = await this.driver.$(xpath);     
    return await element.click();
});
                                                                                                
Then ('I should see the created page {kraken-string}', async function ($name_1) {
    let expected = $name_1;
    let element = await this.driver.$('h3[class="gh-content-entry-title"]');     
    let actual = await element.getText();   
    expect(actual.trim()).to.equal(expected); 
});

When('I click on the Schedule it for later option', async function () {
    let element = await this.driver.$('div.gh-publishmenu-section > div:nth-child(2) > div:nth-child(1)');
    return await element.click();
});

When('I click on the Schedule button', async function () {
    let element = await this.driver.$('footer.gh-publishmenu-footer > button:nth-child(2)');
    return await element.click();
});

When('I click on the Schedule button from the modal', async function () {
    let element = await this.driver.$('div.modal-footer > button:nth-child(2)');
    return await element.click();
});

Then('I preview it on mobile mode', async function () {
    let element = await this.driver.$('div.gh-post-preview-btn-group > div:nth-child(1) > button:nth-child(2)');
    return await element.click();
});

//Pages actions
When ('I click on Page', async function () {
    let element = await this.driver.$('a[href="#/pages/"]');
    return await element.click();
});
    
When ('I click on New Page option', async function () {
    let element = await this.driver.$('a[href="#/editor/page/"]');
    return await element.click();
});

When ('I click on page title', async function () {
    let element = await this.driver.$('textarea[placeholder="Page title"]');
    return await element.click();
});

When ('I click on the begin writing your page section', async function () {
    let element = await this.driver.$('p[data-koenig-dnd-droppable="true"]');
    return await element.click();
});

When ('Then I preview the page', async function () {
    let element = await this.driver.$('section.flex > div:nth-child(1) > button:nth-child(1)');
    return await element.click();
});

// Post/Page Editor Step Commands -----------------------------------------------------------------
When('I write a title on the Editor {kraken-string}', async function($title) {
    let editorTitle = await this.driver.$('textarea.gh-editor-title');
    await editorTitle.click();
    return await editorTitle.setValue($title)
});

When('I write the text content on the Editor {kraken-string}', async function($textContent) {
    let editorTextContent = await this.driver.$('article.koenig-editor > div > div > p');
    await editorTextContent.click();
    return await editorTextContent.setValue($textContent)
});

When('I exit the editor using the back button', async function() {
    return await this.driver.$('a.gh-editor-back-button').click();
});

When('I click the Editor Settings menu', async function() {
    return await this.driver.$('button.settings-menu-toggle').click();
});

When('I modify the current URL slug {kraken-string}', async function($slug) {
    let editorSlug = await this.driver.$('input.post-setting-slug');
    return await editorSlug.setValue($slug);
});

When('I modify the current Excerpt {kraken-string}', async function($excerpt) {
    let editorExcerpt = await this.driver.$('textarea.post-setting-custom-excerpt');
    return await editorExcerpt.setValue($excerpt);
});

When('I click the button to delete the article', async function() {
    return await this.driver.$('button.settings-menu-delete-button').click();
});

When('I confirm the decision to delete the article', async function() {
    return await this.driver.$('div.modal-content > div.modal-footer > button.gh-btn-red')
        .click();
});

Then('I should see in the Editor the text {kraken-string} that was written before', async function($textContent) {
    let textContent = await this.driver.$('article.koenig-editor > div > div > p').getText();
    expect(textContent.trim()).to.equal($textContent);
});

// Post Publish Step Commands -----------------------------------------------------------------

When('I click on publish post', async function() {
    return await this.driver.$('div[class="gh-publishmenu"]').click();
});

When('I click on publish', async function() {
    return await this.driver.$('button[class="gh-publishmenu-button"]').click();
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
    return await this.driver.$('div.gh-publishmenu-radio:contains("Schedule it for later")').click();
});


When('I confirm publication', async function() {
    return await this.driver.$('div.modal-content > div.modal-footer > button.gh-btn-black').click();
});

When('I write a wrong date', async function() {
    let postHour = await this.driver.$('div.gh-date-time-picker-time > input');
    await postHour.click();
    await postHour.setValue('');
    return await postHour.setValue("00:00")
});

When('I navigate to home as not admin', async function ($url, $slug) {
    return await this.driver.url(`${$url}/`);
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
    return await this.driver.$('a.ember-view[href="#/pages/"]').click();
});

When('I create a new Page', async function() {
    return await this.driver.$('a.ember-view[href="#/editor/page/"]').click();
});

Then('I should find the new Page {kraken-string} as the first list item', async function($title) {
    let postItem = await this.driver.$('h3.gh-content-entry-title');
    let titleFound = await postItem.getText();
    expect(titleFound.trim()).to.equal($title);
    return await postItem.click(); 
});

// (Not Admin) Home Page Commands -----------------------------------------------------------------
When('I visit a particular post {kraken-string} {kraken-string}', async function ($url, $slug) {
    return await this.driver.url(`${$url}/${$slug}`);
});

Then('I should find the new Excerpt {kraken-string} as the first item in the post list', async function($excerpt) {
    let postExcerpt = await this.driver.$('.post-card-excerpt > p');
    let ExcerptFound = await postExcerpt.getText();
    expect(ExcerptFound.trim()).to.equal($excerpt);
    return await postExcerpt.click(); 
});