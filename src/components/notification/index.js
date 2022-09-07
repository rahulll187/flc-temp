import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {
  Text,
  Animated,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions
} from 'react-native'
import { deviceDetails, isCrashReportEnabled , Colors } from '../../constants'
import { Actions } from 'react-native-router-flux'
import { Sentry ,SentrySeverity } from 'react-native-sentry'


const { width ,height} = Dimensions.get('window')

const styles = StyleSheet.create({
  notification: {
    opacity: 0.95,
    width,
    zIndex: 2,
    position: 'absolute',
    shadowColor: 'rgba(0, 0, 0, 0.09)',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center',
    width: width - 40,
    color: Colors.white
  }
});

class Notification extends PureComponent {
  constructor(props) {
    super(props)
    this.onRemove = this.onRemove.bind(this)
    this.state = {
      appear: new Animated.Value(0)
    };
  }

  componentDidMount() {
    Animated.timing(this.state.appear, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true
    }).start();
    this.timeout = setTimeout(() => {
      this.onRemove();
    }, this.props.duration);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.timeout = null;
  }

  onRemove() {
    Animated.timing(this.state.appear, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true
    }).start(() => {
      if (this.props.handleRemove) {
        this.props.handleRemove();
      }
    });
  }

  render() {


    if(!this.props.success && isCrashReportEnabled) {
      Sentry.captureMessage(this.props.message, {
          level: SentrySeverity.Warning
      });

      let screenName = Actions.currentScene;
      Sentry.setExtraContext({
          "appVersion": deviceDetails.appVersion,
          "ScreenName": screenName
        });
      }
    const headerHeight = Platform.OS === 'ios' ? height : 71;

    const top = this.props.withHeader && Platform.OS === 'ios' ? 20 : 0;
    const zIndex = this.props.withHeader ? 2 : 99;
    const appearFrom = this.props.withHeader ? 0 : -1 * headerHeight - 20;
    const appearTo = this.props.withHeader ? (Platform.OS === 'ios' ? 51 : headerHeight) : 0;
    return (
      <TouchableWithoutFeedback onPress={this.onRemove}>
        <Animated.View
          style={[
            styles.notification,
            {
              backgroundColor: this.props.success ? Colors.green : Colors.black,
              top,
              zIndex
            },
            {
              transform: [
                {
                  translateY: this.state.appear.interpolate({
                    inputRange: [0, 1],
                    outputRange: [appearFrom, appearTo]
                  })
                }
              ]
            }
          ]}
        >
          <Text style={styles.text}>
            {this.props.message}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}

Notification.defaultProps = {
  success: false,
  duration: 4000,
  handleRemove: undefined,
  withHeader: false
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  success: PropTypes.bool,
  withHeader: PropTypes.bool,
  duration: PropTypes.number,
  handleRemove: PropTypes.func
};

export default Notification;
