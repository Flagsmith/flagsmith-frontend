module.exports = (envId, {LIB_NAME, USER_ID, LIB_NAME_JAVA, FEATURE_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT}, userId) => {
    return `${LIB_NAME_JAVA} ${LIB_NAME} = new ${LIB_NAME_JAVA}() {
    environmentKey = ${envId}
};

bool featureEnabled = await ${LIB_NAME}.HasFeatureFlag("${FEATURE_NAME}", ${USER_ID});
if (featureEnabled) {
    // Run the code to execute enabled feature
} else {
    // Run the code if feature switched off
}

string myRemoteConfig = await ${LIB_NAME}.getFeatureValue("${FEATURE_NAME_ALT}", ${USER_ID});
if (myRemoteConfig != null) {
    // Run the code to use remote config value
} else {
    // Run the code without remote config
}
`
}
