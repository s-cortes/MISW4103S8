const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Page } from "./pages/admin/editor";
import { SettingsPage } from "./pages/admin/settings";

import { email as adminEmail, password as adminPassword } from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('F008');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const page = new Page(screenshotManager);
const settingsPage = new SettingsPage();


/**
 * Agrupación de Escenarios prof Funcionalidad
 * F008: Preview de Pages
 */
describe('Funcionalidad: Preview de Pages', () =>{

    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10008);
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

    it('F008E02.E2E: Previsualizar y publicar un Post', () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E02');

        // WHEN
        dashboard.getPages();
        page.createNewPage();

        let title = page.writeTitle();
        let article = page.writeArticle();

        // THEN
        page.getPreview();
        page.getPreviewContent(article, (pItem) => {
            expect(pItem).to.exist;
            pItem.click();
            cy.wait(300);
            page.readArticle((txt) => expect(txt).to.equal(article));
        });

        page.exitPriview();
        page.publishNow();

        page.clickEditorSettingsToggle();
        page.clickEditorSettingsView();
        page.readArticle((txt) => expect(txt).to.equal(article));
    });
});