module.exports = (envId, {LIB_NAME, LIB_NAME_JAVA, FEATURE_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT}, customFeature) => {
    return `${LIB_NAME_JAVA} ${LIB_NAME} = ${LIB_NAME_JAVA}.newBuilder()
    .setApiKey("${envId}")
    .build();

boolean featureEnabled = ${LIB_NAME}.hasFeatureFlag("${customFeature||FEATURE_NAME}");
if (featureEnabled) {
    // Run the code to execute enabled feature
} else {
    // Run the code if feature switched off
}

String myRemoteConfig = ${LIB_NAME}.getFeatureFlagValue("${customFeature||FEATURE_NAME_ALT}");
if (myRemoteConfig != null) {
    // Run the code to use remote config value
} else {
    // Run the code without remote config
}
`
}
