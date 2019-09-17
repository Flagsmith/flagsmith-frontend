const AppActions = Object.assign({}, require('./base/_app-actions'), {
    getOrganisation(organisationId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_ORGANISATION,
            id: organisationId,
        });
    },
    getFeatures(projectId, environmentId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_FLAGS,
            projectId,
            environmentId,
        });
    },
    createProject(name) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_PROJECT,
            name,
        });
    },
    getProject(projectId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_PROJECT,
            projectId,
        });
    },
    getConfig(projectId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_CONFIG,
            projectId,
        });
    },
    resetPassword(data) {
        Dispatcher.handleViewAction({
            actionType: Actions.RESET_PASSWORD,
            ...data,
        });
    },
    createEnv(name, projectId) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_ENV,
            name,
            projectId,
        });
    },
    editEnv(env) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ENVIRONMENT,
            env,
        });
    },
    deleteEnv(env) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_ENVIRONMENT,
            env,
        });
    },
    refreshOrganisation() {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_ORGANISATION,
            force: true,
        });
    },
    createFlag(projectId, environmentId, flag, segmentOverrides) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_FLAG,
            projectId,
            environmentId,
            flag,
            segmentOverrides,
        });
    },
    editEnvironmentFlag(projectId, environmentId, flag, projectFlag, environmentFlag, segmentOverrides) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ENVIRONMENT_FLAG,
            projectId,
            environmentId,
            flag,
            projectFlag,
            environmentFlag,
            segmentOverrides,
        });
    },

    editFlag(projectId, flag, segmentOverrides) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_FLAG,
            projectId,
            flag,
            segmentOverrides,
        });
    },
    editProject(id, project) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_PROJECT,
            id,
            project,
        });
    },
    removeUserFlag({ environmentId, identity, identityFlag }) {
        Dispatcher.handleViewAction({
            actionType: Actions.REMOVE_USER_FLAG,
            environmentId,
            identity,
            identityFlag,
        });
    },
    acceptInvite(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.ACCEPT_INVITE,
            id,
        });
    },
    deleteProject(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_PROJECT,
            id,
        });
    },
    saveEnv(name) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ENVIRONMENT,
            name,
        });
    },
    toggleFlag(index, environments, comment) {
        Dispatcher.handleViewAction({
            actionType: Actions.TOGGLE_FLAG,
            index,
            environments,
            comment,
        });
    },
    editUserFlag(params) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_USER_FLAG,
            ...params,
        });
    },
    editTrait(params) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_TRAIT,
            ...params,
        });
    },
    toggleUserFlag(params) {
        Dispatcher.handleViewAction({
            actionType: Actions.TOGGLE_USER_FLAG,
            ...params,
        });
    },
    selectOrganisation(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.SELECT_ORGANISATION,
            id,
        });
    },
    getIdentities(envId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITIES,
            envId,
        });
    },
    getIdentitiesPage(envId, page) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITIES_PAGE,
            envId,
            page,
        });
    },
    getIdentity(envId, id) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITY,
            envId,
            id,
        });
    },
    getIdentitySegments(envId, id) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_IDENTITY_SEGMENTS,
            envId,
            id,
        });
    },
    saveIdentity(id, identity) {
        Dispatcher.handleViewAction({
            actionType: Actions.SAVE_IDENTITY,
            id,
            identity,
        });
    },
    createOrganisation(name) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_ORGANISATION,
            name,
        });
    },
    editOrganisation(org) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_ORGANISATION,
            org,
        });
    },
    removeFlag(projectId, flag) {
        Dispatcher.handleViewAction({
            actionType: Actions.REMOVE_FLAG,
            projectId,
            flag,
        });
    },
    deleteOrganisation() {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_ORGANISATION,
        });
    },
    // Invites todo: organise actions
    inviteUsers(emailAddresses) {
        Dispatcher.handleViewAction({
            actionType: Actions.INVITE_USERS,
            emailAddresses,
        });
    },
    deleteInvite(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.DELETE_INVITE,
            id,
        });
    },
    resendInvite(id) {
        Dispatcher.handleViewAction({
            actionType: Actions.RESEND_INVITE,
            id,
        });
    },
    // Segments
    selectEnvironment(data) {
        Dispatcher.handleViewAction({
            actionType: Actions.SELECT_ENVIRONMENT,
            data,
        });
    },
    getSegments(projectId, environmentId) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_SEGMENTS,
            projectId,
            environmentId,
        });
    },
    createSegment(projectId, segment) {
        Dispatcher.handleViewAction({
            actionType: Actions.CREATE_SEGMENT,
            projectId,
            data: segment,
        });
    },
    editSegment(projectId, segment) {
        Dispatcher.handleViewAction({
            actionType: Actions.EDIT_SEGMENT,
            projectId,
            data: segment,
        });
    },
    removeSegment(projectId, id) {
        Dispatcher.handleViewAction({
            actionType: Actions.REMOVE_SEGMENT,
            projectId,
            id,
        });
    },
    searchIdentities(envId, search) {
        Dispatcher.handleViewAction({
            actionType: Actions.SEARCH_IDENTITIES,
            envId,
            search,
        });
    },
    getAuditLog() {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_AUDIT_LOG,
        });
    },
    getAuditLogPage(page) {
        Dispatcher.handleViewAction({
            actionType: Actions.GET_AUDIT_LOG_PAGE,
            page,
        });
    },
    searchAuditLog(search) {
        Dispatcher.handleViewAction({
            actionType: Actions.SEARCH_AUDIT_LOG,
            search,
        });
    },
});

module.exports = AppActions;
window.AppActions = AppActions;
