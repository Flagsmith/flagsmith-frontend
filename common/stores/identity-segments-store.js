const BaseStore = require('./base/_store');
const data = require('../data/base/_data');


const controller = {
    getIdentitySegments: (projectId, id) => {
        store.loading();
        return data.get(`${Project.api}projects/${projectId}/segments/?identity=${id}`)
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
            controller.getIdentitySegments(action.projectId, action.id);
            break;
        default:
    }
});
controller.store = store;
module.exports = controller.store;
