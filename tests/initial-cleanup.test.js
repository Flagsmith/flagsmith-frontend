/* eslint-disable func-names */
module.exports = {
    '[Initial Cleanup Tests] - Delete Nightwatch Ltd organisation': function (browser) {
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
