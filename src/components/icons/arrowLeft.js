import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const ArrowLeft = props => (
  <Svg {...props} viewBox="0 0 24 24">
    <Path d="M0 0h24v24H0z" fill="none" />
    <Path
      fill={props.fill}
      d="M15.422 16.078l-1.406 1.406-6-6 6-6 1.406 1.406-4.594 4.594z"
    />
  </Svg>
);

ArrowLeft.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(ArrowLeft);
