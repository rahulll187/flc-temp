import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';

const AdjustingView = props => {
  if (Platform.OS === 'ios') {
    return (
      <KeyboardAvoidingView behavior="padding" {...props}>
        {props.children}
      </KeyboardAvoidingView>
    );
  }

  return (
    <View {...props}>
      {props.children}
    </View>
  );
};

AdjustingView.propTypes = {
  children: PropTypes.node.isRequired
};

export default AdjustingView;
