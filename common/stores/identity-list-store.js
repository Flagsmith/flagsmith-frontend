var BaseStore = require('./base/_store');
var data = require('../data/base/_data');

var controller = {
		getIdentities: (envId) => {
			if (!store.model) {
				store.loading();

				data.get(`${Project.api}environments/${envId}/identities/?format=json`)
					.then((res) => {
						store.model = res && res.results;
						store.loaded()
					})
			}
		},
		saveIdentity: (id, identity) => {
			store.saving()
			setTimeout(() => {
				const index = _.findIndex(store.model, {id});
				store.model[index] = identity;
				store.saved();
			}, 2000);
		},

	},
	store = Object.assign({}, BaseStore, {
		id: 'identitylist',
		getIdentityForEditing: function (id) {
			return store.model && _.cloneDeep(_.find(store.model, {id})); // immutable
		}
	});


store.dispatcherIndex = Dispatcher.register(store, function (payload) {
	var action = payload.action; // this is our action from handleViewAction

	switch (action.actionType) {
		case Actions.GET_IDENTITIES:
			controller.getIdentities(action.envId);
			break;
		case Actions.SAVE_IDENTITY:
			controller.saveIdentity(action.id, action.identity);
			break;
		default:
			return;
	}
})
controller.store = store;
module.exports = controller.store;
