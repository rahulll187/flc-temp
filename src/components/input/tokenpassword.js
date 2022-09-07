import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import Lock from '../icons/lock';
import { required, password } from '../../validation';
import { Colors } from '../../constants';

const TokenPassword = props => (
  <Field
    name="tokenpassword"
    masked
    label="Token password"
    style={props.style}
    //validate={props.validate ? [required, password] : [required]}
    placeholder="••••••"
    icon={<Lock fill={Colors.appThemeColor} width={24} height={24} />}
    component={Input}
  />
);

TokenPassword.propTypes = {
  style: PropTypes.any.isRequired,
  validate: PropTypes.bool
};

TokenPassword.defaultProps = {
  style: null,
  validate: true
};

export default TokenPassword;
