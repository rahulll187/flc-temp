import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import Email from '../icons/email';
import { required, email } from '../../validation';

const InputText = props => (
  <Field
    label = {props.label}
    style = {props.style}
    name = {props.name}
    editable = {props.editable}
    placeholder = {props.placeholder}
    autoCapitalize = "none"
    keyboardType = {props.keyboardType}
    validate={props.validate}
    icon = {props.icon}
    component={Input}
  />
);

InputText.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.any.isRequired
};

InputText.defaultProps = {
  editable: true
};
export default InputText;
