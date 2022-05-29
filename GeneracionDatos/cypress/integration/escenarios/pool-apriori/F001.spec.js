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
        it('F001E05.PA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a post, and writes a title and the content for the post
            articlesPositivePool.forEach(articlePoolObj => {
            let excerpt = articlePoolObj.excerpt.replaceAll(' ', '-');

            post.navigateToEditor();
            post.writeTitle(articlePoolObj.title);
            post.writeArticle(articlePoolObj.content);

            // WHEN the admin opens the editor settings menu, and selects the
            // excerpt and write the text
            post.clickEditorSettingsToggle();
            post.writeExcerpt(excerpt);
            post.clickEditorSettingsToggle();
            post.publishNow();
            
            // THEN after navegating to the post with the new excerpt,
            // the title and the content that appears in the article
            // should see the excerpt that the admin previously wrote
            post.clickEditorSettingsToggle();
            post.clickEditorSettingsView();
            post.readArticle((txt) => expect(txt).to.equal(articlePoolObj.content));
            });

        });
        it('F001E05.PA: ', () => {

        });
        it('F001E07.PA: ', () => {
            articlesPositivePool.forEach(articlePoolObj => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a post, and writes a title and the content for the post
                post.navigateToEditor();
                post.writeTitle(articlePoolObj.title);
                post.writeArticle(articlePoolObj.content);

                //WHEN the admin publishes the post now
                post.publishNow();

                // THEN after navegating to the new post,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                article.navigateToArticleByTitle(articlePoolObj.title);
                cy.wait(300);
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
                article.readContent(prgph => {
                    expect(articlePoolObj.content).to.contain(prgph);
                });
            })
        });
    });

    describe('Escenarios Negativos', () => {
        it('F001E06.PA: ', () => {
               
        });
        it('F001E06.PA: ', () => {

        });
        it('F001E08.PA: ', () => {
            articlesNegativePool.forEach((articlePoolObj, index) => {
                post.navigateToEditor();
                post.writeTitle(articlePoolObj.title);
                post.writeArticle(articlePoolObj.content);

                //WHEN the admin publishes the post now
                post.publishNow();

                // THEN after navegating to the new post,
                // the title and the content that appears in the article
                // should match the text that the admin previously wrote
                article.navigateToArticleByTitle(articlePoolObj.title);
                cy.wait(300);
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
                article.readContent(prgph => {
                    expect(articlePoolObj.content).to.contain(prgph);
                });
            })

        });
    });

});