var conf = require('../nightwatch.conf.js');

const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = 'http://localhost:' + (process.env.PORT || 8080);

module.exports = {
    'Login should fail due to invalid email address': function (browser) {
        browser
            .url(url)
            .waitForElementVisible('#existing-member-btn')
            .click('#existing-member-btn')
            .waitForElementVisible('#login-btn')
            .setValue('[name="email"]', "bad-email")
            .setValue('[name="password"]', password)
            .click('#login-btn');

        browser.expect.element('#error-alert').to.be.visible;
        browser.expect.element('#email-error').to.be.visible;
    },
    'Login should fail due to wrong password': function (browser) {
        browser
            .url(url)
            .waitForElementVisible('#existing-member-btn')
            .click('#existing-member-btn')
            .waitForElementVisible('[name="email"]')
            .setValue('[name="email"]', email)
            .setValue('[name="password"]', 'meh')
            .click('#login-btn');

        browser.expect.element('#error-alert').to.be.visible;
        browser.end();
    },
};
