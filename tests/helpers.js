module.exports = {
    logout: (browser) => {
        browser
            .waitForElementNotPresent('.toast-message', 10000)
            .click('#org-menu')
            .waitForElementVisible('#logout-link')
            .pause(200) // Allows the dropdown to fade in
            .click('#logout-link');

        browser.expect.element('#existing-member-btn').to.be.visible;
    },
    byTestID: id => `[data-test="${id}"]`,
    login: (browser, url, email, password) => {
        browser
            .url(url)
            .click('#existing-member-btn')
            .waitForElementVisible('[name="email"]')
            .setValue('[name="email"]', email)
            .setValue('[name="password"]', password)
            .waitForElementVisible('#login-btn')
            .click('#login-btn');
    },
    waitAndSet(id, val) {
        return this.waitForElementVisible(id)
            .setValue(id, val);
    },
    waitAndClick(id) {
        return this.waitForElementVisible(id)
            .click(id);
    },
};
