import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import CallIcon from '../icons/call';
import { required, onlyNumber } from '../../validation';
import { Colors } from '../../constants';

const PhoneNumber = props => (
  <Field
    label="phone number"
    style={props.style}
    name="phonenumber"
    editable={props.editable}
    placeholder="+971XXXXXXXXX"
    autoCapitalize="none"
    keyboardType="phone-pad"
    validate={[required,onlyNumber]}
    icon={<CallIcon fill={Colors.appThemeColor} width={24} height={24} />}
    component={Input}
  />
);

PhoneNumber.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.any.isRequired
};

PhoneNumber.defaultProps = {
  editable: true
};
export default PhoneNumber;
