import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator, TextStylePropTypes , Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import BackArrow from '../icons/back-arrow';
import {  Colors } from '../../constants';


const { width , height }  = Dimensions.get('window');
const isIphoneX = height == 812;

const styles = StyleSheet.create({
  header: {
    height: 71,
    // shadowColor: 'rgba(0, 0, 0, 0.09)',
    // shadowOffset: {
    //   width: 0.5,
    //   height: 0.5
    // },
    shadowRadius: 0,
  //  shadowOpacity: 1,
    //borderBottomWidth: 1,
    borderColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    zIndex: 3,
    justifyContent: 'space-between'
  },
  absolutePos: {
    position:"absolute",
    width
  },
  text: {
    // ...Fonts.bold,
    textAlign: 'center',
    fontSize: 14,
    color: '#191919'
  },
  actionButton: {
    // ...Fonts.bold,
    textAlign: 'center',
    fontSize: 12,
    color: Colors.green
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    marginLeft:30
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 40,
    width: 40,
    marginLeft: -4
  },
  actionButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 40,
    width: 70
  },
  indicator: {
    backgroundColor: 'transparent',
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 36,
    height: 36,
    marginRight: -8,
    transform: [
      {
        scale: 0.8
      }
    ]
  }
});

const Header = (props) => {
  const transparent = props.background === 'transparent';
  const arrowColor = props.arrowColor ? props.arrowColor : '#000';
   const topMargin = props.topMargin ? 60 : 0;

  const propsStyle = {
    backgroundColor: props.background,
    shadowOpacity:  ((props.noShadow || transparent) ?  0 : 1),
    borderBottomWidth: ((props.noShadow || transparent) ? 0 : 1),
    marginTop:topMargin
  };

  if(props.lessHeight && !isIphoneX)
  {
    propsStyle.height = 40;
  }

  let actionButton = null;
  if (props.busy) {
    actionButton = (
      <ActivityIndicator animating color={Colors.white} style={styles.indicator} size="large" />
    );
  } else if (props.actionButtonTitle && props.actionButtonTitle.trim()) {
    actionButton = (
      <TouchableOpacity onPress={props.onActionPress}>
        <View>
          <Text style={styles.actionButton}>
            {props.actionButtonTitle.toUpperCase()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  } else if (props.actionButton) {
    actionButton = (
      <TouchableOpacity onPress={props.onActionPress}>
        {props.actionButton}
      </TouchableOpacity>
    );
  }

  const title = (props.title || '').trim();
  const headerStyles =[styles.header, propsStyle];

  if(props.absolute)
  {
      headerStyles.push(styles.absolutePos);
  }
  return (
    <View style={headerStyles}>
      <TouchableOpacity onPress={props.onBackPress}>
        <View style={styles.backButton}>
          <BackArrow width={24} height={24} fill={arrowColor} />
        </View>
      </TouchableOpacity>
      <View style={styles.textContainer}>
        {title.length > 0 && (
          <Text style={[styles.text, props.titleStyle]}>{title}</Text>
        )}
        {props.children}
      </View>
      <View style={styles.actionButtonWrapper}>
        {actionButton}
      </View>
    </View>
  );
};

Header.propTypes = {
  arrowColor: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  titleStyle: PropTypes.oneOfType([
    PropTypes.shape(TextStylePropTypes),
    PropTypes.number
  ]),
  actionButton: PropTypes.element,
  actionButtonTitle: PropTypes.string,
  onActionPress: PropTypes.func,
  onBackPress: PropTypes.func,
  busy: PropTypes.bool,
  background: PropTypes.string
};

Header.defaultProps = {
  title: null,
  children: null,
  titleStyle: {},
  arrowColor: '#000',
  busy: false,
  actionButton: null,
  actionButtonTitle: null,
  background: Colors.white,
  onActionPress: null,
  onBackPress: () => {
    Actions.pop();
   }
};

export default Header;
