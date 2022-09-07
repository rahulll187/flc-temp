import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const ArrowRight = props => (
  <Svg {...props} viewBox="0 0 768 768">
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      fill={props.fill}
      d="M274.5 523.5l147-147-147-147 45-45 192 192-192 192z"
    />
  </Svg>
);

ArrowRight.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(ArrowRight);
