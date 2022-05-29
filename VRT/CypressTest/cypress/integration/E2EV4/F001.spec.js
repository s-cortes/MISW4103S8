const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Post } from "./pages/admin/editor";
import { SettingsPage } from "./pages/admin/settings";

import { email as adminEmail, password as adminPassword } from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('F001');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const post = new Post(screenshotManager);
const settingsPage = new SettingsPage();


/**
 * Agrupación de Escenarios por Funcionalidad
 * F001: Creación y Edición de Posts
 */
describe('Funcionalidad: Creación y Edición de Posts', () =>{

    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10001);
        login.login(adminEmail, adminPassword);
    });

    // after(() => {
    //     settingsPage.navigateToLabs();
    //     settingsPage.deleteAllContent();
    // });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
        dashboard.navigate();
    });

    it('F001E03.VRT: Creación de un Post Básico', () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E03');

        // WHEN
        dashboard.createPost();
        let title = post.writeTitle();
        let article = post.writeArticle();

        // THEN
        post.exitEditorWithBackButton();
        post.getPostFromListByTitle(title, (pItem) => {
            expect(pItem).to.exist;
            pItem.click();
            cy.wait(300);
            post.readArticle((txt) => expect(txt).to.equal(article));
        });
    });

    it('F001E02.E2E: Edición de un Post', () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E02');

        // WHEN
        dashboard.createPost();
        let title = post.writeTitle();
        let titleEdited = post.writeTitle();
        let article = post.writeArticle();
        let articleEdited = post.writeArticle();

        // THEN
        post.publishNow();
        post.exitEditorWithBackButton();

        post.getPostFromListByTitle(title, (pItem) => {
            pItem.click();
        });

        titleEdited = post.writeTitle();
        articleEdited = post.writeArticle();

        post.publishNow()
        post.readArticle((txt) => expect(txt).to.equal(articleEdited));
    });
});