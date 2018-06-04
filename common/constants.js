const keywords = {
	URL_CLIENT: "https://cdn.jsdelivr.net/npm/bullet-train-client/lib/index.js",
	LIB_NAME: "bulletTrain",
	NPM_CLIENT: "bullet-train-client",
	NPM_RN_CLIENT: "react-native-bullet-train",
	USER_ID: "bullet_train_sample_user",
	FEATURE_FUNCTION: "myCoolFeature",
	FEATURE_NAME: "myCoolFeature",
	USER_FEATURE_FUNCTION: "myPowerUserFeature",
	USER_FEATURE_NAME: "myPowerUserFeature",
	FEATURE_NAME_ALT: "bannerSize",
	FEATURE_NAME_ALT_VALUE: "big",
};

var Constants = {
	strings: {
		ORGANISATION_DESCRIPTION: "This is used to create a default organisation for team members to create and manage projects.",
		ENVIRONMENT_DESCRIPTION: "Environments are versions of your projects, environments within a project all share the same features but can be individually turned on/off or have different values."
	},
	codeHelp: {
		keys: {
			"JavaScript": "javascript",
			"React Native": "javascript"
		},

		"CREATE_USER": (envId) => {
			return {
				"JavaScript": require('./code-help/create-user/create-user-js')(envId, keywords),
				"React Native": require('./code-help/create-user/create-user-rn')(envId, keywords),
				"Java": `Coming soon`,
				".NET": "Coming soon"
			}
		},

		"INIT": (envId, flagName) => {
			return {
				"JavaScript": require('./code-help/init/init-js')(envId, keywords, flagName),
				"React Native": require('./code-help/init/init-rn')(envId, keywords, flagName),
				"Java": "Coming soon",
				".NET": "Coming soon"
			}
		},

		"INSTALL": {
			"JavaScript": require('./code-help/install/install-js')(keywords),
			"React Native": require('./code-help/install/install-rn')(keywords),
			"Java": "Coming soon",
			".NET": "Coming soon"
		}
	}
};

module.exports = Constants;
