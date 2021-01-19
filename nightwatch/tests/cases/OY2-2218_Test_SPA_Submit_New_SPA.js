/*
    Test Scenario: Create a new SPA
    Description: This will login to the application, enter the required SPA information, and upload documents using files
    located in the 'files' folder. Lastly, comments will be entered in the Summary and then submitted.


 */

const timeout = 1000;
const login = require('./OY2-1494_Test_SPA_Login');
let spa;
module.exports = {

    before : function(browser) {
        login.before(browser);
        login["Login to SPA and Waiver Dashboard"](browser);
        browser.pause(timeout * 2);
    },

    after : function(browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Click on 'Start a new SPA'": function (browser) {
        spa = browser.page.spaBasePage();
        spa.assert.elementPresent('@newSPA');
        spa.click('@newSPA').waitForElementPresent('body');
        browser.expect.url().to.contain('/spa').before(timeout * 5);
    },

    "Enter SPA State/Territory Information" : function (browser) {
        spa = browser.page.spaBasePage();
        let testData = {
            selector: '@territory',
            state_option: "Virginia"
        }

        spa.click(testData.selector)
        spa.setValue(testData.selector, "VVV");
        spa.waitForElementVisible(testData.selector);
        spa.verify.containsText(testData.selector, testData.state_option);
        spa.pause(timeout);
    },

    'Enter SPA ID' : function (browser, transmitNumber) {
        let selector = '@transmittal';
        let spa_id = (typeof transmitNumber === 'undefined') ? spa.getTransmitNumber() : transmitNumber;
        spa.click(selector);
        spa.setValue(selector, spa_id);
        browser.pause(timeout / 2);
        spa.expect.element(selector).value.to.contain(spa_id);
    },

    'Upload Documents' : function (browser) {
        spa = browser.page.spaBasePage();
        spa.uploadFiles(9);
    },

    'Enter Comments' : function (browser, selector = 'textarea',
                                 entered_text = "Relax. This is only a test") {
        spa = browser.page.spaBasePage();
        spa.enterComments(selector, entered_text);
        spa.assert.containsText(selector, entered_text)
    },

    'Submit SPA' : function (browser) {
        let alert_selector = "[id*=alert_]";
        let p_selector = "p[class=ds-c-alert__text]"
        let alert_msg = "Submission Completed";
        let msg = "Your submission has been received.";

        browser.click('[type="submit"]');
        browser.waitForElementVisible('body');
        browser
            .assert.elementPresent(alert_selector)
            .assert.elementPresent(p_selector)
            .assert.containsText(alert_selector, alert_msg)
            .assert.containsText(p_selector, msg)
            .pause(timeout);
    },

};