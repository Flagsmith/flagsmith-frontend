module.exports = {
    'E2E': process.env.E2E,
    'projectOverrides': JSON.stringify({
        flagsmith: process.env.FLAGSMITH,
        ga: process.env.GA,
        crispChat: process.env.CRISP_CHAT,
        mixpanel: process.env.MIXPANEL,
        sentry: process.env.SENTRY,
        api: process.env.API_URL,
        maintenance: process.env.MAINTENANCE,
        assetURL: process.env.ASSET_URL,
        flagsmithClientAPI: process.env.FLAGSMITH_CLIENT_API,
        amplitude: process.env.AMPLITUDE,
    }),
};
