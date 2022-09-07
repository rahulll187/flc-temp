import React from "react";
import PropTypes from "prop-types";
import { Field } from "redux-form";
import Input from "./index";
import Lock from "../icons/lock";
import { required, password } from "../../validation";
import { Colors } from "../../constants";

const PasswordField = (props) => {
  console.log("props enter--", props);
  return (
    <Field
      name="password"
      masked
      label="Password"
      style={props.style}
      // validate={props.validate ? [required, password] : [required]}
      placeholder="••••••"
      icon={<Lock fill={Colors.appThemeColor} width={24} height={24} />}
      component={Input}
    />
  );
};

PasswordField.propTypes = {
  style: PropTypes.any.isRequired,
  validate: PropTypes.bool,
};

PasswordField.defaultProps = {
  style: null,
  validate: true,
};

export default PasswordField;
