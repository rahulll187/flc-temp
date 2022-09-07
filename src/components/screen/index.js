import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import { Colors } from '../../constants';
import Background from './background';

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  overlay: {
    position: 'absolute',
    width,
    height,
    left: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
});

const Screen = props => {
  const backgroundColor = props.backgroundColor ? { backgroundColor : props.backgroundColor } : null;
  return (
    <View style={[styles.screen , backgroundColor]}>
    {props.background && <Background title={props.title} />}
    {props.overlay && <View style={styles.overlay} />}
    {props.children}
  </View>);
}

Screen.defaultProps = {
  background: false,
  overlay: false,
  children: null
};

Screen.propTypes = {
  background: PropTypes.bool,
  overlay: PropTypes.bool,
  children: PropTypes.element,
  title: PropTypes.string.isRequired
};

export default Screen;
