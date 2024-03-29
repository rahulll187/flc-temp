/* eslint-disable max-len */

import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Icon from './hoc';

const Project = props => (
  <Svg viewBox="0 0 32 32" {...props}>
    <Path
      fill={props.fill}
      d="M19.5 3h0.5l6 7v18.009c0 1.093-0.894 1.991-1.997 1.991h-15.005c-1.107 0-1.997-0.899-1.997-2.007v-22.985c0-1.109 0.897-2.007 2.003-2.007h10.497zM19 4h-10.004c-0.55 0-0.996 0.455-0.996 0.995v23.009c0 0.55 0.455 0.995 1 0.995h15c0.552 0 1-0.445 1-0.993v-17.007h-4.002c-1.103 0-1.998-0.887-1.998-2.006v-4.994zM20 4.5v4.491c0 0.557 0.451 1.009 0.997 1.009h3.703l-4.7-5.5zM10 10v1h5v-1h-5zM10 7v1h7v-1h-7zM10 13v1h13v-1h-13zM10 16v1h10v-1h-10zM10 19v1h13v-1h-13zM10 22v1h9v-1h-9zM10 25v1h13v-1h-13z"
    />
  </Svg>
);

Project.propTypes = {
  fill: PropTypes.string.isRequired
};

export default Icon(Project);
