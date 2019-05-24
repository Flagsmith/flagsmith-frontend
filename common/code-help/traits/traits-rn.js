module.exports = (envId, { SEGMENT_NAME, FEATURE_FUNCTION, LIB_NAME, NPM_RN_CLIENT, TRAIT_NAME, USER_ID, USER_FEATURE_FUNCTION, USER_FEATURE_NAME }, userId) => `import ${LIB_NAME} from '${NPM_RN_CLIENT}';

/***
Can be called both before or after you're done initialising the project.
Calling identify before will prevent flags being fetched twice.
***/
${LIB_NAME}.identify("${userId || USER_ID}"); // This will create a user in the dashboard if they don't already exist

// Set a user trait
${LIB_NAME}.setTrait("${TRAIT_NAME}", 21);

// Standard project initialisation
${LIB_NAME}.init({
    environmentID: "${envId}",
        onChange: (oldFlags, params) => { // Occurs whenever flags are changed

        const { isFromServer } = params; // Determines if the update came from the server or local cached storage

        // Check for a feature
        if (${LIB_NAME}.hasFeature("${USER_FEATURE_NAME}")) {
            ${USER_FEATURE_FUNCTION}();
        }

        // Or, use the value of a feature
        const ${USER_FEATURE_NAME} = ${LIB_NAME}.getValue("${USER_FEATURE_NAME}");

        // Check if the value of a user trait
        const ${TRAIT_NAME} = ${LIB_NAME}.getTrait("${TRAIT_NAME}");

        // Check if a user belongs to a segment
        if (${LIB_NAME}.segment("${SEGMENT_NAME}")) {
            ${FEATURE_FUNCTION}();
        }
        
    }
});
`;
