const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Page } from "./pages/admin/editor";
import { SettingsPage } from "./pages/admin/settings";

import { email as adminEmail, password as adminPassword } from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('F004');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const page = new Page(screenshotManager);
const settingsPage = new SettingsPage();


/**
 * Agrupación de Escenarios por Funcionalidad
 * F004: Configuración de Pages
 */
describe('Funcionalidad: Configuración de Pages', () =>{

    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10004);
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

    it('F004E04.E2E: Creación y eliminación de una pagina', () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E04');

        // WHEN
        dashboard.getPages();
        page.createNewPage();

        let title = page.writeTitle();
        let article = page.writeArticle();

        // THEN
        page.exitEditorWithBackButton();
        page.getFirstFromListByTitle(title, (pItem) => {
            expect(pItem).to.exist;
            pItem.click();
            cy.wait(300);
            page.readArticle((txt) => expect(txt).to.equal(article));
        });

        page.publishNow();
        page.exitEditorWithBackButton();
        page.getPageFromListByTitle(title, (pItem) => {
            pItem.click();
        });

        page.clickEditorSettingsToggle();
        page.deleteArticle();
    });
});