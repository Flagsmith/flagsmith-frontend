module.exports = {
    'E2E': process.env.E2E,
    'projectOverrides': JSON.stringify({
        bulletTrain: process.env.BULLET_TRAIN,
        ga: process.env.GA,
        crispChat: process.env.CRISP_CHAT,
        mixpanel: process.env.MIXPANEL,
        sentry: process.env.SENTRY,
        api: process.env.API_URL,
    }),
};
