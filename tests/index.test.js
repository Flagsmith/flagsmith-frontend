// All tests are run from this file, that way we can ensure ordering
// of tests (without needing to resort to alphabetical filenaming)
require('dotenv').config();
const path = require('path')
const slackUpload = require('./slack-upload.test')
const fork = require('child_process').fork;
process.env.PORT = 8081;
const SLACK_TOKEN = process.env.SLACK_TOKEN;
const E2E_SLACK_CHANNEL = process.env.E2E_SLACK_CHANNEL;
var server;

const Project = require('../common/project');
const fetch = require('node-fetch');
global.testHelpers = require('./helpers');
const clearDown = function(browser,done) {
    var token;
    if (process.env['E2E_TEST_TOKEN_' + Project.env.toUpperCase()]) {
        token = process.env['E2E_TEST_TOKEN_' + Project.env.toUpperCase()];
    } else {
        const fs = require('fs');
        if (fs.existsSync('./tests/tokens.json')) {
            token = require('./tokens.json')[Project.env];
        } else {
            console.log('No tokens.json found for teardown. Either set E2E_TEST_TOKEN in your environment or create the file in /tests');
        }
    }
    if (token) {
        fetch(`${Project.api}e2etests/teardown/?format=json`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-E2E-Test-Auth-Token': token
            },
            body: JSON.stringify({})
        }).then(res => {
            if (res.ok) {
                console.log('\n', '\x1b[32m', 'e2e teardown successful', '\x1b[0m', '\n');
                done();
            } else {
                console.error('\n', '\x1b[31m', 'e2e teardown failed', res.status, '\x1b[0m', '\n');
            }
        });
    } else {
        console.error('\n', '\x1b[31m', 'e2e teardown failed - no available token', '\x1b[0m', '\n');
    }
};

module.exports = Object.assign(
    {
        // afterEach(browser, done) {
        //     browser.pause(1000)
        //     setTimeout(done,4000)
        // },
        before: (browser, done) => {
            server = fork('./server');
            server.on('message', () => {
                clearDown(browser,done);
            });
        },
        after: (browser, done) => {
            if (SLACK_TOKEN && browser.sessionId) {
                browser.waitForElementVisible('#e2e-request', false, () => {
                    // There is a chance e2e request will not be present if tests failed on another website i.e. mailinator
                    browser.isVisible('#e2e-request', result => {
                        if (result.value) {
                            browser.getText('#e2e-error', error => {
                                browser.getText('#e2e-request', request => {
                                    if (error) {
                                        const lastRequest = request.value  ? JSON.parse(request.value) : {};
                                        const lastError = error.value ? JSON.parse(error.value) : {};
                                        console.log("Last request:", lastRequest);
                                        console.log("Last error:", lastError);
                                        const uri = path.join(__dirname, 'screenshot.png');
                                        browser.saveScreenshot(uri, () => {
                                            slackUpload(uri,'E2E for Bullet Train Failed \n```' +JSON.stringify({
                                                request: lastRequest,
                                                error: lastError,
                                            }, null,2).replace(/\\/g,'')+'```', E2E_SLACK_CHANNEL, 'Screenshot')
                                                .then((res)=>{
                                                    server.kill('SIGINT');
                                                    browser.end();
                                                    done();
                                                });
                                        })
                                    }
                                });
                            });
                        } else {
                            server.kill('SIGINT');
                            browser.end();
                            done();
                        }
                    })
                });
            } else {
                server.kill('SIGINT');
                browser.end();
                done();
            }
        }
    },
    require('./main.test'), // Main flow tests
    require('./invite.test'), // Invite user tests
    require('./register-fail.test'), // Registration failure tests
    require('./login-fail.test'), // Login failure tests
);
