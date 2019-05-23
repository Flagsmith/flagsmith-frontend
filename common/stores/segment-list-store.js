const BaseStore = require('./base/_store');
const data = require('../data/base/_data');


const controller = {

    getSegments: (projectId, environmentId) => {
        if (!store.model || store.envId != environmentId) { // todo: change logic a bit
            store.loading();
            store.envId = environmentId;
            data.get(`${Project.api}projects/${projectId}/segments/?format=json`)
                .then((res) => {
                    store.model = res.results.map(segment => ({ ...segment, rules: JSON.parse(segment.rules) }));
                    store.loaded();
                });
        }
    },
    createSegment(projectId, _data) {
        store.saving();
        API.trackEvent(Constants.events.CREATE_SEGMENT);
        data.post(`${Project.api}projects/${projectId}/segments/?format=json`, {
            ..._data,
            rules: JSON.stringify(_data.rules),
            project: parseInt(projectId),
        })
            .then((res) => {
                data.get(`${Project.api}projects/${projectId}/segments/?format=json`)
                    .then((res) => {
                        store.model = res.results.map(segment => ({ ...segment, rules: JSON.parse(segment.rules) }));
                        store.loaded();
                        store.saved();
                    });
            });
    },
    editSegment(projectId, _data) {
        data.put(`${Project.api}projects/${projectId}/segments/${_data.id}/?format=json`, {
            ..._data,
            rules: JSON.stringify(_data.rules),
            project: parseInt(projectId),
        })
            .then((res) => {
                data.get(`${Project.api}projects/${projectId}/segments/?format=json`)
                    .then((res) => {
                        store.model = res.results.map(segment => ({ ...segment, rules: JSON.parse(segment.rules) }));
                        store.loaded();
                        store.saved();
                    });
            });
    },
    toggleSegment: (index, environments, comment) => {
        const flag = store.model.segments[index];
        store.saving();

        API.trackEvent(Constants.events.TOGGLE_FEATURE);
        return Promise.all(environments.map((e) => {
            if (store.hasSegmentInEnvironment(flag.id)) {
                const environmentSegment = store.model.keyedEnvironmentSegments[flag.id];
                return data.put(`${Project.api}environments/${e.api_key}/segmentstates/${environmentSegment.id}/`, Object.assign({}, environmentSegment, { enabled: !environmentSegment.enabled }));
            }
            return data.post(`${Project.api}environments/${e.api_key}/segmentstates/`, Object.assign({}, {
                segment: flag.id,
                enabled: true,
                comment,
            }));
        }))
            .then((res) => {
                store.model.keyedEnvironmentSegments[flag.id] = res[0];
                store.saved();
            });
    },
    editSegmentState: (projectId, environmentId, flag, projectSegment, environmentSegment) => {
        let prom;
        store.saving();
        API.trackEvent(Constants.events.EDIT_FEATURE);
        if (environmentSegment) {
            prom = data.put(`${Project.api}environments/${environmentId}/segmentstates/${environmentSegment.id}/`, Object.assign({}, environmentSegment, {
                segment_state_value: flag.initial_value,
                enabled: flag.default_enabled,
            }));
        } else {
            prom = data.post(`${Project.api}environments/${environmentId}/segmentstates/`, Object.assign({}, flag, {
                enabled: false,
                environment: environmentId,
                segment: projectSegment,
            }));
        }

        prom.then((res) => {
            store.model.keyedEnvironmentSegments[projectSegment.id] = res;
            store.saved();
        });
    },
    removeSegment: (projectId, id) => {
        store.saving();
        API.trackEvent(Constants.events.REMOVE_FEATURE);
        return data.delete(`${Project.api}projects/${projectId}/segments/${id}/`)
            .then(() => {
                data.get(`${Project.api}projects/${projectId}/segments/?format=json`)
                    .then((res) => {
                        store.model = res.results.map(segment => ({ ...segment, rules: JSON.parse(segment.rules) }));
                        store.loaded();
                        store.saved();
                    });
            });
    },

};


var store = Object.assign({}, BaseStore, {
    id: 'segments',
    getSegments() {
        return store.model;
    },
});


store.dispatcherIndex = Dispatcher.register(store, (payload) => {
    const action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
        case Actions.GET_SEGMENTS:
            controller.getSegments(action.projectId, action.environmentId);
            break;
        case Actions.CREATE_SEGMENT:
            controller.createSegment(action.projectId, action.data);
            break;
        case Actions.EDIT_ENVIRONMENT_SEGMENT:
            controller.editSegmentState(action.projectId, action.environmentId, action.flag, action.projectSegment, action.environmentSegment);
            break;
        case Actions.EDIT_SEGMENT:
            controller.editSegment(action.projectId, action.data);
            break;
        case Actions.REMOVE_SEGMENT:
            controller.removeSegment(action.projectId, action.id);
            break;
        default:
    }
});
controller.store = store;
module.exports = controller.store;
