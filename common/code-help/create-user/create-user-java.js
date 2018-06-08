module.exports = (envId, {LIB_NAME, USER_ID, LIB_NAME_JAVA, FEATURE_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT}, userId) => {
    return `User user = new User();
user.setIdentifier("${userId||USER_ID}");

${LIB_NAME_JAVA} ${LIB_NAME} = ${LIB_NAME}.newBuilder()
.setApiKey("${envId}")
.build();
        
boolean featureEnabled = bulletClient.hasFeatureFlag("${FEATURE_NAME}", user);
if (featureEnabled) {
    // run the code to execute enabled feature
} else {
    // run the code if feature switched off
}

String myRemoteConfig = bulletClient.getFeatureFlagValue("${FEATURE_NAME_ALT}", user);
`
}
