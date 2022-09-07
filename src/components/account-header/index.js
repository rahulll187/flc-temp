import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ViewPropTypes } from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import NotificationIcon from '../icons/notification'
import { Colors } from '../../constants.js'
import IconBadge from 'react-native-icon-badge'

const profilePictureSize = 60

const styles = StyleSheet.create({
  container: {
    height: 70,
    shadowColor: 'rgba(0, 0, 0, 0.09)',
    shadowOffset: {
      width: 0.5,
      height: 0.5
    },
    shadowRadius: 0,
    shadowOpacity: 1,
    elevation: 0.5,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.09)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.appThemeColor
  },
  profileButton: {
  },
  profileButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profilePicture: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: profilePictureSize,
    height: profilePictureSize,
    marginRight: 17.5
  },
  profilePictureImage: {
    borderRadius: 10,
    width: profilePictureSize,
    height: profilePictureSize
  },
  accountInfo: {
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  accountName: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.white
  },
  accountType: {
    textAlign: 'center',
    fontSize: 10.5,
    color: '#878787'
  },
  actionButtonContainer: {
  },
  actionButtonContainer1: {
  },
  menuItems: {
    position: 'absolute',
    top: 32,
    right: 10,
    flexDirection: 'row',
    width: 80,
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  badgeStyle: {
    position: 'absolute',
    top: 1,
    right: 1,
    minWidth: 20,
    height: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF0000'
  }
});

class AccountHeader extends Component {
  constructor(props) {
    super(props)

    this.onProfileInfoPress = this.onProfileInfoPress.bind(this)
    this.onNotificationButtonPressed = this.onNotificationButtonPressed.bind(this)
  }

  onProfileInfoPress() {
    Actions.MyProfile()
  }

  onNotificationButtonPressed() {
    Actions.Notifications()
  }

  render() {
    const propsStyle = {
      ...this.props.style
    };

    if (propsStyle.borderWidth === 0) {
      propsStyle.borderBottomWidth = 0
      propsStyle.shadowOpacity = 0
      propsStyle.elevation = 0
    }

    const { FirstName, LastName, FilePath } = this.props.loginState.response

    return (
      <View style={[styles.container, propsStyle]}>
        <TouchableOpacity style={styles.profileButton} onPress={this.onProfileInfoPress}>

          <View style={styles.profileButtonContainer}>
            <View style={styles.profilePicture}>
              <Image
                source={{ uri: FilePath }}
                style={styles.profilePictureImage}
              />
            </View>

            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{FirstName} {LastName}</Text>
            </View>
          </View>

        </TouchableOpacity>


        <IconBadge
          style={styles.badgeStyle}
          MainElement={
            <View style={{ backgroundColor: 'transparent', width: 35, height: 35, margin: 4 }}>
              <TouchableOpacity onPress={this.onNotificationButtonPressed}>
                <NotificationIcon width={28} height={28} fill={Colors.white} />
              </TouchableOpacity>
            </View>
          }

          BadgeElement={<Text style={{ color: Colors.white }}>{this.props.appConfig.NotificationCount}</Text>}
          IconBadgeStyle={{ width: 18, height: 18, backgroundColor: 'red' }}
          Hidden={this.props.appConfig.NotificationCount <= 0 ? true : false}
        />

      </View>
    );
  }
}

AccountHeader.propTypes = {
  style: ViewPropTypes.style
};

AccountHeader.defaultProps = {
  style: {}
};

const mapStateToProps = state => ({
  appConfig: state.appConfig,
  loginState: state.login
});
export default connect(mapStateToProps)(AccountHeader)
