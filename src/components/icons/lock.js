/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Lock = props => (
  <Svg viewBox="0 0 24 24" {...props}>
    <Path
      fill={props.fill}
      d="M18.9,10.7h-1.1c0-1.7-0.2-4.5-1.8-6.3c-1-1.1-2.3-1.7-4-1.7c-1.6,0-2.9,0.6-3.9,1.6C6.5,6.1,6.2,9,6.2,10.7H5.1
      c-0.6,0-1.1,0.5-1.1,1.1v8C4,20.5,4.5,21,5.1,21h13.8c0.6,0,1.1-0.5,1.1-1.1v-8C20,11.2,19.5,10.7,18.9,10.7z M13.1,16.3l0.3,2.4
      h-2.9l0.4-2.4c-0.7-0.4-1.2-1.1-1.2-1.9c0-1.3,1-2.3,2.3-2.3c1.3,0,2.3,1,2.3,2.3C14.3,15.2,13.9,15.9,13.1,16.3z M15.5,10.7h-7
      c0-1.4,0.2-3.6,1.3-4.8c0.5-0.6,1.3-0.9,2.2-0.9c1,0,1.7,0.3,2.2,0.9C15.3,7.1,15.5,9.2,15.5,10.7z"
    />
  </Svg>
);

Lock.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Lock);
