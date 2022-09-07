import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, Image, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../../constants'
import Header from '../../components/header'
import logoutAndPurge from './../../utils/logoutAndPurge'
import { userLogout, resetLoginData } from '../../reducers/login/actions'
import { connect } from 'react-redux'
import Notification from '../../components/notification'
import Logout from '../../components/icons/logout'

const profilePictureSize = 150

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: Colors.white
  },
  headerTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 44,
    backgroundColor: Colors.appThemeColor
  },
  headerStyles:{ 
    color: '#4A4A4A',
    top: 10
  },
  headerTitle: {
    fontSize: 18,
    color: Colors.white
  },
  profileContainer: {
    width: '100%',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  profilePictureImage: {
    borderRadius: 10,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    width: profilePictureSize,
    height: profilePictureSize
  },
  userDetailStyle: { 
    color: '#4A4A4A', 
    marginTop: 5 
  },
  detailContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    marginHorizontal: 20,
    marginVertical: 20,
  }
});

class MyProfile extends Component {
  constructor(props) {
    super(props)

    this.removeSuccessNotification = this.removeSuccessNotification.bind(this)
    this.removeFailureNotification = this.removeFailureNotification.bind(this)
    this.onSignOutHandler = this.onSignOutHandler.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return Actions.currentScene === 'MyProfile'
  }

  removeFailureNotification() {
    this.props.resetLoginData()
  }

  removeSuccessNotification() {
    this.props.resetLoginData()
    requestAnimationFrame(() => {
      logoutAndPurge()
    });

  }

  renderErrorMessage() {
    if (this.props.loginState.error) {
      let errorMessage = this.props.loginState.error.message || this.props.loginState.error.ResponseStatus.Message

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

  removeNotification = () => {
  }

  async onSignOutHandler() {
    if (!this.props.appConfig.IsInternetConnected) {
      Alert.alert('', 'No Internet connection', [
        { text: 'Ok' }
      ]);
      return
    }

    try {
      this.props.userLogout()
    } catch (ex) {
      throw ex
    }
  }

  createNavigationBar() {
    return (
      <Header
        busy={this.props.loginState.isLoading}
        title={this.props.title}
        titleStyle={{ color: Colors.white }}
        arrowColor={Colors.white}
        background={Colors.appThemeColor}
        onBackPress={this.handleCancel}
        onActionPress={this.onSignOutHandler}
        actionButton={<Logout fill={Colors.white} width="24" height="24" />}
      />
    );
  }
  render() {

    const { FirstName, LastName, DesignationName, Email, Phone, CountryName, State, City, Address, FilePath } = this.props.loginState.response

    return (
      <View style={styles.container}>

        {this.createNavigationBar()}

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Your personal profile</Text>
        </View>

        {this.props.loginState.message &&
          <Notification
            initialTop={0}
            duration={5000}
            success={true}
            message={this.props.loginState.message}
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

        <View style={styles.profileContainer}>
          <Image
            source={{ uri: FilePath }}
            style={styles.profilePictureImage}
          />

          <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
            <Text style={{ color: '#807F80' }}>{FirstName} {LastName} </Text>
            <Text style={{ color: Colors.appThemeColor }}>{DesignationName}</Text>
          </View>

        </View>

        <ScrollView style={{ marginTop: 10, backgroundColor: 'transparent' }}>
          <View style={styles.detailContainer}>
            <View style={{ borderBottomWidth: 1, borderBottomColor: '#BFB8AF', backgroundColor: 'transparent', width: '75%', height: 30 }}>
              <Text style={styles.headerStyles}>EMAIL ADDRESS & PHONE NUMBER</Text>
            </View>

            <View style={{ backgroundColor: 'transparent', flex: 1 }}>
              <Text style={styles.userDetailStyle}>{Email}</Text>
              <Text style={styles.userDetailStyle}>{Phone}</Text>
            </View>


            <View style={{ marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#BFB8AF', backgroundColor: 'transparent', width: '75%', height: 30 }}>
              <Text style={styles.headerStyles}>ADDRESS & COUNTRY</Text>
            </View>

            <View style={{ backgroundColor: 'transparent', flex: 1 }}>
              <Text style={styles.userDetailStyle}>{CountryName}</Text>
              <Text style={styles.userDetailStyle}>{State}</Text>
              <Text style={styles.userDetailStyle}>{City}</Text>
              <Text style={styles.userDetailStyle}>{Address}</Text>
            </View>

          </View>

        </ScrollView>

      </View>
    );
  }
}

MyProfile.propTypes = {
};

const mapDispatchToProps = dispatch => ({
  userLogout: () => dispatch(userLogout()),
  resetLoginData: () => dispatch(resetLoginData())
});

const mapStateToProps = state => ({
  loginState: state.login,
  appConfig: state.appConfig
});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
