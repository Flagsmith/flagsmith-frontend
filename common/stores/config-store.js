var bulletTrain = require("bullet-train-client"); //Add this line if you're using bulletTrain via npm
var BaseStore = require('./base/_store')

var controller = {

        get() {
            store.loading();
            bulletTrain.init({
                environmentID: Project.bulletTrain,
                onChange: controller.loaded
            });
        },
        loaded(oldFlags) { //Occurs whenever flags are changed
            if (!oldFlags) {
                store.loaded();
            }
            store.model = bulletTrain.getAllFlags();
        }
    },
    store = Object.assign({}, BaseStore, {
        id: 'config',
    });


store.dispatcherIndex = Dispatcher.register(store, function (payload) {
    var action = payload.action; // this is our action from	handleViewAction

    switch (action.actionType) {
        case Actions.GET_CONFIG:
            controller.get();
            break;
    }
})

controller.store = store;
module.exports = controller.store;
