
import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Notification from '../../components/notification'
import CustomButton from '../../components/customButton'
import EmailField from '../../components/input/email'
import Header from '../../components/header'
import { Colors } from '../../constants'

import { forgotPassword, resetForgotPasswordData } from '../../reducers/forgotpassword/actions'

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.white
  },
  scrollView: {
    flex: 1
  },
  mainContainer: {
    backgroundColor: 'transparent',
    overflow: 'hidden',
    padding: 27,
    marginTop: 50
  },
  emailInput: {
    marginTop: 10,
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
    top: 50,
    fontSize: 16,
    backgroundColor: 'transparent',
    color: '#A0A0A0',
    textAlign: 'center'
  }
});

class ForgotPassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      EmailId: undefined
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.removeSuccessNotification = this.removeSuccessNotification.bind(this)
    this.removeFailureNotification = this.removeFailureNotification.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return Actions.currentScene === 'ForgotPassword'
  }

  removeFailureNotification() {
    this.props.resetForgotPasswordData()
  }

  removeSuccessNotification() {
    this.props.resetForgotPasswordData()
    Actions.ResetNewPassword({
      EmailId: this.state.EmailId
    });
  }

  onSubmit(values) {
    const obj = {
      ...values,
    }
    this.setState({
      EmailId: values.email
    })
    this.props.forgotPassword(obj)
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
        <Header title={this.props.title} background="transparent" onBackPress={this.handleCancel} />

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

        <Image source={require('../../images/logo_login.png')} style={styles.logoStyle} />
        <Text style={styles.enterEmailStyle}>Please enter your email address</Text>

        <KeyboardAwareScrollView
          extraHeight={10}
          keyboardShouldPersistTaps="handled"
          scrollEnabled={false}
          keyboardOpeningTime={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          style={styles.scrollView}>

          <View style={styles.mainContainer}>
            <EmailField style={styles.emailInput} />

            <CustomButton
              busy={this.props.forgotPasswordState.isLoading}
              title="SUBMIT"
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


ForgotPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  forgotPassword: PropTypes.func.isRequired
};

const ForgotPasswordRedux = reduxForm({
  form: 'forgotPaaswordForm'
})(ForgotPassword);

const mapDispatchToProps = dispatch => ({
  forgotPassword: (data) => dispatch(forgotPassword(data)),
  resetForgotPasswordData: () => dispatch(resetForgotPasswordData())
});

const mapStateToProps = state => ({
  forgotPasswordState: state.forgotpassword,
  appConfig: state.appConfig
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordRedux);
