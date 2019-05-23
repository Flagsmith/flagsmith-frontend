module.exports = (envId, { LIB_NAME, FEATURE_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT }, customFeature) => `import ${LIB_NAME} from "${NPM_CLIENT}"; // Add this line if you're using ${LIB_NAME} via npm

${LIB_NAME}.init({
    environmentID: "${envId}"
});

${LIB_NAME}.hasFeature("${customFeature || FEATURE_NAME}")
    .then((featureEnabled) => {
        if (featureEnabled) {
            // Show my awesome cool new feature to the world
        }
    });

${LIB_NAME}.getValue("${customFeature || FEATURE_NAME_ALT}")
    .then((value) => {
        // Show a value to the world
    });
`;
