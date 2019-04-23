module.exports = function (context, onUnmount) {
  context._listeners = [];

  context.listenTo = function (store, event, callback) {
    this._listeners.push({
      store: store,
      event: event,
      callback: callback
    });
    store.on(event, callback);
    return this._listeners.length;
  };

  context.stopListening = function (index) {
    var listener = this._listeners[index];
    listener.store.off(listener.event, listener.callback);
  };

  context.setTimedState = function (path, val, cooldown) { //set a temporary state, useful for showing things for a set amount of time
    var original = this.state[path];
    var state = {};
    if (original !== val) {
      state[path] = val;
      this.setState(state);
      setTimeout(function () {
        state[path] = original;
        this.setState(state);
      }.bind(this), cooldown || 500);
    }
  };

  context.setPathState = function (path, e) {
    return _.partial(function () {
      var newState = {};
      newState[path] = Utils.safeParseEventValue(e);
      this.setState(newState);
    }.bind(this));
  };

  context.toggleState = function (path) {
    return _.partial(function () {
      var newState = {};
      newState[path] = !this.state[path];
      this.setState(newState);
    }.bind(this));
  };

  context.componentWillUnmount = function () {
    _.each(this._listeners, function (listener, index) {
      if (listener)
        this.stopListening(index);
    }.bind(this));
    if (onUnmount) {
      onUnmount();
    }
  };

};
