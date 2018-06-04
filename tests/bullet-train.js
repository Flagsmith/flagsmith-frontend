// All tests are run from this file, that way we can ensure ordering
// of tests (without needing to resort to alphabetical filenaming)

const fork = require('child_process').fork;
process.env.PORT = 8081;

var server;

const Project = require('../common/project');
const fetch = require('node-fetch');

module.exports = Object.assign(
  {
    before: (browser, done) => {
      server = fork('./server');
      server.on('message', () => done());
    },
    after: (browser, done) => {
      server.kill('SIGINT');
      // fetch(`${Project.api}tests`, {
      //   method: 'DELETE',
      // })
      //   .then(res => {
      //     done();
      //   })
      done();
    }
  },
  require('./main'), // Main flow tests
  require('./register-fail'), // Registration failure tests
  require('./login-fail') // Login failure tests
);
