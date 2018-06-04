var BaseStore = require('./base/_store');
var data = require('../data/base/_data');


var controller = {

		getIdentity: (envId, id) => {
			store.loading();
			Promise.all([
				data.get(`${Project.api}environments/${envId}/identities/${id}/featurestates/?format=json`)

			])
				.then(([res]) => {
					const features = res.results;
					store.model = {features};
					store.model.features = features && _.keyBy(features, (f) => {
						return f.feature
					});
					store.loaded()
				})
		},
		toggleUserFlag: function ({identity, projectFlag, environmentFlag, identityFlag, environmentId}) {
			store.saving();
			var prom = identityFlag ?
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
		editUserFlag: function ({identity, projectFlag, environmentFlag, identityFlag, environmentId}) {
			store.saving();
			var prom = identityFlag.id ?
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
		}
	});


store.dispatcherIndex = Dispatcher.register(store, function (payload) {
	var action = payload.action; // this is our action from	handleViewAction
	const {
		identity, projectFlag, environmentFlag, identityFlag, environmentId
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
		case Actions.REMOVE_USER_FLAG:
			controller.removeUserFlag(identity, identityFlag, environmentId);
			break;
		default:
			return;
	}
})
controller.store = store;
module.exports = controller.store;
