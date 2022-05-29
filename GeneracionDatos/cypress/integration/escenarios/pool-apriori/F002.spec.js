const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { SettingsPage } from "../../pages/admin/settings";
import { Page } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";

import { pool as articlesPositivePool } from "../../../fixtures/positive/articles.json"
import { pool as articlesNegativePool} from "../../../fixtures/negative/articles.json"
import { email as adminEmail, password as adminPassword } from "../../../fixtures/user.json";

const dashboard = new AdminDashboard();
const settingsPage = new SettingsPage();
const article = new Article();
const page = new Page();
const login = new Login();


/**
 * Agrupación de Escenarios por Funcionalidad
 * F002: Creación y Edición de Pages
 */
describe('Funcionalidad F002: Creación y Edición de Pages', () => {

    before(() => {
        faker.seed(10002);
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
        it('F002E05.PA: ', () => {

            articlesPositivePool.forEach(articlePoolObj => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a page
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin writes a title and the content for the page
                page.publishNow();

                // THEN he should be able to open the page published, and
                // the value in the title input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.goToPagePublishFromSlug();
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
            })

        });
        it('F002E07.PA: ', () => {

            articlesPositivePool.forEach(articlePoolObj => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a page
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin writes a title and the content for the page
                page.publishNow();

                // THEN he should be able to open the page published, and
                // the value in the title input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.goToPagePublishFromSlug();
                article.readContent(prgph => {
                    expect(articlePoolObj.content).to.contain(prgph);
                });
            })

        });
    });

    describe('Escenarios Negativos', () => {
        it('F002E06.PA: ', () => {

            articlesNegativePool.forEach((articlePoolObj, index) => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a page
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin writes a title and the content for the page
                page.publishNow();

                // THEN he should be able to open the page published, and
                // the value in the title input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.goToPagePublishFromSlug();
                article.readTitle((txt) => expect(txt).to.equal(articlePoolObj.title));
            })

        });
        it('F002E08.PA: ', () => {
            articlesNegativePool.forEach((articlePoolObj, index) => {
                // GIVEN (additional to the login and dashboard navigation)
                // that the admin navitages to the dashboard, and selects the option
                // to create a page
                page.navigateToEditor();
                page.writeTitle(articlePoolObj.title);
                page.writeArticle(articlePoolObj.content);

                // WHEN the admin writes a title and the content for the page
                page.publishNow();

                // THEN he should be able to open the page published, and
                // the value in the title input  should match the text that
                // the admin previously wrote
                page.clickEditorSettingsToggle();
                page.goToPagePublishFromSlug();
                article.readContent(prgph => {
                    expect(articlePoolObj.content).to.contain(prgph);
                });
            })
        });
    });

});