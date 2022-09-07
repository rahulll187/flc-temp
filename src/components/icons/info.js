/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Info = props => (
  <Svg {...props} viewBox="0 0 24 24">
    <Path
      fill={props.fill}
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
    />
  </Svg>
);

Info.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Info);
