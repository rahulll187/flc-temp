/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const DeleteIcon = props => (

  <Svg {...props} viewBox="0 0 24 24">
    <Path
      fill={props.fill}
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </Svg>

);

DeleteIcon.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(DeleteIcon);
