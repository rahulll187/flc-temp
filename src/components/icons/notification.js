/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const NotificationIcon = props => (

  <Svg {...props} viewBox="0 0 24 24">
    <Path
      fill={props.fill}
      d="M 22.656 6.383 c -0.216 -0.817 0.023 -1.696 0.627 -2.298 l 0.003 -0.003 c 0.475 -0.474 0.714 -1.095 0.714 -1.712 c 0 -1.305 -1.051 -2.37 -2.37 -2.37 c -0.618 0 -1.239 0.238 -1.714 0.712 l -0.002 0.003 c -0.604 0.604 -1.48 0.844 -2.299 0.626 c -5.93 -1.57 -11.011 7.819 -16.211 5.179 l -1.404 1.406 l 16.073 16.074 l 1.405 -1.406 c -2.64 -5.198 6.751 -10.28 5.178 -16.211 Z m -0.154 -4.887 c 0.444 0.443 0.444 1.165 0 1.608 c -0.443 0.443 -1.163 0.442 -1.606 -0.001 s -0.444 -1.164 0 -1.606 c 0.443 -0.444 1.164 -0.444 1.606 -0.001 Z m -11.731 20.504 c -0.646 0.646 -1.535 1 -2.422 1 c -0.874 0 -1.746 -0.346 -2.376 -0.976 c -1.27 -1.27 -1.308 -3.563 -0.024 -4.846 l 4.822 4.822 Z"
    />
  </Svg>

);

NotificationIcon.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(NotificationIcon);
