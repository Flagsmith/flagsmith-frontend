var BaseStore = require('./base/_store');


var controller = {

		getEnvironment: (id) => {
			if (!store.model) { //todo: change logic a bit
				store.loading()

				fetch(`${Project.api}environments/${id}/?format=json`, {
					headers: {
						'FFVERSIONKEY': id
					}
				}).then(res => res.json())
					.then((res) => {
						store.model = Object.assign(res, {
							id
						});
						store.loaded();
					});
			}
		},
		saveEnvironment: (env) => {
			store.saving();
			setTimeout(() => {
				store.model = env;
				store.saved();
			}, 2000);
		},
		updateSelection: function (data) {
			store.selection = data;
			store.trigger('change')
		}
	},
	store = Object.assign({}, BaseStore, {
		id: 'account',
		getFlagsForEditing: function () {
			return store.model && store.model.featurestates && store.model.featurestates.concat([]).map((e) => Object.assign({}, e));//immutable flags
		},
		getSelection: function () {
			return store.selection || {};
		}
	});


store.dispatcherIndex = Dispatcher.register(store, function (payload) {
	var action = payload.action; // this is our action from handleViewAction

	switch (action.actionType) {
		case Actions.GET_ENVIRONMENT:
			controller.getEnvironment(action.id, action.user);
			break;
		case Actions.SELECT_ENVIRONMENT:
			controller.updateSelection(action.data);
			break;
		default:
			return;
	}
})
controller.store = store;
module.exports = controller.store;
