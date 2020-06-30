const BaseStore = require('./base/_store');

const controller = {
    get(projectId) {
        store.loading();
        setTimeout(() => {
            store.model[projectId] = [
                {
                    id: 1,
                    label: 'Frontend',
                    colour: Constants.tagColours[0],
                },
                {
                    id: 2,
                    label: 'Backend',
                    colour: Constants.tagColours[1],
                },
            ];
            store.loaded();
        }, 2000);
    },
    update(projectId, data, onComplete) {
        store.saving();
        const index = _.findIndex(store.model[projectId], { id: data.id });
        if (index !== -1) {
            store.model[projectId][index] = data;
        }
        onComplete && onComplete(data);
        store.saved();
    },
    create(projectId, data, onComplete) {
        store.saving();
        store.model[projectId].push({
            ...data,
            id: Utils.GUID(),
        });
        onComplete && onComplete(store.model[projectId][store.model[projectId].length - 1]);
        store.saved();
    },
};


const store = Object.assign({}, BaseStore, {
    id: 'tags',
    model: {},
    getTags: projectId => store.model[projectId],
});


store.dispatcherIndex = Dispatcher.register(store, (payload) => {
    const action = payload.action; // this is our action from	handleViewAction

    switch (action.actionType) {
        case Actions.GET_TAGS:
            controller.get(action.projectId);
            break;
        case Actions.UPDATE_TAG:
            controller.update(action.projectId, action.data, action.onComplete);
            break;
        case Actions.CREATE_TAG:
            controller.create(action.projectId, action.data, action.onComplete);
            break;
        default:
            break;
    }
});

controller.store = store;
module.exports = controller.store;
