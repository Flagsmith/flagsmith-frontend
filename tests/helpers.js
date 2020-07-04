const _ = require('lodash');


const testHelpers = {
    logout: (browser) => {
        browser
            .waitForElementNotPresent('.toast-message', 10000)
            .waitForElementVisible('#org-menu')
            .click('#org-menu')
            .waitForElementVisible('#logout-link')
            .pause(200) // Allows the dropdown to fade in
            .click('#logout-link');

        browser.expect.element(testHelpers.byTestID('email')).to.be.visible;
    },
    byTestID: id => `[data-test="${id}"]`,
    login: async (browser, url, email, password) => {
        browser.url(url)
            .pause(200) // Allows the dropdown to fade in
            .waitForElementVisible('#login-btn')
            .setValue('[name="email"]', email)
            .setValue('[name="password"]', password)
            .waitForElementVisible('#login-btn')
            .click('#login-btn');
    },
    setSegmentRule(browser, ruleIndex, orIndex, name, operator, value) {
        browser.waitAndSet(testHelpers.byTestID(`rule-${ruleIndex}-property-${orIndex}`), name);
        if (operator) {
            browser.clearValue(testHelpers.byTestID(`rule-${ruleIndex}-operator-${orIndex}`));
            browser.waitAndSet(testHelpers.byTestID(`rule-${ruleIndex}-operator-${orIndex}`), operator);
        }
        browser.waitAndSet(testHelpers.byTestID(`rule-${ruleIndex}-value-${orIndex}`), value);
    },
    createTrait(browser, index, id, value) {
        const byId = testHelpers.byTestID;
        browser
            .waitAndClick('#add-trait')
            .waitForElementPresent('#create-trait-modal')
            .waitForElementVisible('[name="traitID"]')
            .setValue('[name="traitID"]', id)
            .setValue('[name="traitValue"]', value)
            .click('#create-trait-btn')
            .waitForElementNotPresent('#create-trait-modal')
            .waitForElementVisible(byId(`user-trait-value-${index}`));
        const expectedValue = typeof value === 'string' ? `"${value}"` : `${value}`;
        browser.expect.element(byId(`user-trait-value-${index}`)).text.to.equal(expectedValue);
    },
    createSegment: (browser, index, id, rules) => {
        const byId = testHelpers.byTestID;
        const setSegmentRule = testHelpers.setSegmentRule;

        browser
            .waitAndClick(byId('show-create-segment-btn'));
        browser.waitAndSet(byId('segmentID'), id);
        _.each(rules, (rule, ruleIndex) => {
            if (ruleIndex > 0) {
                browser.waitAndClick(byId('add-rule'));
            }
            testHelpers.setSegmentRule(browser, ruleIndex, 0, rule.name, rule.operator, rule.value);
            _.each(rule.ors, (or, orIndex) => {
                browser.click(byId(`rule-${ruleIndex}-or`));
                setSegmentRule(browser, ruleIndex, orIndex + 1, or.name, or.operator, or.value);
            });
        });
        // Create
        browser.waitAndClick(byId('create-segment'))
            .waitForElementVisible(byId(`segment-${index}-name`))
            .expect.element(byId(`segment-${index}-name`)).text.to.equal(id);
    },
};
module.exports = testHelpers;
