const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Post } from "./pages/admin/editor";
import { SettingsPage } from "./pages/admin/settings";

import { UserHomePage } from "./pages/user/home";
import { Article } from "./pages/user/article";

import { email as adminEmail, password as adminPassword } from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('F003');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const post = new Post(screenshotManager);
const settingsPage = new SettingsPage();

const homePage = new UserHomePage(screenshotManager);
const article = new Article(screenshotManager);

/**
 * Agrupación de Escenarios por Funcionalidad
 * F003: Configuración de Posts
 */
describe('Funcionalidad: Configuración de Posts', () =>{

    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10003);
        login.login(adminEmail, adminPassword);
    });

    after(() => {
        settingsPage.navigateToLabs();
        settingsPage.deleteAllContent();
    });

    beforeEach(() => {
        Cypress.Cookies.preserveOnce('ghost-admin-api-session');
        // GIVEN that the admin navigates to the dashboard
        dashboard.navigate();
    });

    it('F003E06.E2E: Modificar URL de un Post y Revisar con Usuario al Ingresar URL Directamente', () => {
        // GIVEN (additional to the login and dashboard navigation)
        screenshotManager.setScenario('E06');

        dashboard.createPost();
        let title = post.writeTitle();
        let articleContent = post.writeArticle();

        // WHEN
        post.clickEditorSettingsToggle();
        let slug = post.writeUrlSlug();
        post.clickEditorSettingsToggle();
        post.publishNow();

        // THEN
        article.navigateToArticle(slug);
        cy.wait(300);
        article.readTitle((txt) => expect(txt).to.equal(title));
        article.readContent(paragraph => {
            expect(articleContent).to.contain(paragraph);
        });
    });

    it('F003E07.E2E: Modificar Excerpt de un Post y Revisar con Usuario en la Página Principal', () => {
        // GIVEN (additional to the login and dashboard navigation)
        screenshotManager.setScenario('E07');

        dashboard.createPost();
        let title = post.writeTitle();
        let articleContent = post.writeArticle();

        // WHEN
        post.clickEditorSettingsToggle();
        let excerpt = post.writeExcerpt();
        post.clickEditorSettingsToggle();
        post.publishNow();

        // THEN
        homePage.navigate();
        homePage.getFirstPostByExcerpt(excerpt, pItem => {
            expect(pItem).to.exist;
            pItem.click();
            cy.wait(300);

            article.readTitle((txt) => expect(txt).to.equal(title));
            article.readContent(paragraph => {
                expect(articleContent).to.contain(paragraph);
            });
        });
    });

    it('F003E08.E2E: Eliminación de Post y Revisión en la Página Principal', () => {
        // GIVEN (additional to the login and dashboard navigation) 
        screenshotManager.setScenario('E08');

        post.navigateToEditor();
        let title = post.writeTitle();
        post.writeArticle();

        // WHEN
        post.clickEditorSettingsToggle();
        post.deleteArticle();

        // THEN
        post.navigateToPosts();
        let hasPosts = post.hasPostsInList();
        if (hasPosts) {
            post.getPostListItems(($p, index, $list) => {
                post.findTitleOnPostItem($p, (txt) => {
                    expect(txt).to.not.equal(title);
                });
            });
        } else {
            expect(hasPosts).to.equal(false);
        }
    });
});