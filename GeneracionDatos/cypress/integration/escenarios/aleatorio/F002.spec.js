const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../../pages/admin/dashboard";
import { Login } from "../../pages/admin/login";
import { Page } from "../../pages/admin/editor";
import { Article } from "../../pages/user/article";
import { SettingsPage } from "../../pages/admin/settings";

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
        it('F002E05.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page
            page.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            page.writeTitle(title);
            page.writeArticle(paragraph);

            // WHEN the admin writes a title and the content for the page
            page.publishNow();

            // THEN he should be able to open the page published, and
            // the value in the title input  should match the text that
            // the admin previously wrote
            page.clickEditorSettingsToggle();
            page.goToPagePublishFromSlug();
            article.readTitle((txt) => expect(txt).to.equal(title));

        });
        it('F002E07.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page
            page.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs();
            page.writeTitle(title);
            page.writeArticle(paragraph);

            // WHEN the admin writes a title and the content for the page
            page.publishNow();

            // THEN he should be able to open the page published, and
            // the value in the title input  should match the text that
            // the admin previously wrote
            page.clickEditorSettingsToggle();
            page.goToPagePublishFromSlug();
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
    });

    describe('Escenarios Negativos', () => {
        it('F002E06.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page
            page.navigateToEditor();
            let title = faker.lorem.words(300);
            let paragraph = faker.lorem.paragraphs();
            page.writeTitle(title);
            page.writeArticle(paragraph);

            // WHEN the admin writes a title and the content for the page
            page.publishNow();

            // THEN he should be able to open the page published, and
            // the value in the title input  should match the text that
            // the admin previously wrote
            page.clickEditorSettingsToggle();
            page.goToPagePublishFromSlug();
            article.readTitle((txt) => expect(txt).to.equal(title));

        });
        it('F002E08.EA: ', () => {
            // GIVEN (additional to the login and dashboard navigation)
            // that the admin navitages to the dashboard, and selects the option
            // to create a page
            page.navigateToEditor();
            let title = faker.lorem.words();
            let paragraph = faker.lorem.paragraphs(50000);
            page.writeTitle(title);
            page.writeArticle(paragraph);

            // WHEN the admin writes a title and the content for the page
            page.publishNow();

            // THEN he should be able to open the page published, and
            // the value in the title input  should match the text that
            // the admin previously wrote
            page.clickEditorSettingsToggle();
            page.goToPagePublishFromSlug();
            article.readContent(prgph => {
                expect(paragraph).to.contain(prgph);
            });
        });
    });

});