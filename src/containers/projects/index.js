import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { Colors } from '../../constants'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '../../components/header'
import ProjectIcon from '../../components/icons/project'
import ArrowRight from '../../components/icons/arrowRight'
import Location from '../../components/icons/location'
import Calendar from '../../components/icons/calendar'
import { getProjectDetails, resetProjectsData } from '../../reducers/projects/actions'
import Notification from '../../components/notification'
import Moment from 'moment'
import { parseApiDate } from '../../utils'
import { getAppConfig } from '../../reducers/appConfig/actions'

const {  height } = Dimensions.get('window')

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
    backgroundColor: 'transparent',
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
    // borderColor: 'green',
    backgroundColor: Colors.white
  },
  projectContainer2: {
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
    borderColor: 'green',
    backgroundColor: Colors.white
  },
  projectStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent'
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
  projectNameStyle: { 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    padding: 10
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
});

class ProjectsList extends Component {
  constructor(props) {
    super(props);

    this.renderListItem = this.renderListItem.bind(this);
    this.removeFailureNotification = this.removeFailureNotification.bind(this);
    this.goBack = this.goBack.bind(this);
  }


  shouldComponentUpdate(nextProps) {
    if (this.props.projectsState.isLoading != nextProps.projectsState.isLoading) {
      return true;
    }
    return Actions.currentScene === 'ProjectsList';
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.projectsState.projectDetail !=
      nextProps.projectsState.projectDetail
    ) {
      if (Actions.currentScene === "ProjectsList") {
        Actions.ProjectDetails({
          IsCheckedIn: this.props.IsCheckedIn
        });
      }
    }
  }

  goBack() {
    requestAnimationFrame(() => {
      this.props.getAppConfig();
    });
    Actions.pop();
  }

  onProjectCheckinCheckoutHandler = (item) => {
  }

  onProjectHandler = (item) => {
    const obj = {
      StoreId: item.StoreDetail.StoreId,
    }
    this.props.getProjectDetails(obj);
  }

  renderListItem(projects) {
    const { ProjectName,CheckInStatus } = projects.item
    const { EndDate, StartDate, StoreId, StoreLocation, StoreName } = projects.item.StoreDetail
    const bCheckedIn = CheckInStatus === 'True' ? true : false
    let start_date = Moment(parseApiDate(StartDate));
    let start_date1 = start_date && start_date.isValid() && start_date.format('MMM DD, YYYY')

    let end_date = Moment(parseApiDate(EndDate));
    let end_date1 = end_date && end_date.isValid() && end_date.format('MMM DD, YYYY')

    return (
      <View style={[bCheckedIn ? styles.projectContainer2 : styles.projectContainer]}  key={StoreId}>
        <TouchableHighlight underlayColor={Colors.white} onPress={() => { this.onProjectHandler(projects.item) }} >

          <View style={styles.projectStyle}>

            <View style={{ width: '100%', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'flex-start' }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                <View style={{ flex: 1, backgroundColor: "transparent" }}>

                  <View style={styles.projectNameStyle}>
                    <ProjectIcon fill={Colors.appThemeColor} width={24} height={24} />
                    <Text style={{ left: 10 }}> {ProjectName} </Text>
                  </View>

                  <View style={styles.projectNameStyle}>
                    <Location fill={Colors.appThemeColor} width={24} height={24} />
                    <Text style={{ left: 10 }}> {StoreName} </Text>
                  </View>

                  <View style={styles.projectNameStyle}>
                    <Calendar fill={Colors.appThemeColor} width={24} height={24} />
                    <Text style={{ left: 10 }}>{start_date1} to {end_date1}</Text>
                  </View>

                </View>

                <View style={{ width: '10%', backgroundColor: 'transparent' }}>
                  <ArrowRight fill="black" width={24} height={24} />
                </View>

              </View>
            </View>
          </View>
        </TouchableHighlight>

      </View>
    );
  }

  removeFailureNotification() {
    const body = {
      location: 'dubai'
    }
    this.props.resetProjectsData(body);
  }

  renderErrroMessage() {
    if (this.props.projectsState.error) {
      let errorMessage = this.props.projectsState.error.message || this.props.projectsState.error.ResponseStatus.Message;

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

  render() {
    return (
      <View style={styles.container}>
        <Header title={this.props.title} titleStyle={{ color: Colors.white }} arrowColor={Colors.white} background={Colors.appThemeColor} onBackPress={this.goBack} />

        <View style={styles.headerTitleView}>
          <Text style={styles.headerTitle}> Projects assigned to you </Text>
          {this.props.projectsState.isLoading && <ActivityIndicator
            key={1}
            animating
            color={Colors.white}
            style={styles.indicator}
            size='large'
          />}
        </View>

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
          data={this.props.arrProjects}
          keyExtractor={item => item.StoreDetail.StoreId}
          renderItem={this.renderListItem}
          style={styles.listView}
          removeClippedSubviews={false}
          initialNumToRender={10}
          maxToRenderPerBatch={10}
          windowSize={21}
        />

      </View>
    );
  }
}

ProjectsList.propTypes = {
  getProjectDetails: PropTypes.func.isRequired,
  resetProjectsData: PropTypes.func.isRequired,
  getAppConfig: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getProjectDetails: (data) => dispatch(getProjectDetails(data)),
  resetProjectsData: (data) => dispatch(resetProjectsData(data)),
  getAppConfig: () => dispatch(getAppConfig())
});

const mapStateToProps = state => ({
  projectsState: state.projects,
  appConfig: state.appConfig
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList);
