/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Location = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.fill}
      d="M12 2C8 2 5 5 5 9c0 5.3 7 13 7 13s7-7.8 7-13c0-4-3-7-7-7zm0 9.5c-1.4 0-2.5-1-2.5-2.5s1-2.5 2.5-2.5 2.5 1 2.5 2.5-1 2.5-2.5 2.5z"
    />
  </Svg>
);

Location.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Location);
