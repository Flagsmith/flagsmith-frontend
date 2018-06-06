module.exports = (envId, {LIB_NAME, LIB_NAME_JAVA, FEATURE_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT}, customFeature) => {
    return `${LIB_NAME_JAVA} ${LIB_NAME} = ${LIB_NAME}.newBuilder()
.setApiKey("${envId}")
.build();
        
boolean featureEnabled = bulletClient.hasFeatureFlag("${customFeature||FEATURE_NAME}");
if (featureEnabled) {
    // run the code to execute enabled feature
} else {
    // run the code if feature switched off
}

String myRemoteConfig = bulletClient.getFeatureFlagValue("${customFeature||FEATURE_NAME_ALT}");
`
}
