/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Bubble = props => (
  <Svg viewBox="0 0 41.619 48.276" {...props}>
    <Path fill={props.fill} d="M20.812,48.276l-6.69-7.765C5.663,37.643,0,29.761,0,20.81C0,9.335,9.335,0,20.81,0 s20.81,9.335,20.81,20.81c0,8.948-5.66,16.829-14.115,19.699L20.812,48.276z M20.81,2C10.438,2,2,10.438,2,20.81 c0,8.177,5.227,15.365,13.007,17.888l0.266,0.086l5.539,6.428l5.54-6.429l0.267-0.087c7.776-2.524,13.001-9.712,13.001-17.886 C39.619,10.438,31.182,2,20.81,2z" />
  </Svg>
);

Bubble.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Bubble);
