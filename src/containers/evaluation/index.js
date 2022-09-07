import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Header from '../../components/header'
import RatingCell from '../../components/rating'
import { Colors } from '../../constants'
import CustomButton from '../../components/customButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import InputText from '../../components/input/inputText'
import Email from '../../components/icons/email'
import { GetEvaluation, InsertEvaluation, resetProjectsData } from '../../reducers/projects/actions'
import Notification from '../../components/notification'

const styles = StyleSheet.create({
  main: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.white,
    display: 'flex',
  },
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.white,
    position: 'relative',
  },
  container1: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  ratingCantainer: {
    borderWidth: 0.5,
    borderColor: 'red',
    borderRadius: 35,
    marginHorizontal: 20,
    marginBottom: 40,
  },
  ratingHeaderContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginHorizontal: 30,
    marginBottom: 15,
  },
  ratingHeaderContent: {
    fontSize: 16
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
  scrollViewStyle: {
    marginTop: 30,
  },
  scrollView: {
    flex: 1
  },
  loginButtonContainer: {
    marginTop: 20,
    width: '60%',
    height: 44,
    borderRadius: 3,
    marginHorizontal: 60,
  },
  commentText: {
    marginHorizontal: 30,
    fontSize: 16
  },
  InputContainer: {
    top: 5,
    marginHorizontal: 20,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  emailInput: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: -30,
    marginTop: -20,
    backgroundColor: 'transparent'
  },
  contentContainer: {
    marginTop: 25,
  }
});

class Evaluation extends Component {
  constructor(props) {
    super(props)

    this.state = {
      comments: '',
      arryRatingData: [],
    };

    this.onSubmit = this.onSubmit.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.ratingHandler = this.ratingHandler.bind(this)
    this.removeSuccessNotification = this.removeSuccessNotification.bind(this)
    this.removeFailureNotification = this.removeFailureNotification.bind(this)
  }


  componentWillMount() {
    const param = {
      PromoterEmailId: this.props.PromoterEmailId
    }
    this.props.GetEvaluation(param)
  }

  onSubmit(values) {
    let mainQuery = ''
    var index = 0;

    for (let i = 0; i < this.state.arryRatingData.length; i++) {
      if (i == this.state.arryRatingData.length - 1)
        mainQuery = mainQuery.concat(`${this.state.arryRatingData[i].TypeId}$${this.state.arryRatingData[i].ratingValue}`)
      else
        mainQuery = mainQuery.concat(`${this.state.arryRatingData[i].TypeId}$${this.state.arryRatingData[i].ratingValue},`)

        if(this.state.arryRatingData[i].ratingValue > 0){
          index=index+1
        }
    }

    if(index === this.props.projectsState.evaulationResults.length){
      const param = {
        Comments: values.EVALUATE_COMMENTS,
        EvaluationDetail: mainQuery,
        PromoterEmailId: this.props.PromoterEmailId
      }
      
      this.props.InsertEvaluation(param)
      }else{
        Alert.alert('', 'Please select rating', [
          { text: 'Ok' }
        ]);
      }
  }

  onChangeText(message) {
    this.setState({
      comments: message
    });
  }

  ratingHandler(data) {
    const index = this.state.arryRatingData.findIndex((e) => e.TypeId === data.TypeId)

    if (index === -1) {
      this.state.arryRatingData.push(data)
    } else {
      this.state.arryRatingData[index] = data
    }
  }

  removeSuccessNotification() {
    this.props.resetProjectsData()
    Actions.pop()
  }

  removeFailureNotification() {
    this.props.resetProjectsData()
  }

  renderErrorMessage() {
    if (this.props.projectsState.error) {
      let errorMessage = this.props.projectsState.error.message || this.props.projectsState.error.ResponseStatus.Message
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

  renderRatingCell() {
    return (
      <View>
        {this.props.projectsState.evaulationResults.map(data => (
          <View style={{ backgroundColor: 'transparent' }} key={data.TypeId}>
            <RatingCell evaulationData={data} ratingHandler={this.ratingHandler} initialStarCount={0} />
          </View>
        ))
        }
      </View>
    )
  }

  removeNotification = () => {
  }

  render() {
    return (
      <View style={styles.main}>

        <Header title={this.props.title} titleStyle={{ color: Colors.white }} arrowColor={Colors.white} background={Colors.appThemeColor} onBackPress={this.handleCancel} />

        <View style={styles.container1}>

          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Evaluate your event / promoters</Text>
          </View>

          {this.props.projectsState.message &&
            <Notification
              initialTop={0}
              duration={5000}
              success={true}
              message={this.props.projectsState.message}
              handleRemove={this.removeSuccessNotification}
            />
          }

          {this.renderErrorMessage()}

          <KeyboardAwareScrollView
            style={styles.scrollView}
            extraHeight={160}
            keyboardOpeningTime={0}
            resetScrollToCoords={{ x: 0, y: 0 }}
          >
            <View style={styles.contentContainer}>

              {this.renderRatingCell()}

              {!this.props.appConfig.IsInternetConnected &&
                <Notification
                  initialTop={0}
                  duration={5000}
                  success={false}
                  message={'No Internet connection'}
                  handleRemove={this.removeNotification}
                />
              }

              <Text style={styles.commentText}>Comments</Text>

              <View style={styles.InputContainer}>
                <InputText
                  label={''}
                  name={'EVALUATE_COMMENTS'}
                  keyboardType={'default'}
                  icon={<Email fill="transparent" width={1} height={1} />}
                  style={styles.emailInput}
                />
              </View>

              <CustomButton
                busy={this.props.projectsState.isLoading}
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
      </View>
    );
  }
}

Evaluation.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  InsertEvaluation: PropTypes.func.isRequired,
  GetEvaluation: PropTypes.func.isRequired,
  resetProjectsData: PropTypes.func.isRequired
};

const EvaluationRedux = reduxForm({
  form: 'evaluationForm'
})(Evaluation);

const mapStateToProps = state => ({
  projectsState: state.projects,
  appConfig: state.appConfig
});

const mapDispatchToProps = dispatch => ({
  InsertEvaluation: (data) => dispatch(InsertEvaluation(data)),
  GetEvaluation: (data) => dispatch(GetEvaluation(data)),
  resetProjectsData: (data) => dispatch(resetProjectsData(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationRedux);
