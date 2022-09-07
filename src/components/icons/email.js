/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Email = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.fill}
      d="M2.4,4.8c0.4-0.9,1.2-1.5,2.3-1.5h14.7c1,0,1.9,0.6,2.3,1.5l-9.2,6.5c0,0-0.2,0.1-0.4,0.1c-0.1,0-0.4-0.1-0.4-0.1L2.4,4.8z
      M13.9,13.3c-0.1,0.1-0.8,0.6-1.8,0.6c-0.9,0-1.7-0.5-1.8-0.6l-8-5.6v9.1c0,1.3,1.1,2.5,2.5,2.5h14.7c1.3,0,2.5-1.1,2.5-2.5V7.7
     L13.9,13.3z"
    />
  </Svg>
);

Email.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Email);
