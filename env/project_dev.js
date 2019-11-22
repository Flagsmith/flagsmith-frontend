module.exports = global.Project = {
    debug: false,
    env: 'dev', // This is used for Sentry tracking
    bulletTrain: '8KzETdDeMY7xkqkSkY3Gsg', // This is our Bullet Train API key - Bullet Train runs on Bullet Train!
    api: 'https://bullet-train-api-dev.dokku1.solidstategroup.com/api/v1/',
    ga: 'UA-120237963-3', // This is our Google Analytics key
    demoAccount: {
        email: 'kyle+bullet-train@solidstategroup.com',
        password: 'demo_account',
    },
    chargebee: {
        site: 'bullettrain-test',
    },
    mixpanel: '6143f9ceefb1c67640a0771345e8c095',
    youtubeApi: 'AIzaSyCAjMzgz8vbxqReBxkQGcwsda6zAO0L2JE',
};
