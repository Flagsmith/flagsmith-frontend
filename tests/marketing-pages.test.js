/* eslint-disable func-names */
const expect = require('chai').expect;
const helpers = require('./helpers');

const url = `http://localhost:${process.env.PORT || 8080}`;

const byId = helpers.byTestID;

module.exports = {
    '[Marketing Pages Tests] - Pricing page': function (browser) {
        browser.url(`${url}/pricing`)
            .waitForElementPresent(byId('pricing-page'));
    },
    '[Marketing Pages Tests] - Features page': function (browser) {
        browser.url(`${url}/features`)
            .waitForElementPresent(byId('features-example-page'));
    },
    '[Marketing Pages Tests] - Open source page': function (browser) {
        browser.url(`${url}/open-source`)
            .waitForElementPresent(byId('open-source-page'));
    },
};
