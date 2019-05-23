module.exports = (envId, { LIB_NAME, USER_ID, FEATURE_NAME, SEGMENT_NAME, FEATURE_FUNCTION, FEATURE_NAME_ALT, FEATURE_NAME_ALT_VALUE, NPM_CLIENT }, customFeature) => `import ${LIB_NAME} from "${NPM_CLIENT}"; //Add this line if you're using ${LIB_NAME} via npm

${LIB_NAME}.identify("${USER_ID}"); // This will create a user in the dashboard if they don't already exist

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
