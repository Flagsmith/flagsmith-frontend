
# Hacking our e2e tests to make them more useful

In this post, we’re going to run through an overview of my experience using e2e (end to end) tests for the feature flag platform, Bullet Train. I’ll discuss the pros and cons of adding e2e coverage to your project, and how I eventually improved their usefulness with a bit of clever JavaScript. I’ll also provide a code example that’s used in production for all of you to play with.

## What are end-to-end tests

Unlike unit tests which verify individual segments of code are working, end-to-end (e2e) testing is a methodology that is more of a high-level run-through of your project, which tests whether automated interactions against the UI work as expected.

In the case of a web project, we write code that launches a browser and tests the actual application as if we were a real user, interacting with elements and making sure the app behaves as e with both good and bad data.

There are a bunch of frameworks that make this fairly easy to implement, in my case I’ve found that [Nightwatch](http://nightwatchjs.org/) provides a very terse API and has been easy to work with. There are many alternatives in this area so it’s mainly down to personal preference.

## The benefits

* Increases confidence in the application. We can write all the unit tests in the world, but there’s no substitute for clicking around and verifying it all works together.

* Tests a lot of the component parts in one swoop with the least amount of effort.

* Great for regression. Actually running the application as our test touches everything: the UI, frontend business logic, contracts with API and even the API itself. If any of these things break it can be caught with E2E.

## The drawbacks

* Can introduce annoying false positives. If the tests are written in a brittle fashion (e.g. looking for li>span>.myClass>input) it’s easy to break them by changing the UI.

* If the UI of your project is constantly changing, the tests can be costly to maintain. Unit tests can often go untouched as they are isolated, however constant UI changes may require e2e tests to be maintained and regularly updated.

* Sometimes tests failure provide poor visibility of what the root cause of the error actually is.

This last point brings us to our topic at hand.

## Better Root Cause Identification

In the strive for achieving fault tolerance and redundancy, we recently we migrated the [Bullet Train API](https://bullet-train.io/?utm_source=medium) over to AWS. The move went pretty well, however we hit a brief issue where users were unable to create organisations. Straight away the E2E tests started shouting at us:

![](https://cdn-images-1.medium.com/max/2000/0*TKP0G8fB1dqTEF5D.png)

Ok, great. But what does that actually mean? Thankfully, in this case, I had a pretty good hunch. We never reached the project selection page, due to us not being able to register. I clicked around on the site and figured out there was an API issue. This took a little while, but eventually, we fixed the API and our tests started to pass again. Although our tests caught the error, it took us quite a while to gather all the information we needed together to fix it. Clearly, the current level of error reporting wasn’t good enough, so we set out to improve this.

![](https://cdn-images-1.medium.com/max/2000/0*V0rv6hzgPZuFG7EJ.png)

## 1. Sending screenshots of e2e tests to slack

This part was quite straightforward. Any selenium framework (even if it uses headless PhantomJS) has the ability to take screenshots of the browser in its current state. And fortunately Slack has a great API for uploading images to a channel.

    const Slack = require('node-slack-upload'); const slack = new Slack(process.env.SLACK_TOKEN); const uri = path.join(__dirname, 'screenshot.png'); ... browser.saveScreenshot(uri, ()=> { slack.uploadFile({ file: fs.createReadStream(uri), filetype: 'auto', title: "Screenshot", channels: Process.env.E2E_SLACK_CHANNEL}, }, function (err, data) { ... }); });

This is our basic starting point. Nightwatch provides a hook called **after** that gets called after our test finishes (either by error or from finishing successfully). We just needed to make sure the browser doesn’t close automatically when tests finish, so we can check what was left after the tests had run.

Since we host this publicly on GitHub we make sure to always hide our sensitive tokens behind env variables!

    //nightwatch.conf: "test_settings": { "default": { "end_session_on_fail": false, ... } ... }

    //index.test.js: module.exports = Object.assign( require('./test1.js'), require('./test2.js'), { after: (browser, done) => { uploadScreenshot(browser) ... server.kill('SIGINT'); browser.end(); done(); } } )

And voila, we get our screenshot sent to slack when our test finishes!

![](https://cdn-images-1.medium.com/max/2000/0*ZM1hqM7HY6sl11Hy.png)

## 2. Reporting API errors

This was where things get a bit clever. A common problem of end-to-end testing is the visibility of what’s actually going on under the hood. After all, we’re only really checking the state of DOM elements. Errors at the API or database level are a world away.

So in order to report ‘deeper’ applications errors, our solution is to have our site write any relevant logging info to the DOM that we can then use later.

We want to ensure this only happens when end-to-end tests are running, otherwise, we might accidentally leak out sensitive information to regular users.

*Tell the frontend we are running E2E*

    //package.json: "test": "cross-env E2E=true nightwatch ./tests/index.test.js", `` We set the environment variable E2E to true so we can tell WebPack to build the application in E2E mode. `` plugins: [ new webpack.DefinePlugin({ E2E: !!process.env.E2E }), ... ]

Webpack’s DefinePlugin allows us to set global variables for our site to access. In this case, window.E2E will now match our environment variable.

*Writing debug information to the DOM*

    //Handle all requests if (E2E) { const payload = { url, options, }; document.getElementById('e2e-request').innerText = JSON.stringify(payload); } fetch(url, options) ... //Handle all responses (response, err) => { // handling api errors req = fetch(url, options); if (E2E) { const error = { url: response.url, status: response.status, error: err, }; document.getElementById('e2e-error').innerText = JSON.stringify(error); } }

We then use this E2E variable to write our debug info to DOM elements. Which we send over to slack.

![](https://cdn-images-1.medium.com/max/2000/0*eyJCAbx1zT1v2aRg.png)

## A real-world example

If you’re curious to how this actually gets used in production, here’s the commit which is now running in our gitlab pipelines [https://github.com/SolidStateGroup/bullet-train-frontend/commit/4a1d41b3ea103a3c2b823803d3fa273eae8bd49f](https://github.com/SolidStateGroup/bullet-train-frontend/commit/4a1d41b3ea103a3c2b823803d3fa273eae8bd49f).

Happy hacking!

*Originally published at [dev.to](https://dev.to/kylessg/hacking-our-e2e-tests-to-make-them-more-useful-2gaj).*
