/* eslint-disable max-len */
import React, { Component } from 'react';

const Icon = WrappedComponent => class extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return <WrappedComponent {...this.props} />;
  }
};

export default Icon;
