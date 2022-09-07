/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const ArrowHead = props => (
  <Svg viewBox="0 0 5.6 9" {...props}>
    <Path fill={props.fill} d="M0,7.9l3.4-3.4L0,1.1L1.1,0l4.5,4.5L1.1,9L0,7.9z" />
  </Svg>
);

ArrowHead.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(ArrowHead);
