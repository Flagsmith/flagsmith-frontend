var EventEmitter = require('events').EventEmitter;
var DEFAULT_CHANGE_EVENT = "change",
	DEFAULT_LOADING_EVENT = "loading",
	DEFAULT_LOADED_EVENT = "loaded",
	DEFAULT_SAVED_EVENT = "saved",
	DEFAULT_SAVING_EVENT = "saving",
	DEFAULT_ERROR_EVENT = "problem";

module.exports = Object.assign({}, EventEmitter.prototype, {
	_maxListeners: Number.MAX_VALUE,
	id: "",
	isLoading: false,
	hasLoaded: false,
	isSaving: false,
	subscriptions: {},

	trigger: function (eventName, data) {
		API.log(this.id, eventName || DEFAULT_CHANGE_EVENT, this);
		this.emit(eventName || DEFAULT_CHANGE_EVENT, data);
	},

	loading: function () {
		this.hasLoaded = false;
		this.isLoading = true;
		this.trigger(DEFAULT_CHANGE_EVENT);
		this.trigger(DEFAULT_LOADING_EVENT);
	},

	saving: function () {
		this.isSaving = true;
		this.trigger(DEFAULT_CHANGE_EVENT);
		this.trigger(DEFAULT_SAVING_EVENT);
	},

	loaded: function () {
		this.hasLoaded = true;
		this.isLoading = false;
		this.trigger(DEFAULT_LOADED_EVENT);
		this.trigger(DEFAULT_CHANGE_EVENT);
	},

	changed: function () {
		//console.log('change', this.id)
		this.trigger(DEFAULT_CHANGE_EVENT);
	},

	saved: function () {
		this.isSaving = false;
		this.trigger(DEFAULT_SAVED_EVENT);
		this.trigger(DEFAULT_CHANGE_EVENT);
	},

	goneABitWest: function () {
		this.hasLoaded = true;
		this.isLoading = false;
		this.isSaving = false;
		this.trigger(DEFAULT_CHANGE_EVENT);
		this.trigger(DEFAULT_ERROR_EVENT);
	},

	on: function (eventName, callback) {
		this.addListener(eventName || DEFAULT_CHANGE_EVENT, callback);
	},

	off: function (eventName, callback) {
		this.removeListener(eventName || DEFAULT_CHANGE_EVENT, callback);
	}

});
