module.exports = global.Project = {
    api: 'http://localhost:8000/api/v1/',
    flagsmithClientAPI: 'https://api.bullet-train.io/api/v1/',
    flagsmith: '8KzETdDeMY7xkqkSkY3Gsg', // This is our Bullet Train API key - Bullet Train runs on Bullet Train!
    debug: false,
    delighted: true, // determines whether to shw delighted feedback widget
    env: 'dev', // This is used for Sentry tracking
    ga: 'UA-120237963-3', // This is our Google Analytics key
    maintenance: false, // trigger maintenance mode
    demoAccount: {
        email: 'kyle+bullet-train@solidstategroup.com',
        password: 'demo_account',
    },
    chargebee: {
        site: 'flagsmith-test',
    },
    mixpanel: '6143f9ceefb1c67640a0771345e8c095',
    amplitude: 'b45ded98b4ab4c22841ee5528bfcd833',
};
