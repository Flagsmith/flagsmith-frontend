const email = 'nightwatch@solidstategroup.com';
const password = 'nightwatch';
const url = `http://localhost:${process.env.PORT || 8080}`;
const helpers = require('./helpers');

const byId = helpers.byTestID;

module.exports = {
    '[Initialise Tests] - Register': async function (browser) {
        browser.url(url); // visit the url
        browser.waitAndSet(byId('firstName'), 'Night');
        browser.setValue(byId('lastName'), 'Watch');
        browser.setValue(byId('companyName'), 'Nightwatch Ltd');
        browser.setValue(byId('email'), email);
        browser.setValue(byId('password'), password);
        browser.click(byId('signup-btn'));
        browser.waitForElementVisible(byId('project-select-page'));
    },
    '[Initialise Tests] - Create project': function (browser) {
        browser.waitAndClick(byId('create-first-project-btn'));
        browser.waitAndSet(byId('projectName'), 'My Test Project');
        browser.click(byId('create-project-btn'));
        browser.waitForElementVisible(byId('features-page'));
    },
};
