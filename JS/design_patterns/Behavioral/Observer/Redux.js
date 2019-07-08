class Store {
  constructor(reducer, initialState = {}) {
    this.state = initialState;
    this.reducer = reducer;

    this.subscriptions = {};
    this.state = this.reduce();

    this.dispatch = this.dispatch.bind(this);
    this.subscribe = this.subscribe.bind(this);
    this.getState = this.getState.bind(this);
  }

  subscribe(key, callback) {
    this.subscriptions[key] = callback;
  }

  getState() {
    return this.state;
  }

  reduce(action) {
    return this.reducer(this.state, action);
  }

  dispatch(action) {
    if (typeof action === 'object') {
      const oldState = this.state;
      const newState = this.reduce(action);

      this.state = newState;
      Object.keys(this.subscriptions).forEach(el => (
        this.subscriptions[el](newState, oldState, action))
      );
    } else if (typeof action === 'function') {
      action(this.dispatch, this.getState);
    }
  }
}
