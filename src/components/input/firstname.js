import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import PersonIcon from '../icons/person';
import { required, email } from '../../validation';
import { Colors } from '../../constants';

const FirstName = props => (
  <Field
    label="name"
    style={props.style}
    name="firstname"
    editable={props.editable}
    placeholder="Enter first name"
    autoCapitalize="none"
    keyboardType="email-address"
    validate={[required]}
    icon={<PersonIcon fill={Colors.appThemeColor} width={24} height={24} />}
    component={Input}
  />
);

FirstName.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.any.isRequired
};

FirstName.defaultProps = {
  editable: true
};
export default FirstName;
