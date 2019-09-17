const BaseStore = require('./base/_store');
const data = require('../data/base/_data');


const controller = {
    getIdentitySegments: (envId, id) => {
        store.loading();
        return data.get(`${Project.api}segments/?identity=${id}`, null, { 'x-environment-key': envId })
            .then((segments) => {
                store.model = segments;
                store.loaded();
            })
            .catch(e => API.ajaxHandler(store, e));
    },
};


const store = Object.assign({}, BaseStore, {
    id: 'identity-segments',
});

store.dispatcherIndex = Dispatcher.register(store, (payload) => {
    const action = payload.action; // this is our action from	handleViewAction
    switch (action.actionType) {
        case Actions.GET_IDENTITY_SEGMENTS:
            controller.getIdentitySegments(action.envId, action.id);
            break;
        default:
    }
});
controller.store = store;
module.exports = controller.store;
