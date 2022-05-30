const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Post } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";

import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const article = new Article();
const post = new Post();
const login = new Login();


/**
 * Agrupación de Escenarios por Funcionalidad
 * F001: Creación y Edición de Posts
 */
describe('Funcionalidad F001: Creación y Edición de Posts', () => {

    before(() => {
        faker.seed(10001);
        login.login(adminEmail, adminPassword);
    });

    after(() => {
        settingsPage.navigateToLabs();
        settingsPage.deleteAllContent();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
        dashboard.navigate();
    });

    describe('Escenarios Positivos', () => {

        it('F001E05.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // excerpt and write the text
            let excerpt = faker.lorem.slug(200);
            post.clickEditorSettingsToggle();
            post.writeExcerpt(excerpt);
            post.clickEditorSettingsToggle();
            post.publishNow();
            
            // THEN after navegating to the post with the new excerpt,
            // the title and the content that appears in the article
            // should see the excerpt that the admin previously wrote
            post.clickEditorSettingsToggle();
            post.clickEditorSettingsView();
            post.readArticle((txt) => expect(txt).to.equal(paragraph));

        });
        it('F001E05.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title with 25 words 
            post.navigateToEditor();
            let title = faker.lorem.words(25);
            let article = faker.lorem.paragraph(3);

            post.writeTitle(title);
            post.writeArticle(article);

            //When select the publish option and go to the post list
            post.publishNow();
            post.exitEditorWithBackButton();

            // THEN the post should appear as the first item in the
            // list, and the post title should be published post
            post.getPostFromListByTitle(title, (pItem) => {
                pItem.click();                
            });

            post.readTitle((txt) => expect(txt).to.equal(title));
        });
        it('F001E07.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            //WHEN the admin publishes the post now
            post.publishNow();

            // THEN after navegating to the new post,
            // the title and the content that appears in the article
            // should match the text that the admin previously wrote
            article.navigateToArticleByTitle(title);
            cy.wait(300);
            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
    });

    describe('Escenarios Negativos', () => {
        it('F001E06.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // excerpt and write the text
            let excerpt = faker.lorem.slug(301);
            post.clickEditorSettingsToggle();
            post.writeExcerpt(excerpt);
            post.clickEditorSettingsToggle();
            post.publishNow();
            
            // THEN after navegating to the post with the new excerpt,
            // the title and the content that appears in the article
            // should see the excerpt that the admin previously wrote
            post.clickEditorSettingsToggle();
            post.clickEditorSettingsView();
            post.readArticle((txt) => expect(txt).to.equal(paragraph));
        });
        it('F001E06.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title with 25 words 
            post.navigateToEditor();
            let title = faker.lorem.words(250);
            let article = faker.lorem.paragraph(3);

            post.writeTitle(title);
            post.writeArticle(article);

            //When select the publish option and go to the post list
            post.publishNow();
            post.exitEditorWithBackButton();

            // THEN the post should appear as the first item in the
            // list, and the post title should be published post
            post.getPostFromListByTitle(title, (pItem) => {
                pItem.click();                
                expect(pItem).to.not.exist;
            });

        });
        it('F001E08.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs(50000);
            post.writeTitle(title);
            post.writeArticle(paragraph);

            //WHEN the admin publishes the post now
            post.publishNow();

            // THEN after navegating to the new post,
            // the title and the content that appears in the article
            // should match the text that the admin previously wrote
            article.navigateToArticleByTitle(title);
            cy.wait(300);
            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
    });

});