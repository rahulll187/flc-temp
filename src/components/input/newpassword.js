import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import Lock from '../icons/lock';
import { required, password } from '../../validation';
import { Colors } from '../../constants';

const NewPassword = props => (
  <Field
    name="newpassword"
    masked
    label="New Password"
    style={props.style}
    //validate={props.validate ? [required, password] : [required]}
    placeholder="••••••"
    icon={<Lock fill={Colors.appThemeColor} width={24} height={24} />}
    component={Input}
  />
);

NewPassword.propTypes = {
  style: PropTypes.any.isRequired,
  validate: PropTypes.bool
};

NewPassword.defaultProps = {
  style: null,
  validate: true
};

export default NewPassword;
