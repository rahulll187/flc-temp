import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import Pencil from '../icons/pencil';

const TestInput = props => (
  <Field
    label={props.label}
    style={props.style}
    name={props.name}
    editable={props.editable}
    placeholder={props.placeholder}
    autoCapitalize="none"
    keyboardType= {props.keyboardType}
    icon={props.icon}
    component={Input}
  />
);

TestInput.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.any.isRequired
};

TestInput.defaultProps = {
  editable: true
};

export default TestInput;
