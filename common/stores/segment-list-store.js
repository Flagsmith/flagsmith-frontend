var BaseStore = require('./base/_store');
var data = require('../data/base/_data');


var controller = {

        getSegments: (projectId, environmentId) => {
            if (!store.model || store.envId != environmentId) { //todo: change logic a bit
                store.loading()
                store.envId = environmentId;

                //todo: cache project flags
                // return Promise.all([
                //     data.get(`${Project.api}projects/${projectId}/segments/?format=json`),
                //     data.get(`${Project.api}environments/${environmentId}/segmentstates/?format=json`),
                // ]).then(([segments, environmentSegments]) => {
                //     store.model = {
                //         segments: segments.results,
                //         keyedEnvironmentSegments: environmentSegments.results && _.keyBy(environmentSegments.results, "segment"),
                //     };
                //     store.loaded();
                // }).catch((e) => API.ajaxHandler(store, e));

                store.model = {
                    segments: [
                        {
                            "id": 1,
                            "description": "test",
                            "name": "test",
                            "rules": [{
                                "all": {
                                    "rules": [{
                                        "any": {
                                            "rules": [{
                                                "property": "",
                                                "operator": "EQUAL",
                                                "value": ""
                                            }]
                                        }
                                    }]
                                }
                            }]
                        }
                    ]
                }
                store.loaded();
            }
        },
        createSegment(projectId, environmentId, flag) {
            store.saving();
            API.trackEvent(Constants.events.CREATE_FEATURE);
            data.post(`${Project.api}projects/${projectId}/segments/?format=json`, Object.assign({}, flag, {project: projectId}))
                .then((res) => {
                    return Promise.all([
                        data.get(`${Project.api}projects/${projectId}/segments/?format=json`),
                        data.get(`${Project.api}environments/${environmentId}/segmentstates/?format=json`),
                    ]).then(([segments, environmentSegments]) => {
                        store.model = {
                            segments: segments.results,
                            keyedEnvironmentSegments: environmentSegments && _.keyBy(environmentSegments.results, "segment"),
                        };
                        store.saved();
                    });
                })
        },
        editSegment(projectId, flag) {
            data.put(`${Project.api}projects/${projectId}/segments/${flag.id}/`, flag)
                .then((res) => {
                    const index = _.findIndex(store.model.segments, {id: flag.id});
                    store.model.segments[index] = flag;
                    store.changed();
                })

        },
        toggleSegment: (index, environments, comment) => {
            const flag = store.model.segments[index];
            store.saving();

            API.trackEvent(Constants.events.TOGGLE_FEATURE);
            return Promise.all(environments.map((e) => {
                if (store.hasSegmentInEnvironment(flag.id)) {
                    const environmentSegment = store.model.keyedEnvironmentSegments[flag.id];
                    return data.put(`${Project.api}environments/${e.api_key}/segmentstates/${environmentSegment.id}/`, Object.assign({}, environmentSegment, {enabled: !environmentSegment.enabled}))
                } else {
                    return data.post(`${Project.api}environments/${e.api_key}/segmentstates/`, Object.assign({}, {
                        segment: flag.id,
                        enabled: true,
                        comment
                    }))
                }
            }))
                .then((res) => {
                    store.model.keyedEnvironmentSegments[flag.id] = res[0];
                    store.saved();
                })

        },
        editSegmentState: (projectId, environmentId, flag, projectSegment, environmentSegment) => {
            let prom;
            store.saving();
            API.trackEvent(Constants.events.EDIT_FEATURE);
            if (environmentSegment) {
                prom = data.put(`${Project.api}environments/${environmentId}/segmentstates/${environmentSegment.id}/`, Object.assign({}, environmentSegment, {
                    segment_state_value: flag.initial_value,
                    enabled: flag.default_enabled
                }))
            } else {
                prom = data.post(`${Project.api}environments/${environmentId}/segmentstates/`, Object.assign({}, flag, {
                    enabled: false,
                    environment: environmentId,
                    segment: projectSegment
                }))
            }

            prom.then((res) => {
                store.model.keyedEnvironmentSegments[projectSegment.id] = res;
                store.saved();
            })

        },
        removeSegment: (projectId, flag) => {
            store.saving();
            API.trackEvent(Constants.events.REMOVE_FEATURE);
            return data.delete(`${Project.api}projects/${projectId}/segments/${flag.id}/`)
                .then(() => {
                    store.model.segments = _.filter(store.model.segments, (f) => f.id != flag.id);
                    store.saved();
                })

        }

    },
    store = Object.assign({}, BaseStore, {
        id: 'segments',
        getEnvironmentSegments: function () {
            return store.model && store.model.keyedEnvironmentSegments
        },
        getProjectSegments: function () {
            return store.model && store.model.segments
        },
        hasSegmentInEnvironment: function (id) {
            return store.model && store.model.keyedEnvironmentSegments && store.model.keyedEnvironmentSegments.hasOwnProperty(id)
        },
    });


store.dispatcherIndex = Dispatcher.register(store, function (payload) {
    var action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
        case Actions.GET_SEGMENTS:
            controller.getSegments(action.projectId, action.environmentId);
            break;
        case Actions.TOGGLE_SEGMENT:
            controller.toggleSegment(action.index, action.environments, action.comment);
            break;
        case Actions.CREATE_SEGMENT:
            controller.createSegment(action.projectId, action.environmentId, action.flag);
            break;
        case Actions.EDIT_ENVIRONMENT_SEGMENT:
            controller.editSegmentState(action.projectId, action.environmentId, action.flag, action.projectSegment, action.environmentSegment);
            break;
        case Actions.EDIT_SEGMENT:
            controller.editSegment(action.projectId, action.flag);
            break;
        case Actions.REMOVE_SEGMENT:
            controller.removeSegment(action.projectId, action.flag);
            break;
        default:
            return;
    }
})
controller.store = store;
module.exports = controller.store;
