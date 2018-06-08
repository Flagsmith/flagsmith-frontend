const expect = require('chai').expect;

const inviteEmail = 'bullet-train@mailinator.com';
const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = 'http://localhost:' + (process.env.PORT || 8080);

module.exports = {
    '[Main Tests] - Register': function (browser) {
        browser
            .url(url)   // visit the url
            .waitForElementVisible('[name="firstName"]') // wait for the sign up fields to show
            .setValue('[name="firstName"]', 'Night')
            .setValue('[name="lastName"]', 'Watch')
            .setValue('[name="companyName"]', 'Nightwatch Ltd')
            .setValue('[name="email"]', email)
            .setValue('[name="password"]', password)
            .click('button[name="signup-btn"]')

        browser.expect.element('#project-select-page').to.be.visible;
    },
    '[Main Tests] - Create project': function (browser) {
        browser
            .click('#create-first-project-btn')
            .waitForElementVisible('[name="projectName"]')
            .setValue('[name="projectName"]', 'My Test Project')
            .click('#create-project-btn');

        browser.expect.element('#features-page').to.be.visible;
    },
    '[Main Tests] - Create feature': function (browser) {
        browser
            .waitForElementNotPresent('#create-project-modal')
            .click('#show-create-feature-btn')
            .waitForElementVisible('#btn-select-remote-config')
            .click('#btn-select-remote-config')
            .setValue('[name="featureID"]', 'header_size')
            .setValue('[name="featureValue"]', 'big')
            .setValue('[name="featureDesc"]', 'This determines what size the header is')
            .click('#create-feature-btn');

        browser.expect.element('#features-list div.list-item').to.be.visible;
        browser.expect.element('#features-list .feature-value').text.to.equal('big');
    },
    '[Main Tests] - Create feature 2': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .click('#show-create-feature-btn')
            .waitForElementVisible('[name="featureID"]')
            .setValue('[name="featureID"]', 'header_enabled')
            .setValue('[name="featureDesc"]', 'This determines whether header is shown')
            .click('#create-feature-btn');

        browser.expect.element('#features-list div.list-item:nth-child(2)').to.be.visible;
    },
    '[Main Tests] - Toggle feature on': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .waitForElementVisible('#features-list span.rc-switch')
            .click('#features-list span.rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn')

        browser.expect.element('#features-list span.rc-switch.rc-switch-checked').to.be.visible;
    },
    '[Main Tests] - Try feature out': function (browser) {
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
                browser.assert.ok(true, 'Try it JSON was correct for the feature'); // Re-assurance that the chai tests above passed
            });
    },
    '[Main Tests] - Change feature value to number': function (browser) {
        browser
            .useXpath()
            .click('//div[@id="features-list"]//a[text()="header_size"]')
            .useCss()
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', '12')
            .click('#update-feature-btn')

        browser.expect.element('#features-list .feature-value').text.to.equal('12');
    },
    '[Main Tests] - Try feature out should return numeric value': function (browser) {
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
                expect(json.header_enabled).to.have.property('enabled');
                expect(json.header_enabled.enabled).to.equal(true);
                browser.assert.ok(true, 'Try it JSON was correct for the feature'); // Re-assurance that the chai tests above passed
            });
    },
    '[Main Tests] - Change feature value to boolean': function (browser) {
        browser
            .useXpath()
            .click('//div[@id="features-list"]//a[text()="header_size"]')
            .useCss()
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', 'false')
            .click('#update-feature-btn')

        browser.expect.element('#features-list .feature-value').text.to.equal('false');
    },
    '[Main Tests] - Try feature out should return boolean value': function (browser) {
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
                expect(json.header_enabled).to.have.property('enabled');
                expect(json.header_enabled.enabled).to.equal(true);
                browser.assert.ok(true, 'Try it JSON was correct for the feature'); // Re-assurance that the chai tests above passed
            });
    },
    '[Main Tests] - Switch environment': function (browser) {
        browser
            .click('#env-menu')
            .useXpath()
            .waitForElementVisible("//div[@id='env-list']//div[text()='Production']")
            .pause(200) // Wait for environment select popover to appear
            .click("//div[@id='env-list']//div[text()='Production']")
            .useCss();

        browser.expect.element('#selected-env').text.to.equal('Production');
    },
    '[Main Tests] - Feature should be off under different environment': function (browser) {
        browser.expect.element('#features-list span[class="rc-switch"]').to.be.visible;
    },
    '[Main Tests] - Create environment': function (browser) {
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
    '[Main Tests] - Edit flag for user': function (browser) {
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

        browser.expect.element('#user-features-list .feature-value').text.to.equal('small');
    },
    '[Main Tests] - Toggle flag for user': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .click('#user-features-list span.rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn')
            .waitForElementNotPresent('#confirm-toggle-feature-btn')

        browser.expect.element('#user-features-list span.rc-switch.rc-switch-checked').to.be.visible;
    },
    '[Main Tests] - Edit environment': function (browser) {
        browser
            .click('#env-settings-link')
            .waitForElementVisible("[name='env-name']")
            .clearValue("[name='env-name']")
            .setValue("[name='env-name']", 'Internal')
            .click("#save-env-btn");

        browser.expect.element('#selected-env').text.to.equal('Internal');
    },
    '[Main Tests] - Delete environment': function (browser) {
        browser
            .click('#delete-env-btn')
            .waitForElementVisible("[name='confirm-env-name']")
            .setValue("[name='confirm-env-name']", 'Internal')
            .click('#confirm-delete-env-btn');

        browser.expect.element('#project-select-page').to.be.visible;
    },
    '[Main Tests] - View project': function (browser) {
        browser.waitForElementVisible('#projects-list a.list-item')
        browser.expect.element('#projects-list a.list-item').text.to.equal('My Test Project');
        browser.click('#projects-list a.list-item');
        browser.expect.element('#features-page').to.be.visible;
    },
    '[Main Tests] - Edit project': function (browser) {
        browser
            .waitForElementVisible('#project-settings-link')
            .pause(200) // Slide in transition
            .click('#project-settings-link')
            .waitForElementVisible("[name='proj-name']")
            .clearValue("[name='proj-name']")
            .setValue("[name='proj-name']", 'Test Project')
            .click("#save-proj-btn");

        browser.expect.element('#selected-proj').text.to.equal('Test Project:');
    },
    '[Main Tests] - Delete Nightwatch Ltd organisation': function (browser) {
        browser
            .click('#organisation-settings-link')
            .waitForElementVisible('#delete-org-btn')
            .click('#delete-org-btn')
            .waitForElementVisible('[name="confirm-org-name"]')
            .setValue('[name="confirm-org-name"]', "Nightwatch Ltd")
            .click('#confirm-del-org-btn')

        browser.expect.element('#create-org-page').to.be.visible;
        browser.end();
    }
};