module.exports = global.Project = {
    api: 'https://api.bullet-train.io/api/v1/',
    bulletTrainClientAPI: 'https://api.bullet-train.io/api/v1/',
    bulletTrain: '4vfqhypYjcPoGGu8ByrBaj', // This is our Bullet Train API key - Bullet Train runs on Bullet Train!
    env: 'prod', // This is used for Sentry tracking
    ga: 'UA-120237963-1', // This is our Google Analytics key
    sentry: 'https://11c8828dc24041b0a875e324b0380769@sentry.io/1320942',
    demoAccount: {
        email: 'kyle+bullet-train@solidstategroup.com',
        password: 'demo_account',
    },
    chargebee: {
        site: 'bullettrain',
    },
    crispChat: '8857f89e-0eb5-4263-ab49-a293872b6c19',
    mixpanel: '9448f5be8a5555c380e5dd4b7ac2c345',
    assetUrl: 'https://cdn.bullet-train.io', // Location of the static files from build/, should contain a directory called static/
};
