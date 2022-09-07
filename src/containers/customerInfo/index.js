import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Colors } from '../../constants'
import FirstName from '../../components/input/firstname'
import PhoneNumber from '../../components/input/phonenumber'
import EmailField from '../../components/input/email'
import FeedBack from '../../components/input/feedback'
import CustomButton from '../../components/customButton'
import Header from '../../components/header'
import { submitCustFeedback, customerFeedbackReset } from '../../reducers/custFeedback/actions'
import Notification from '../../components/notification'

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white
  },
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.white
  },
  headerTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 44,
    backgroundColor: Colors.appThemeColor
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.white
  },
  custDetailContainer: {
    margin: 20,
    borderRadius: 6,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    backgroundColor: 'transparent'
  },
  customerFeedbackContainer: {
    marginTop: 5,
    margin: 20,
    borderRadius: 6,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    backgroundColor: 'transparent'
  },
  detailTitleStyle: {
    marginTop: 10,
    marginLeft: 10,
    color: Colors.appThemeColor
  },
  nameInput: {
    marginTop: 4,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.borderColor
  },
  emailInput: {
    marginTop: 6,
    borderBottomWidth: 0,
  },
  custCommenInput: {
    height: 80,
    borderBottomWidth: 0,
  },
  loginButtonContainer: {
    width: '60%',
    height: 44,
    borderRadius: 3,
    marginHorizontal: 60,
  },
});

class CustomerInfo extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(values) {
    const requestBody = {
      PromoterEmailId: this.props.loginState.response.Email,
      StoreId: this.props.projectsState.currentProjects.ProjectList[0].StoreDetail.StoreId,
      emailid: values.email,
      name: values.firstname,
      MobileNo: values.phonenumber,
      comment: values.custcomment
    }
    this.props.submitCustFeedback(requestBody)
  }

  renderHeader() {
    return (<Header title={this.props.title} titleStyle={{ color: Colors.white }} arrowColor={Colors.white} background={Colors.appThemeColor} onBackPress={this.handleCancel} />);
  }

  removeNotification = () => {
  }

  removeFailureNotification = () => {
    this.props.customerFeedbackReset()
  }

  removeSuccessNotification = () => {
    this.props.customerFeedbackReset()
    Actions.pop()
  }


  renderErrroMessage() {
    if (this.props.custFeedback.error) {
      let errorMessage = this.props.custFeedback.error.message || this.props.custFeedback.error.ResponseStatus.Message

      return <Notification
        initialTop={0}
        duration={5000}
        success={false}
        message={errorMessage}
        handleRemove={this.removeFailureNotification}
      />
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.renderHeader()}

        <View style={styles.main}>

          {this.props.custFeedback.message &&
            <Notification
              initialTop={0}
              duration={5000}
              success={true}
              message={this.props.custFeedback.message}
              handleRemove={this.removeSuccessNotification}
            />
          }

          {this.renderErrroMessage()}

          {!this.props.appConfig.IsInternetConnected &&
            <Notification
              initialTop={0}
              duration={5000}
              success={false}
              message={'No Internet connection'}
              handleRemove={this.removeNotification}
            />
          }

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Capture customer details</Text>
          </View>

          <KeyboardAwareScrollView
            extraHeight={160}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}
            keyboardOpeningTime={0}
            resetScrollToCoords={{ x: 0, y: 0 }}
            style={styles.scrollView}>

            <View style={styles.custDetailContainer}>
              <Text style={styles.detailTitleStyle}>Customer Details</Text>
              <FirstName style={styles.nameInput} />
              <PhoneNumber style={styles.nameInput} />
              <EmailField style={styles.emailInput} />
            </View>

            <View style={styles.customerFeedbackContainer}>
              <Text style={styles.detailTitleStyle}>Customer Feedback</Text>
              <FeedBack style={styles.custCommenInput} />
            </View>

            <CustomButton
              busy={this.props.custFeedback.isLoading}
              title="SUBMIT"
              bgColor={Colors.appThemeColor}
              color={Colors.white}
              styles={styles.loginButtonContainer}
              onPress={this.props.handleSubmit(this.onSubmit)}
              textAlign="center"
            />

          </KeyboardAwareScrollView>

        </View>
      </View>
    );
  }
}

CustomerInfo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  customerFeedbackReset: PropTypes.func.isRequired,
  submitCustFeedback: PropTypes.func.isRequired
};

const CustomerInfoRedux = reduxForm({
  form: 'customerInfoForm'
})(CustomerInfo);

const mapDispatchToProps = dispatch => ({
  submitCustFeedback: (data) => dispatch(submitCustFeedback(data)),
  customerFeedbackReset: (data) => dispatch(customerFeedbackReset(data))
});

const mapStateToProps = state => ({
  custFeedback: state.custFeedback,
  projectsState: state.projects,
  loginState: state.login,
  appConfig: state.appConfig
});


export default connect(mapStateToProps, mapDispatchToProps)(CustomerInfoRedux);
