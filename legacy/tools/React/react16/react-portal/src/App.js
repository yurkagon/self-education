import React, { Component } from 'react';
import './App.css';

import Portal from './Portal';

class App extends Component {
  state = {
    isOpen: false,
    count: 0,
  };
  componentDidMount() {
    this.interval = setInterval(() => this.setState(({ count }) => ({ count: count + 1})), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  buttonHandler = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }) );
  };
  render() {
    const { isOpen, count } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.buttonHandler}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        {isOpen &&
          <Portal
            onClose={() => this.setState({isOpen: false})}
          >
            <h1>{count}</h1>
          </Portal>
        }
      </div>
    );
  }
}

export default App;
