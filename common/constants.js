const keywords = {
    URL_CLIENT: "https://cdn.jsdelivr.net/npm/bullet-train-client/lib/index.js",
    LIB_NAME: "bulletTrain",
    LIB_NAME_JAVA: "BulletTrain",
    NPM_CLIENT: "bullet-train-client",
    NPM_RN_CLIENT: "react-native-bullet-train",
    NPM_NODE_CLIENT: "bullet-train-nodejs",
    USER_ID: "user_123456",
    FEATURE_FUNCTION: "myCoolFeature",
    FEATURE_NAME: "myCoolFeature",
    USER_FEATURE_FUNCTION: "myPowerUserFeature",
    USER_FEATURE_NAME: "myPowerUserFeature",
    FEATURE_NAME_ALT: "bannerSize",
    FEATURE_NAME_ALT_VALUE: "big",
};


var Constants = {
    events: {
        "CREATE_ENVIRONMENT": {"event": "Environment created", "category": "Environment"},
        "CREATE_FEATURE": {"event": "Feature created", "category": "Features"},
        "CREATE_ORGANISATION": {"event": "Organisation created", "category": "Organisation"},
        "CREATE_PROJECT": {"event": "Project created", "category": "Project"},
        "CREATE_USER_FEATURE": {"event": "User feature created", "category": "User Features"},
        "DELETE_ORGANISATION": {"event": "Organisation deleted", "category": "Organisation"},
        "DEMO_ACCOUNT": {"event": "User demo login", "category": "User"},
        "EDIT_ENVIRONMENT": {"event": "Environment edited", "category": "Environment"},
        "EDIT_FEATURE": {"event": "Feature edited", "category": "Features"},
        "EDIT_ORGANISATION": {"event": "Organisation edited", "category": "Organisation"},
        "EDIT_PROJECT": {"event": "Project edited", "category": "Project"},
        "EDIT_USER_FEATURE": {"event": "User feature edited", "category": "Features"},
        "INVITE": {"event": "Invite sent", "category": "Invite"},
        "LOGIN_DEMO": {"event": "User demo login", "category": "User"},
        "LOGIN": {"event": "User login", "category": "User"},
        "REGISTER": {"event": "User register", "category": "User"},
        "REMOVE_ENVIRONMENT": {"event": "Environment edited", "category": "Environment"},
        "REMOVE_FEATURE": {"event": "Feature removed", "category": "Features"},
        "REMOVE_PROJECT": {"event": "Project removed", "category": "Project"},
        "REMOVE_USER_FEATURE": {"event": "User feature removed", "category": "User Features"},
        "TOGGLE_FEATURE": {"event": "Feature toggled", "category": "Features"},
        "TOGGLE_USER_FEATURE": {"event": "User feature toggled", "category": "User Features"},
        "TRY_IT": {"event": "Try it clicked", "category": "TryIt"},
        "VIEW_USER_FEATURE": {"event": "User feature viewed", "category": "User Features"},
        "VIEW_FEATURE": {"event": "Feature viewed", "category": "Features"}
    },
    pages: {
        "RESET_PASSWORD": "Reset Password Page",
        "COMING_SOON": "Coming Soon Page",
        "CREATE_ENVIRONMENT": "Create Environment Page",
        "DOCUMENTATION": "Documentation Page",
        "ENVIRONMENT_SETTINGS": "Environment Settings Page",
        "FEATURES": "Features Page",
        "HOME": "Home Page",
        "INVITE": "User Invited Page",
        "NOT_FOUND": "404 Page",
        "ORGANISATION_SETTINGS": "Organisation Settings Page",
        "PROJECT_SELECT": "Project Select Page",
        "PROJECT_SETTINGS": "Project Settings Page",
        "USER": "User Page",
        "USERS": "Users Page"
    },
    strings: {
        REMOTE_CONFIG_DESCRIPTION: "A feature that you can turn configure per environment or user. E.g. a font size for a banner or an environment variable for a server.",
        FEATURE_FLAG_DESCRIPTION: "A feature that you can turn on or off per environment or user. E.g. instant messaging for a mobile app or an endpoint for an API.",
        ORGANISATION_DESCRIPTION: "This is used to create a default organisation for team members to create and manage projects.",
        ENVIRONMENT_DESCRIPTION: "Environments are versions of your projects, environments within a project all share the same features but can be individually turned on/off or have different values."
    },
    codeHelp: {
        keys: {
            "Java": "java",
            "JavaScript": "javascript",
            "React Native": "javascript",
            "Node JS": "javascript"
        },

        "CREATE_USER": (envId,userId) => {
            return {
                "JavaScript": require('./code-help/create-user/create-user-js')(envId, keywords,userId),
                "React Native": require('./code-help/create-user/create-user-rn')(envId, keywords,userId),
                "Node JS": require('./code-help/create-user/create-user-node')(envId, keywords,userId),
                "Java": require('./code-help/create-user/create-user-java')(envId, keywords,userId),
                ".NET": "Coming soon"
            }
        },

        "INIT": (envId, flagName) => {
            return {
                "JavaScript": require('./code-help/init/init-js')(envId, keywords, flagName),
                "React Native": require('./code-help/init/init-rn')(envId, keywords, flagName),
                "Node JS": require('./code-help/init/init-node')(envId, keywords, flagName),
                "Java": require('./code-help/init/init-java')(envId, keywords, flagName),
                ".NET": "Coming soon"
            }
        },

        "INSTALL": {
            "JavaScript": require('./code-help/install/install-js')(keywords),
            "React Native": require('./code-help/install/install-rn')(keywords),
            "Node JS": require('./code-help/install/install-node')(keywords),
            "Java": require('./code-help/install/install-java')(keywords),
            ".NET": "Coming soon"
        }
    }
};

module.exports = Constants;
