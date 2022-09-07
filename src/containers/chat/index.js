import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AdjustingView from '../../components/adjusting-view'
import Input from '../../components/chat/input'
import { Colors } from '../../constants'
import { getChatHistory, InsertChatMessage, resetChatHistory, resetOldChat } from '../../reducers/chat/actions'
import Notification from '../../components/notification'

import { moderateScale } from 'react-native-size-matters'
import Svg, { Path } from 'react-native-svg'
import Moment from 'moment'

import Header from '../../components/header'
const { width } = Dimensions.get('window')
const profilePictureSize = 40

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.white
  },
  main: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  listView: {
    flexGrow: 1,
    margin: 10,
    backgroundColor: 'transparent'
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: '#d9d9d9'
  },
  InputContainer: {
    width: width - 10
  },
  profilePicture: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: profilePictureSize,
    height: profilePictureSize,
    marginRight: 17.5,
    marginLeft: 4,
    marginTop: 10
  },
  profilePictureImage: {
    width: profilePictureSize,
    height: profilePictureSize,
    borderRadius: 40 / 2,
    borderWidth: 0.5,
    borderColor: Colors.appThemeColor
  },
  item: {
    marginVertical: moderateScale(7, 2),
    flexDirection: 'row'
  },
  itemIn: {
    marginLeft: 20
  },
  itemOut: {
    alignSelf: 'flex-end',
    marginRight: 20
  },
  balloon: {
    maxWidth: moderateScale(210, 2),
    paddingHorizontal: moderateScale(5, 2),
    paddingBottom: moderateScale(7, 2),
    borderRadius: 15
  },
  arrowContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    flex: 1
  },
  arrowLeftContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  arrowRightContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  arrowLeft: {
    left: moderateScale(-6, 0.5)
  },
  arrowRight: {
    right: moderateScale(-6, 0.5)
  }
});

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sendMessage: '',
      refreshTableView: false
    }
    this.renderChatContent = this.renderChatContent.bind(this)
    this.renderListItem = this.renderListItem.bind(this)
    this.onChangeText = this.onChangeText.bind(this)
    this.onMessageSend = this.onMessageSend.bind(this)
    this.onPullToRefresh = this.onPullToRefresh.bind(this)
  }

  componentWillUnmount() {
    this.props.resetOldChat()
  }

  componentWillMount() {
    const body = {
      ChatTypeId: this.props.ChatTypeId,
      toEmailId: this.props.toEmailId
    }
    this.props.getChatHistory(body)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.chatData.chatResult != nextProps.chatData.chatResult) {
      this.setState({
        refreshTableView: false,
        sendMessage: ''
      });
      return true
    }
    return Actions.currentScene === 'Chat'
  }

  onChangeText(message1) {
    this.setState({
      sendMessage: message1
    })
  }
  onMessageSend() {
    // if(!this.props.userOnline) {
    //   Alert.alert('Chat', 'cannot send message to offline user.', [
    //   { text: 'Ok' }
    // ]);
    //   return;
    // }

    const body = {
      ChatTypeId: this.props.ChatTypeId,
      toEmailId: this.props.toEmailId,
      message: this.state.sendMessage
    }
    this.props.InsertChatMessage(body)
  }

  renderHeader() {
    return (<Header title={this.props.title} titleStyle={{ color: Colors.white }} arrowColor={Colors.white} background={Colors.appThemeColor} onBackPress={this.handleCancel} />);
  }

  onPullToRefresh() {
    const body = {
      ChatTypeId: this.props.ChatTypeId,
      toEmailId: this.props.toEmailId
    }
    this.props.getChatHistory(body)
  }

  renderErrroMessage() {
    if (this.props.chatData.error) {
      let errorMessage = this.props.chatData.error.message || this.props.chatData.error.ResponseStatus.Message

      return <Notification
        initialTop={0}
        duration={5000}
        success={false}
        message={errorMessage}
        handleRemove={this.removeFailureNotification}
      />
    }
  }

  removeNotification = () => {
  }

  removeFailureNotification = () => {
    this.props.resetChatHistory()
  }
  loadAfterDelay() {
    setTimeout(() => {

      this.setState({
        refreshTableView: false,
        sendMessage: ''
      });
    }, 5);
  }
  removeSuccessNotification = () => {
    this.props.resetChatHistory()
    this.setState({
      refreshTableView: true,
      sendMessage: ''
    })
    this.loadAfterDelay()
  }

  renderChatContent(chatItem) {

    var time24hours1 = Moment(chatItem.item.CreatedDate, "DD-MM-YYYY hh:mm:ss A")
    let start_date1 = time24hours1.format('MMM DD YYYY,hh:mm A')

    const { Email } = this.props.loginState.response

    if (Email != chatItem.item.CreatedBy) {
      return (
        <View style={{ marginBottom: 5, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
          <View style={styles.profilePicture}>
            <Image
              source={{ uri: chatItem.item.FilePath }}
              style={styles.profilePictureImage}
            />
          </View>

          <View style={[styles.balloon, { backgroundColor: '#F2F3F4', marginVertical: 5 }]}>
            <View style={{ marginHorizontal: 3, flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Text style={{ paddingTop: 5, color: 'black', fontSize: 10 }}>{start_date1} </Text>
              <Text style={{ paddingTop: 2, color: 'black', fontSize: 7 }}>{chatItem.item.UserName}</Text>
            </View>

            <View style={{ marginHorizontal: 5, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text style={{ paddingTop: 5, color: 'black' }}>{chatItem.item.Message}</Text>
            </View>

            <View style={[styles.arrowContainer, styles.arrowLeftContainer]}>
              <Svg style={styles.arrowLeft} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.484 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                <Path
                  d="M38.484,17.5c0,8.75,1,13.5-6,17.5C51.484,35,52.484,17.5,38.484,17.5z"
                  fill="#F2F3F4"
                  x="0"
                  y="0"
                />
              </Svg>
            </View>

          </View>
        </View>

      );
    } else {
      return (
        <View style={{ marginHorizontal: 5, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start' }}>

          <View style={[styles.balloon, { backgroundColor: Colors.appThemeColor, marginHorizontal: 15, marginVertical: 5 }]}>
            <View style={{ marginHorizontal: 3, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text style={{ paddingTop: 5, color: Colors.white, fontSize: 10 }}>{start_date1} </Text>
            </View>

            <View style={{ marginHorizontal: 5, flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
              <Text style={{ paddingTop: 5, color: Colors.white }}>{chatItem.item.Message}</Text>
            </View>


            <View
              style={[
                styles.arrowContainer,
                styles.arrowRightContainer,
              ]}
            >
              <Svg style={styles.arrowRight} width={moderateScale(15.5, 0.6)} height={moderateScale(17.5, 0.6)} viewBox="32.485 17.5 15.515 17.5" enable-background="new 32.485 17.5 15.515 17.5">
                <Path
                  d="M48,35c-7-4-6-8.75-6-17.5C28,17.5,29,35,48,35z"
                  fill={Colors.appThemeColor}
                  x="0"
                  y="0"
                />
              </Svg>
            </View>
          </View>

          <View style={styles.profilePicture}>
            <Image
              source={{ uri: chatItem.item.FilePath }}
              style={styles.profilePictureImage}
            />
          </View>

        </View>
      );
    }
  }
  renderListItem(chatItem) {
    return (
      <View style={{ flex: 1, backgroundColor: 'transparent', marginBottom: 10 }}>
        {this.renderChatContent(chatItem)}
      </View>);
  }

  render() {
    return (
      <View style={styles.container}>

        <AdjustingView style={styles.container}>
          {this.renderHeader()}

          <View style={styles.main}>

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
            <FlatList
              showsVerticalScrollIndicator={false}
              data={this.props.chatData.chatResult}
              keyExtractor={item => item.CreatedDate}
              refreshing={this.state.refreshTableView}
              onRefresh={this.onPullToRefresh}
              renderItem={this.renderListItem}
              style={styles.listView}
              verticalScrollingDisabled={true}
              removeClippedSubviews={true}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={21}
              inverted
            />

            <View style={styles.bottomContainer}>
              <View style={styles.InputContainer}>
                <Input
                  message={this.state.sendMessage}
                  isSending={this.props.chatData.isMessageSending}
                  onChangeText={this.onChangeText}
                  onMessageSend={this.onMessageSend}
                />
              </View>
            </View>

          </View>

        </AdjustingView>
      </View>
    );
  }
}

Chat.propTypes = {
  getChatHistory: PropTypes.func.isRequired,
  InsertChatMessage: PropTypes.func.isRequired,
  resetChatHistory: PropTypes.func.isRequired,
  resetOldChat: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getChatHistory: (data) => dispatch(getChatHistory(data)),
  InsertChatMessage: (data) => dispatch(InsertChatMessage(data)),
  resetChatHistory: () => dispatch(resetChatHistory()),
  resetOldChat: () => dispatch(resetOldChat())
});

const mapStateToProps = state => ({
  loginState: state.login,
  chatData: state.chatData,
  projectsState: state.projects,
  checkInState: state.checkIn,
  users: state.users,
  appConfig: state.appConfig
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
