import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import Input from './index';
import PencilIcon from '../icons/pencil';
import { required, email } from '../../validation';
import { Colors } from '../../constants';

const FeedBack = props => (
  <Field
    label="comments"
    style={props.style}
    name="custcomment"
    editable={props.editable}
    placeholder="Enter your feedback...."
    autoCapitalize="none"
    keyboardType="email-address"
    // validate={[required, email]}
    icon={<PencilIcon fill={Colors.appThemeColor} width={24} height={24} />}
    component={Input}
  />
);

FeedBack.propTypes = {
  editable: PropTypes.bool,
  style: PropTypes.any.isRequired
};

FeedBack.defaultProps = {
  editable: true
};
export default FeedBack;
