/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Send = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.fill}
      d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
    />
  </Svg>
);

Send.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Send);
