import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet } from 'react-native';
import Info from '../icons/info';

const styles = StyleSheet.create({
  errorWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  error: {
    //...Fonts.bold,
    minHeight: 24,
    marginLeft: 3,
    fontSize: 10,
    marginTop: 10,
    color: '#da364a'
  }
});

const ErrorMessage = props =>
  (<View style={[styles.errorWrapper, props.style]}>
    <Info fill="#da364a" width={24} height={24} />
    <Text style={styles.error}>
      {props.message.toUpperCase()}
    </Text>
  </View>);

ErrorMessage.defaultProps = {
  message: '',
  style: null
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
  style: PropTypes.any
};

export default ErrorMessage;
