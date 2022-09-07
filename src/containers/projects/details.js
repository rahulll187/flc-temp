import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import PropTypes from 'prop-types'
import { Colors } from '../../constants'
import Header from '../../components/header'
import { connect } from 'react-redux'
import Details from '../../components/project/details'
import Issues from '../../components/project/issues'
import PromotersIssues from '../../components/project/promoterIssues'
import Media from '../../components/project/media'
import Monitoring from '../../components/project/monitoring'
import SalesReport from '../../components/project/salesreport'
import CompetitionReport from '../../components/project/competitionReport'
import PromotersItems from '../../components/project/promotersItems'
import Notification from '../../components/notification'
import Promoters from '../promoters'
import { 
         GetCompetationReport,
         GetSalesReport,
         InsertSalesReport,
         InsertCompetationReport,
         InsertIssues,
         InsertItems,
         UploadMediaFile,
         DeleteIssues,
         resetProjectsData 
        } from '../../reducers/projects/actions'

const { width } = Dimensions.get('window')
let itemSpacing = 35

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white
  },
  headerTitleView: {
    backgroundColor: Colors.appThemeColor,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50
  },
  headerTitle: {
    color: Colors.white
  },
  scrollBar: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(18,18,18,0.14)',
    borderRadius: 30
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
    width: (width / 3),
    height: 57,
    marginHorizontal: 2,
    top: 1
  },
  selectedButton: {
    backgroundColor: Colors.appThemeColor,
    width: (width / 3),
    height: 57,
    top: 1,
    borderRadius: 30
  }
});

class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTabIndex: 0,
      arrUsers: [],
      widths: new Array(this.props.loginState.response.tabs.length),
      contentWidth: 0,
      IsCheckedIn: this.props.IsCheckedIn,
      tabItems: this.props.loginState.response.tabs
    }
    this.renderSelectedTabContent = this.renderSelectedTabContent.bind(this)
    this.removeFailureNotification = this.removeFailureNotification.bind(this)
    this.removeSuccessNotification = this.removeSuccessNotification.bind(this)
  }

  componentWillMount() {

    for (var i = 0; i < this.props.projectDetail.Users.length; i++) {
      const { CountryName, Email, FirstName, LastName, Phone, Designation } = this.props.projectDetail.Users[i]
      let UserImage = ''
      if (this.props.projectDetail.Users[i].UserImage.length)
        UserImage = this.props.projectDetail.Users[i].UserImage[0].FilePath

      this.state.arrUsers.push({
        name: FirstName + ' ' + LastName,
        designation: Designation,
        citizanship: CountryName,
        emailId: Email,
        mobileNumber: Phone,
        profilePicture: UserImage,
        index: i
      })
    }

    // Promoter:
    if (this.props.loginState.response.userRole === 2) {
      this.props.GetSalesReport()
      this.props.GetCompetationReport()
    } if(this.props.loginState.response.userRole ===1){
       this.props.GetCompetationReport()
    }
  }

  shouldComponentUpdate(nextProps) {
    return (Actions.currentScene === 'ProjectDetails' || Actions.currentScene === 'GallaryAlbum');
  }

  onSalesReportHandler = (data) => {
    this.props.InsertSalesReport(data)
  }

  onCompetationReportHandler = (data) => {
    this.props.InsertCompetationReport(data)
  }
  onItemInsertHandler = (data) => {
    var strIds = data.map((obj) => `${obj.itemId}$${obj.PromoterEmailId}`).join(',')
    const obj = {
      PromoterEmailId: data.PromoterEmailId,
      products: strIds
    }
    this.props.InsertItems(obj)
  }

  onUploadMediaFile = (data) => {
    const obj = {
      Base64ImageData: data
    }
    this.props.UploadMediaFile(obj)
  }

  onInsertIssueHandler = (data) => {
    const obj = {
      comments: data
    }
    this.props.InsertIssues(obj)
  }

  onDeleteIssueHandler = (data) => {
    const obj = {
      IssueId: data
    }
    this.props.DeleteIssues(obj)
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
    // Supervisor:
    if (this.props.loginState.response.userRole === 1) {
      switch (this.state.selectedTabIndex) {
        case 0: return (<Details />);
        case 1: return (<Promoters hideHeader={true}
          hideTitle={true}
          IsCheckedIn={this.state.IsCheckedIn}
          arrUsers={this.state.arrUsers} />);
        case 2: return (<Issues arrProjectIssues={this.props.projectDetail.Issues} IsCheckedIn={this.state.IsCheckedIn} />);
        case 3: return (<Monitoring arrCheckinUser={this.props.projectDetail.Monitors}
          projectDetail={this.props.projectDetail} />);
        case 4: return (<PromotersItems
          IsCheckedIn={this.state.IsCheckedIn}
          arrItems={this.props.projectDetail.Items}
          onItemInsertHandler={this.onItemInsertHandler} />);
        case 5: return (<Media
          albumImages={this.props.projectDetail.Medias}
          IsCheckedIn={this.state.IsCheckedIn}
          onUploadMediaFile={this.onUploadMediaFile}
          loginState={this.props.loginState} />);
        case 6: return (<CompetitionReport
            onCompetationReportHandler={this.onCompetationReportHandler} />);

        default: return (<View style={{ flex: 1, backgroundColor: Colors.white }} />);
      }
    } else if (this.props.loginState.response.userRole === 2) { //Promoter
      switch (this.state.selectedTabIndex) {
        case 0: return (<Details />);
        case 1: return (<Promoters hideHeader={true}
          hideTitle={true}
          IsCheckedIn={this.state.IsCheckedIn}
          arrUsers={this.state.arrUsers} />);
        case 2: return (<PromotersIssues arrPromotersIssues={this.props.projectDetail.Issues}
          IsCheckedIn={this.state.IsCheckedIn}
          onInsertIssueHandler={this.onInsertIssueHandler}
          onDeleteIssueHandler={this.onDeleteIssueHandler}
          isLoading={this.props.projectsState.isLoading} />);
        case 3: return (<PromotersItems
          IsCheckedIn={this.state.IsCheckedIn}
          arrItems={this.props.projectDetail.Items}
          onItemInsertHandler={this.onItemInsertHandler} />);
        case 4: return (<Media
          IsCheckedIn={this.state.IsCheckedIn}
          albumImages={this.props.projectDetail.Medias}
          onUploadMediaFile={this.onUploadMediaFile}
          loginState={this.props.loginState} />);
        case 5: return (<SalesReport
          IsCheckedIn={this.state.IsCheckedIn}
          onSalesReportHandler={this.onSalesReportHandler} />);
        case 6: return (<CompetitionReport
          onCompetationReportHandler={this.onCompetationReportHandler} />);
        
        default: return (<View style={{ flex: 1, backgroundColor: Colors.white }} />);
      }
    }else if (this.props.loginState.response.userRole === 3) {
      switch (this.state.selectedTabIndex) {
        case 0: return (<Details />);
        case 1: return (<Promoters hideHeader={true}
          hideTitle={true}
          IsCheckedIn={this.state.IsCheckedIn}
          arrUsers={this.state.arrUsers} />);
        case 2: return (<Issues arrProjectIssues={this.props.projectDetail.Issues} IsCheckedIn={this.state.IsCheckedIn} />);
        case 3: return (<Monitoring arrCheckinUser={this.props.projectDetail.Monitors}
          projectDetail={this.props.projectDetail} />);
        case 4: return (<PromotersItems
          IsCheckedIn={this.state.IsCheckedIn}
          arrItems={this.props.projectDetail.Items}
          onItemInsertHandler={this.onItemInsertHandler} />);
        case 5: return (<Media
          albumImages={this.props.projectDetail.Medias}
          IsCheckedIn={this.state.IsCheckedIn}
          onUploadMediaFile={this.onUploadMediaFile}
          loginState={this.props.loginState} />);

        default: return (<View style={{ flex: 1, backgroundColor: Colors.white }} />);
      }
    }
  }

  removeFailureNotification() {
    this.props.resetProjectsData()
  }

  removeSuccessNotification() {
    this.props.resetProjectsData()
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


  render() {
    let headerTitle = ''
    // Supervisor:
    if (this.props.loginState.response.userRole == 1) {
      switch (this.state.selectedTabIndex) {
        case 0: headerTitle = 'Know more about your project'
          break;
        case 1: headerTitle = 'Assigned promotors for the project'
          break;
        case 2: headerTitle = 'View promotor issues / comments'
          break;
        case 3: headerTitle = 'Track your promoters'
          break;
        case 4: headerTitle = 'View out of stock alerts'
          break;
        case 5: headerTitle = 'Upload Event Media'
          break;
        case 6: headerTitle = 'Competition report'
          break;
        default:
          break;
      }
    } else if (this.props.loginState.response.userRole == 2){
      switch (this.state.selectedTabIndex) {
        case 0: headerTitle = 'Know more about your project'
          break;
        case 1: headerTitle = 'Your project reporting managers'
          break;
        case 2: headerTitle = 'Log & view your issues / comments'
          break;
        case 3: headerTitle = 'Product / sample status'
          break;
        case 4: headerTitle = 'Upload Event Media'
          break;
        case 5: headerTitle = 'Fill your sales report'
          break;
        case 6: headerTitle = 'Competition report'
          break;
        default:
          break;
      }
    }else if (this.props.loginState.response.userRole == 3){
      switch (this.state.selectedTabIndex) {
        case 0: headerTitle = 'Know more about your project'
          break;
        case 1: headerTitle = 'Assigned promotors for the project'
          break;
        case 2: headerTitle = 'View promotor issues / comments'
          break;
        case 3: headerTitle = 'Track your promoters'
          break;
        case 4: headerTitle = 'View out of stock alerts'
          break;
        case 5: headerTitle = 'Upload Event Media'
          break;
       
        default:
          break;
      }
    }

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


        <View style={styles.headerTitleView}>
          <Text style={styles.headerTitle}>{headerTitle}</Text>
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

ProjectDetails.propTypes = {
  InsertIssues: PropTypes.func.isRequired,
  DeleteIssues: PropTypes.func.isRequired,
  UploadMediaFile: PropTypes.func.isRequired,
  InsertItems: PropTypes.func.isRequired,
  InsertSalesReport: PropTypes.func.isRequired,
  InsertCompetationReport: PropTypes.func.isRequired,
  GetSalesReport: PropTypes.func.isRequired,
  GetCompetationReport: PropTypes.func.isRequired,
  resetProjectsData: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  InsertIssues: (data) => dispatch(InsertIssues(data)),
  DeleteIssues: (data) => dispatch(DeleteIssues(data)),
  UploadMediaFile: (data) => dispatch(UploadMediaFile(data)),
  InsertItems: (data) => dispatch(InsertItems(data)),
  InsertSalesReport: (data) => dispatch(InsertSalesReport(data)),
  InsertCompetationReport: (data) => dispatch(InsertCompetationReport(data)),
  GetSalesReport: () => dispatch(GetSalesReport()),
  GetCompetationReport:() => dispatch(GetCompetationReport()),
  resetProjectsData: () => dispatch(resetProjectsData())
});

const mapStateToProps = state => ({
  loginState: state.login,
  projectDetail: state.projects.projectDetail,
  projectsState: state.projects,
  appConfig: state.appConfig
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)
