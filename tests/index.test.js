// All tests are run from this file, that way we can ensure ordering
// of tests (without needing to resort to alphabetical filenaming)

const fork = require('child_process').fork;
process.env.PORT = 8081;

var server;

const Project = require('../common/project');
const fetch = require('node-fetch');
global.testHelpers = require('./helpers');
const clearDown = function(browser,done) {
    var token;
    if (process.env['E2E_TEST_TOKEN']) {
        token = process.env['E2E_TEST_TOKEN'];
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
        before: (browser, done) => {
            server = fork('./server');
            server.on('message', () => {
                clearDown(browser,done);
            });
        },
        after: (browser, done) => {
            server.kill('SIGINT');
            clearDown(browser,done);
        }
    },
    require('./main.test'), // Main flow tests
    require('./invite.test'), // Invite user tests
    require('./register-fail.test'), // Registration failure tests
    require('./login-fail.test') // Login failure tests
);
