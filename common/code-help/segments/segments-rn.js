module.exports = (envId, { LIB_NAME, SEGMENT_NAME, FEATURE_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_RN_CLIENT }, customFeature) => `import ${LIB_NAME} from ${NPM_RN_CLIENT}; //Add this line if you're using ${LIB_NAME} via npm

${LIB_NAME}.init({
    environmentID:"${envId}",
    onChange: (oldFlags, params) => { // Occurs whenever flags are changed

        // Check if a user belongs to a segment
        if (${LIB_NAME}.segment("${SEGMENT_NAME}")) {
            ${FEATURE_FUNCTION}();
        }
        
    }
});
`;
