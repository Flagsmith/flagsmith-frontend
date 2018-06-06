module.exports = Object.assign({}, require('./base/_app-actions'), {
	getOrganisation: function (organisationId) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.GET_ORGANISATION,
			id: organisationId
		});
	},
	getFeatures: function (projectId, environmentId) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.GET_FEATURES,
			projectId,
			environmentId
		});
	},
	createProject: function (name) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_PROJECT,
			name
		});
	},
	getProject: function (projectId) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.GET_PROJECT,
			projectId
		});
	},
	createEnv: function (name, projectId) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_ENV,
			name,
			projectId
		});
	},
	editEnv: function (env) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ENVIRONMENT,
			env
		});
	},
	deleteEnv: function (env) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.DELETE_ENVIRONMENT,
			env
		});
	},
	refreshOrganisation: function () { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.GET_ORGANISATION,
			force: true
		});
	},
	createFlag: function (projectId, environmentId, flag) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_FLAG,
			projectId, environmentId, flag
		});
	},
	editEnvironmentFlag: function (projectId, environmentId, flag, projectFlag, environmentFlag) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ENVIRONMENT_FLAG,
			projectId, environmentId, flag, projectFlag, environmentFlag
		});
	},
	editFlag: function (projectId, flag) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_FLAG,
			projectId, flag
		});
	},
	editProject: function (id, project) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_PROJECT,
			id,
			project,
		});
	},

	removeUserFlag: function ({environmentId, identity, identityFlag}) {
		Dispatcher.handleViewAction({
			actionType: Actions.REMOVE_USER_FLAG,
			environmentId, identity, identityFlag
		});
	},

	acceptInvite: function (id) {
		Dispatcher.handleViewAction({
			actionType: Actions.ACCEPT_INVITE,
			id
		});
	},
	setUserFlag: function (envId, userId, flag, environmentFlag) {
		Dispatcher.handleViewAction({
			actionType: Actions.REMOVE_USER_FLAG,
			envId, userId, flag, environmentFlag
		});
	},

	deleteFlag: function (id) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.DELETE_FLAG,
			id
		});
	},
	deleteProject: function (id) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.DELETE_PROJECT,
			id
		});
	},
	saveEnv: function (name) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ENVIRONMENT,
			name
		});
	},
	getEnv: function (id) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.GET_ENVIRONMENT,
			id
		});
	},
	toggleFlag: function (index, environments, comment) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.TOGGLE_FLAG,
			index, environments, comment
		});
	},
	editUserFlag: function (params) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_USER_FLAG,
			...params
		});
	},
	toggleUserFlag: function (params) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.TOGGLE_USER_FLAG,
			...params
		});
	},
	selectOrganisation: function (id) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.SELECT_ORGANISATION,
			id
		});
	},
	getIdentities: function (envId) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.GET_IDENTITIES,
			envId
		});
	},
	getIdentity: function (envId, id) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.GET_IDENTITY,
			envId, id
		});
	},
	saveIdentity: function (id, identity) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.SAVE_IDENTITY,
			id,
			identity
		});
	},
	createOrganisation: function (name) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_ORGANISATION,
			name
		});
	},
	editOrganisation: function (name) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ORGANISATION,
			name
		});
	},
	removeFlag: function (projectId, flag) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.REMOVE_FLAG,
			projectId, flag
		});
	},
	inviteUsers: function (emailAddresses) { //refresh the entire app
		Dispatcher.handleViewAction({
			actionType: Actions.INVITE_USERS,
			emailAddresses
		});
	},
	deleteOrganisation: function () {
		Dispatcher.handleViewAction({
			actionType: Actions.DELETE_ORGANISATION
		});
	}
});
