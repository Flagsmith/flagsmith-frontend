module.exports = (envId, {LIB_NAME, FEATURE_NAME, SEGMENT_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT}, customFeature) => {
    return `import ${LIB_NAME} from "${NPM_CLIENT}"; //Add this line if you're using ${LIB_NAME} via npm

${LIB_NAME}.init({
    environmentID:"${envId}",
    onChange: (oldFlags, params) => { // Occurs whenever flags are changed

        // Check if a user belongs to a segment
        if (${LIB_NAME}.segment("${SEGMENT_NAME}")) {
            ${FEATURE_FUNCTION}();
        }
        
    }
});
`
}
