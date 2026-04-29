import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setName } from './../../actions/profile';

class Options extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.name,
    };
    this.inputHanler = this.inputHanler.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  inputHanler({ target }) {
    this.setState({
      value: target.value
    });
  }
  onSubmit() {
    this.props.setName(this.state.value);
  }
  render() {
    return (
      <div>
        <h1 className="text-center">Options</h1>
        <input onChange={this.inputHanler} value={this.state.value}/>
        <button onClick={this.onSubmit}>Update</button>
      </div>
    );
  }
}

const mapDispatchToProps = (state) => ({
  name: state.profile.name,
});
export default connect(mapDispatchToProps, {
  setName
})(Options);