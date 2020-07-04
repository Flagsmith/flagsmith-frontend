/* eslint-disable func-names */
const _ = require('lodash');

const expect = require('chai').expect;
const helpers = require('./helpers');

const byId = helpers.byTestID;
const setSegmentRule = helpers.setSegmentRule;

module.exports = {
    // // Age == 18 || Age == 19
    '[Segments Tests] - Create Segment': function (browser) {
        browser.waitAndClick('#segments-link')
            .pause(200)

        // (=== 18 || === 19) && (> 17 || < 19) && (!=20) && (<=18) && (>=18)
        // Rule 1- Age === 18 || Age === 19

        testHelpers.createSegment(browser, 0, '18_or_19', [
            // rule 2 =18 || =17
            {
                name: 'age',
                operator: 'EQUAL',
                value: 18,
                ors: [
                    {
                        name: 'age',
                        operator: 'EQUAL',
                        value: 17,
                    },
                ],
            },
            // rule 2 >17 or <10
            {
                name: 'age',
                operator: 'GREATER_THAN',
                value: 17,
                ors: [
                    {
                        name: 'age',
                        operator: 'LESS_THAN',
                        value: 10,
                    },
                ],
            },
            // rule 3 !=20
            {
                name: 'age',
                operator: 'NOT_EQUAL',
                value: 20,
            },
            // Rule 4 <= 18
            {
                name: 'age',
                operator: 'LESS_THAN_INCLUSIVE',
                value: 18,
            },
            // Rule 5 >= 18
            {
                name: 'age',
                operator: 'GREATER_THAN_INCLUSIVE',
                value: 18,
            },
        ]);

        testHelpers.createSegment(browser, 1, 'segment_1', [
            {
                name: 'trait',
                operator: 'EQUAL',
                value: '1',
            },
        ]);
        testHelpers.createSegment(browser, 2, 'segment_2', [
            {
                name: 'trait',
                operator: 'EQUAL',
                value: '2',
            },
        ]);;
        testHelpers.createSegment(browser, 3, 'segment_3', [
            {
                name: 'trait',
                operator: 'EQUAL',
                value: '3',
            },
        ]);
    },
    '[Segments Tests] - Add segment trait for user': function (browser) {
        browser
            .waitAndClick('#users-link')
            .waitAndClick(byId('user-item-0'))
            .waitAndClick('#add-trait')
            .waitForElementVisible('[name="traitID"]')
            .setValue('[name="traitID"]', 'age')
            .setValue('[name="traitValue"]', '18')
            .click('#create-trait-btn')
            .waitForElementNotPresent('#create-trait-btn')
            .waitForElementVisible(byId('user-trait-value-0'));
        browser.expect.element(byId('user-trait-value-0')).text.to.equal('18');
    },
    '[Segments Tests] - Check user now belongs to segment': function (browser) {
        browser.waitForElementVisible(byId('segment-0-name'));
        browser.expect.element(byId('segment-0-name')).text.to.equal('18_or_19');
    },
    '[Segments Tests] - Delete segment trait for user': function (browser) {
        browser.waitAndClick(byId('delete-user-trait-0'))
            .waitAndClick('#confirm-btn-yes')
            .waitForElementNotPresent(byId('user-trait-0'));
    },
};
