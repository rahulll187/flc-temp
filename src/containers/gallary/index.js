import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/header'
import { Colors } from '../../constants'
import Gallery from 'react-native-image-gallery'
import { Actions } from 'react-native-router-flux'
import Delete from '../../components/icons/delete'
import { DeleteMediaFiles, resetProjectsData } from '../../reducers/projects/actions'
import Notification from '../../components/notification'

class GallaryAlbum extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIndex: this.props.selectedIndex,
      albumImage: []
    }
    this.removeFailureNotification = this.removeFailureNotification.bind(this)
    this.removeSuccessNotification = this.removeSuccessNotification.bind(this)
    this.onDeleteImageHandler = this.onDeleteImageHandler.bind(this)

    for (let i = 0; i < this.props.arrImages.length; i++) {
      this.state.albumImage.push({
        key: String(i),
        source: {
          uri: this.props.arrImages[i].FilePath
        }
      })
    }
  }

  shouldComponentUpdate(nextProps) {
    return Actions.currentScene === 'GallaryAlbum'
  }

  onDeleteImageHandler() {
    const requestBody = {
      mediaID: this.props.arrImages[this.state.selectedIndex].Id
    }
    this.props.DeleteMediaFiles(requestBody)
  }
  onPageSelected = (item) => {
    this.setState({
      selectedIndex: item
    })
  }

  removeFailureNotification() {
    this.props.resetProjectsData()
  }

  removeSuccessNotification() {
    this.props.resetProjectsData()
    Actions.pop()
  }

  removeNotification = () => {
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

  renderHeader() {
    if (this.props.userCheckedIn) {
      return (
        <Header titleStyle={{ color: Colors.white }}
          busy={this.props.projectsState.isLoading}
          background={Colors.appThemeColor}
          title={this.props.title}
          arrowColor={Colors.white}
          onActionPress={this.onDeleteImageHandler}
          actionButton={<Delete fill={Colors.white} width="24" height="24" />}
        />
      )
    } else {
      return (
        <Header titleStyle={{ color: Colors.white }}
          background={Colors.appThemeColor}
          title={this.props.title}
          arrowColor={Colors.white}
        />
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}

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

        {!this.props.appConfig.IsInternetConnected &&
          <Notification
            initialTop={0}
            duration={5000}
            success={false}
            message={'No Internet connection'}
            handleRemove={this.removeNotification}
          />
        }


        <Gallery style={{ flex: 1, backgroundColor: 'black' }}
          initialPage={this.props.selectedIndex}
          images={this.state.albumImage}
          onPageSelected={this.onPageSelected}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex'
  }
});

const mapDispatchToProps = dispatch => ({
  DeleteMediaFiles: (data) => dispatch(DeleteMediaFiles(data)),
  resetProjectsData: () => dispatch(resetProjectsData())
});

const mapStateToProps = state => ({
  loginState: state.login,
  projectsState: state.projects,
  appConfig: state.appConfig
});

export default connect(mapStateToProps, mapDispatchToProps)(GallaryAlbum)
