const expect = require('chai').expect;
const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = 'http://localhost:' + (process.env.PORT || 8080);
const helpers = require('./helpers');
const byId = helpers.byTestID;
module.exports = {
    '[Main Tests] - Register': function (browser) {
        browser
            .url(url)   // visit the url
            .waitAndSet(byId('firstName'), 'Night')
            .setValue(byId('lastName'), 'Watch')
            .setValue(byId('companyName'), 'Nightwatch Ltd')
            .setValue(byId('email'), email)
            .setValue(byId('password'), password)
            .click(byId('signup-btn'))
            .waitForElementVisible(byId('project-select-page'));
    },
    '[Main Tests] - Create project': function (browser) {
        browser
            .waitAndClick(byId('create-first-project-btn'))
            .waitAndSet(byId('projectName'), 'My Test Project')
            .click(byId('create-project-btn'))
            .waitForElementVisible(byId('features-page'));
    },
// FEATURES
    '[Main Tests] - Create feature': function (browser) {
        browser
            .waitForElementNotPresent(byId('create-project-modal'))
            .click(byId('show-create-feature-btn'))
            .waitAndClick(byId('btn-select-remote-config'))
            .setValue(byId('featureID'), 'header_size')
            .setValue(byId('featureValue'), 'big')
            .setValue(byId('featureDesc'), 'This determines what size the header is')
            .click(byId('create-feature-btn'))
            .waitForElementVisible('#features-list div.list-item')
            .waitForElementNotPresent('#create-feature-modal')
            .click('#features-list div.list-item div')
            .waitForElementVisible('#update-feature-btn')
            .getValue('[name="featureID"]', res => {
                browser.assert.equal(res.value, 'header_size');
            })
            .getValue('[name="featureValue"]', res => {
                browser.assert.equal(res.value, 'big');
            })
            .getValue('[name="featureDesc"]', res => {
                browser.assert.equal(res.value, 'This determines what size the header is');
            })
            .click('#update-feature-btn')
            .waitForElementVisible('#features-list div.list-item');

        browser.expect.element('#features-list .feature-value').text.to.equal('big');
    },
    '[Main Tests] - Create feature 2': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .click('#show-create-feature-btn')
            .waitForElementVisible('[name="featureID"]')
            .setValue('[name="featureID"]', 'header_enabled')
            .setValue('[name="featureDesc"]', 'This determines whether header is shown')
            .click('#create-feature-btn')
            .waitForElementVisible('#features-list div.list-item:nth-child(2)');
    },
    '[Main Tests] - Create feature 3': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .waitForElementVisible('#show-create-feature-btn')
            .click('#show-create-feature-btn')
            .waitForElementVisible('[name="featureID"]')
            .setValue('[name="featureID"]', 'short_life_feature')
            .setValue('[name="featureDesc"]', 'This feature is pointless')
            .click('#create-feature-btn')
            .waitForElementVisible('#features-list div.list-item:nth-child(3) div'); //todo change
    },
    '[Main Tests] - Delete feature 3': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .waitForElementVisible('#features-list div.list-item:nth-child(3) #remove-feature')
            .click('#features-list div.list-item:nth-child(3) #remove-feature')
            .waitForElementVisible('[name="confirm-feature-name"]')
            .setValue('[name="confirm-feature-name"]', 'short_life_feature')
            .click('#confirm-remove-feature-btn')
            .waitForElementNotPresent('#features-list div.list-item:nth-child(3)');
    },
    '[Main Tests] - Toggle feature on': function (browser) {
        browser
            .waitForElementNotPresent('#confirm-remove-feature-modal')
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .waitForElementVisible('#features-list .rc-switch')
            .click('#features-list .rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn')
            .waitForElementVisible('#features-list .rc-switch[aria-checked="true"]');
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
            .waitForElementVisible('#features-list .feature-value');

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
            .waitAndClick(byId('switch-environment-production'))
        browser.waitForElementVisible(byId('switch-environment-production-active'))
    },
    '[Main Tests] - Feature should be off under different environment': function (browser) {
        browser.expect.element('#features-list .rc-switch').to.be.visible;
    },
    '[Main Tests] - Create environment': function (browser) {
        browser
            .waitAndClick("#create-env-link")
            .waitForElementVisible('[name="envName"]')
            .setValue('[name="envName"]', 'Staging')
            .click('#create-env-btn');

        browser.waitForElementVisible(byId('switch-environment-staging-active'))
    },
    '[Main Tests] - Edit flag for user': function (browser) {
        browser
            .waitAndClick('#users-link')
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
            .click('#user-features-list .rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn')
            .waitForElementNotPresent('#confirm-toggle-feature-btn')
            .waitForElementVisible('#user-features-list .rc-switch[aria-checked="true"]');
    },
    '[Main Tests] - Toggle flag for user again': function (browser) {
        browser
            .click('#user-features-list .rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn')
            .waitForElementNotPresent('#confirm-toggle-feature-btn')
            .waitForElementVisible('#user-features-list .rc-switch[aria-checked="false"]');
    },
    '[Main Tests] - Add trait for user': function (browser) {
        browser
            .click('#add-trait')
            .waitForElementVisible('[name="traitID"]')
            .setValue('[name="traitID"]', 'color')
            .setValue('[name="traitValue"]', 'red')
            .click('#create-trait-btn')
            .waitForElementNotPresent('#create-trait-btn')
            .waitForElementVisible('#user-traits-list .js-trait-value');
        browser.expect.element('#user-traits-list .js-trait-value').text.to.equal('"red"');
    },
    '[Main Tests] - Edit trait for user': function (browser) {
        browser
            .click('#user-traits-list .list-item')
            .waitForElementVisible('[name="traitID"]')
            .clearValue("[name='traitValue']")
            .setValue('[name="traitValue"]', "1")
            .click('#update-trait-btn')
            .waitForElementNotPresent('#update-trait-btn')
            .waitForElementVisible('#user-traits-list .js-trait-value');
        browser.expect.element('#user-traits-list .js-trait-value').text.to.equal('1');
    },
// END OF FEATURES
    '[Main Tests] - Create Segment': function (browser) {
        browser
            .pause(200)
            .waitAndClick('#segments-link')
            .waitAndClick(byId('show-create-segment-btn'))
            .waitAndSet(byId('segmentID'), 'my_segment')
            .waitAndSet(byId('rule-0-property'), 'age')
            .waitAndSet(byId('rule-0-value'), '18')
            .waitAndClick(byId('create-segment'))
            .waitForElementVisible(byId('segment-0-name'))

        browser.expect.element(byId('segment-0-name')).text.to.equal('my_segment');
    },
    '[Main Tests] - Edit environment': function (browser) {
        browser
            .click('#env-settings-link')
            .waitForElementVisible("[name='env-name']")
            .clearValue("[name='env-name']")
            .setValue("[name='env-name']", 'Internal')
            .click("#save-env-btn");

        browser.waitForElementVisible(byId('switch-environment-internal-active'))
    },
    '[Main Tests] - Delete environment': function (browser) {
        browser
            .click('#delete-env-btn')
            .waitForElementVisible("[name='confirm-env-name']")
            .setValue("[name='confirm-env-name']", 'Internal')
            .click('#confirm-delete-env-btn')
            .waitForElementVisible('#project-select-page');
    },
    '[Main Tests] - View project': function (browser) {
        browser.waitForElementVisible('#projects-list a.list-item')
        browser.expect.element('#projects-list a.list-item').text.to.equal('My Test Project');
        browser.click('#projects-list a.list-item');
        browser.waitForElementVisible('#features-page');
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

        browser.waitForElementVisible(byId('switch-project-test project-active'))
    },
    '[Main Tests] - Delete Nightwatch Ltd organisation': function (browser) {
        browser
            .click('#organisation-settings-link')
            .waitForElementVisible('#delete-org-btn')
            .click('#delete-org-btn')
            .waitForElementVisible('[name="confirm-org-name"]')
            .setValue('[name="confirm-org-name"]', "Nightwatch Ltd")
            .click('#confirm-del-org-btn')
            .waitForElementVisible('#create-org-page');

        browser.end();
    }
};
