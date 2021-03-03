const login = require('../cases/OY2-1494_Test_SPA_Login');
const timeout = 1000;

module.exports = {
    "@tags": ["regression"],

    before: function (browser, loginType = "Login to SPA and Waiver Dashboard via Okta") {
        login.before(browser);
        login[loginType](browser);
        browser.pause(timeout * 5);
    },

    after: function (browser) {
        login["Logout of SPA and Waiver Dashboard"](browser);
        login.after(browser);
    },

    "Submit a SPA Report": function (browser, steps = [
        "Click on 'Start a new SPA'",
        "Enter SPA ID",
        "Upload Documents",
        "Enter Comments",
        "Submit SPA"
    ]) {
        const newSPA = require('../cases/OY2-2218_Test_SPA_Submit_New_SPA');
        steps.forEach(step => newSPA[step](browser));
    },

    "Submit a SPA RAI Response": function (browser, steps = [
        "Click on 'Respond to SPA RAI'",
        "Enter SPA ID",
        "Upload Documents",
        "Enter Comments",
        "Submit Response",
    ]) {
        const spaRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_SPA_RAI');
        steps.forEach(step => spaRAI[step](browser));
    },

    "Submit a Waiver ": function (browser, steps = [
        "Click on 'Submit new Waiver'",
        "Enter Action Type",
        "Enter Waiver Authority",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Waiver"
    ]) {
        const spaWaiver = require('../cases/OY2-2218_Test_SPA_Submit_New_Waiver');
        steps.forEach((step) => spaWaiver[step](browser))
    },

    "Submit a Waiver Amendment ": function (browser, steps = [
        "Click on 'Submit new Waiver'",
        "Enter Action Type",
        "Enter Waiver Authority",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Waiver"
    ]) {
        const waiverAmendment = require('../cases/OY2-2218_Test_SPA_Submit_Append_Waiver');
        steps.forEach(step => waiverAmendment[step](browser));
    },

    "Submit a Waiver Renewal": function (browser, steps = [
        "Click on 'Submit new Waiver'",
        "Enter Action Type",
        "Enter Waiver Authority",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Waiver"
    ]) {
        const renewWaiver = require('../cases/OY2-2218_Test_SPA_Submit_Renew_Waiver');
        steps.forEach(step => renewWaiver[step](browser));
    },

    "Submit a 'Respond to 1915(b) Waiver RAI'": function (browser, steps = [
        "Click on Respond to 1915(b) Waiver RAI",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Response"
    ]) {
        const waiverRAI = require('../cases/OY2-2218_Test_SPA_Respond_To_1915b_Waiver_RAI');
        steps.forEach(step => waiverRAI[step](browser));
    },

    "Submit a Temporary Request Extension": function (browser, steps = [
        "Click on 'Request Temporary Extension form - 1915(b) and 1915(c)'",
        "Enter Waiver Number",
        "Upload Documents",
        "Enter Comments",
        "Submit Response",
    ]) {
        const tempExt = require('../cases/OY2-2218_Test_SPA_Request_Temp_Extension');
        steps.forEach(step => tempExt[step](browser));
    },
};
