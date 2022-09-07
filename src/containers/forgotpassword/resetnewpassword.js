
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Notification from '../../components/notification'
import CustomButton from '../../components/customButton'
import ReTypePassword from '../../components/input/retypepassword'
import NewPassword from '../../components/input/newpassword'
import TokenPassword from '../../components/input/tokenpassword'
import Header from '../../components/header'
import { resetPassword, resetForgotPasswordData } from '../../reducers/forgotpassword/actions'
import { Colors } from '../../constants'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.white
  },
  scrollView: {
    flex: 1
  },
  mainContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    padding: 17
  },
  emailInput: {
    marginTop: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderColor
  },
  loginButtonContainer: {
    marginTop: 30,
    width: '60%',
    height: 44,
    borderRadius: 3,
    marginHorizontal: 60
  },
  logoStyle: {
    left: 40
  },
  enterEmailStyle: {
    top: 20,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#A0A0A0',
    textAlign: 'center',
    padding: 10
  }
});

class ResetNewPassword extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.removeSuccessNotification = this.removeSuccessNotification.bind(this)
    this.removeFailureNotification = this.removeFailureNotification.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return Actions.currentScene === 'ResetNewPassword'
  }

  removeFailureNotification() {
    this.props.resetForgotPasswordData()
  }

  removeSuccessNotification() {
    this.props.resetForgotPasswordData()

    Actions.reset('Login', { title: 'Login' })
  }

  onSubmit(values) {
    const obj = {
      ...values,
      EmailId: this.props.EmailId
    }

    if (values.newpassword != values.retypepassword) {
      Alert.alert('Mismatch Password', 'Please enter correct password!', [
        { text: 'Ok' }
      ]);
      return
    }
    this.props.resetPassword(obj)
  }

  renderErrorMessage() {
    if (this.props.forgotPasswordState.error) {
      let errorMessage = this.props.forgotPasswordState.error.message || this.props.forgotPasswordState.error.ResponseStatus.Message

      return (
        <Notification
          initialTop={0}
          duration={5000}
          success={false}
          message={errorMessage}
          handleRemove={this.removeFailureNotification}
        />
      )
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Header background="transparent" onBackPress={this.handleCancel} />

        {this.props.forgotPasswordState.message &&
          <Notification
            initialTop={0}
            duration={5000}
            success={true}
            message={this.props.forgotPasswordState.message}
            handleRemove={this.removeSuccessNotification}
          />
        }

        {this.renderErrorMessage()}

        {!this.props.appConfig.IsInternetConnected &&
          <Notification
            initialTop={0}
            duration={5000}
            success={false}
            message={'No Internet connection'}
            handleRemove={this.removeNotification}
          />
        }



        <KeyboardAwareScrollView
          extraHeight={160}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          keyboardOpeningTime={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          style={styles.scrollView}>

        <Image source={require('../../images/logo_login.png')} style={styles.logoStyle} />
        <Text style={styles.enterEmailStyle}>Passwords must contain at least 6 characters and should be unique to you.</Text>
        
          <View style={styles.mainContainer}>
            <NewPassword style={styles.emailInput} />
            <ReTypePassword style={styles.emailInput} />
            <TokenPassword style={styles.emailInput} />

            <CustomButton
              busy={this.props.forgotPasswordState.isLoading}
              title="SAVE"
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


ResetNewPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const ForgotPasswordRedux = reduxForm({
  form: 'resetPaaswordForm'
})(ResetNewPassword);

const mapDispatchToProps = dispatch => ({
  resetPassword: (data) => dispatch(resetPassword(data)),
  resetForgotPasswordData: () => dispatch(resetForgotPasswordData())
});
const mapStateToProps = state => ({
  forgotPasswordState: state.forgotpassword,
  appConfig: state.appConfig
});


export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordRedux);
