const keywords = {
    URL_CLIENT: 'https://cdn.jsdelivr.net/npm/bullet-train-client/lib/index.js',
    LIB_NAME: 'bulletTrain',
    LIB_NAME_JAVA: 'BulletTrainClient',
    NPM_CLIENT: 'bullet-train-client',
    NPM_RN_CLIENT: 'react-native-bullet-train',
    NPM_NODE_CLIENT: 'bullet-train-nodejs',
    USER_ID: 'user_123456',
    FEATURE_FUNCTION: 'myCoolFeature',
    SEGMENT_NAME: 'superUsers',
    FEATURE_NAME: 'myCoolFeature',
    TRAIT_NAME: 'age',
    USER_FEATURE_FUNCTION: 'myEvenCoolerFeature',
    USER_FEATURE_NAME: 'myEvenCoolerFeature',
    FEATURE_NAME_ALT: 'bannerSize',
    FEATURE_NAME_ALT_VALUE: 'big',
};

const Constants = {
    tagColors: [
        '#3d4db6',
        '#ea5a45',
        '#f1d502',
        '#60bd4e',
        '#fe5505',
        '#1492f4',
        '#14c0f4',
        '#c277e0',
        '#039587',
        '#344562',
    ],
    forms: {
        maxLength: {
            "FEATURE_ID" : 150,
            "SEGMENT_ID" : 150,
            "TRAITS_ID" : 150
        },
    },
    defaultRule: {
        property: '',
        operator: 'EQUAL',
        value: '',
    },
    events: {
        'CREATE_ENVIRONMENT': { 'event': 'Environment created', 'category': 'Environment' },
        'CREATE_FEATURE': { 'event': 'Feature created', 'category': 'Features' },
        'CREATE_FIRST_FEATURE': { 'event': 'First Feature created', 'category': 'First' },
        'CREATE_SEGMENT': { 'event': 'Segment created', 'category': 'Segments' },
        'CREATE_FIRST_SEGMENT': { 'event': 'First Segment created', 'category': 'First' },
        'CREATE_ORGANISATION': { 'event': 'Organisation created', 'category': 'Organisation' },
        'CREATE_FIRST_ORGANISATION': { 'event': 'First Organisation created', 'category': 'First' },
        'REFERRER_CONVERSION': referrer => ({ 'event': `${referrer} converted`, 'category': 'Referrer' }),
        'REFERRER_REGISTERED': referrer => ({ 'event': `${referrer} registered`, 'category': 'Referrer' }),
        'CREATE_PROJECT': { 'event': 'Project created', 'category': 'Project' },
        'CREATE_FIRST_PROJECT': { 'event': 'First Project created', 'category': 'First' },
        'CREATE_USER_FEATURE': { 'event': 'User feature created', 'category': 'User Features' },
        'DELETE_INVITE': { 'event': 'Invite deleted', 'category': 'Invite' },
        'CREATE_GROUP': { 'event': 'Group created', 'category': 'Group' },
        'DELETE_GROUP': { 'event': 'Group deleted', 'category': 'Group' },
        'DELETE_USER': { 'event': 'User deleted', 'category': 'Organisation' },
        'DELETE_ORGANISATION': { 'event': 'Organisation deleted', 'category': 'Organisation' },
        'DEMO_ACCOUNT': { 'event': 'User demo login', 'category': 'User' },
        'EDIT_ENVIRONMENT': { 'event': 'Environment edited', 'category': 'Environment' },
        'EDIT_FEATURE': { 'event': 'Feature edited', 'category': 'Features' },
        'EDIT_ORGANISATION': { 'event': 'Organisation edited', 'category': 'Organisation' },
        'EDIT_PROJECT': { 'event': 'Project edited', 'category': 'Project' },
        'EDIT_USER_FEATURE': { 'event': 'User feature edited', 'category': 'Features' },
        'INVITE': { 'event': 'Invite sent', 'category': 'Invite' },
        'LOGIN_DEMO': { 'event': 'User demo login', 'category': 'User' },
        'LOGIN': { 'event': 'User login', 'category': 'User' },
        'REGISTER': { 'event': 'User register', 'category': 'User' },
        'REMOVE_ENVIRONMENT': { 'event': 'Environment edited', 'category': 'Environment' },
        'REMOVE_FEATURE': { 'event': 'Feature removed', 'category': 'Features' },
        'REMOVE_PROJECT': { 'event': 'Project removed', 'category': 'Project' },
        'REMOVE_USER_FEATURE': { 'event': 'User feature removed', 'category': 'User Features' },
        'RESEND_INVITE': { 'event': 'Invite resent', 'category': 'Invite' },
        'TOGGLE_FEATURE': { 'event': 'Feature toggled', 'category': 'Features' },
        'TOGGLE_USER_FEATURE': { 'event': 'User feature toggled', 'category': 'User Features' },
        'TRY_IT': { 'event': 'Try it clicked', 'category': 'TryIt' },
        'VIEW_USER_FEATURE': { 'event': 'User feature viewed', 'category': 'User Features' },
        'VIEW_FEATURE': { 'event': 'Feature viewed', 'category': 'Features' },
        'VIEW_SEGMENT': { 'event': 'Segment viewed', 'category': 'Segment' },
        'UPDATE_USER_ROLE': { 'event': 'Updated user role', 'category': 'Organisation' },
    },
    modals: {
        'PAYMENT': 'Payment Modal',
    },

    adminPermissions: () => 'To use this feature you need the to be admin of the organisation.<br/>Please contact member of this organisation who has administrator privileges.',
    projectPermissions: perm => `To use this feature you need the <i>${perm}</i> permission for this project.<br/>Please contact member of this project who has administrator privileges.`,
    environmentPermissions: perm => `To use this feature you need the <i>${perm}</i> permission for this environment.<br/>Please contact member of this environment who has administrator privileges.`,
    pages: {
        'ACCOUNT': 'Account Page',
        'AUDIT_LOG': 'Audit Log Page',
        'WHAT_ARE_FEATURE_FLAGS': 'What are feature flags Page',
        'RESET_PASSWORD': 'Reset Password Page',
        'COMING_SOON': 'Coming Soon Page',
        'CREATE_ENVIRONMENT': 'Create Environment Page',
        'DOCUMENTATION': 'Documentation Page',
        'ENVIRONMENT_SETTINGS': 'Environment Settings Page',
        'FEATURES': 'Features Page',
        'HOME': 'Home Page',
        'INVITE': 'User Invited Page',
        'NOT_FOUND': '404 Page',
        'ORGANISATION_SETTINGS': 'Organisation Settings Page',
        'POLICIES': 'Terms & Policies Page',
        'PRICING': 'Pricing Page',
        'PROJECT_SELECT': 'Project Select Page',
        'PROJECT_SETTINGS': 'Project Settings Page',
        'USER': 'User Page',
        'USERS': 'Users Page',
    },
    strings: {
        HIDE_FROM_SDKS_DESCRIPTION: 'Enable this if you want to prevent the Flagsmith API from returning this feature regardless of if it is enabled. Use this if you don\'t want users to see that a feature name whilst it is in development.',
        SEGMENT_OVERRIDES_DESCRIPTION: 'Set different values for your feature based on what segments users are in.',
        IDENTITY_OVERRIDES_DESCRIPTION: 'See which identities have specific overridden values for this feature.',
        REMOTE_CONFIG_DESCRIPTION: 'A feature that you can turn configure per environment or user. E.g. a font size for a banner or an environment variable for a server.',
        FEATURE_FLAG_DESCRIPTION: 'A feature that you can turn on or off per environment or user. E.g. instant messaging for a mobile app or an endpoint for an API.',
        AUDIT_WEBHOOKS_DESCRIPTION: 'Receive a webhook for when an audit log is recieved.',
        WEBHOOKS_DESCRIPTION: 'Receive a webhook for when feature values are changed.',
        USER_PROPERTY_DESCRIPTION: 'The name of the user trait or custom property belonging to the user. E.g. firstName',
        ORGANISATION_DESCRIPTION: 'This is used to create a default organisation for team members to create and manage projects.',
        ENVIRONMENT_DESCRIPTION: 'Environments are versions of your projects, environments within a project all share the same features but can be individually turned on/off or have different values.',
    },
    codeHelp: {
        keys: {
            'Java': 'java',
            'JavaScript': 'javascript',
            'React Native': 'javascript',
            'Node JS': 'javascript',
        },

        'CREATE_USER': (envId, userId) => ({
            'JavaScript': require('./code-help/create-user/create-user-js')(envId, keywords, userId),
            'React Native': require('./code-help/create-user/create-user-rn')(envId, keywords, userId),
            'Node JS': require('./code-help/create-user/create-user-node')(envId, keywords, userId),
            'Java': require('./code-help/create-user/create-user-java')(envId, keywords, userId),
            '.NET': require('./code-help/create-user/create-user-dotnet')(envId, keywords, userId),
            'cURL': require('./code-help/create-user/create-user-curl')(envId, keywords, userId),
        }),

        'SEGMENTS': envId => ({
            'JavaScript': require('./code-help/segments/segments-js')(envId, keywords),
            'React Native': require('./code-help/segments/segments-rn')(envId, keywords),
            'Node JS': '//Coming Soon',
            'Java': '//Coming Soon',
            '.NET': '//Coming Soon',
        }),

        'USER_TRAITS': (envId, userId) => ({
            'JavaScript': require('./code-help/traits/traits-js')(envId, keywords),
            'React Native': require('./code-help/traits/traits-rn')(envId, keywords),
            'Node JS': '//Coming Soon',
            'Java': '//Coming Soon',
            '.NET': '//Coming Soon',
            'cURL': require('./code-help/traits/traits-curl')(envId, keywords),
        }),

        'INIT': (envId, flagName) => ({
            'JavaScript': require('./code-help/init/init-js')(envId, keywords, flagName),
            'React Native': require('./code-help/init/init-rn')(envId, keywords, flagName),
            'Node JS': require('./code-help/init/init-node')(envId, keywords, flagName),
            'Java': require('./code-help/init/init-java')(envId, keywords, flagName),
            '.NET': require('./code-help/init/init-dotnet')(envId, keywords, flagName),
            'cURL': require('./code-help/init/init-curl')(envId, keywords, flagName),
        }),

        'INSTALL': {
            'JavaScript': require('./code-help/install/install-js')(keywords),
            'React Native': require('./code-help/install/install-rn')(keywords),
            'Node JS': require('./code-help/install/install-node')(keywords),
            'Java': require('./code-help/install/install-java')(keywords),
            '.NET': require('./code-help/install/install-dotnet')(keywords),
        },
    },
    simulate: {},
    roles: {
        'ADMIN': 'Organisation Administrator',
        'USER': 'User',
    },
    exampleWebhook: `
 {
  "data": {
    "changed_by": "Some User",
    "new_state": {
      "enabled": true,
      "environment": 23,
      "feature": {
        "created_date": "2020-02-25T22:11:16.355547Z",
        "default_enabled": false,
        "description": null,
        "id": 2411,
        "initial_value": "blue",
        "name": "feature_name",
        "project": 12,
        "type": "FLAG|CONFIG"
      },
      "feature_segment": null,
      "feature_state_value": null,
      "id": 10430,
      "identity": null,
      "identity_identifier": null
    },
    "previous_state": {
    "enabled": false,
      "environment": 23,
      "feature": {
        "created_date": "2020-02-25T22:11:16.355547Z",
        "default_enabled": false,
        "description": null,
        "id": 2411,
        "initial_value": "red",
        "name": "feature_name",
        "project": 12,
        "type": "FLAG|CONFIG"
      },
      "feature_segment": null,
      "feature_state_value": null,
      "id": 10430,
      "identity": null,
      "identity_identifier": null
    },
    "timestamp": "2020-03-07T13:59:07.040Z"
  },
  "event_type": "FLAG_UPDATED"
}`,
    exampleAuditWebhook: `{
  "created_date": "2020-02-23T17:30:57.006318Z",
  "log": "New Flag / Remote Config created: my_feature",
  "author": { "id": 3, "email": "user@domain.com", "first_name": "Kyle", "last_name": "Johnson" },
  "environment": null,
  "project": { "id": 6, "name": "Project name", "organisation": 1 },
  "related_object_id": 6,
  "related_object_type": "FEATURE"
}`,
};
module.exports = Constants;
