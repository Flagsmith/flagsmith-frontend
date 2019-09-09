const BaseStore = require('./base/_store');
const data = require('../data/base/_data');

const PAGE_SIZE = 999;

const controller = {
    getIdentities: (envId, page) => {
        store.loading();
        store.envId = envId;
        const endpoint = page || `${Project.api}environments/${envId}/identities/`;
        data.get(endpoint)
            .then((res) => {
                store.model = res && res.results;
                store.paging.next = res.next;
                store.paging.count = res.count;
                store.paging.previous = res.previous;
                store.paging.currentPage = endpoint.indexOf('?page=') !== -1 ? parseInt(endpoint.substr(endpoint.indexOf('?page=') + 6)) : 1;
                store.loaded();
            });
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


const store = Object.assign({}, BaseStore, {
    id: 'identitylist',
    paging: {
        pageSize: PAGE_SIZE,
    },
    getIdentityForEditing(id) {
        return store.model && _.cloneDeep(_.find(store.model, { id })); // immutable
    },
    getPaging() {
        return store.paging;
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
        case Actions.GET_IDENTITIES_PAGE:
            controller.getIdentities(action.envId, action.page);
            break;
        default:
    }
});
controller.store = store;
module.exports = controller.store;
