import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchData } from './../../actions/main';

class MainPage extends Component {
  renderData() {
    return this.props.data.map(el => (
      <div className="el">
        <p>{el.name}</p>
        <p>{el.email}</p>
        <hr/>
      </div>
    ));
  }
  render() {
    return (
      <div>
        <h1 className="text-center">Main page</h1>
        <div className="d-flex justify-content-center">
          <button onClick={() => this.props.fetchData()}>Load</button>
        </div>
        <div className="content">
          {this.renderData()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.main.data,
});
export default connect(mapStateToProps, {
  fetchData,
})(MainPage);
