import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Animated,
  StyleSheet,
  View,
  Image,
  ViewPropTypes
} from 'react-native';

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  wrapper: {
    opacity: 0.2
  }
});

export default class AnimatedBar extends PureComponent {
  constructor(props) {
    super(props);
    this.style = {
      width: this.props.width,
      height: this.props.height
    };
    this.state = {
      expandAnim: new Animated.Value(this.props.width / -2)
    };
  }

  componentDidMount() {
    this.cycleAnimation();
  }

  cycleAnimation() {
    Animated.sequence([
      Animated.timing(this.state.expandAnim, {
        toValue: this.props.width,
        duration: this.props.duration
      }),
      Animated.timing(this.state.expandAnim, {
        toValue: this.props.width / -2,
        duration: 0
      }),
      Animated.timing(this.state.expandAnim, {
        toValue: this.props.width,
        duration: this.props.duration
      })
    ]).start(() => {
      this.cycleAnimation();
    });
  }

  render() {
    return (
      <View>
        <View
          style={{
            backgroundColor: this.props.backgroundColor,
            ...this.style,
            ...this.props.style
          }}
        />
        <Animated.View
          style={[
            styles.wrapper,
            styles.absolute,
            {
              transform: [{ translateX: this.state.expandAnim }],
              ...this.style,
              width: this.props.width / 2
            }
          ]}
        >
          <Image
            source={require('../../images/placeholder.png')}
            style={[
              { height: this.props.height, width: this.props.width / 2 },
              styles.absolute
            ]}
          />
        </Animated.View>
      </View>
    );
  }
}

AnimatedBar.propTypes = {
  duration: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number,
  backgroundColor: PropTypes.string.isRequired,
  style: ViewPropTypes.style
};

AnimatedBar.defaultProps = {
  width: 0,
  style: {}
};
