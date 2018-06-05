var conf = require('../nightwatch.conf.js');
const expect = require('chai').expect;

const inviteEmail = 'bullet-train@mailinator.com';
const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = 'http://localhost:' + (process.env.PORT || 8080);
const append = new Date().valueOf()+""
console.log("Test id:",append);
module.exports = {
    // TODO need teardown of user to use this
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
            .setValue('[name="orgName"]', "Nightwatch Org" + append)
            .click('#create-org-btn')
            .waitForElementVisible('#project-select-page')
            .assert.containsText('#org-menu', "Nightwatch Org" + append);
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
            .waitForElementNotPresent('#create-project-modal')
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
            .waitForElementNotPresent('#create-feature-modal')
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .waitForElementVisible('#features-list span.rc-switch')
            .click('#features-list span.rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn')

        browser.expect.element('#features-list span.rc-switch.rc-switch-checked').to.be.visible;
    },
    'Try feature out': function (browser) {
        browser
            .waitForElementNotPresent('#confirm-toggle-feature-modal')
            .click('#try-it-btn')
            .waitForElementVisible('#try-it-results')
            .getText('#try-it-results', res => {
                browser.assert.equal(typeof res, "object");
                browser.assert.equal(res.status, 0);
                var json;
                try {
                    json = JSON.parse(res.value);
                } catch (e) {
                    throw new Error('Try it results are not valid JSON');
                }
                // Unfortunately chai.js expect assertions do not report success in the Nightwatch reporter (but they do report failure)
                expect(json).to.have.property('header_size');
                expect(json.header_size).to.have.property('value');
                expect(json.header_size.value).to.equal('big');
                expect(json.header_size).to.have.property('enabled');
                expect(json.header_size.enabled).to.equal(true);
                browser.assert.ok(true, 'Try it JSON was correct for the feature'); // Re-assurance that the chai tests above passed
            });
    },
    'Change feature value to number': function (browser) {
        browser
            .useXpath()
            .click('//div[@id="features-list"]//a[text()="header_size"]')
            .useCss()
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', '12')
            .click('#update-feature-btn')

        browser.expect.element('#features-list .subtitle').text.to.equal('12');
    },
    'Try feature out should return numeric value': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .refresh()
            .waitForElementVisible('#try-it-btn')
            .click('#try-it-btn')
            .waitForElementVisible('#try-it-results')
            .getText('#try-it-results', res => {
                browser.assert.equal(typeof res, "object");
                browser.assert.equal(res.status, 0);
                var json;
                try {
                    json = JSON.parse(res.value);
                } catch (e) {
                    throw new Error('Try it results are not valid JSON');
                }
                // Unfortunately chai.js expect assertions do not report success in the Nightwatch reporter (but they do report failure)
                expect(json).to.have.property('header_size');
                expect(json.header_size).to.have.property('value');
                expect(json.header_size.value).to.equal(12);
                expect(json.header_size).to.have.property('enabled');
                expect(json.header_size.enabled).to.equal(true);
                browser.assert.ok(true, 'Try it JSON was correct for the feature'); // Re-assurance that the chai tests above passed
            });
    },
    'Change feature value to boolean': function (browser) {
        browser
            .useXpath()
            .click('//div[@id="features-list"]//a[text()="header_size"]')
            .useCss()
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', 'false')
            .click('#update-feature-btn')

        browser.expect.element('#features-list .subtitle').text.to.equal('false');
    },
    'Try feature out should return boolean value': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .refresh()
            .waitForElementVisible('#try-it-btn')
            .click('#try-it-btn')
            .waitForElementVisible('#try-it-results')
            .getText('#try-it-results', res => {
                browser.assert.equal(typeof res, "object");
                browser.assert.equal(res.status, 0);
                var json;
                try {
                    json = JSON.parse(res.value);
                } catch (e) {
                    throw new Error('Try it results are not valid JSON');
                }
                // Unfortunately chai.js expect assertions do not report success in the Nightwatch reporter (but they do report failure)
                expect(json).to.have.property('header_size');
                expect(json.header_size).to.have.property('value');
                expect(json.header_size.value).to.equal(false);
                expect(json.header_size).to.have.property('enabled');
                expect(json.header_size.enabled).to.equal(true);
                browser.assert.ok(true, 'Try it JSON was correct for the feature'); // Re-assurance that the chai tests above passed
            });
    },
    'Switch environment': function (browser) {
        browser
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
    'Edit environment': function (browser) {
        browser
            .click('#env-settings-link')
            .waitForElementVisible("[name='env-name']")
            .clearValue("[name='env-name']")
            .setValue("[name='env-name']", 'Internal')
            .click("#save-env-btn");

        browser.expect.element('#selected-env').text.to.equal('Internal');
    },
    // 'Delete environment': function (browser) {
    //     browser
    //         .click('#delete-env-btn')
    //         .waitForElementVisible("[name='confirm-env-name']")
    //         .setValue("[name='confirm-env-name']", 'Internal')
    //         .click('#confirm-delete-env-btn');

    //     browser.expect.element('#project-select-page').to.be.visible;
    // },
    // 'View project': function (browser) {
    //     browser.waitForElementVisible('#projects-list a.list-item')
    //     browser.expect.element('#projects-list a.list-item').text.to.equal('My Test Project');
    //     browser.click('#projects-list a.list-item');
    //     browser.expect.element('#features-page').to.be.visible;
    // },
    'Edit project': function (browser) {
        browser
            .click('#project-settings-link')
            .waitForElementVisible("[name='proj-name']")
            .clearValue("[name='proj-name']")
            .setValue("[name='proj-name']", 'Test Project')
            .click("#save-proj-btn");

        browser.expect.element('#selected-proj').text.to.equal('Test Project:');
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
            .waitForElementNotPresent('#create-feature-modal')
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .click('#user-features-list span.rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn');

        browser.expect.element('#user-features-list span.rc-switch.rc-switch-checked').to.be.visible;
    },
    // 'Invite user': function (browser) {
    //     browser
    //         .click('#organisation-settings-link')
    //         .waitForElementVisible('#btn-invite')
    //         .click('#btn-invite')
    //         .waitForElementVisible('[name="inviteEmails"]')
    //         .setValue('[name="inviteEmails"]', inviteEmail)
    //         .click('#btn-send-invite')
    //         .waitForElementNotPresent('#btn-invite',10000000)
    // },
    'Logout': function (browser) {
        browser
            .waitForElementNotPresent('#confirm-toggle-feature-modal')
            .pause(2000) // TODO https://gist.github.com/JamesBoon/dc19bc202673e19baf4b9b85d78df27f
            .click('#org-menu')
            .waitForElementVisible('#logout-link')
            .pause(200) // Allows the dropdown to fade in
            .click('#logout-link');

        browser.expect.element('#existing-member-btn').to.be.visible;
        browser.end();
    }
};