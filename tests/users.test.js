/* eslint-disable func-names */
const expect = require('chai').expect;
const { byTestID: byId, setSegmentRule } = require('./helpers');

module.exports = {
    '[Users Tests] - Edit flag for user': function (browser) {
        browser
            .waitAndClick('#users-link')
            .waitAndClick(byId('user-item-0'))
            .waitAndClick(byId('user-feature-0'))
            .waitForElementPresent('#create-feature-modal')
            .waitForElementVisible('[name="featureValue"]')
            .pause(200) // todo: Clear fails without a delay here. Find better solution
            .clearValue('[name="featureValue"]')
            .setValue('[name="featureValue"]', 'small')
            .click('#update-feature-btn')
            .waitForElementNotPresent('#create-feature-modal')
            .expect.element(byId('user-feature-value-0')).text.to.equal('"small"');
    },
    '[Users Tests] - Toggle flag for user': function (browser) {
        browser
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .click(byId('user-feature-switch-1-off'))
            .waitAndClick('#confirm-toggle-feature-btn')
            .waitForElementNotPresent('#confirm-toggle-feature-modal')
            .waitForElementVisible(byId('user-feature-switch-1-on'));
    },
    '[Users Tests] - Toggle flag for user again': function (browser) {
        browser
            .pause(200) // Additional wait here as it seems rc-switch can be unresponsive for a while
            .click(byId('user-feature-switch-1-on'))
            .waitAndClick('#confirm-toggle-feature-btn')
            .waitForElementNotPresent('#confirm-toggle-feature-modal')
            .waitForElementVisible(byId('user-feature-switch-1-off'));
    },
    '[Users Tests] - Add trait for user': function (browser) {
        testHelpers.createTrait(browser, 0, 'color', 'red');
        testHelpers.createTrait(browser, 1, 'age', 18);
        testHelpers.createTrait(browser, 2, 'isMale', true);
    },
    '[Users Tests] - Edit trait for user': function (browser) {
        browser
            .waitAndClick(byId('user-trait-0'))
            .waitForElementPresent('#create-trait-modal')
            .waitForElementVisible('[name="traitID"]')
            .clearValue("[name='traitValue']")
            .setValue('[name="traitValue"]', '1')
            .click('#update-trait-btn')
            .waitForElementNotPresent('#create-trait-modal')
            .waitForElementVisible(byId('user-trait-value-0'));
        browser.expect.element(byId('user-trait-value-0')).text.to.equal('1');
    },
    '[Users Tests] - Delete trait for user': function (browser) {
        browser
            .waitAndClick(byId('delete-user-trait-0'))
            .waitAndClick('#confirm-btn-yes')
            .waitForElementNotPresent(byId('user-trait-0'));
    },
};
