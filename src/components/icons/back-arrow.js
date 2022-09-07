/* eslint-disable max-len */

import React, { Component } from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

class BackArrow extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <Svg viewBox="0 0 24 24" {...this.props}>
        <Path
          fill={this.props.fill}
          d="M20 11H7.83l5.6-5.6L12 4l-8 8 8 8 1.4-1.4L7.84 13H20v-2z"
        />
      </Svg>
    );
  }
}

BackArrow.propTypes = {
  fill: PropTypes.string.isRequired
};

BackArrow.defaultProps = {
  fill: '#000'
};

export default Icon(BackArrow);
