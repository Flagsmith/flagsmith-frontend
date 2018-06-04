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
    //         .click('button[name="signupBtn"]')

    //     browser.expect.element('#projectSelectPage').to.be.visible;
    // },
    'Login': function (browser) {
        browser
            .url(url)
            .waitForElementVisible('#existingMemberBtn')
            .click('#existingMemberBtn')
            .waitForElementVisible('[name="email"]')
            .setValue('[name="email"]', email)
            .setValue('[name="password"]', password)
            .click('#loginBtn');

        browser.expect.element('#projectSelectPage').to.be.visible;
    },
    'Create organisation': function (browser) {
        browser
            .click('#openNavbarRight')
            .waitForElementVisible('#createOrgLink')
            .pause(200) // Allows the dropdown to fade in preventing it from becoming stuck after clicking links
            .click('#createOrgLink')
            .waitForElementVisible('[name="orgName"]')
            .setValue('[name="orgName"]', "Nightwatch Org")
            .click('#createOrgBtn')
            .waitForElementVisible('#projectSelectPage')
            .assert.containsText('#openNavbarRight', 'Nightwatch Org');
    },
    'Create project': function (browser) {
        browser
            .click('#createFirstProjectBtn')
            .waitForElementVisible('[name="projectName"]')
            .setValue('[name="projectName"]', 'My Test Project')
            .click('#createProjectBtn');

        browser.expect.element('#featuresPage').to.be.visible;
    },
    'Create feature': function (browser) {
        browser
            .pause(200) // Wait for dialog to appear
            .click('#showCreateFeatureBtn')
            .waitForElementVisible('[name="featureID"]')
            .setValue('[name="featureID"]', 'header_size')
            .setValue('[name="featureValue"]', 'big')
            .setValue('[name="featureDesc"]', 'This determines what size the header is')
            .click('#createFeatureBtn');

        browser.expect.element('#featuresList div.list-item').to.be.visible;
        browser.expect.element('#featuresList .subtitle').text.to.equal('big');
    },
    'Toggle feature on': function (browser) {
        browser
            .pause(1000) // Wait for dialog to disappear. Longer wait here as it seems rc-switch can be unresponsive for a while
            .waitForElementVisible('#featuresList span.rc-switch')
            .click('#featuresList span.rc-switch')
            .waitForElementVisible('#confirmToggleFeatureBtn')
            .click('#confirmToggleFeatureBtn')

        browser.expect.element('#featuresList span.rc-switch.rc-switch-checked').to.be.visible;
    },
    'Switch environment': function (browser) {
        browser
            .pause(200) // Wait for confirm toggle feature dialog to disappear
            .click('#envSelect')
            .useXpath()
            .waitForElementVisible("//div[@id='envSelectList']//div[text()='Production']")
            .pause(200) // Wait for environment select popover to appear
            .click("//div[@id='envSelectList']//div[text()='Production']")
            .useCss();

        browser.expect.element('#envSelectName').text.to.equal('Production');
    },
    'Feature should be off under different environment': function (browser) {
        browser.expect.element('#featuresList span[class="rc-switch"]').to.be.visible;
    },
    'Create environment': function (browser) {
        browser
            .click('#envSelect')
            .waitForElementVisible("#createEnvLink")
            .pause(200) // Wait for environment select popover to appear
            .click("#createEnvLink")
            .waitForElementVisible('[name="envName"]')
            .setValue('[name="envName"]', 'Staging')
            .click('#createEnvBtn');

        browser.expect.element('#envSelectName').text.to.equal('Staging');
    },
    'Edit flag for user': function (browser) {
        browser
            .click('#usersLink')
            .waitForElementVisible('#usersList div.list-item')
            .click('#usersList div.list-item')
            .useXpath()
            .waitForElementVisible('//div[@id="userFeaturesList"]//a[text()="header_size"]')
            .click('//div[@id="userFeaturesList"]//a[text()="header_size"]')
            .useCss()
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', 'small')
            .click('#updateFeatureBtn')

        browser.expect.element('#userFeaturesList .subtitle').text.to.equal('small');
    },
    'Toggle flag for user': function (browser) {
        browser
            .pause(1000) // Wait for last dialog to fully disappear. Longer wait here as it seems rc-switch can be unresponsive for a while
            .click('#userFeaturesList span.rc-switch')
            .waitForElementVisible('#confirmToggleFeatureBtn')
            .click('#confirmToggleFeatureBtn');

        browser.expect.element('#userFeaturesList span.rc-switch.rc-switch-checked').to.be.visible;
    },
    'Logout': function (browser) {
        browser
            .pause(200) // Wait for confirm toggle feature dialog to disappear
            .click('#openNavbarRight')
            .waitForElementVisible('#logoutLink')
            .pause(200) // Allows the dropdown to fade in
            .click('#logoutLink');

        browser.expect.element('#existingMemberBtn').to.be.visible;
        browser.end();
    }
};