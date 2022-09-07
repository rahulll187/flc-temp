/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Pencil = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.fill}
      d="M 18.308 0 l -16.87 16.873 l -1.436 7.127 l 7.125 -1.437 l 16.872 -16.875 l -5.691 -5.688 Z m -15.751 21.444 l 0.723 -3.585 l 12.239 -12.241 l 2.861 2.862 l -12.239 12.241 l -3.584 0.723 Z m 17.237 -14.378 l -2.861 -2.862 l 1.377 -1.377 l 2.861 2.861 l -1.377 1.378 Z"
    />
  </Svg>
);

Pencil.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Pencil);
