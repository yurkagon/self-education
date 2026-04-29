import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

import store from './store';

const setData = data => ({
  type: 'setData',
  data,
});

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">{this.props.data}</h1>
        </header>
        <p className="App-intro">
          <button onClick={() => store.dispatch({
            type: 'setData',
            data: 'Data is seted by calling dispatch method from global store',
          })}>Global store</button>
          <button onClick={() => this.props.dispatch({
            type: 'setData',
            data: 'Data is seted by calling dispatch method from component props',
          })}>Dispatch as props</button>
          <button onClick={() => this.props.dispatch2({
            type: 'setData',
            data: 'Data is seted by calling dispatch method as conected method',
          })}>Dispatch as conected action</button>
          <button onClick={() => this.props.setData('Data is seted by real action')}>Real action</button>
        </p>
      </div>
    );
  }
}

export default connect(state => ({
  data: state.data,
}),{
  dispatch2: store.dispatch,
  setData,
})(App);
