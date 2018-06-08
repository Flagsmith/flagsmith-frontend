var BaseStore = require('./base/_store');
var data = require('../data/base/_data')


var controller = {

        getOrganisation: (id, force) => {
            if (id != store.id || force) {
                store.id = id;
                store.loading();

                Promise.all([
                    data.get(`${Project.api}organisations/${id}/projects/?format=json`),
                    data.get(`${Project.api}organisations/${id}/users/?format=json`),
                ]).then((res) => {
                    const [projects, users] = res;
                    store.model = {users};
                    return Promise.all(projects.map((project, i) => {
                        return data.get(`${Project.api}projects/${project.id}/environments/?format=json`)
                            .then((res) => {
                                projects[i].environments = res;
                            })
                    }))
                        .then(() => {
                            store.model.projects = projects;
                            store.model.keyedProjects = _.keyBy(store.model.projects, "id");
                            store.loaded()
                        })


                });
            }
        },
        createProject: (name) => {
            store.saving();
            const createSampleUser = (res, envName) => {
                return data.post(`${Project.api}environments/${res.api_key}/identities/`, {
                    environment: res.id,
                    identifier: envName + "_user_123456"
                }).then(() => {
                    return res;
                })
            }
            API.trackEvent(Constants.events.CREATE_PROJECT);
            data.post(`${Project.api}projects/?format=json`, {name, organisation: store.id})
                .then((project) => {
                    Promise.all([
                        data.post(`${Project.api}environments/?format=json`, {name: "Development", project: project.id})
                            .then((res) => createSampleUser(res, "development")),
                        data.post(`${Project.api}environments/?format=json`, {name: "Production", project: project.id})
                            .then((res) => createSampleUser(res, "production"))
                    ]).then((res) => {
                        project.environments = res;
                        store.model.projects = store.model.projects.concat(project);
                        store.savedId = {
                            projectId: project.id,
                            environmentId: res[0].api_key
                        };
                        store.saved();

                    })
                });
        },
        editOrganisation: (name) => {
            store.saving();
            data.put(`${Project.api}organisations/${store.organisation.id}/?format=json`, {name})
                .then((res) => {
                    var idx = _.findIndex(store.model.organisations, {id: store.organisation.id});
                    if (idx != -1) {
                        store.model.organisations[idx] = res;
                        store.organisation = res
                    }
                    store.saved();
                });
        },
        deleteProject: (id) => {
            store.saving();
            if (store.model) {
                store.model.projects = _.filter(store.model.projects, (p) => p.id != id);
                store.model.keyedProjects = _.keyBy(store.model.projects, "id");
            }
            API.trackEvent(Constants.events.REMOVE_PROJECT);
            data.delete(`${Project.api}projects/${id}/?format=json`)
                .then(() => {
                    store.trigger("removed");
                });
        }

    },
    store = Object.assign({}, BaseStore, {
        id: 'account',
        getProject: function (id) {
            return store.model && store.model.keyedProjects && store.model.keyedProjects[id];
        },
        getProjects: function () {
            return store.model && store.model.projects;
        },
        getUsers: () => {
            return store.model && store.model.users;
        }
    });


store.dispatcherIndex = Dispatcher.register(store, function (payload) {
    var action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
        case Actions.GET_ORGANISATION:
            controller.getOrganisation(action.id || store.id, action.force);
            break;
        case Actions.CREATE_PROJECT:
            controller.createProject(action.name);
            break;
        case Actions.DELETE_PROJECT:
            controller.deleteProject(action.id);
            break;
        default:
            return;
    }
});
controller.store = store;
module.exports = controller.store;
