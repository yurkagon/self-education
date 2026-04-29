import React, { Component } from 'react';

import InfoContext from './context';

class HeaderContainer extends Component {
  render() {
    return (
      <Header />
    );
  }
}

class Header extends Component {
  render() {
    return (
      <InfoContext.Consumer >
        {({ info, add }) => 
          (<header className="App-header">
            <h1 className="App-title">{info}</h1>
            <button onClick={add}>ADD-header</button>
          </header>)
        }
      </InfoContext.Consumer>
    );
  }
}

export default HeaderContainer;
