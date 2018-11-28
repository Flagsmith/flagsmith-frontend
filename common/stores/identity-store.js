var BaseStore = require('./base/_store');
var data = require('../data/base/_data');


var controller = {

		getIdentity: (envId, id) => {
			store.loading();
			data.get(`${Project.api}identities/${id}/`, null, { 'x-environment-key': envId })
				.then((res) => {
					const features = res.flags;
					const traits = res.traits;
					store.model = {features, traits};
					store.model.features = features && _.keyBy(features, (f) => {
						return f.feature.id
					});
					store.loaded()
				})
		},
		toggleUserFlag: function ({identity, projectFlag, environmentFlag, identityFlag, environmentId}) {
			store.saving();
            API.trackEvent(Constants.events.TOGGLE_USER_FEATURE);
            var prom = identityFlag.identity ?
				data.put(`${Project.api}environments/${environmentId}/identities/${identity}/featurestates/${identityFlag.id}/?format=json`, Object.assign({}, {
					id: identityFlag.id,
					enabled: !identityFlag.enabled,
					value: identityFlag.value
				})) :
				data.post(`${Project.api}environments/${environmentId}/identities/${identity}/featurestates/?format=json`, {
					feature: projectFlag.id,
					enabled: !environmentFlag.enabled,
					value: environmentFlag.value
				})

			prom.then((res) => {
				store.model.features[res.feature] = res;
				store.saved();
			})

		},
        editTrait: function({identity, environmentId, trait:{trait_key,trait_value}}) {
		    store.saving();
            data.post(`${Project.api}identities/${identity}/traits/${trait_key}`, {trait_value}, { 'x-environment-key': environmentId })
                .then(()=>{
                    store.saved();
                    controller.getIdentity(environmentId,identity)
                })
                .catch((e) => API.ajaxHandler(store, e))

        },
		editUserFlag: function ({identity, projectFlag, environmentFlag, identityFlag, environmentId}) {
			store.saving();
            API.trackEvent(Constants.events.EDIT_USER_FEATURE);
            var prom = identityFlag.identity ?
				data.put(`${Project.api}environments/${environmentId}/identities/${identity}/featurestates/${identityFlag.id}/?format=json`, Object.assign({}, {
					id: identityFlag.id,
					enabled: identityFlag.enabled,
                    feature_state_value: identityFlag.feature_state_value
				})) :
				data.post(`${Project.api}environments/${environmentId}/identities/${identity}/featurestates/?format=json`, {
					feature: projectFlag.id,
					enabled: environmentFlag.enabled,
                    feature_state_value: identityFlag.feature_state_value
				});

			prom.then((res) => {
				store.model.features[res.feature] = res;
				store.saved();
			})
		},
		removeUserFlag: function (identity, identityFlag, environmentId) {
			store.saving();
            API.trackEvent(Constants.events.REMOVE_USER_FEATURE);
            data.delete(`${Project.api}environments/${environmentId}/identities/${identity}/featurestates/${identityFlag.id}/?format=json`)
				.then(() => {
					delete store.model.features[identityFlag.feature];
					store.saved();
				})
		}
	},
	store = Object.assign({}, BaseStore, {
		id: 'identity',
		getIdentityForEditing: function (id) {
			return store.model && _.cloneDeep(store.model); // immutable
		},
		getIdentityFlags: function () {
			return store.model && store.model.features
		},
		getTraits: function () {
			return store.model && store.model.traits
		}
	});


store.dispatcherIndex = Dispatcher.register(store, function (payload) {
	var action = payload.action; // this is our action from	handleViewAction
	const {
		identity, projectFlag, environmentFlag, identityFlag, environmentId, trait
	} = action;
	switch (action.actionType) {
		case Actions.GET_IDENTITY:
			controller.getIdentity(action.envId, action.id);
			break;
		case Actions.SAVE_IDENTITY:
			controller.saveIdentity(action.id, action.identity);
			break;
		case Actions.TOGGLE_USER_FLAG:

			controller.toggleUserFlag({identity, projectFlag, environmentFlag, identityFlag, environmentId});
			break;
		case Actions.EDIT_USER_FLAG:
			controller.editUserFlag({identity, projectFlag, environmentFlag, identityFlag, environmentId});
			break;
		case Actions.EDIT_TRAIT:
			controller.editTrait({identity, environmentId, trait});
			break;
		case Actions.REMOVE_USER_FLAG:
			controller.removeUserFlag(identity, identityFlag, environmentId);
			break;
		default:
			return;
	}
})
controller.store = store;
module.exports = controller.store;
