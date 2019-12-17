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
};
module.exports = testHelpers;
