const { faker } = require('@faker-js/faker');

import { AdminDashboard } from "./pages/admin/dashboard";
import { Login } from "./pages/admin/login";
import { Post } from "./pages/admin/editor";
import { SettingsPage } from "./pages/admin/settings";

import { UserHomePage } from "./pages/user/home";

import { email as adminEmail, password as adminPassword} from "../../fixtures/user.json";
import { ScreenshotManager } from "../helpers/screenshot-manager";

const screenshotManager = new ScreenshotManager('F005');
const dashboard = new AdminDashboard(screenshotManager);
const login = new Login();
const post = new Post(screenshotManager);
const settingsPage = new SettingsPage();

const homePage = new UserHomePage(screenshotManager);


/**
 * Agrupación de Escenarios prof Funcionalidad
 * F005: Publicación de Posts
 */
describe("Funcionalidad: Publicación de Posts", () => {

    before(() => {
        // GIVEN that the admin user logs-in to ghost
        faker.seed(10005);
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

    it("F005E05.VRT: Publicación Instantanea de un Post", () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E05');

        // WHEN
        dashboard.createPost();
        let title = post.writeTitle();
        post.writeArticle();

        // THEN
        post.publishNow();

        homePage.navigate();
        cy.wait(300);
        let hasPosts = homePage.hasPostsInList();
        if (hasPosts) {
            homePage.getPostListItems(($p, index, $list) => {
                homePage.findTitleOnPostItem($p, (txt) => {
                    expect(txt).to.not.equal(title);
                });
            });
        } else {
            expect(hasPosts).to.equal(false);
        }
    });

    it("F005E06.VRT: Publicación Programada de un Post", () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E06');

        // WHEN
        dashboard.createPost();
        post.writeTitle();
        post.writeArticle();

        // THEN
        post.publishScheduleForLater();
        homePage.navigate();
    });

    it("F005E03.E2E: Publicación Progamada Fallida de un Post", () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E03');

        // WHEN
        dashboard.createPost();
        post.writeTitle();
        post.writeArticle();

        // THEN
        post.publishScheduleForLater(true);
        post.getTimeErrorPost((item) => {
            expect(item).to.exist;
        });
    });

    it("F005E04.E2E: Despublicar un post ya publicado", () => {
        // GIVEN (additional to the login)
        screenshotManager.setScenario('E04');

        dashboard.createPost();
        let title = post.writeTitle();
        post.writeArticle();

        // WHEN
        post.publishNow();

        homePage.navigate();
        homePage.getFirstPostByTitle(title, (pItem) => {
            expect(pItem).to.exist;
        });

        post.navigateToPosts();
        post.goPostFromListByTitle(title);
        post.unPublish();

        // THEN
        homePage.navigate();
        let hasPosts = homePage.hasPostsInList();
        if (hasPosts) {
            homePage.getPostListItems(($p, index, $list) => {
                homePage.findTitleOnPostItem($p, (txt) => {
                    expect(txt).to.not.equal(title);
                });
            });
        } else {
            expect(hasPosts).to.equal(false);
        }
    });
});
