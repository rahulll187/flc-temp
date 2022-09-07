import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native'
import { Colors } from '../../constants'
import { Actions } from 'react-native-router-flux'
import UploadIcon from '../icons/upload'
import ImageResizer from 'react-native-image-resizer'
import ImagePicker from 'react-native-image-picker'
import RNFetchBlob from 'rn-fetch-blob'

const { width, height } = Dimensions.get('window')

const { fs } = RNFetchBlob

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Colors.white,
    display: 'flex',
    flex: 1
  },
  UploadContainer: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(18,18,18,0.14)',
    shadowOffset: {
      width: 1,
      height: 1.5
    },
    shadowRadius: 13,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    backgroundColor: Colors.white,
    width: 100,
    height: 100
  },
  mediaImages: {
    width: width / 3 - 28,
    height: 90,
    borderRadius: 10
  }
});

class Media extends Component {

  constructor(props) {
    super(props)

    this.state = {
      albumImages: this.props.albumImages,
    }
    this.selectPicture = this.selectPicture.bind(this)
    this.onImageHandler = this.onImageHandler.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.albumImages.length != nextProps.albumImages.length) {
      this.setState({
        albumImages: nextProps.albumImages,
      })
      return true
    }
    return Actions.currentScene === 'ProjectDetails' || Actions.currentScene === 'GallaryAlbum'
  }

  onImageHandler(imageData) {
    Actions.GallaryAlbum({
      arrImages: this.state.albumImages,
      selectedIndex: imageData.Index,
      userRole: this.props.loginState.response.userRole,
      userCheckedIn: true
    })
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
    };

    ImagePicker.showImagePicker(options, (response) => {
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
              this.props.onUploadMediaFile(imagebase64Data)
            })
          })
          .catch(err => {
            console.log(err)
          });
      }
    });
  }
  
  renderUploadMediaButton() {
      return (
        <TouchableOpacity onPress={this.selectPicture}>
          <View style={styles.UploadContainer}>
            <UploadIcon fill={Colors.appThemeColor} width={50} height={50} />
            <View style={{ top: 10, backgroundColor: Colors.appThemeColor, width: '100%', height: 30, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: Colors.white }}> Upload Media </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
  }
  
  render() {
    return (
      <View style={styles.mainContainer}>

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {this.renderUploadMediaButton()}
        </View>


        {this.state.albumImages.length === 0 &&
          <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 20 }}>No record found</Text>
          </View>
          || <View style={{ marginTop: 20, marginBottom: 10, borderWidth: 1, borderColor: 'rgba(18,18,18,0.14)', justifyContent: 'flex-start', flex: 1, marginHorizontal: 10, backgroundColor: 'transparent' }}>
            <ScrollView>

              <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row', backgroundColor: 'transparent' }}>

                {this.state.albumImages.map(data => (
                  <TouchableOpacity onPress={() => { this.onImageHandler(data) }} key={data.Id}>
                    <View style={{ marginTop: 8, marginBottom: 10, marginHorizontal: 10, backgroundColor: 'transparent' }}>
                      <Image style={styles.mediaImages}
                        source={{ uri: data.FilePath }} />
                    </View>
                  </TouchableOpacity>
                ))
                }
              </View>
            </ScrollView>

          </View>
        }
      </View>
    );
  }
}

export default Media
