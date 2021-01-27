const fs = require('fs');
const path = require('path');
const spaVar = path.join(__dirname, "spaVar.txt");

const commands = {

    getTransmitNumber: function (optionNumber = true, state = "VA") {
        return idNumbers.transmitNumber(optionNumber, state);
    },

    getWaiverNumber: function (isWaiverB = true, state = "VA") {
        return idNumbers.waiver1915B(isWaiverB, state);
    },

    getSPA: function () {
        return idNumbers.getSpaID();
    },

    getWaiver: function () {
        return idNumbers.getWaiverID();
    },

    enterComments: function (selector, text) {
        this.api.setValue('css selector', selector, text);
    },

    onDashBoard: function (loginBtn = this.elements.loginBtn) {
        this.api.click(loginBtn).waitForElementPresent('body');
        this.api.pause(3000);
    },

    login: function (user, pass) {
        this.onDashBoard();
        this.api.setValue(this.elements.userField, user).pause(100);
        this.api.setValue(this.elements.passField, pass).pause(100);
        this.api.click(this.elements.tandc).pause(100);
        this.api.click(this.elements.submitBtn).waitForElementNotPresent(this.elements.submitBtn);
    },

    devLogin: function (user, pass) {
        this.onDashBoard(this.elements.devLoginButton);
        this.api.setValue(this.elements.devUserField, user).pause(100);
        this.api.setValue(this.elements.devPassField, pass).pause(100);
        this.api.click(this.elements.devSubmitBtn).waitForElementNotPresent(this.elements.devSubmitBtn);
    },

    logout: function () {
        this.api.click(this.elements.logout);
    },

    uploadFiles: function (total) {
        const fs = require('fs');
        const path = require('path');
        let dir = path.join(__dirname, 'files');
        let files = fs.readdirSync(dir, 'utf8');

        for (let i = 0; i < total; i++) {
            let selector = 'input[id="uploader-input-' + i + '"]';
            this.api.assert.elementPresent(selector);
            let file = require('path').resolve(dir, files[i]);
            this.api.setValue(selector, file);
        }
        return this.api;
    }
}

module.exports = {
    elements: {
        actionType: '#actionType',
        waiverAuthority: '#waiverAuthority',
        devLoginButton : '[id=devloginBtn]',
        devPassField : '[id=password]',
        devSubmitBtn : 'input[type=submit]',
        devUserField : '[id=email]',
        userField : '[id=okta-signin-username]',
        loginBtn: 'div.nav-right > button',
        loginTitle : 'div[id=title_bar]',
        myAccountLink : '[id=myAccountLink]',
        logout : '[id=logoutLink]',
        passField : '[id=okta-signin-password]',
        newSPA: "[id=spaSubmitBtn]",
        respondSPA: "[id=spaRaiBtn]",
        newWaiver: "[id=waiverBtn]",
        respondWaiver: "[id=waiverRaiBtn]",
        requestTemp: "[id=waiverExtBtn]",
        submitBtn: "[id=okta-signin-submit]",
        tandc: "[id=tandc]",
        territory : "#territory",
        transmittal: '[id=transmittalNumber]',
    },

    commands : [commands],

    props : {
        pauseAction: 1000,
    }
};


/**
    Description: Utilities for random number generation and other trivial operations.
**/
const idNumbers = {

    // SS-YY-NNNN-xxxx
    transmitNumber: (optional, state) => {
        let rand = getRandomNumber(8);
        let requiredFour = rand.slice(0, 4);   // 4 digit number (required)
        let opt = rand.slice(4, 8);
        let st = state;                      // 2 character state
        let yrAbbr = new Date().getFullYear()     // 2 character year
            .toString()
            .slice(2);
        let group = [st, yrAbbr, requiredFour]
        let id = (optional) ? group.join("-") : [group, opt].flat().join("-");
        fs.writeFileSync(spaVar, id, {encoding: "utf8"});
        return id;
    },

    // 1915(b) SS.##.R##.M##
    // 1915(c) SS.##.R##.##
    waiver1915B: (isWaiverB, state) => {
        let rand = getRandomNumber(6);
        let groupX = rand.slice(0, 2), groupY = "R".concat(rand.slice(2, 4)), groupZ = rand.slice(4);
        let group = (isWaiverB) ? [state, groupX, groupY, ["M", groupZ].join('')] : [state, groupX, groupY, groupZ];
        let id = group.join(".");
        fs.writeFileSync(spaVar, id, {encoding: "utf8", flag: 'w'});
        return id;
    },

    getSpaID: () => {
        return fs.readFileSync(spaVar, 'utf8');
    },

    getWaiverID: () => {
        return fs.readFileSync(spaVar, 'utf8');
    }
}

function getRandomNumber(numberOfDigits) {
    const _ = require('lodash');
    let lower = Math.pow(10, numberOfDigits - 1);
    let upper = Math.pow(10, numberOfDigits) - 1;
    return _.random(lower,upper).toString();
}