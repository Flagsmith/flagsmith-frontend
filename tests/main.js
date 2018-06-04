var conf = require('../nightwatch.conf.js');

const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = 'http://localhost:' + (process.env.PORT || 8080);

module.exports = {
    // 'Register': function (browser) {
    //     browser
    //         .url(url)   // visit the url
    //         .waitForElementVisible('[name="firstName"]') // wait for the sign up fields to show
    //         .setValue('[name="firstName"]', 'Night')
    //         .setValue('[name="lastName"]', 'Watch')
    //         .setValue('[name="companyName"]', 'Nightwatch Ltd')
    //         .setValue('[name="email"]', email)
    //         .setValue('[name="password"]', password)
    //         .click('button[name="signup-btn"]')

    //     browser.expect.element('#project-select-page').to.be.visible;
    // },
    'Login': function (browser) {
        browser
            .url(url)
            .waitForElementVisible('#existing-member-btn')
            .click('#existing-member-btn')
            .waitForElementVisible('[name="email"]')
            .setValue('[name="email"]', email)
            .setValue('[name="password"]', password)
            .click('#login-btn');

        browser.expect.element('#project-select-page').to.be.visible;
    },
    'Create organisation': function (browser) {
        browser
            .click('#org-menu')
            .waitForElementVisible('#create-org-link')
            .pause(200) // Allows the dropdown to fade in preventing it from becoming stuck after clicking links
            .click('#create-org-link')
            .waitForElementVisible('[name="orgName"]')
            .setValue('[name="orgName"]', "Nightwatch Org")
            .click('#create-org-btn')
            .waitForElementVisible('#project-select-page')
            .assert.containsText('#org-menu', 'Nightwatch Org');
    },
    'Create project': function (browser) {
        browser
            .click('#create-first-project-btn')
            .waitForElementVisible('[name="projectName"]')
            .setValue('[name="projectName"]', 'My Test Project')
            .click('#create-project-btn');

        browser.expect.element('#features-page').to.be.visible;
    },
    'Create feature': function (browser) {
        browser
            .pause(200) // Wait for dialog to appear
            .click('#show-create-feature-btn')
            .waitForElementVisible('[name="featureID"]')
            .setValue('[name="featureID"]', 'header_size')
            .setValue('[name="featureValue"]', 'big')
            .setValue('[name="featureDesc"]', 'This determines what size the header is')
            .click('#create-feature-btn');

        browser.expect.element('#features-list div.list-item').to.be.visible;
        browser.expect.element('#features-list .subtitle').text.to.equal('big');
    },
    'Toggle feature on': function (browser) {
        browser
            .pause(1000) // Wait for dialog to disappear. Longer wait here as it seems rc-switch can be unresponsive for a while
            .waitForElementVisible('#features-list span.rc-switch')
            .click('#features-list span.rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn')

        browser.expect.element('#features-list span.rc-switch.rc-switch-checked').to.be.visible;
    },
    'Try feature out': function (browser) {
        browser
            .pause(200) // Wait for confirm toggle feature dialog to disappear
            .click('#try-it-btn')
            .waitForElementVisible('#try-it-results');
    },
    'Switch environment': function (browser) {
        browser
            .pause(200) // Wait for confirm toggle feature dialog to disappear
            .click('#env-menu')
            .useXpath()
            .waitForElementVisible("//div[@id='env-list']//div[text()='Production']")
            .pause(200) // Wait for environment select popover to appear
            .click("//div[@id='env-list']//div[text()='Production']")
            .useCss();

        browser.expect.element('#selected-env').text.to.equal('Production');
    },
    'Feature should be off under different environment': function (browser) {
        browser.expect.element('#features-list span[class="rc-switch"]').to.be.visible;
    },
    'Create environment': function (browser) {
        browser
            .click('#env-menu')
            .waitForElementVisible("#create-env-link")
            .pause(200) // Wait for environment select popover to appear
            .click("#create-env-link")
            .waitForElementVisible('[name="envName"]')
            .setValue('[name="envName"]', 'Staging')
            .click('#create-env-btn');

        browser.expect.element('#selected-env').text.to.equal('Staging');
    },
    'Edit flag for user': function (browser) {
        browser
            .click('#users-link')
            .waitForElementVisible('#users-list div.list-item')
            .click('#users-list div.list-item')
            .useXpath()
            .waitForElementVisible('//div[@id="user-features-list"]//a[text()="header_size"]')
            .click('//div[@id="user-features-list"]//a[text()="header_size"]')
            .useCss()
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', 'small')
            .click('#update-feature-btn')

        browser.expect.element('#user-features-list .subtitle').text.to.equal('small');
    },
    'Toggle flag for user': function (browser) {
        browser
            .pause(1000) // Wait for last dialog to fully disappear. Longer wait here as it seems rc-switch can be unresponsive for a while
            .click('#user-features-list span.rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn');

        browser.expect.element('#user-features-list span.rc-switch.rc-switch-checked').to.be.visible;
    },
    'Logout': function (browser) {
        browser
            .pause(200) // Wait for confirm toggle feature dialog to disappear
            .click('#org-menu')
            .waitForElementVisible('#logout-link')
            .pause(200) // Allows the dropdown to fade in
            .click('#logout-link');

        browser.expect.element('#existing-member-btn').to.be.visible;
        browser.end();
    }
};