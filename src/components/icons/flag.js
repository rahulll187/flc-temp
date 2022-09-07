/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const FlagIcon = props => (

  <Svg {...props} viewBox="0 0 32 32">
    <Path
      fill={props.fill}
      d="M9 9.5v-6.5l14 6-13 5.571v14.429h-1v-19.5zM10 4.5v9l10.5-4.5-10.5-4.5z"
    />
  </Svg>

);

FlagIcon.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(FlagIcon);
