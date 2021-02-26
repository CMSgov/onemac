
let spa;
const timeout = 1000;
module.exports = {

    before : function(browser) {
        console.log('Setting up...');
        spa = browser.page.spaBasePage();
        browser.maximizeWindow()
            .url(browser.launch_url)
            .waitForElementPresent('body');
    },

    after : function(browser) {
        console.log('Closing down...');
        browser.end();
    },

    'Login to SPA and Waiver Dashboard' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Dashboard',
    }) {
        spa = browser.page.spaBasePage();

        spa.devLogin(testData);
        spa.verify.visible('@loginTitle');
        browser.verify.elementPresent('h1');
        browser.verify.containsText('h1', testData.spaPageTitle);
    },

    'Login to SPA and Waiver Dashboard via Okta' : function(browser, testData = {
        username: browser.globals.user,
        password: browser.globals.pass,
        spaPageTitle: 'SPA and Waiver Dashboard',
    }) {
        spa = browser.page.spaBasePage();
        spa.login(testData);
        spa.verify.visible('@loginTitle');
        browser.verify.containsText('h1', testData.spaPageTitle);
    },

    'Logout of SPA and Waiver Dashboard' : function (browser) {
        let title = 'SPA and Waiver Dashboard'
        spa.logout();
        spa.verify.not.containsText('h1', title);
        browser.pause(timeout);
    },
};