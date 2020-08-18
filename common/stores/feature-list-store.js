const BaseStore = require('./base/_store');
const data = require('../data/base/_data');


const controller = {

    getFeatures: (projectId, environmentId) => {
        if (!store.model || store.envId != environmentId) { // todo: change logic a bit
            store.loading();
            store.envId = environmentId;

            // todo: cache project flags
            return Promise.all([
                data.get(`${Project.api}projects/${projectId}/features/`),
                data.get(`${Project.api}environments/${environmentId}/featurestates/`),
            ]).then(([features, environmentFeatures]) => {
                store.model = {
                    features: features.results.map((controller.parseFlag)),
                    keyedEnvironmentFeatures: environmentFeatures.results && _.keyBy(environmentFeatures.results, 'feature'),
                };
                store.loaded();
            }).catch((e) => {
                document.location.href = '/404?entity=environment';
                API.ajaxHandler(store, e);
            });
        }
    },
    createFlag(projectId, environmentId, flag, segmentOverrides) {
        store.saving();
        API.trackEvent(Constants.events.CREATE_FEATURE);
        data.post(`${Project.api}projects/${projectId}/features/`, Object.assign({}, flag, { project: projectId }))
            .then(res => Promise.all([
                data.get(`${Project.api}projects/${projectId}/features/`),
                data.get(`${Project.api}environments/${environmentId}/featurestates/`),
            ]).then(([features, environmentFeatures]) => {
                store.model = {
                    features: features.results,
                    keyedEnvironmentFeatures: environmentFeatures && _.keyBy(environmentFeatures.results, 'feature'),
                };
                store.model.lastSaved = new Date().valueOf();
                store.saved();
            }))
            .catch(e => API.ajaxHandler(store, e));
    },
    parseFlag(flag) {
        return {
            ...flag,
            feature_segments: flag.feature_segments && flag.feature_segments.map(fs => ({
                ...fs,
                segment: fs.segment.id,
            })),
        };
    },
    editFlag(projectId, flag) {
        data.put(`${Project.api}projects/${projectId}/features/${flag.id}/`, flag)
            .then((res) => {
                const index = _.findIndex(store.model.features, { id: flag.id });
                store.model.features[index] = controller.parseFlag(flag);
                store.model.lastSaved = new Date().valueOf();
                store.changed();
            })
            .catch(e => API.ajaxHandler(store, e));
    },
    toggleFlag: (index, environments, comment) => {
        const flag = store.model.features[index];
        store.saving();

        API.trackEvent(Constants.events.TOGGLE_FEATURE);
        return Promise.all(environments.map((e) => {
            if (store.hasFlagInEnvironment(flag.id)) {
                const environmentFlag = store.model.keyedEnvironmentFeatures[flag.id];
                return data.put(`${Project.api}environments/${e.api_key}/featurestates/${environmentFlag.id}/`, Object.assign({}, environmentFlag, { enabled: !environmentFlag.enabled }));
            }
            return data.post(`${Project.api}environments/${e.api_key}/featurestates/`, Object.assign({}, {
                feature: flag.id,
                enabled: true,
                comment,
            }));
        }))
            .then((res) => {
                store.model.keyedEnvironmentFeatures[flag.id] = res[0];
                store.model.lastSaved = new Date().valueOf();
                store.saved();
            });
    },
    editFeatureState: (projectId, environmentId, flag, projectFlag, environmentFlag, segmentOverrides) => {
        let prom;
        store.saving();
        API.trackEvent(Constants.events.EDIT_FEATURE);
        if (environmentFlag) {
            prom = data.put(`${Project.api}environments/${environmentId}/featurestates/${environmentFlag.id}/`, Object.assign({}, environmentFlag, {
                feature_state_value: flag.initial_value,
                hide_from_client: flag.hide_from_client,
                enabled: flag.default_enabled,
            }));
        } else {
            prom = data.post(`${Project.api}environments/${environmentId}/featurestates/`, Object.assign({}, flag, {
                enabled: false,
                environment: environmentId,
                feature: projectFlag,
            }));
        }

        const segmentOverridesRequest = segmentOverrides
            ? data.post(`${Project.api}features/feature-segments/update-priorities/`, segmentOverrides.map((override, index) => ({
                id: override.id,
                priority: index,
            }))).then(() => Promise.all(segmentOverrides.map(override => data.put(`${Project.api}features/feature-segments/${override.id}/`, {
                ...override,
                feature: projectFlag.id,
                value: (override.value === null || typeof override.value === 'undefined') ? '' : override.value,
            })))) : Promise.resolve();


        Promise.all([prom, segmentOverridesRequest]).then(([res, segmentRes]) => {
            store.model.keyedEnvironmentFeatures[projectFlag.id] = res;
            if (segmentRes) {
                const feature = _.find(store.model.features, f => f.id === projectFlag.id);
                if (feature) feature.feature_segments = _.map(segmentRes.feature_segments, segment => ({ ...segment, segment: segment.segment.id }));
            }
            store.model.lastSaved = new Date().valueOf();
            store.saved();
        });
    },
    removeFlag: (projectId, flag) => {
        store.saving();
        API.trackEvent(Constants.events.REMOVE_FEATURE);
        return data.delete(`${Project.api}projects/${projectId}/features/${flag.id}/`)
            .then(() => {
                store.model.features = _.filter(store.model.features, f => f.id != flag.id);
                store.model.lastSaved = new Date().valueOf();
                store.saved();
            });
    },

};


const store = Object.assign({}, BaseStore, {
    id: 'features',
    getEnvironmentFlags() {
        return store.model && store.model.keyedEnvironmentFeatures;
    },
    getProjectFlags() {
        return store.model && store.model.features;
    },
    hasFlagInEnvironment(id) {
        return store.model && store.model.keyedEnvironmentFeatures && store.model.keyedEnvironmentFeatures.hasOwnProperty(id);
    },
    getLastSaved() {
        return store.model && store.model.lastSaved;
    },
});


store.dispatcherIndex = Dispatcher.register(store, (payload) => {
    const action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
        case Actions.GET_FLAGS:
            controller.getFeatures(action.projectId, action.environmentId);
            break;
        case Actions.TOGGLE_FLAG:
            controller.toggleFlag(action.index, action.environments, action.comment);
            break;
        case Actions.CREATE_FLAG:
            controller.createFlag(action.projectId, action.environmentId, action.flag, action.segmentOverrides);
            break;
        case Actions.EDIT_ENVIRONMENT_FLAG:
            controller.editFeatureState(action.projectId, action.environmentId, action.flag, action.projectFlag, action.environmentFlag, action.segmentOverrides);
            break;
        case Actions.EDIT_FLAG:
            controller.editFlag(action.projectId, action.flag);
            break;
        case Actions.REMOVE_FLAG:
            controller.removeFlag(action.projectId, action.flag);
            break;
        default:
    }
});
controller.store = store;
module.exports = controller.store;
