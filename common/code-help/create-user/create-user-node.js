module.exports = (envId, {LIB_NAME, FEATURE_NAME, USER_ID, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT}, customFeature) => {
    return `import ${LIB_NAME} from "${NPM_CLIENT}"; //Add this line if you're using ${LIB_NAME} via npm

${LIB_NAME}.init({
	environmentID:"${envId}"
});

${LIB_NAME}.hasFeature("${customFeature || FEATURE_NAME}", "${USER_ID}")
.then((featureEnabled) => {
    if (featureEnabled) {
        //Show my awesome cool new feature to the world
    }
});

${LIB_NAME}.getValue("${customFeature || FEATURE_NAME_ALT}", "${USER_ID}")
.then((value) => {
    //Show a value to the world
});
`
}
