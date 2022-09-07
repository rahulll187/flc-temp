import React, { Component } from 'react'
import { Text, Keyboard, View, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import Moment from "moment"
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Colors } from '../../constants'
import CustomButton from '../../components/customButton'
import Pencil from '../icons/pencil'
import InputText from '../../components/input/inputText'
import CalendarIcon from '../../components/icons/calendar'
import { required } from '../../validation'

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
  InputTextContainer:{
    backgroundColor:'transparent'
  },
  custDetailContainer: {
    margin: 20,
    backgroundColor: Colors.white,
    borderRadius: 6,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
  },
  detailTitleStyle: {
    marginTop: 10,
    marginLeft: 25,
    color: Colors.appThemeColor
  },
  nameInput: {
    backgroundColor:'transparent',
    borderBottomWidth: 0.5,
    marginHorizontal: 2,
    borderBottomColor: Colors.borderColor
  },
  loginButtonContainer: {
    width: '60%',
    height: 44,
    borderRadius: 6,
    marginHorizontal: 60,
    marginBottom: 30
  },
  calendarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 44,
    width: '40%',
    marginTop: 20,
    marginLeft: 20,
    flexDirection: 'row',
    borderRadius: 6,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)'
  },
  selectedDateStyle: { 
    marginLeft: 5,
    marginTop: -4,
    textAlign: 'center' 
  },
  submitButtonContainer: { 
    justifyContent: 'center',
    alignItems: 'center' 
  }
});

class SalesReport extends Component {
  constructor(props) {
    super(props)

    const date = new Date()
    const currentDate = Moment(date).format("DD MMM YYYY")

    this.state = {
      selectedDate: currentDate
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.renderFreeTextUI = this.renderFreeTextUI.bind(this)
  }

  onSubmit(values) {

    let arryFields = []
    for (let i = 0; i < this.props.projectsState.salesReportResult.length; i++) {
      var obj1 = this.props.projectsState.salesReportResult[i]
      for (let j = 0; j < obj1.Details.length; j++) {
        var obj2 = obj1.Details[j]
        arryFields.push(obj2)
      }
    }

    let mainQuery = ''

    for (let i = 0; i < arryFields.length; i++) {
      if (i == arryFields.length - 1)
        mainQuery = mainQuery.concat(`${arryFields[i].TemplateId}$${values[arryFields[i].TemplateName.toLowerCase().replace(/\s/g, '')]}`)
      else
        mainQuery = mainQuery.concat(`${arryFields[i].TemplateId}$${values[arryFields[i].TemplateName.toLowerCase().replace(/\s/g, '')]},`)
    }

    const body = {
      SalesReportDetail: mainQuery
    }
    this.props.onSalesReportHandler(body)

     Keyboard.dismiss()
  }

  renderFreeTextUI() {
    if(this.props.projectsState.salesReportResult===undefined){
      console.log('no sales records!')
      return
    }
    return (<View>
      {this.props.projectsState.salesReportResult.map(salesData => (
        <View key={salesData.TypeId}>
          <Text style={styles.detailTitleStyle}>{salesData.ReportType.toUpperCase()}</Text>

          <View style={styles.custDetailContainer}>
            {salesData.Details.map(detailData => (
              <View  key={detailData.TemplateId}>

                <InputText
                  label={detailData.TemplateName}
                  name={detailData.TemplateName.toLowerCase().replace(/\s/g, '')}
                  keyboardType={'phone-pad'}
                  validate={[required]}
                  editable={true}
                  icon={<Pencil fill={Colors.appThemeColor} width={20} height={20} />}
                  style={styles.nameInput}
                />
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>)
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.main}>

          <KeyboardAwareScrollView
            extraHeight={200}
            keyboardShouldPersistTaps="handled"
            scrollEnabled={true}
            keyboardOpeningTime={0}
            resetScrollToCoords={{ x: 0, y: 0 }}
            style={styles.scrollView}>

            <View style={styles.calendarContainer}>
              <CalendarIcon fill={Colors.appThemeColor} width={30} height={30} />
              <Text style={styles.selectedDateStyle}>{this.state.selectedDate}</Text>
            </View>

            {this.renderFreeTextUI()}

            
              <View style={styles.submitButtonContainer}>
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

SalesReport.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};



const SalesReportRedux = reduxForm({
    form: 'salesReportForm'
   })(SalesReport);


const mapDispatchToProps = dispatch => ({
});
const mapStateToProps = state => ({
  projectsState: state.projects
});
export default connect(mapStateToProps, mapDispatchToProps)(SalesReportRedux);
