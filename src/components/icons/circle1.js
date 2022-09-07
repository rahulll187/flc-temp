/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const CircleDefault = props => (

  <Svg {...props} viewBox="0 0 32 32">
    <Path
      fill={props.fill}
      d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 28c-6.627 0-12-5.373-12-12s5.373-12 12-12c6.627 0 12 5.373 12 12s-5.373 12-12 12z"
    />
  </Svg>

);

CircleDefault.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(CircleDefault);
