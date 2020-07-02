/* eslint-disable func-names */
const expect = require('chai').expect;
const helpers = require('./helpers');

const byId = helpers.byTestID;

module.exports = {
    // FEATURES
    '[Features Tests] - Create feature': function (browser) {
        browser.waitAndClick('#features-link')
            .pause(200)
            .waitAndClick(byId('show-create-feature-btn'))
            .waitAndClick(byId('btn-select-remote-config'))
            .setValue(byId('featureID'), 'header_size')
            .setValue(byId('featureValue'), 'big')
            .setValue(byId('featureDesc'), 'This determines what size the header is')
            .click(byId('create-feature-btn'))
            .waitForElementNotPresent('#create-feature-modal')
            .waitAndClick(byId('feature-item-0'))
            .waitForElementVisible('#update-feature-btn')
            .assertValue('[name="featureID"]', 'header_size')
            .assertValue('[name="featureValue"]', 'big')
            .assertValue('[name="featureDesc"]', 'This determines what size the header is')
            .click('#update-feature-btn')
            .waitForElementNotPresent('#create-feature-modal')
            .expect.element(byId('feature-value-0')).text.to.equal('"big"');
    },
    '[Features Tests] - Create feature 2': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .click('#show-create-feature-btn')
            .waitForElementVisible('[name="featureID"]')
            .setValue('[name="featureID"]', 'header_enabled')
            .setValue('[name="featureDesc"]', 'This determines whether header is shown')
            .click('#create-feature-btn')
            .waitForElementVisible(byId('feature-item-1'));
    },
    '[Features Tests] - Create feature 3': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .waitAndClick('#show-create-feature-btn')
            .waitForElementVisible('[name="featureID"]')
            .setValue('[name="featureID"]', 'short_life_feature')
            .setValue('[name="featureDesc"]', 'This feature is pointless')
            .click('#create-feature-btn')
            .waitForElementVisible(byId('feature-item-2'));
    },
    '[Features Tests] - Delete feature 3': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .waitAndClick(byId('remove-feature-btn-2'))
            .waitForElementPresent('#confirm-remove-feature-modal')
            .waitForElementVisible('[name="confirm-feature-name"]')
            .setValue('[name="confirm-feature-name"]', 'short_life_feature')
            .click('#confirm-remove-feature-btn')
            .waitForElementNotPresent('#confirm-remove-feature-modal')
            .waitForElementNotPresent(byId('remove-feature-btn-2'));
    },
    '[Features Tests] - Toggle feature on': function (browser) {
        browser
            .waitForElementNotPresent('#confirm-remove-feature-modal')
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .waitAndClick(byId('feature-switch-0-off'))
            .waitForElementPresent('#confirm-toggle-feature-modal')
            .waitAndClick('#confirm-toggle-feature-btn')
            .waitForElementNotPresent('#confirm-toggle-feature-modal')
            .waitForElementVisible(byId('feature-switch-0-on'));
    },
    '[Features Tests] - Try feature out': function (browser) {
        browser.waitForElementNotPresent('#confirm-toggle-feature-modal')
            .pause(200)
            .waitAndClick('#try-it-btn')
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
                expect(json.header_size.value).to.equal('big');
                browser.assert.ok(true, 'Try it JSON was correct for the feature'); // Re-assurance that the chai tests above passed
            });
    },
    '[Features Tests] - Change feature value to number': function (browser) {
        browser
            .waitAndClick(byId('feature-item-1'))
            .waitForElementPresent('#create-feature-modal')
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', '12')
            .click('#update-feature-btn')
            .waitForElementNotPresent('#create-feature-modal')
            .waitForElementVisible(byId('feature-value-1'))
            .expect.element(byId('feature-value-1')).text.to.equal('12');
    },
    '[Features Tests] - Try feature out should return numeric value': function (browser) {
        browser
            .refresh()
            .waitForElementNotPresent('#create-feature-modal')
            .pause(200)
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
    '[Features Tests] - Change feature value to boolean': function (browser) {
        browser
            .waitAndClick(byId('feature-item-1'))
            .waitForElementPresent('#create-feature-modal')
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', 'false')
            .click('#update-feature-btn')
            .waitForElementNotPresent('#create-feature-modal')
            .waitForElementVisible(byId('feature-value-1'))
            .expect.element(byId('feature-value-1')).text.to.equal('false');
    },
    '[Features Tests] - Try feature out should return boolean value': function (browser) {
        browser
            .refresh()
            .waitForElementNotPresent('#create-feature-modal')
            .waitForElementVisible('#try-it-btn')
            .pause(200) // wait for cache to expire, todo: remove when api has shared cache
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
    '[Features Tests] - Switch environment': function (browser) {
        browser
            .waitAndClick(byId('switch-environment-production'))
            .waitForElementVisible(byId('switch-environment-production-active'));
    },
    '[Features Tests] - Feature should be off under different environment': function (browser) {
        browser.waitForElementVisible(byId('feature-switch-0-off'));
    },
};
