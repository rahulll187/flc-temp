import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import { Colors } from '../../constants'
import CustomButton from '../customButton'
import DeleteIcon from '../icons/delete'
import Moment from 'moment'
import InputText from '../../components/input/inputText'
import { required } from '../../validation'
import Pencil from '../icons/pencil'
import { reduxForm } from 'redux-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    flex: 1
  },
  listView: {
    top: 30,
    flexGrow: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  cellContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginBottom: 30
  },
  loginButtonContainer: {
    marginTop: 10,
    width: '60%',
    height: 44,
    borderRadius: 8,
    marginHorizontal: 60
  },
  bottomContainer: {
    marginTop: 20,
    backgroundColor: 'transparent'
  },
  InputContainer: {
    marginTop: 10,
    width: width,
    shadowColor: 'rgba(18,18,18,0.14)',
    shadowOffset: {
      width: 1,
      height: 1.5
    },
    shadowRadius: 13,
    borderWidth: 0.5,
    borderColor: 'rgba(18,18,18,0.14)',
    backgroundColor: Colors.white
  },
  nameInput: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: -40,
    marginTop: -20,
    backgroundColor: 'transparent'
  },
  promoterIssuesStyle: { 
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: 'center',
    backgroundColor: 'transparent',
    marginHorizontal: 2,
    borderBottomWidth: 1,
    borderBottomColor: '#B0B0B0' 
  },
  issueHeaderStyle: { 
    marginTop: 10,
    marginLeft: 20,
    color: '#7E7E7E' 
  },
  saveButtonStyle: { 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  noRecordFoundStyle: { 
    marginHorizontal: 10,
    marginTop: 50,
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  deleteIconStyle: { 
    marginLeft: 5,
    backgroundColor: 'transparent' 
  }
});

class PromotersIssues extends Component {

  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
    this.onSaveHandler = this.onSaveHandler.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onMessageSend = this.onMessageSend.bind(this)
    this.renderListItem = this.renderListItem.bind(this)
  }

  onChangeText(message) {
    this.setState({
      message: message
    })
  }

  onMessageSend() {
  }

  onSaveHandler(values) {
      this.props.onInsertIssueHandler(values.IssuesComments)
      this.setState({
        message: ''
      })

      const { reset } = this.props
      reset()
  }

  deleteIssuse = (data) => {
      this.props.onDeleteIssueHandler(data.Id)
  }

  renderListItem(projects) {
    const { Comments, Id, CreatedDateTime } = projects.item

    var time24hours1 = Moment(CreatedDateTime, "MM/DD/YYYY hh:mm:ss A");
    let start_date1 = time24hours1.format('MMM DD, YYYY hh:mm A')

    return (
      <View style={styles.cellContainer} key={Comments}>

        <View style={styles.promoterIssuesStyle} key={Comments}>

          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <Text style={{ marginBottom: 10, color: '#7E7E7E' }}>{start_date1}</Text>
            <Text style={{ marginBottom: 10, color: '#4A4A4A' }}>{Comments}</Text>
          </View>

          
            <TouchableOpacity onPress={() => { this.deleteIssuse(projects.item) }}>
              <View style={styles.deleteIconStyle}>
                <DeleteIcon fill={Colors.appThemeColor} width={24} height={24} />
              </View>
            </TouchableOpacity>
          
        </View>
      </View>
    );
  }


  render() {
    return (
      <View style={styles.mainContainer}>

        <KeyboardAwareScrollView
          extraHeight={160}
          scrollEnabled={true}
          keyboardOpeningTime={0}
          resetScrollToCoords={{ x: 0, y: 0 }}
          style={styles.scrollView}>

         

            <View style={styles.bottomContainer}>
              <Text style={styles.issueHeaderStyle}>Issues / Comments</Text>
              <View style={styles.InputContainer}>
                <InputText
                  label={''}
                  name={'IssuesComments'}
                  keyboardType={'default'}
                  validate={[required]}
                  editable={true}
                  icon={<Pencil fill={'transparent'} width={20} height={20} />}
                  style={styles.nameInput}
                />
              </View>
            </View>
          

          
            <View style={styles.saveButtonStyle}>
              <CustomButton
                busy={this.props.isLoading}
                title="SAVE"
                bgColor={Colors.appThemeColor}
                color={Colors.white}
                styles={styles.loginButtonContainer}
                onPress={this.props.handleSubmit(this.onSaveHandler)}
                textAlign="center"
              />
            </View>
          


          {this.props.arrPromotersIssues.length == 0 &&
            <View style={styles.noRecordFoundStyle}>
              <Text style={{ fontSize: 20 }}>No record found</Text>
            </View>
          }
          <FlatList
            data={this.props.arrPromotersIssues}
            keyExtractor={item => item.CreatedDateTime}
            renderItem={this.renderListItem}
            style={styles.listView}
            removeClippedSubviews={false}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={21}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const PromotersIssuesRedux = reduxForm({
  form: 'PromotersIssuesForrm',
  destroyOnUnmount: true,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true
})(PromotersIssues);

PromotersIssues.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default PromotersIssuesRedux
