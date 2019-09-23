const testHelpers = {
    logout: (browser) => {
        browser
            .waitForElementNotPresent('.toast-message', 10000)
            .waitForElementVisible('#org-menu')
            .click('#org-menu')
            .waitForElementVisible('#logout-link')
            .pause(200) // Allows the dropdown to fade in
            .click('#logout-link');

        browser.expect.element('#existing-member-btn').to.be.visible;
    },
    byTestID: id => `[data-test="${id}"]`,
    login: async (browser, url, email, password) => {
        browser.url(url);
        browser.pause(200); // Allows the dropdown to fade in
        browser.waitAndClick('#existing-member-btn');
        browser.waitForElementVisible('#login-btn');
        browser.setValue('[name="email"]', email);
        browser.setValue('[name="password"]', password);
        browser.waitForElementVisible('#login-btn');
        browser.click('#login-btn');
    },
    async waitAndSet(id, val) {
        this.waitForElementVisible(id);
        this.setValue(id, val);
    },
    async waitAndClick(id) {
        this.waitForElementVisible(id);
        this.moveToElement(id, 0, 0);
        this.click(id);
    },
    async assertValue(id, value) {
        const res = await this.getValue(id);
        this.assert.equal(res.value, value);
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
