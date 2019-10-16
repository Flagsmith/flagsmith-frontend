/* eslint-disable func-names */
const expect = require('chai').expect;
const helpers = require('./helpers');

const byId = helpers.byTestID;
const setSegmentRule = helpers.setSegmentRule;

module.exports = {
    // // Age == 18 || Age == 19
    '[Segments Tests] - Create Segment': function (browser) {
        browser.waitAndClick('#segments-link')
            .pause(200)
            .waitAndClick(byId('show-create-segment-btn'));

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
        browser.waitAndClick(byId('create-segment'))
            .waitForElementVisible(byId('segment-0-name'))
            .expect.element(byId('segment-0-name')).text.to.equal('18_or_19');
    },
};
