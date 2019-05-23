const BaseStore = require('./base/_store');

var controller = {

    get() {
        store.loading();
        bulletTrain.init({
            environmentID: Project.bulletTrain,
            onChange: controller.loaded,
        });
    },
    loaded(oldFlags) { // Occurs whenever flags are changed
        if (!oldFlags) {
            store.loaded();
        } else {
            store.changed();
        }
        store.model = bulletTrain.getAllFlags();
    },
};


var store = Object.assign({}, BaseStore, {
    id: 'config',
});


store.dispatcherIndex = Dispatcher.register(store, (payload) => {
    const action = payload.action; // this is our action from	handleViewAction

    switch (action.actionType) {
        case Actions.GET_CONFIG:
            controller.get();
            break;
    }
});

controller.store = store;
module.exports = controller.store;
