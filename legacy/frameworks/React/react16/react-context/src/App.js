import React, { Component } from 'react';
import Header from './Header';
import './App.css';

import InfoContext from './context';

class App extends Component {
  state = {
    info: 'aaa'
  }
  handleButton = () =>
   this.setState( ({ info }) => ({ info: info + 1 }) );

  render() {
    const { info } = this.state;
    return (
      <InfoContext.Provider value={{ info, add: this.handleButton}}>
        <div className="App">
          <Header />
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </div>
        <button onClick={this.handleButton}>ADD</button>
      </InfoContext.Provider> 
    );
  }
}

export default App;
