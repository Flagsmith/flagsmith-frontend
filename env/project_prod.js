module.exports = global.Project = {
    api: 'https://api.flagsmith.com/api/v1/',
    flagsmithClientAPI: 'https://api.flagsmith.com/api/v1/',
    flagsmith: '4vfqhypYjcPoGGu8ByrBaj', // This is our Bullet Train API key - Bullet Train runs on Bullet Train!
    env: 'prod', // This is used for Sentry tracking
    sentry: 'https://11c8828dc24041b0a875e324b0380769@sentry.io/1320942',
    maintenance: false, // trigger maintenance mode
    cookieDomain: '.flagsmith.com',
    excludeAnalytics: 'nightwatch@solidstategroup.com',
    delighted: true, // determines whether to shw delighted feedback widget
    demoAccount: {
        email: 'kyle+bullet-train@solidstategroup.com',
        password: 'demo_account',
    },
    chargebee: {
        site: 'flagsmith',
    },
    assetUrl: '/', // Location of the static files from build/, should contain a directory called static/
};
