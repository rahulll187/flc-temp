/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Person = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.fill}
      d="M 20.822 18.096 c -3.439 -0.794 -6.64 -1.49 -5.09 -4.418 c 4.72 -8.912 1.251 -13.678 -3.732 -13.678 c -5.082 0 -8.464 4.949 -3.732 13.678 c 1.597 2.945 -1.725 3.641 -5.09 4.418 c -3.073 0.71 -3.188 2.236 -3.178 4.904 l 0.004 1 h 23.99 l 0.004 -0.969 c 0.012 -2.688 -0.092 -4.222 -3.176 -4.935 Z"
    />
  </Svg>
);

Person.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Person);
