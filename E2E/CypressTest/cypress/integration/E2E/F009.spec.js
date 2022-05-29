const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "../pages/admin/dashboard";
import { Login } from "../pages/admin/login";
import { Page } from "../pages/admin/editor";
import { Tag } from "../pages/admin/tag";
import { SettingsPage } from "../pages/admin/settings";

import { email as adminEmail, password as adminPassword} from "../../fixtures/user.json";

const dashboard = new AdminDashboard();
const login = new Login();
const page = new Page();
const tag = new Tag();
const settingsPage = new SettingsPage();


/**
 * Agrupación de Escenarios prof Funcionalidad
 * F009: Creación y Ediciónde Tags
 */
describe('Funcionalidad: Creación y Ediciónde Tags', () =>{

    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10009);
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

    it('F009E04.E2E: Asignar un nuevo Tag a una nueva Pagina y filtrar por dicho Tag', () => {
        // GIVEN (additional to the login)

        // WHEN
        dashboard.getTags();
        tag.createNewTag();

        let name = tag.WriteTagName();
        tag.WriteTagDesc();

        tag.saveTag();
        dashboard.getPages();
        page.createNewPage();
        let title = page.writeTitle();
        let article = page.writeArticle();

        page.clickEditorSettingsToggle();
        page.setTagPage(name);
        page.clickEditorSettingsToggle();
        page.publishNow();

        // THEN
        dashboard.getPages();
        page.getFirstFromListByTitle(title, (pItem) => {
            pItem.click();
            cy.wait(300);
            page.readArticle((txt) => expect(txt).to.equal(article));
        });          
    });
});