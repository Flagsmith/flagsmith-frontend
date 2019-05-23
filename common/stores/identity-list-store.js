const BaseStore = require('./base/_store');
const data = require('../data/base/_data');

const controller = {
    getIdentities: (envId) => {
        if (envId !== store.enviId) {
            store.loading();
            store.envId = envId;
            data.get(`${Project.api}environments/${envId}/identities/?format=json`)
                .then((res) => {
                    store.model = res && res.results;
                    store.loaded();
                });
        }
    },
    saveIdentity: (id, identity) => {
        store.saving();
        setTimeout(() => {
            const index = _.findIndex(store.model, { id });
            store.model[index] = identity;
            store.saved();
        }, 2000);
    },

};


var store = Object.assign({}, BaseStore, {
    id: 'identitylist',
    getIdentityForEditing(id) {
        return store.model && _.cloneDeep(_.find(store.model, { id })); // immutable
    },
});


store.dispatcherIndex = Dispatcher.register(store, (payload) => {
    const action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
        case Actions.GET_IDENTITIES:
            controller.getIdentities(action.envId);
            break;
        case Actions.SAVE_IDENTITY:
            controller.saveIdentity(action.id, action.identity);
            break;
        default:
    }
});
controller.store = store;
module.exports = controller.store;
