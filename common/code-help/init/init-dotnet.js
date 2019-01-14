module.exports = (envId, {LIB_NAME, LIB_NAME_JAVA, FEATURE_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT}, customFeature) => {
    return `${LIB_NAME_JAVA} ${LIB_NAME} = new ${LIB_NAME_JAVA}() {
    environmentKey = ${envId}
};

bool featureEnabled = await ${LIB_NAME}.HasFeatureFlag("${customFeature||FEATURE_NAME}");
if (featureEnabled) {
    // Run the code to execute enabled feature
} else {
    // Run the code if feature switched off
}

string myRemoteConfig = await ${LIB_NAME}.GetFeatureValue("${customFeature||FEATURE_NAME_ALT}");
if (myRemoteConfig != null) {
    // Run the code to use remote config value
} else {
    // Run the code without remote config
}
`
}
