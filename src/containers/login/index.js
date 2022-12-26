import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from "react-native";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Geolocation from "@react-native-community/geolocation";
import Geolocation from 'react-native-geolocation-service';
import { reduxForm } from "redux-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "../../components/customButton";
import EmailField from "../../components/input/email";
import PasswordField from "../../components/input/password";
import Notification from "../../components/notification";
import { Colors } from "../../constants";
import { userLogin, resetLoginData } from "../../reducers/login/actions";

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    display: "flex",
    backgroundColor: Colors.white,
  },
  scrollView: {
    flex: 1,
  },
  mainContainer: {
    backgroundColor: "transparent",
    overflow: "hidden",
    padding: 27,
    marginTop: 150,
  },
  emailInput: {
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderColor,
  },
  promoInput: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderColor,
  },
  forgotPasswortText: {
    color: "#A0A0A0",
    textAlign: "right",
  },
  loginButtonContainer: {
    marginTop: 40,
    width: "60%",
    height: 44,
    borderRadius: 3,
    marginHorizontal: 60,
  },
  logoStyle: {
    top: 100,
    left: 40,
  },
});

class Login extends Component {
  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.removeSuccessNotification = this.removeSuccessNotification.bind(this);
    this.removeFailureNotification = this.removeFailureNotification.bind(this);
  }

  componentDidMount = () => {
    this.requestCameraPermission();
  };

  removeFailureNotification() {
    this.props.resetLoginData();
  }

  removeSuccessNotification() {
    this.props.resetLoginData();
    if (this.props.loginState.isLogin) Actions.ProjectDashBoard();
  }

  navigateForgotPassword = () => {
    Actions.ForgotPassword();
  };
  onSubmit(values) {
    Geolocation.getCurrentPosition((position) => {
      console.log("Location1:", position);
    });

    const obj = {
      ...values,
    };
    this.props.userLogin(obj);
  }

  requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Location Permission",
          message:
            "App wants to access your location" +
            "so you can access the features.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        this.requestLocationPermission();
      } else {
        console.log("Camera permission denied");
        this.requestLocationPermission();
      }
    } catch (err) {
      this.requestLocationPermission();
      console.warn(err);
    }
  };

  requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Permission",
          message:
            "App wants to access your location" +
            "so you can access the features.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  renderErrorMessage() {
    if (this.props.loginState.error) {
      let errorMessage =
        this.props.loginState.error.message ||
        this.props.loginState.error.ResponseStatus.Message;

      return (
        <Notification
          initialTop={0}
          duration={5000}
          success={false}
          message={errorMessage}
          handleRemove={this.removeFailureNotification}
        />
      );
    }
  }

  removeNotification = () => {};

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../../images-flc/logo_login.png")}
          style={styles.logoStyle}
        />

        {this.props.loginState.message && (
          <Notification
            initialTop={0}
            duration={5000}
            success={true}
            message={this.props.loginState.message}
            handleRemove={this.removeSuccessNotification}
          />
        )}

        {this.renderErrorMessage()}

        <KeyboardAwareScrollView
          extraHeight={100}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          keyboardOpeningTime={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          style={styles.scrollView}
        >
          {!this.props.appConfig.IsInternetConnected && (
            <Notification
              initialTop={0}
              duration={5000}
              success={false}
              message={"No Internet connection"}
              handleRemove={this.removeNotification}
            />
          )}

          <View style={styles.mainContainer}>
            <EmailField style={styles.emailInput} />
            <PasswordField style={styles.promoInput} validate={true} />

            <TouchableOpacity onPress={this.navigateForgotPassword}>
              <Text style={styles.forgotPasswortText}>Forgot Password?</Text>
            </TouchableOpacity>

            <CustomButton
              busy={this.props.loginState.isLoading}
              title="LOGIN"
              bgColor={Colors.appThemeColor}
              color={Colors.white}
              styles={styles.loginButtonContainer}
              onPress={this.props.handleSubmit(this.onSubmit)}
              textAlign="center"
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
  resetLoginData: PropTypes.func.isRequired,
};

const LoginRedux = reduxForm({
  form: "loginForm",
})(Login);

const mapDispatchToProps = (dispatch) => ({
  userLogin: (data) => dispatch(userLogin(data)),
  resetLoginData: () => dispatch(resetLoginData()),
});

const mapStateToProps = (state) => ({
  loginState: state.login,
  appConfig: state.appConfig,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginRedux);
