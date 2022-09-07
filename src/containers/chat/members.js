import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../../constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../../components/header'
import { getProjectDetails, resetProjectsData } from '../../reducers/projects/actions'
import Notification from '../../components/notification'
import GroupMember from '../../components/chat/group'
import IndividualMember from '../../components/chat/individual'
import { resetOldChat } from '../../reducers/chat/actions'

const { width, height } = Dimensions.get('window')
let itemSpacing = 100

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.white,
    flex: 1,
    display: 'flex'
  },
  listView: {
    position: 'absolute',
    height: height - 150,
    top: height * 0.2100,
    flexGrow: 1,
    marginHorizontal: 30,
    marginBottom: 20,
    backgroundColor: 'transparent'
  },
  projectContainer: {
    justifyContent: 'center',
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
  projectStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent'
  },
  buttonStyle: {
    marginTop: 5,
    left: 15,
    height: 32,
    borderRadius: 15,
    backgroundColor: Colors.appThemeColor
  },
  headerTitleView: {
    backgroundColor: Colors.appThemeColor,
    position: "relative",
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 100,
    left: 0,
    top: 0
  },
  headerTitle: {
    color: Colors.white
  },
  indicator: {
    backgroundColor: 'transparent',
    transform: [
      {
        scale: 0.8
      }
    ]
  },
  scrollBar: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    borderRadius: 30,
    flex: 1
  },
  scrollBarItem: {
    color: '#919191',
    marginTop: 20,
    textAlign: 'center'
  },
  scrollBarFirstItem: {
  },
  scrollBarSelectedItem: {
    color: Colors.white,
    textAlign: 'center'
  },
  nonselectedButton: {
    backgroundColor: 'transparent',
    width: (width / 2),
    height: 55,
    marginHorizontal: 2,
    top: 1
  },
  selectedButton: {
    backgroundColor: Colors.appThemeColor,
    width: (width / 2),
    height: 55,
    top: 1,
    borderRadius: 30
  }
});

class ChatMembers extends Component {
  constructor(props) {
    super(props)

    let tabItems = ['Group', 'Individual']

    this.state = {
      contentWidth: 0,
      selectedTabIndex: 0,
      widths: new Array(tabItems.length),
      tabItems: tabItems,
    }
    this.removeFailureNotification = this.removeFailureNotification.bind(this)
    this.renderSelectedTabContent = this.renderSelectedTabContent.bind(this)
  }

  componentWillMount() {
    this.props.resetOldChat()
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.projectsState.isLoading != nextProps.projectsState.isLoading) {
      return true
    }
    return Actions.currentScene === 'ChatMembers'
  }

  onTabSelectionHandler(itemNum) {
    let widthInFront = 0,
      currentItemWidth = this.state.widths[itemNum],
      screenWidth = Dimensions.get('window').width,
      contentWidth = this.state.contentWidth,
      self = this

    for (let i = 0; i <= itemNum; i++) {
      if (i < itemNum) widthInFront += this.state.widths[i] + itemSpacing
    }

    setTimeout(function () {
      window.requestAnimationFrame(
        () => {
          let x = (widthInFront + itemSpacing) - ((screenWidth / 2) - (currentItemWidth / 2))
          if (x < 0) {
            x = 0
          } else if (x > (contentWidth - screenWidth)) {
            x = contentWidth - screenWidth
          }
          if (self.props.noSetState) {
            if (self.props.noSetState.indexOf(this.state.tabItems[itemNum]) === -1) {
              self.refs.scrollView.scrollTo({ x })
              self.setState({ selectedTabIndex: itemNum })
            }
          } else {
            self.refs.scrollView.scrollTo({ x })
            self.setState({ selectedTabIndex: itemNum })
          }
        }
      )
    }, 500)
  }

  renderSelectedTabContent() {

    let arrChatUser = []

    for (let i = 0; i < this.props.arrUsers.length; i++) {
      let user = this.props.arrUsers[i]
      if (user.Email != this.props.loginState.response.Email)
        arrChatUser.push(user)
    }
    switch (this.state.selectedTabIndex) {
      case 0: return (<GroupMember projectDetail={this.props.projectDetail} />)
      case 1: return (<IndividualMember projectDetail={this.props.projectDetail}
        arrChatUser={arrChatUser} />)
    }
  }

  onProjectCheckinCheckoutHandler = (item) => {
  }

  onProjectHandler = (item) => {
    const obj = {
      StoreId: item.StoreDetail.StoreId,
    }
    this.props.getProjectDetails(obj)
  }


  removeFailureNotification() {
    const body = {
      location: 'dubai'
    }
    this.props.resetProjectsData(body);
  }

  renderErrroMessage() {
    if (this.props.projectsState.error) {
      let errorMessage = this.props.projectsState.error.message || this.props.projectsState.error.ResponseStatus.Message

      return <Notification
        initialTop={0}
        duration={5000}
        success={false}
        message={errorMessage}
        handleRemove={this.removeFailureNotification}
      />
    }
  }
  render() {
    let items1 = []
    for (let i = 0; i < this.state.tabItems.length; i++) {
      items1.push(
        <View style={{ justifyContent: 'center', alignItems: 'center' }} key={i}>
          <TouchableOpacity key={i} style={this.state.selectedTabIndex === i ? styles.selectedButton : styles.nonselectedButton} onPress={() => { this.onTabSelectionHandler(i) }}>
            <Text style={[i === 0 ? styles.scrollBarFirstItem : null, styles.scrollBarItem, this.state.selectedTabIndex === i ? styles.scrollBarSelectedItem : null]}
              onLayout={(object) => {
                let { width } = object.nativeEvent.layout
                let newState = this.state
                newState.widths[i] = width
                this.setState(newState)
              }}>
              {this.state.tabItems[i]}
            </Text>
          </TouchableOpacity>
        </View>
      )
    }


    return (
      <View style={styles.container}>
        <Header title={this.props.title} titleStyle={{ color: Colors.white }} arrowColor={Colors.white} background={Colors.appThemeColor} onBackPress={this.handleCancel} />

        <View style={styles.headerTitleView}>
          <Text style={styles.headerTitle}>{'Make your communication better'}</Text>
        </View>

        <View style={{ height: 57, marginHorizontal: 10, marginTop: 10 }}>
          <ScrollView
            ref='scrollView'
            style={styles.scrollBar}
            horizontal={true}
            onContentSizeChange={(contentWidth, contentHeight) => {
              this.setState({ contentWidth })
            }}>
            {items1}
          </ScrollView>
        </View>

        {this.renderSelectedTabContent()}
      </View>
    );
  }
}

ChatMembers.propTypes = {
  getProjectDetails: PropTypes.func.isRequired,
  resetProjectsData: PropTypes.func.isRequired,
  resetOldChat: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getProjectDetails: (data) => dispatch(getProjectDetails(data)),
  resetProjectsData: (data) => dispatch(resetProjectsData(data)),
  resetOldChat: () => dispatch(resetOldChat())
});

const mapStateToProps = state => ({
  projectsState: state.projects,
  loginState: state.login,
  projectDetail: state.projects.projectDetail.ProjectDetail,
  arrUsers: state.projects.projectDetail.Users,

});
export default connect(mapStateToProps, mapDispatchToProps)(ChatMembers);
