import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import Email from '../icons/email';
import { required, email } from '../../validation';
import { Colors } from '../../constants';

const EmailField = props => (
  <Field
    label="Email"
    style={props.style}
    name="email"
    editable={props.editable}
    placeholder="email@domain.com"
    autoCapitalize="none"
    keyboardType="email-address"
    validate={[required, email]}
    icon={<Email fill={Colors.appThemeColor} width={24} height={24} />}
    component={Input}
  />
);

EmailField.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.any.isRequired
};

EmailField.defaultProps = {
  editable: true
};
export default EmailField;
