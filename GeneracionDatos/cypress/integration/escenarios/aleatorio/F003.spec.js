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
 * F003: Configuración de Posts
 */
describe('Funcionalidad F003: Configuración de Posts', () => {

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
        it('F003E09.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin publishes the post, and opens the editor settings
            // menu, and selects the URL input to erase the default value,
            // and writes a new url slug and re-publishes the post
            post.publishNow();

            let slug = faker.lorem.slug();
            post.clickEditorSettingsToggle();
            post.writeUrlSlug(slug);
            post.clickEditorSettingsToggle();

            post.unPublish();
            post.publishNow();
            
            // THEN after navegating to the post with the new slug,
            // the title and the content that appears in the article
            // should match the text that the admin previously wrote
            article.navigateToArticle(slug);
            cy.wait(300);
            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
        it('F003E11.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin publishes the post, and opens the editor settings
            // menu, and selects the  tag input and writes a new tag, and 
            // re-publishes the post
            post.publishNow();

            let tag = faker.lorem.word();
            post.clickEditorSettingsToggle();
            post.setTagPage(tag);
            post.clickEditorSettingsToggle();

            post.unPublish();
            post.publishNow();

            // THEN he should be able to open the settings tab, and
            // the value in the tag input should match the text that
            // the admin previously wrote
            post.clickEditorSettingsToggle();
            post.readTags((txt) => expect(txt.trim()).to.equal(tag));
        });
    });

    describe('Escenarios Negativos', () => {
        it('F003E10.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // URL input to erase it and writes a new url slug with more characters
            // than the DB limit, and publishes the post
            let slug = faker.lorem.slug(50);
            post.clickEditorSettingsToggle();
            post.writeUrlSlug(slug);
            post.clickEditorSettingsToggle();
            post.publishNow();

            // THEN the post editor should show a publication error alert
            // indicating that it was not possible to publish the post
            post.checkIfPublishErrorExists();
        });
        it('F003E12.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            post.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            post.writeTitle(title);
            post.writeArticle(paragraph);

            // WHEN the admin opens the editor settings menu, and selects the
            // tag input and writes a new tag with a comman at the begining of
            // the word, and publishes the post
            let tag = ',' + faker.lorem.word();
            post.clickEditorSettingsToggle();
            post.setTagPage(tag);
            post.clickEditorSettingsToggle();
            post.publishNow();

            // THEN the post editor should show a publication error alert
            // indicating that it was not possible to publish the post
            post.checkIfPublishErrorExists();
        });
    });

});