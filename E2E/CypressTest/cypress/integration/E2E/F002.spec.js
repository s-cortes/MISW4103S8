const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../pages/admin/dashboard";
import { Login } from "../pages/admin/login";
import { Page } from "../pages/admin/editor";
import { SettingsPage } from "../pages/admin/settings";

import { email as adminEmail, password as adminPassword} from "../../fixtures/user.json";

const dashboard = new AdminDashboard();
const login = new Login();
const page = new Page();
const settingsPage = new SettingsPage();


/**
 * Agrupación de Escenarios por Funcionalidad
 * F002: Creación y Edición de Pages
 */
describe('Funcionalidad: Creación y Edición de Pages', () =>{

    before(() => {
        // GIVEN that the admin user logs-in to ghost
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

    it('F002E03.E2E: Creación de un Page Básico', () => {
        // GIVEN (additional to the login)

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
    });
});