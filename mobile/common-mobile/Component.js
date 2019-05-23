module.exports = function (options) {
  return React.createClass(Object.assign({}, options, {
    _listeners: [],
    setTheme: function (theme) {
      window.theme = theme;

      this.forceUpdate();
    },
    listenTo: function (store, event, callback) {
      this._listeners.push({
        store: store,
        event: event,
        callback: callback
      });
      store.on(event, callback);
      return this._listeners.length;
    },

    stopListening: function (index) {
      var listener = this._listeners[index];
      listener.store.off(listener.event, listener.callback);
    },

    req: function (val) {
      return val ? 'validate valid' : 'validate invalid';
    },

    setPathState: function (path, e) {
      return _.partial(function () {
        var newState = {};
        newState[path] = Utils.safeParseEventValue(e);
        this.setState(newState);
      }.bind(this));
    },

    toggleState: function (path) {
      return _.partial(function () {
        var newState = {};
        newState[path] = !this.state[path];
        this.setState(newState);
      }.bind(this));
    },

    componentWillUnmount: function () {
      _.each(this._listeners, function (listener, index) {
        listener && this.stopListening(index);
      }.bind(this));
      return options.componentWillUnmount ? options.componentWillUnmount() : true;
    }
  }));
};
