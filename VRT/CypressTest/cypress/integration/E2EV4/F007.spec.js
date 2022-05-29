const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Post } from "./pages/admin/editor";
import { SettingsPage } from "./pages/admin/settings";


import { email as adminEmail, password as adminPassword } from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('F007');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const post = new Post(screenshotManager);
const settingsPage = new SettingsPage();


/**
 * Agrupación de Escenarios prof Funcionalidad
 * F007: Preview de Posts
 */
describe('Funcionalidad: Preview de Posts', () =>{

    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10007);
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

    it('F007E03.E2E: Previsualizar y Publicar una Post', () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E03');

        // WHEN
        dashboard.createPost();

        post.writeTitle();
        let article = post.writeArticle();

        // THEN
        post.getPreview();
        post.getPreviewContent(article, (pItem) => {
            pItem.click();
            cy.wait(300);
            post.readArticle((txt) => expect(txt).to.equal(article));
        });

        post.exitPriview();
        post.publishNow();

        post.clickEditorSettingsToggle();
        post.clickEditorSettingsView();
        post.readArticle((txt) => expect(txt).to.equal(article));
    });
});