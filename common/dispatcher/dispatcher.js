var ReactDispatcher = require('flux-react-dispatcher');
var Dispatcher = new ReactDispatcher();

module.exports = Object.assign(Dispatcher, {
	handleViewAction: function (action) {
		var that = this;

		var payload = {
			source: 'VIEW_ACTION',
			action: action
		};

		API.log(payload.action.actionType, payload.action);

		that.dispatch(payload);

	}

});
