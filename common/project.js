module.exports = global.Project = {
    api: 'https://api-staging.flagsmith.com/api/v1/',
    flagsmithClientAPI: 'https://api.flagsmith.com/api/v1/',
    flagsmith: 'ENktaJnfLVbLifybz34JmX', // This is our Bullet Train API key - Bullet Train runs on Bullet Train!
    env: 'staging', // This is used for Sentry tracking
    ga: 'UA-120237963-7', // This is our Google Analytics key
    maintenance: false, // trigger maintenance mode
    delighted: true, // determines whether to shw delighted feedback widget
    demoAccount: {
        email: 'kyle+bullet-train@solidstategroup.com',
        password: 'demo_account',
    },
    chargebee: {
        site: 'flagsmith-test',
    },
    crispChat: '8857f89e-0eb5-4263-ab49-a293872b6c19',
    mixpanel: '6143f9ceefb1c67640a0771345e8c095',
    amplitude: '00c348027841be8f129bba0fd307a790',
};
