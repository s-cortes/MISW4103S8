const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Post } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";

import { pool as articlesPositivePool } from "../../../fixtures/positive/articles.json"
import { pool as articlesNegativePool} from "../../../fixtures/negative/articles.json"
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
       it('F003E09.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            articlesPositivePool.forEach(articlePoolObj => {
                let url = articlePoolObj.url.replaceAll(' ', '-');

                post.navigateToEditor();
                post.writeTitle(articlePoolObj.title);
                post.writeArticle(articlePoolObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // URL input to erase it and writes a new url slug, and
                // publishes the post
                post.clickEditorSettingsToggle();
                post.writeUrlSlug(url);
                post.clickEditorSettingsToggle();

                // THEN after navegating to the post with the new slug,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                post.publishNow();
                article.navigateToArticle(url);
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
                article.readContent(prgh => expect(articlePoolObj.content).to.contain(prgh));
            });
        });  
        it('F003E11.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            articlesPositivePool.forEach(articlePoolObj => {
                post.navigateToEditor();
                post.writeTitle(articlePoolObj.title);
                post.writeArticle(articlePoolObj.content);
    
                // WHEN the admin opens the editor settings menu, and selects the
                // tag input and writes a new tag, and publishes the post
                let tag = articlePoolObj.tag.trim();
                post.clickEditorSettingsToggle();
                post.setTagPage(tag);
                post.clickEditorSettingsToggle();
                post.publishNow();
    
                // THEN he should be able to open the settings tab, and
                // the value in the tag input  should match the text that
                // the admin previously wrote
                post.clickEditorSettingsToggle();
                post.readTags((txt) => expect(txt.trim()).to.equal(tag));
            });
        });
    });

    describe('Escenarios Negativos', () => {
        it('F003E10.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                let url = articlePoolObj.url.replaceAll(' ', '-');

                post.navigateToEditor();
                post.writeTitle(posArticleObj.title);
                post.writeArticle(posArticleObj.content);

                // WHEN the admin opens the editor settings menu, and selects the
                // URL input to erase it and writes a new url slug, consisting of
                // whitespaces, dashes, a combination of both, or an ampty string, and
                // publishes the post
                post.clickEditorSettingsToggle();
                post.writeUrlSlug(url);
                post.clickEditorSettingsToggle();

                // THEN after navegating to the post with the new slug,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                post.publishNow();
                article.navigateToArticle(url);
                article.readTitle((txt) => expect(txt).to.equal(posArticleObj.title));
                article.readContent(prgh => expect(posArticleObj.content).to.contain(prgh));
            });
        });
        it('F003E12.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post
            articlesNegativePool.forEach((articlePoolObj, index) => {
                let posArticleObj = articlesPositivePool[index];
                post.navigateToEditor();
    
                // WHEN the admin opens the editor settings menu, and selects the
                // tag input and writes a new tag using whitespaces, special characters, and
                // 'naughty' characters, and publishes the post
                post.clickEditorSettingsToggle();
                post.setTagPage(articlePoolObj.tag);
                post.clickEditorSettingsToggle();
    
                // THEN he should be able to write a title and the content
                // for the post and publish it
                post.writeTitle(posArticleObj.title);
                post.writeArticle(posArticleObj.content);
                post.publishNow();

                post.clickEditorSettingsToggle();
                post.readTags((txt) => expect(txt.trim()).to.equal(articlePoolObj.tag));
            });
        });
    });
});