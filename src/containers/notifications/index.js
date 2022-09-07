import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Colors } from "../../constants"
import Header from '../../components/header'
import { getNotifications, notificationReset } from '../../reducers/notification/actions'
import Notification from '../../components/notification'
import Accordion from "react-native-collapsible/Accordion"
import LoadingChat from "../../components/loading-chat"
import Image from 'react-native-image-progress'
import * as Progress from 'react-native-progress'
import Moment from 'moment'
import { getAppConfig } from '../../reducers/appConfig/actions'

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
  headerTitle: {
    fontSize: 18,
    color: Colors.white
  },
  listView: {
    top: 30,
    flexGrow: 1,
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  cellContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
    marginBottom: 30,
    borderRadius: 6,
    shadowColor: 'transparent',
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    backgroundColor: Colors.white
  },
  contentContainer: {
    backgroundColor: 'rgb(247,247,247)',
    flex: 1,
    borderBottomWidth: 1,
    marginHorizontal: 25,
    borderBottomColor: "rgba(217, 216, 215, 0.5)"
  },
  contentText: {
    padding: 10,
    fontSize: 15
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
    marginTop: 15,
    backgroundColor: Colors.white,
    shadowColor: "gray",
    shadowOffset: {
      width: 0,
      height: 0.5
    },
    shadowRadius: 1,
    shadowOpacity: 2,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(217, 216, 215, 0.5)"
  },
  titleContainer: {
    marginLeft: 20,
    width: '65%',
    backgroundColor: 'transparent'
  },
  imageStyle: {
    marginTop: 5
  },
  headerDateStyle: {
    marginRight: 10,
    fontSize: 12
  },
  headerTitle2: {
    marginLeft: 10,
    marginTop: 3,
    fontSize: 16,
    color: Colors.black
  },
  headerTitle3: {
    marginLeft: 10,
    marginTop: 3,
    fontSize: 16,
    color: Colors.appThemeColor
  },
  thumbImage: {
    width: 80,
    height: 80,
  },
});

class Notifications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isExpanded: false,
      headerIndex: -1
    };
    this._setSection = this._setSection.bind(this)
    this.removeFailureNotification = this.removeFailureNotification.bind(this)
    this.removeSuccessNotification = this.removeSuccessNotification.bind(this)
    this.goBack = this.goBack.bind(this)
  }

  shouldComponentUpdate(nextProps) {
    return Actions.currentScene === 'Notifications'
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillMount() {
    const obj = {
      location: 'dubai'
    }
    this.props.getNotifications(obj)
  }

  goBack() {
    requestAnimationFrame(() => {
      this.props.getAppConfig()
    });
    Actions.pop()
  }

  removeFailureNotification() {
    this.props.notificationReset()
  }

  removeSuccessNotification() {
    this.props.notificationReset()
  }

  removeNotification = () => {
  }

  renderErrorMessage() {
    if (this.props.notificationData.error) {
      let errorMessage = this.props.notificationData.error.message || this.props.notificationData.error.ResponseStatus.Message

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


  renderListItem(scheduleItem) {
    const { NotificationId, CreatedDate, ProjectName, StoreName } = scheduleItem.item;
    return (
      <View style={styles.cellContainer} key={NotificationId}>

        <View style={{ marginHorizontal: 10, marginTop: 10, marginBottom: 10, width: '70%' }}>
          <View style={{ borderColor: 'rgba(18,18,18,0.14)', borderBottomWidth: 1, marginBottom: 5 }}>
            <Text style={{ color: '#807F80' }}>NAME</Text>
          </View>
          <Text style={{ top: 5, marginBottom: 10, color: Colors.appThemeColor }}>{StoreName}</Text>

          <View style={{ borderColor: 'rgba(18,18,18,0.14)', marginTop: 10, borderBottomWidth: 1, marginBottom: 5 }}>
            <Text style={{ color: '#7E7E7E' }}>TITLE</Text>
          </View>

          <Text style={{ top: 5, marginBottom: 10, color: Colors.appThemeColor }}>{ProjectName}</Text>

          <View style={{ borderColor: 'rgba(18,18,18,0.14)', marginTop: 10, borderBottomWidth: 1, marginBottom: 5 }}>
            <Text style={{ color: '#7E7E7E' }}>CREATED DATE</Text>
          </View>

          <Text style={{ top: 5, marginBottom: 10, color: Colors.appThemeColor }}>{CreatedDate}</Text>
        </View>
      </View>
    );
  }
  _renderHeader(section) {
    var time24hours1 = Moment(section.CreatedDate, "DD-MM-YYYY hh:mm:ss A");
    let start_date1 = time24hours1.format('MMM DD, YYYY hh:mm A')

    return (
      <View style={styles.headerContainer}>

        <View style={{ marginLeft: 5, flexDirection: 'row', width: '20%' }}>
          <Image style={styles.thumbImage}
            source={{ uri: section.FilePath }}
            indicator={Progress.Pie}
            indicatorProps={{
              size: 40,
              borderWidth: 0,
              color: Colors.appThemeColor,
              unfilledColor: 'rgba(200, 200, 200, 0.2)'
            }}
          />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle2}>{start_date1}</Text>
          <Text style={styles.headerTitle2}>{section.UserName}</Text>
          <Text style={styles.headerTitle2}>{section.ProjectName}</Text>
          <Text style={styles.headerTitle3}>{section.TypeName}</Text>
        </View>


        <View style={{ height:20,width:20, backgroundColor: 'transparent' }}>
          {(this.state.headerIndex === section.Index) &&
            <Image
              style={styles.imageStyle}
              source={require("../../images/expand_less_arrow.png")}
            />
            ||
            <Image
              style={styles.imageStyle}
              source={require("../../images/expand_more_arrow.png")}
            />
          }
        </View>
      </View>
    );
  }

  _renderContent(section) {
    return (
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>StoreName: {section.StoreName}</Text>
        <Text style={styles.contentText}>Description: {section.Description}</Text>
      </View>
    );
  }

  _setSection(section) {
    this.setState({
      isExpanded: true,
      headerIndex: section
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header title={this.props.title} titleStyle={{ color: Colors.white }} arrowColor={Colors.white} background={Colors.appThemeColor} onBackPress={this.goBack} />

        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Notifications for you</Text>
        </View>

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

        {(this.props.notificationData.isLoading && <LoadingChat />) || (
          <ScrollView>
            <View style={styles.tableView}>
              <Accordion
                underlayColor="transparent"
                sections={this.props.notificationData.arrNotificationResult}
                renderHeader={this._renderHeader.bind(this)}
                renderContent={this._renderContent}
                onChange={this._setSection.bind(this)}
              />
            </View>
          </ScrollView>
        )}


      </View>
    );
  }
}

Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  notificationReset: PropTypes.func.isRequired,
  getAppConfig: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  getNotifications: (data) => dispatch(getNotifications(data)),
  notificationReset: (data) => dispatch(notificationReset(data)),
  getAppConfig: () => dispatch(getAppConfig())
});

const mapStateToProps = state => ({
  appConfig: state.appConfig,
  notificationData: state.notifications
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
