var conf = require('../nightwatch.conf.js');

const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = 'http://localhost:' + (process.env.PORT || 8080);

module.exports = {
    'Login should fail due to invalid email address': function (browser) {
        browser
            .url(url)
            .waitForElementVisible('#existingMemberBtn')
            .click('#existingMemberBtn')
            .waitForElementVisible('[name="email"]')
            .setValue('[name="email"]', "bad-email")
            .setValue('[name="password"]', password)
            .click('#loginBtn');

        browser.expect.element('#errorAlert').to.be.visible;
        browser.expect.element('#email-error').to.be.visible;
    },
    'Login should fail due to wrong password': function (browser) {
        browser
            .url(url)
            .waitForElementVisible('#existingMemberBtn')
            .click('#existingMemberBtn')
            .waitForElementVisible('[name="email"]')
            .setValue('[name="email"]', email)
            .setValue('[name="password"]', 'meh')
            .click('#loginBtn');

        browser.expect.element('#errorAlert').to.be.visible;
        browser.end();
    },
};