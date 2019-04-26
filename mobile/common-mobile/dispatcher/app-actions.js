const AppActions = Object.assign({}, require('./base/_app-actions'), {
	getOrganisation: function (organisationId) {
		Dispatcher.handleViewAction({
			actionType: Actions.GET_ORGANISATION,
			id: organisationId
		});
	},
	getFeatures: function (projectId, environmentId) {
		Dispatcher.handleViewAction({
			actionType: Actions.GET_FLAGS,
			projectId,
			environmentId
		});
	},
	getSegments: function (projectId, environmentId) {
		Dispatcher.handleViewAction({
			actionType: Actions.GET_SEGMENTS,
			projectId,
			environmentId
		});
	},
	createProject: function (name) {
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_PROJECT,
			name
		});
	},
	getProject: function (projectId) {
		Dispatcher.handleViewAction({
			actionType: Actions.GET_PROJECT,
			projectId
		});
	},
    getConfig: function (projectId) {
		Dispatcher.handleViewAction({
			actionType: Actions.GET_CONFIG,
			projectId
		});
	},
	resetPassword: function (data) {
		Dispatcher.handleViewAction({
			actionType: Actions.RESET_PASSWORD,
			...data
		});
	},
	createEnv: function (name, projectId) {
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_ENV,
			name,
			projectId
		});
	},
	editEnv: function (env) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ENVIRONMENT,
			env
		});
	},
	deleteEnv: function (env) {
		Dispatcher.handleViewAction({
			actionType: Actions.DELETE_ENVIRONMENT,
			env
		});
	},
	refreshOrganisation: function () {
		Dispatcher.handleViewAction({
			actionType: Actions.GET_ORGANISATION,
			force: true
		});
	},
	createFlag: function (projectId, environmentId, flag) {
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_FLAG,
			projectId, environmentId, flag
		});
	},
	createSegment: function (projectId, environmentId, segment) {
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_SEGMENT,
			projectId, environmentId, segment
		});
	},
	editEnvironmentFlag: function (projectId, environmentId, flag, projectFlag, environmentFlag) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ENVIRONMENT_FLAG,
			projectId, environmentId, flag, projectFlag, environmentFlag
		});
	},
	editEnvironmentSegment: function (projectId, environmentId, segment, projectSegment, environmentSegment) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ENVIRONMENT_SEGMENT,
			projectId, environmentId, segment, projectSegment, environmentSegment
		});
	},
	editFlag: function (projectId, flag) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_FLAG,
			projectId, flag
		});
	},
	editSegment: function (projectId, segment) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_SEGMENT,
			projectId, segment
		});
	},
	editProject: function (id, project) {
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
	deleteProject: function (id) {
		Dispatcher.handleViewAction({
			actionType: Actions.DELETE_PROJECT,
			id
		});
	},
	saveEnv: function (name) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ENVIRONMENT,
			name
		});
	},
	toggleFlag: function (index, environments, comment) {
		Dispatcher.handleViewAction({
			actionType: Actions.TOGGLE_FLAG,
			index, environments, comment
		});
	},
	editUserFlag: function (params) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_USER_FLAG,
			...params
		});
	},
	editTrait: function (params) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_TRAIT,
			...params
		});
	},
	toggleUserFlag: function (params) {
		Dispatcher.handleViewAction({
			actionType: Actions.TOGGLE_USER_FLAG,
			...params
		});
	},
	selectOrganisation: function (id) {
		Dispatcher.handleViewAction({
			actionType: Actions.SELECT_ORGANISATION,
			id
		});
	},
	getIdentities: function (envId) {
		Dispatcher.handleViewAction({
			actionType: Actions.GET_IDENTITIES,
			envId
		});
	},
	getIdentity: function (envId, id) {
		Dispatcher.handleViewAction({
			actionType: Actions.GET_IDENTITY,
			envId, id
		});
	},
	saveIdentity: function (id, identity) {
		Dispatcher.handleViewAction({
			actionType: Actions.SAVE_IDENTITY,
			id,
			identity
		});
	},
	createOrganisation: function (name) {
		Dispatcher.handleViewAction({
			actionType: Actions.CREATE_ORGANISATION,
			name
		});
	},
	editOrganisation: function (org) {
		Dispatcher.handleViewAction({
			actionType: Actions.EDIT_ORGANISATION,
			org
		});
	},
	removeFlag: function (projectId, flag) {
		Dispatcher.handleViewAction({
			actionType: Actions.REMOVE_FLAG,
			projectId, flag
		});
	},
	inviteUsers: function (emailAddresses) {
		Dispatcher.handleViewAction({
			actionType: Actions.INVITE_USERS,
			emailAddresses
		});
	},
	deleteOrganisation: function () {
		Dispatcher.handleViewAction({
			actionType: Actions.DELETE_ORGANISATION
		});
	},
	deleteInvite: function (id) {
		Dispatcher.handleViewAction({
			actionType: Actions.DELETE_INVITE,
			id
		});
	},
	resendInvite: function (id) {
		Dispatcher.handleViewAction({
			actionType: Actions.RESEND_INVITE,
			id
		});
	},
	selectEnvironment: function (data) {
		Dispatcher.handleViewAction({
			actionType: Actions.SELECT_ENVIRONMENT,
			data
		});
	}
});

module.exports= AppActions;
window.AppActions = AppActions;
