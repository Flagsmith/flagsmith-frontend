/* eslint-disable func-names */
const expect = require('chai').expect;
const helpers = require('./helpers');

const byId = helpers.byTestID;

module.exports = {
    // FEATURES
    '[Features Tests] - Create feature': function (browser) {
        browser.waitAndClick('#features-link');
        browser.pause(200);
        browser.waitAndClick(byId('show-create-feature-btn'));
        browser.waitAndClick(byId('btn-select-remote-config'));
        browser.setValue(byId('featureID'), 'header_size')
            .setValue(byId('featureValue'), 'big')
            .setValue(byId('featureDesc'), 'This determines what size the header is')
            .click(byId('create-feature-btn'))
            .waitForElementVisible('#features-list div.list-item')
            .waitForElementNotPresent('#create-feature-modal')
            .click('#features-list div.list-item div')
            .waitForElementVisible('#update-feature-btn')
            .assertValue('[name="featureID"]', 'header_size')
            .assertValue('[name="featureValue"]', 'big')
            .assertValue('[name="featureDesc"]', 'This determines what size the header is')
            .click('#update-feature-btn')
            .waitForElementVisible('#features-list div.list-item')
            .expect.element('#features-list .feature-value').text.to.equal('big');
    },
    '[Features Tests] - Create feature 2': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .click('#show-create-feature-btn')
            .waitForElementVisible('[name="featureID"]')
            .setValue('[name="featureID"]', 'header_enabled')
            .setValue('[name="featureDesc"]', 'This determines whether header is shown')
            .click('#create-feature-btn')
            .waitForElementVisible('#features-list div.list-item:nth-child(2)');
    },
    '[Features Tests] - Create feature 3': function (browser) {
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
    '[Features Tests] - Delete feature 3': function (browser) {
        browser
            .waitForElementNotPresent('#create-feature-modal')
            .waitForElementVisible('#features-list div.list-item:nth-child(3) #remove-feature')
            .click('#features-list div.list-item:nth-child(3) #remove-feature')
            .waitForElementVisible('[name="confirm-feature-name"]')
            .setValue('[name="confirm-feature-name"]', 'short_life_feature')
            .click('#confirm-remove-feature-btn')
            .waitForElementNotPresent('#features-list div.list-item:nth-child(3)');
    },
    '[Features Tests] - Toggle feature on': function (browser) {
        browser
            .waitForElementNotPresent('#confirm-remove-feature-modal')
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .waitForElementVisible(byId('feature-switch-1-off'))
            .click('#features-list .rc-switch')
            .waitForElementVisible('#confirm-toggle-feature-btn')
            .click('#confirm-toggle-feature-btn')
            .waitForElementVisible(byId('feature-switch-1-on'));
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
            .useXpath()
            .click('//div[@id="features-list"]//a[text()="header_size"]')
            .useCss()
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', '12')
            .click('#update-feature-btn')
            .waitForElementVisible('#features-list .feature-value')
            .expect.element('#features-list .feature-value').text.to.equal('12');
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
            .useXpath()
            .click('//div[@id="features-list"]//a[text()="header_size"]')
            .useCss()
            .waitForElementVisible('[name="featureValue"]')
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', 'false')
            .click('#update-feature-btn')
            .expect.element('#features-list .feature-value').text.to.equal('false');
    },
    '[Features Tests] - Try feature out should return boolean value': function (browser) {
        browser
            .refresh()
            .waitForElementNotPresent('#create-feature-modal')
            .waitForElementVisible('#try-it-btn')
            .pause(200)
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
        browser.waitForElementVisible(byId('feature-switch-1-off'));
    },
};
