import React, { Component } from 'react'
import { Text, Alert, Keyboard, View, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { Colors } from '../../constants'
import CustomButton from '../../components/customButton'
import Pencil from '../icons/pencil'
import CrossIcon from '../icons/cross'

import InputText from '../../components/input/inputText'
import { required } from '../../validation'

import UploadIcon from '../icons/upload'

const { width, height } = Dimensions.get('window')
const profilePictureSize = 90;

const { fs } = RNFetchBlob;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.white
  },
  InputTextContainer: {
    backgroundColor: 'transparent'
  },
  custDetailContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 5,
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
    backgroundColor: 'transparent',
    borderBottomWidth: 0.5,
    marginHorizontal: 2,
    borderBottomColor: Colors.borderColor
  },
  loginButtonContainer: {
    width: '60%',
    height: 44,
    borderRadius: 6,
    marginHorizontal: 60,
    marginBottom: 30,
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
    borderColor: 'rgba(18,18,18,0.14)',
  },
  UploadContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(18,18,18,0.14)',
    shadowOffset: {
      width: 1,
      height: 1.5
    }
  },
  profileContainer: {
    marginHorizontal: 5,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  profilePictureImage: {
    width: profilePictureSize,
    height: profilePictureSize,
    borderRadius: 10,
  },
});

class CompetitionReport extends Component {
  constructor(props) {
    super(props)

    this.state = {
      arrImages: []
    }
    this.selectPicture = this.selectPicture.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderFreeTextUI = this.renderFreeTextUI.bind(this)
    this.onDeleteImageHandler = this.onDeleteImageHandler.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.projectsState.message != nextProps.message) {
      this.setState({
        arrImages: []
      })
    }
  }
  onSubmit(values) {
    if (this.state.arrImages.length < 2) {
      Alert.alert('Report', 'Please upload maximum two pictures!', [
        { text: 'Ok' }
      ]);
      return
    }
    let arryFields = this.props.projectsState.competationResult
    let imagesArray = []

    for (let i = 0; i < this.state.arrImages.length; i++) {
      var obj1 = this.state.arrImages[i];
      imagesArray.push(obj1.base64Data)
    }


    let base64Data = imagesArray.join(",")

    let mainQuery = ''
    for (let i = 0; i < arryFields.length; i++) {
      if (i == arryFields.length - 1)
        mainQuery = mainQuery.concat(`${arryFields[i].TemplateId}$${values[arryFields[i].TemplateName.toLowerCase().replace(/\s/g, '')]}`)
      else
        mainQuery = mainQuery.concat(`${arryFields[i].TemplateId}$${values[arryFields[i].TemplateName.toLowerCase().replace(/\s/g, '')]},`)
    }

    const body = {
      competationReportDetail: mainQuery,
      base64Data: base64Data
    }
    this.props.onCompetationReportHandler(body)

    Keyboard.dismiss()
  }

  selectPicture() {

    const options = {
      title: 'Upload Media',
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
      mediaType: 'photo',
      allowsEditing: true,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        ImageResizer.createResizedImage(response.uri, width, height, 'JPEG', 80)
          .then(({ uri }) => {
            const filePath = uri.replace('file://', '')
            fs.readFile(filePath, 'base64').then((imagebase64Data) => {
              const source1 = {
                uri: response.uri,
                index: Math.floor((Math.random() * 100000) + 1),
                base64Data: imagebase64Data
              };

              this.setState({
                arrImages: [...this.state.arrImages, source1]
              })
            })
          })
          .catch(err => {
            console.log(err)
          });
      }
    });
  }

  onDeleteImageHandler(data) {
    var array = [...this.state.arrImages]
    var index = array.indexOf(data)

    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ arrImages: array })
    }
  }
  _renderItem(data) {
    return (<View style={{ marginTop: 10, marginHorizontal: 3, backgroundColor: 'transparent' }} key={data.item.uri}>
      <TouchableOpacity onPress={() => this.onDeleteImageHandler(data.item)}>
        <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
          <CrossIcon fill={Colors.appThemeColor} width={14} height={14} />
        </View>
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image style={styles.profilePictureImage}
          source={{ uri: data.item.uri }}
        />
      </View>
    </View>)
  }


  renderUploadMediaButton() {
    if (this.state.arrImages.length === 2) {
      console.log('Maximum two images allowed!')
      return
    }
    return (
      <TouchableOpacity onPress={this.selectPicture}>
        <View style={styles.UploadContainer}>
          <UploadIcon fill={Colors.appThemeColor} width={50} height={50} />
          <View style={{ backgroundColor: Colors.appThemeColor, width: '100%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: Colors.white }}> Upload Media </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderFreeTextUI() {
    if(this.props.projectsState.competationResult===undefined){
      console.log('no competition records!')
      return
    }
    return (<View>
      {this.props.projectsState.competationResult.map(reportData => (
        <View key={reportData.TemplateId}>
          <View style={styles.custDetailContainer}>
            <InputText
              label={reportData.TemplateName}
              name={reportData.TemplateName.toLowerCase().replace(/\s/g, '')}
              keyboardType={'default'}
              validate={[required]}
              editable={true}
              icon={<Pencil fill={Colors.appThemeColor} width={20} height={20} />}
              style={styles.nameInput}
            />
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

            {this.renderFreeTextUI()}

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              {this.renderUploadMediaButton()}
            </View>

            <ScrollView>
              <View style={{ marginHorizontal: 70, justifyContent: 'flex-start', alignItems: 'center', flexDirection: "row", backgroundColor: 'transparent' }}>

                <FlatList
                  horizontal={true}
                  data={this.state.arrImages}
                  keyExtractor={item => item.uri}
                  renderItem={this._renderItem}
                  removeClippedSubviews={false}
                  initialNumToRender={10}
                  maxToRenderPerBatch={10}
                  windowSize={21}

                />
              </View>
            </ScrollView>


              <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
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

CompetitionReport.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

const CompetitionReportRedux = reduxForm({
  form: 'competitionReportForm'
})(CompetitionReport);

const mapStateToProps = state => ({
  projectsState: state.projects
});

export default connect(mapStateToProps)(CompetitionReportRedux)
