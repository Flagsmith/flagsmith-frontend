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
  login: (browser, url, email, password) => {
    browser
      .url(url)
      .click('#existing-member-btn')
      .waitForElementVisible('[name="email"]')
      .setValue('[name="email"]', email)
      .setValue('[name="password"]', password)
      .click('#login-btn');
  },
}
