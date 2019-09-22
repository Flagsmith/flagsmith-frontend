const expect = require('chai').expect;
const bulletTrain = require('bullet-train-nodejs');

const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = `http://localhost:${process.env.PORT || 8080}`;
const helpers = require('./helpers');

const byId = helpers.byTestID;
const setSegmentRule = helpers.setSegmentRule;

module.exports = {
    '[Main Tests] - Register': async function (browser) {
        browser.url(url); // visit the url
        browser.waitAndSet(byId('firstName'), 'Night');
        browser.setValue(byId('lastName'), 'Watch');
        browser.setValue(byId('companyName'), 'Nightwatch Ltd');
        browser.setValue(byId('email'), email);
        browser.setValue(byId('password'), password);
        browser.click(byId('signup-btn'));
        browser.waitForElementVisible(byId('project-select-page'));
    },
    '[Main Tests] - Create project': function (browser) {
        browser.waitAndClick(byId('create-first-project-btn'));
        browser.waitAndSet(byId('projectName'), 'My Test Project');
        browser.click(byId('create-project-btn'));
        browser.waitForElementVisible(byId('features-page'));
    },
    // END OF FEATURES
    // Age == 18 || Age == 19
    '[Main Tests] - Create Segment': async function (browser) {
        browser.pause(200);
        browser.waitAndClick('#segments-link');
        browser.pause(200);
        browser.waitAndClick(byId('show-create-segment-btn'));

        // (=== 18 || === 19) && (> 17 || < 19) && (!=20) && (<=18) && (>=18)
        // Rule 1- Age === 18 || Age === 19
        browser.waitAndSet(byId('segmentID'), '18_or_19');
        setSegmentRule(browser, 0, 0, 'age', 'EQUAL', 18);
        browser.click(byId('rule-0-or'));
        setSegmentRule(browser, 0, 1, 'age', 'EQUAL', 17);

        // Rule 2 - Age > 17 || Age < 19
        browser.waitAndClick(byId('add-rule'));
        setSegmentRule(browser, 1, 0, 'age', 'GREATER_THAN', 17);
        browser.click(byId('rule-1-or'));
        setSegmentRule(browser, 1, 1, 'age', 'LESS_THAN', 10);

        // Rule 3 - != 20
        browser.waitAndClick(byId('add-rule'));
        setSegmentRule(browser, 2, 0, 'age', 'NOT_EQUAL', 20);

        // Rule 4 - <= 18
        browser.waitAndClick(byId('add-rule'));
        setSegmentRule(browser, 3, 0, 'age', 'LESS_THAN_INCLUSIVE', 18);

        // Rule 5 - >= 18
        browser.waitAndClick(byId('add-rule'));
        setSegmentRule(browser, 4, 0, 'age', 'GREATER_THAN_INCLUSIVE', 18);

        // Create
        browser.waitAndClick(byId('create-segment'));
        browser.waitForElementVisible(byId('segment-0-name'));
        browser.expect.element(byId('segment-0-name')).text.to.equal('18_or_19');
    },
    // FEATURES
    '[Main Tests] - Create feature': async function (browser) {
        browser.waitAndClick('#features-link');
        browser.pause(200);
        browser.waitAndClick(byId('show-create-feature-btn'));
        browser.waitAndClick(byId('btn-select-remote-config'));
        browser.setValue(byId('featureID'), 'header_size');
        browser.setValue(byId('featureValue'), 'big');
        browser.setValue(byId('featureDesc'), 'This determines what size the header is');
        browser.click(byId('create-feature-btn'));
        browser.waitForElementVisible('#features-list div.list-item');
        browser.waitForElementNotPresent('#create-feature-modal');
        browser.click('#features-list div.list-item div');
        browser.waitForElementVisible('#update-feature-btn');
        browser.assertValue('[name="featureID"]', 'header_size');
        browser.assertValue('[name="featureValue"]', 'big');
        browser.assertValue('[name="featureDesc"]', 'This determines what size the header is');
        browser.click('#update-feature-btn');
        browser.waitForElementVisible('#features-list div.list-item');
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
            .waitForElementVisible('#features-list div.list-item:nth-child(3) div'); // todo change
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
    '[Main Tests] - Try feature out': async function (browser) {
        browser.waitForElementNotPresent('#confirm-toggle-feature-modal');
        browser.waitAndClick('#try-it-btn');
        browser.waitForElementVisible('#try-it-results');
        const res = await browser.getText('#try-it-results');
        browser.assert.equal(typeof res, 'object');
        browser.assert.equal(res.status, 0);
        let json;
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
            .getText('#try-it-results', (res) => {
                browser.assert.equal(typeof res, 'object');
                browser.assert.equal(res.status, 0);
                let json;
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
            .click('#update-feature-btn');

        browser.expect.element('#features-list .feature-value').text.to.equal('false');
    },
    '[Main Tests] - Try feature out should return boolean value': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .refresh()
            .waitForElementVisible('#try-it-btn')
            .click('#try-it-btn')
            .waitForElementVisible('#try-it-results')
            .getText('#try-it-results', (res) => {
                browser.assert.equal(typeof res, 'object');
                browser.assert.equal(res.status, 0);
                let json;
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
            .waitAndClick(byId('switch-environment-production'));
        browser.waitForElementVisible(byId('switch-environment-production-active'));
    },
    '[Main Tests] - Feature should be off under different environment': function (browser) {
        browser.expect.element('#features-list .rc-switch').to.be.visible;
    },
    '[Main Tests] - Create environment': async function (browser) {
        browser.waitAndClick('#create-env-link');
        browser.waitForElementVisible('[name="envName"]');
        browser.setValue('[name="envName"]', 'Staging');
        browser.click('#create-env-btn');

        browser.waitForElementVisible(byId('switch-environment-staging-active'));
    },
    '[Main Tests] - Edit flag for user': async function (browser) {
        browser.waitAndClick('#users-link');
        browser.waitForElementVisible('#users-list div.list-item');
        browser.click('#users-list div.list-item');
        browser.useXpath();
        browser.waitForElementVisible('//div[@id="user-features-list"]//a[text()="header_size"]');
        browser.click('//div[@id="user-features-list"]//a[text()="header_size"]');
        browser.useCss();
        browser.waitForElementVisible('[name="featureValue"]');
        browser.clearValue('[name="featureValue"]');
        browser.setValue('[name="featureValue"]', 'small');
        browser.click('#update-feature-btn');
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
            .waitForElementVisible('#user-traits-list .js-trait-value-0');
        browser.expect.element('#user-traits-list .js-trait-value-0').text.to.equal('"red"');
    },
    '[Main Tests] - Edit trait for user': function (browser) {
        browser
            .click('#user-traits-list .list-item')
            .waitForElementVisible('[name="traitID"]')
            .clearValue("[name='traitValue']")
            .setValue('[name="traitValue"]', '1')
            .click('#update-trait-btn')
            .waitForElementNotPresent('#update-trait-btn')
            .waitForElementVisible('#user-traits-list .js-trait-value-0');
        browser.expect.element('#user-traits-list .js-trait-value-0').text.to.equal('1');
    },
    '[Main Tests] - Add segment trait for user': function (browser) {
        browser
            .click('#add-trait')
            .waitForElementVisible('[name="traitID"]')
            .setValue('[name="traitID"]', 'age')
            .setValue('[name="traitValue"]', '18')
            .click('#create-trait-btn')
            .waitForElementNotPresent('#create-trait-btn')
            .waitForElementVisible('#user-traits-list .js-trait-value-1');
        browser.expect.element('#user-traits-list .js-trait-value-1').text.to.equal('18');
    },
    '[Main Tests] - Check user now belongs to segment': function (browser) {
        browser.waitForElementVisible(byId('segment-0-name'));
        browser.expect.element(byId('segment-0-name')).text.to.equal('18_or_19');
    },
    '[Main Tests] - Edit environment': function (browser) {
        browser
            .click('#env-settings-link')
            .waitForElementVisible("[name='env-name']")
            .clearValue("[name='env-name']")
            .setValue("[name='env-name']", 'Internal')
            .click('#save-env-btn');

        browser.waitForElementVisible(byId('switch-environment-internal-active'));
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
        browser.waitForElementVisible('#projects-list a.list-item');
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
            .click('#save-proj-btn');

        browser.waitForElementVisible(byId('switch-project-test project-active'));
    },
    '[Main Tests] - Delete Nightwatch Ltd organisation': function (browser) {
        browser
            .click('#organisation-settings-link')
            .waitForElementVisible('#delete-org-btn')
            .click('#delete-org-btn')
            .waitForElementVisible('[name="confirm-org-name"]')
            .setValue('[name="confirm-org-name"]', 'Nightwatch Ltd')
            .click('#confirm-del-org-btn')
            .waitForElementVisible('#create-org-page');

        browser.end();
    },
};
