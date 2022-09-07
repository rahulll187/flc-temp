import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import Ripple from 'react-native-material-ripple';
import { PropTypes } from 'prop-types';
import { Colors } from '../../constants';

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 55
  },
  textView: {
    flex: 5
  },
  text: {
    fontSize: 12
  },
  iconView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  indicator: {
    backgroundColor: 'transparent',
    flex: 1,
    transform: [
      {
        scale: 0.8
      }
    ]
  }
});

class CustomButton extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.busy !== this.props.busy;
  }

  onPress() {
    requestAnimationFrame(() => {
      this.props.onPress();
    });
  }

  render() {
    return (
      <Ripple
        disabled={this.props.busy}
        onPress={this.onPress}
        rippleOpacity={0.6}
        animationTime={100}
        rippleColor={'#c6e6f4'}
        activeOpacity={1}
        style={[
          styles.button,
          this.props.styles,
          { backgroundColor: this.props.bgColor }
        ]}
      >
        <View style={styles.textView}>
          {!this.props.busy &&
            <Text
              style={[
                styles.text,
                { color: this.props.color, textAlign: this.props.textAlign }
              ]}
            >
              {this.props.title.toUpperCase()}
            </Text>}
          {this.props.busy &&
            <ActivityIndicator
              animating
              color={this.props.color}
              style={styles.indicator}
              size="large"
            />}
        </View>
        {this.props.children &&
          <View style={styles.iconView}>
            {this.props.children}
          </View>}
      </Ripple>
    );
  }
}

CustomButton.defaultProps = {
  color:Colors.white,
  bgColor: Colors.green,
  textAlign: 'left',
  styles: null,
  children: null,
  busy: false
};

CustomButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  textAlign: PropTypes.string,
  children: PropTypes.element,
  busy: PropTypes.bool
};

export default CustomButton;
