
export class ScreenshotManager {

    constructor(feature) {
        this.stepCounter = 1;
        this.feature = feature;
        this.scenario = null;
    }

    resetCounter() { 
        this.stepCounter = 1;
    }

    setScenario(scenario) { 
        this.scenario = scenario;
        this.resetCounter();
    }

    takeScreenshot(stepName) {
        cy.screenshot(`${this.feature}${this.scenario}/${this.stepCounter}_${stepName}`);
        cy.wait(1000);
        this.stepCounter++;
    }
}