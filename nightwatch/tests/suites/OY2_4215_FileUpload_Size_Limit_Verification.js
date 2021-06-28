// Updated by: Guli 
// Date      : 03/19/2021
// The automated UI test scripts that belongs to this module has 
// element location related problem, we will be disabling this test 
// until these issues are refactored and resolved. 3/25/2021

/*
//const login = require('../cases/OY2-1494_Test_SPA_Login');
const login = require('../suites/OY2_9999_Login');
module.exports = {

    // "@tags": ["fileUploadLimit", "smoke", "regression"],
    // before: function (browser) {
    //     console.log('Setting up the browser instance...');
    //     console.log('Opening the browser...')
    //     console.log('Maximizing the browser window size...');
    //     browser.windowMaximize().url(browser.launch_url);
    //     browser.waitForElementPresent('body');
    //     login["Login to Medicaid as Regular Submitter"](browser);
    // },
    // after: function (browser) {
    //     login["Verify logout from SPA and Wavier Dashboard as Regular Submitter"](browser);
    //     console.log("Stopping test executions...")
    //     console.log('Closing down the browser instance...');
    //     browser.end();
    // },

    "@tags": ["smoke", "regression-soon"],

    before: function (browser) {
        login.beforeEach(browser);
        login['Login with state submitter user'](browser);
    },

    after: function (browser) {
        login.afterEach(browser);
    },
    
    // This test case is causing git push error stating file size must be less than 800mb even theough 
    // test file is only 80mb. Until the issue is resolved, this test cases is inactive and manual test should be performed. 
    
    'Verify that file upload exceeding 80MB is not allowed': function (browser) {
        // Test Data 
        let fileUploadElem = "[name='uploader-input-0']";
        //let errorMsgElement = '.ds-u-color--error div';
        let expectedErrorMsg = 'An attachment cannot be larger than 80MB';
        // 1. Click [Submit new SPA] 
        //browser.click('button#spaSubmitBtn');
        browser.useXpath().click("//a[@id='new-submission-button']");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.pause(500);
        browser.useXpath().click("(//h4)[1]");
        browser.useCss();
        // 2. Click first ["Choose File"] button 
        //    and upload the file 
        browser.assert.elementPresent(fileUploadElem).pause(2000);
        let filePath = require('path').resolve(__dirname + '/files/large_85M.txt');
        console.log("FILE PAHT: " + filePath);
        browser.setValue(fileUploadElem, filePath).pause(2000);
        // 3. Capture the error message displayed
        let errorMsgElement = '.ds-u-color--error div';
        browser.assert.elementPresent(errorMsgElement);
        browser.verify.containsText(errorMsgElement, expectedErrorMsg);
    }
    
}
*/