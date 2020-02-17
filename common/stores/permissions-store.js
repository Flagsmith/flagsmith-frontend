const BaseStore = require('./base/_store');
const data = require('../data/base/_data');

const controller = {

    getPermissions: (id, level) => {
        console.log(id, level);
        if (store.model[level] && store.model[level][id]) {
            return;
        }
        store.loading();
        setTimeout(() => {
            const res = {
                'permissions': [
                    'READ',
                ],
                'admin': true,
            };
            store.model[level] = store.model[level] || {};
            store.model[level][id] = store.model[level][id] || {};
            _.map(res.permissions, (p) => {
                store.model[level][id][p] = true;
            });
            if (res.admin) {
                store.model[level][id].ADMIN = true;
            }
            store.changed();
        }, 200);
    },

    getAvailablePermissions: () => {
        if (store.model.availablePermissions.project) {
            return;
        }
        Promise.all(['project', 'environment'].map((v) => {
            store.model.availablePermissions[v] = [
                {
                    'key': 'READ',
                    'description': 'Read permission for the given project.',
                },
                {
                    'key': 'CREATE_ENVIRONMENT',
                    'description': 'Ability to create an environment in the given project.',
                },
                {
                    'key': 'DELETE_FEATURE',
                    'description': 'Ability to delete features in the given project.',
                },
                {
                    'key': 'CREATE_FEATURE',
                    'description': 'Ability to create features in the given project.',
                },
            ];
            return Promise.resolve();
        })).then(() => {
            store.changed();
        });
    },

};


var store = Object.assign({}, BaseStore, {
    id: 'permissions',
    model: {
        availablePermissions: {

        },
    },
    getPermissions(id, level) {
        return store.model[level] && (store.model[level].ADMIN || store.model[level][id]);
    },
    getPermission(id, level, permission) {
        const perms = store.getPermissions(id, level);
        return perms && perms[permission];
    },
    getAvailablePermissions(id, level) {
        return store.model.availablePermissions[level];
    },
});


store.dispatcherIndex = Dispatcher.register(store, (payload) => {
    const action = payload.action; // this is our action from handleViewAction

    switch (action.actionType) {
        case Actions.GET_PERMISSIONS:
            controller.getPermissions(action.id, action.level);
            break;
        case Actions.GET_AVAILABLE_PERMISSIONS:
            controller.getAvailablePermissions(action.level);
            break;
        default:
    }
});
controller.store = store;
controller.getAvailablePermissions();
module.exports = controller.store;
