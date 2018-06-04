var BaseStore = require('./base/_store'),
  api = require('../data/config');

var controller = {
    get() {
      store.loading();
      api.get()
        .then(controller.loaded);
    },
    loaded(res) {
      store.model = res;
      store.loaded();
    }
  },
  store = Object.assign({}, BaseStore, {
    id: 'config',
    dispatcherIndex: Dispatcher.register(this, function (payload) {
      var action = payload.action; // this is our action from handleViewAction

      switch (action.actionType) {
        case Actions.GET_CONFIG:
          controller.get();
          break;
        default:
          return;
      }
    })
  });

controller.store = store;
module.exports = controller.store;
