const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Post } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";

import { MockarooManager, SCHEMAS } from "../../generator/mockaroo_manager";

import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const article = new Article();
const post = new Post();
const login = new Login();

const articlePositiveManager = new MockarooManager(5, SCHEMAS.articlesPositive);
const articleNegativeManager = new MockarooManager(5, SCHEMAS.articlesNegative);
let articlesPositivePool = [];
let articlesNegativePool = [];

/**
 * Agrupación de Escenarios por Funcionalidad
 * F001: Creación y Edición de Posts
 */
describe('Funcionalidad F001: Creación y Edición de Posts', () => {

    before(() => {
        faker.seed(10001);
        login.login(adminEmail, adminPassword);
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
        dashboard.navigate();
    });

    describe('Escenarios Positivos', () => {

        before(async () => {
            articlesPositivePool = await articlePositiveManager.generareDataPool();
        });

        after(() => {
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });

        it('F001E05.PD: ', () => {

        });
        it('F001E05.PD: ', () => {

        });
        it('F001E07.PD: ', () => {

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

        before(async () => {
            articlesPositivePool = await articlePositiveManager.generareDataPool();
            articlesNegativePool = await articleNegativeManager.generareDataPool();
        });

        after(() => {
            settingsPage.navigateToLabs();
            settingsPage.deleteAllContent();
        });
        
        it('F001E06.PD: ', () => {

        });
        it('F001E06.PD: ', () => {

        });
        it('F001E08.PD: ', () => {

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