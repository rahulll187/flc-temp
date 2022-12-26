import React, { Component } from "react";
import {
  Text,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
} from "react-native";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row, Grid } from "react-native-easy-grid";
import AccountHeader from "../../components/account-header";
import Notification from "../../components/notification";
import LoadingChat from "../../components/loading-chat";
import {
  getProjects,
  getCurrentProjects,
  resetProjectsData,
  projectDetailUpdate,
} from "../../reducers/projects/actions";
import {
  promoterCheckIn,
  resetCheckInData,
  promoterCheckout,
  getCheckedInStatus,
} from "../../reducers/checkIn/actions";
import { getAllUsers } from "../../reducers/users/actions";
import { getAppConfig } from "../../reducers/appConfig/actions";
import { Sentry } from "react-native-sentry";
import {
  deviceDetails,
  appEnviroment,
  isCrashReportEnabled,
  Colors,
} from "../../constants";
// import Geolocation from "@react-native-community/geolocation";
import Geolocation from 'react-native-geolocation-service';
import * as Location from "expo-location";
import { getDistance } from "geolib";
import Snackbar from "react-native-snackbar";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  colStyle: {
    backgroundColor: Colors.white,
  },
  singleContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#D2D2D2",
  },
  dashboardView: {
    flex: 1,
  },
  dashboardTitleStyle: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 16,
  },
  customerInfo: {
    marginTop: 30,
    alignItems: "center",
    fontSize: 16,
  },
  iconStyle: {
    alignSelf: "center",
  },
});

class ProjectDashBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strCheckInStatus: this.props.checkInState.IsCheckedIn
        ? "CHECK-OUT"
        : "CHECK-IN",
      IsCheckedIn: this.props.checkInState.IsCheckedIn,
      isPressed: false,
      destinationLat: 18.54843720153897,
      destinationLong: 73.77613155505078,
      distance: null,
    };
    this.renderGetprojectError = this.renderGetprojectError.bind(this);
    this.renderCheckInSuccessMessage =
      this.renderCheckInSuccessMessage.bind(this);
    this.renderCheckInFailureMessage =
      this.renderCheckInFailureMessage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.loginState.isLogin != nextProps.loginState.isLogin) {
      return false;
    }
    if (
      this.props.checkInState.checkInStatusResult !=
      nextProps.checkInState.checkInStatusResult
    ) {
      if (Actions.currentScene === "ProjectDashBoard") {
        if (nextProps.checkInState.checkInStatusResult) {
          if (
            nextProps.checkInState.checkInStatusResult.CheckInStatus ===
            "CHECKEDIN"
          ) {
            this.setState({
              IsCheckedIn: true,
              isPressed: false,
              strCheckInStatus: "CHECK-OUT",
            });

            if (this.props.loginState.response.userRole === 2) {
              this.promotersLandingscreen();
            }
          }
        }
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    return Actions.currentScene === "ProjectDashBoard";
  }

  componentDidMount() {
    if (isCrashReportEnabled) {
      const { FirstName, LastName, Email, DesignationName } =
        this.props.loginState.response;
      Sentry.setUserContext({
        userID: `${FirstName}${LastName}`,
        userEmail: Email,
      });

      Sentry.setExtraContext({
        appVersion: deviceDetails.appVersion,
        emailId: Email,
        designation: DesignationName,
      });

      Sentry.setTagsContext({
        environment: appEnviroment,
        react: true,
      });
    }

    const obj = {
      location: "dubai",
    };

    if (this.props.loginState.isLogin) {
      this.props.getProjects(obj);
      this.props.getAppConfig();

      switch (this.props.loginState.response.userRole) {
        // Supervisor:
        case 1:
          // this.props.getCheckedInStatus(obj);
          this.props.getAllUsers(obj);
          this.props.getCurrentProjects(obj);
          this.props.getCheckedInStatus(obj);
          break;
        // Promoter:
        case 2:
          this.props.getCheckedInStatus(obj);
          break;

        // Account Manager:
        case 3:
          this.props.getAllUsers(obj);
          this.props.getCurrentProjects(obj);
          break;

        default:
          break;
      }
    }
  }

  navigateToLogin = () => {
    Actions.pop();
  };

  onPromoterHandler = () => {
    if (this.props.users.allUsers) {
      Actions.Promoters({
        userRole: -1,
        arrUsers: this.props.users.allUsers,
      });
    }
  };

  onProjectHandler = () => {
    if (this.props.projectsState.projects) {
      Actions.ProjectsList({
        IsCheckedIn: false,
        arrProjects: this.props.projectsState.projects.ProjectList,
      });
      return;
    }
  };

  onMyProfileHandler = () => {
    Actions.MyProfile();
  };

  onChatHandler = () => {
    if (this.props.projectsState.projects) {
      Actions.ChatProjects({
        arrProjects: this.props.projectsState.projects.ProjectList,
      });
    }
  };

  onCustomerInfoHandler = () => {
    Actions.CustomerInfo();
  };

  onCheckInCheckOutHandler = async () => {
    const body = {
      location: "dubai",
    };
    Geolocation.getCurrentPosition((position) => {
      if (this.state.IsCheckedIn) {
        this.props.promoterCheckout(body);
        return;
      }
      const geoLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      var dis = getDistance(
        { latitude: 18.5820941, longitude: 73.7648666 },
        { latitude: 24.423097, longitude: 54.44928 }
      );
      this.setState({
        distance: dis / 1000,
      });
      if (dis < 2000) {
        // Snackbar.show({
        //   text: "Success",
        //   duration: Snackbar.LENGTH_SHORT,
        // });
      } else {
        // Snackbar.show({
        //   text: "Error! Reach to Nearby Area",
        //   duration: Snackbar.LENGTH_LONG,
        // });
      }
      this.props.promoterCheckIn(body, geoLocation);
    }),
      (error) => {
        console.log("error11", error);
      },
      { enableHighAccuracy: false, timeout: 2000, maximumAge: 3600000 };
  };

  onCurrentProjectSupervisorHandler = () => {
    if (this.props.projectsState.currentProjects) {
      Actions.ProjectsList({
        IsCheckedIn: true,
        arrProjects: this.props.projectsState.currentProjects.ProjectList,
      });
    }
  };

  onCurrentProjectPromotersHandler = () => {
    if (this.props.projectsState.currentProjects) {
      Actions.ProjectsList({
        IsCheckedIn: this.state.IsCheckedIn,
        arrProjects: this.props.projectsState.currentProjects.ProjectList,
      });
    }
  };

  renderCheckedInTiles = () => {
    if (this.state.IsCheckedIn) {
      return (
        <Row>
          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onCustomerInfoHandler}
              style={styles.singleContainer}
            >
              <Image
                source={require("../../images/dashboardIcon/cust_info_icon.png")}
              />
              <Text style={styles.dashboardTitleStyle}>
                CUSTOMER INFORMATION
              </Text>
            </TouchableOpacity>
          </Col>

          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onChatHandler}
              style={styles.singleContainer}
            >
              <Image
                source={require("../../images/dashboardIcon/chat_communication_icon.png")}
              />
              <Text style={styles.dashboardTitleStyle}>CHAT</Text>
            </TouchableOpacity>
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        <Col style={styles.colStyle}>
          <TouchableOpacity
            onPress={this.onMyProfileHandler}
            style={styles.singleContainer}
          >
            <Image
              source={require("../../images/dashboardIcon/my_profile_icon.png")}
            />
            <Text style={styles.dashboardTitleStyle}>MY PROFILE</Text>
          </TouchableOpacity>
        </Col>

        <Col style={styles.colStyle}>
          <TouchableOpacity
            onPress={this.onChatHandler}
            style={styles.singleContainer}
          >
            <Image
              source={require("../../images/dashboardIcon/chat_communication_icon.png")}
            />
            <Text style={styles.dashboardTitleStyle}>CHAT</Text>
          </TouchableOpacity>
        </Col>
      </Row>
    );
  };

  promotersLandingscreen() {
    const allProjectCount = this.props.projectsState.projects
      ? this.props.projectsState.projects.ProjectList.length
      : 0;
    const currentProjectCount = this.props.projectsState.currentProjects
      ? this.props.projectsState.currentProjects.ProjectList.length
      : 0;

    return (
      <Grid>
        <Row style={styles.colStyle}>
          {this.state.IsCheckedIn && (
            <Col style={styles.colStyle}>
              <TouchableOpacity
                onPress={this.onCurrentProjectPromotersHandler}
                style={styles.singleContainer}
              >
                <Image
                  source={require("../../images/dashboardIcon/projects_icon.png")}
                  style={styles.iconStyle}
                />
                <Text style={styles.dashboardTitleStyle}>
                  CURRENT PROJECT ({currentProjectCount})
                </Text>
              </TouchableOpacity>
            </Col>
          )}

          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onProjectHandler}
              style={styles.singleContainer}
            >
              <Image
                source={require("../../images/dashboardIcon/projects_icon.png")}
                style={styles.iconStyle}
              />
              <Text style={styles.dashboardTitleStyle}>
                PROJECTS ({allProjectCount})
              </Text>
            </TouchableOpacity>
          </Col>
        </Row>

        {this.renderCheckedInTiles()}

        <Row>
          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onCheckInCheckOutHandler}
              style={styles.singleContainer}
            >
              {this.state.IsCheckedIn ? (
                <Image
                  source={require("../../images/dashboardIcon/checkOut.png")}
                />
              ) : (
                <Image
                  source={require("../../images/dashboardIcon/checkIn.png")}
                />
              )}
              <Text style={styles.dashboardTitleStyle}>
                {this.state.strCheckInStatus}
              </Text>
              {this.props.checkInState.isLoading && <LoadingChat />}
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
    );
  }
  superVisorLandingscreen() {
    var isAccountManager =
      this.props.loginState.response.userRole === 3 ? true : false;
    const allProjectCount = this.props.projectsState.projects
      ? this.props.projectsState.projects.ProjectList.length
      : 0;
    const currentProjectCount = this.props.projectsState.currentProjects
      ? this.props.projectsState.currentProjects.ProjectList.length
      : 0;

    return (
      <Grid>
        <Row>
          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onCurrentProjectSupervisorHandler}
              style={styles.singleContainer}
            >
              <Image
                source={require("../../images/dashboardIcon/projects_icon.png")}
                style={styles.iconStyle}
              />
              <Text style={styles.dashboardTitleStyle}>
                CURRENT PROJECTS({currentProjectCount})
              </Text>
            </TouchableOpacity>
          </Col>

          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onProjectHandler}
              style={styles.singleContainer}
            >
              <Image
                source={require("../../images/dashboardIcon/projects_icon.png")}
                style={styles.iconStyle}
              />
              <Text style={styles.dashboardTitleStyle}>
                PROJECTS ({allProjectCount})
              </Text>
            </TouchableOpacity>
          </Col>
        </Row>

        <Row>
          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onPromoterHandler}
              style={styles.singleContainer}
            >
              <Image
                source={require("../../images/dashboardIcon/promoters_icon.png")}
              />
              <Text style={styles.dashboardTitleStyle}>PROMOTERS</Text>
            </TouchableOpacity>
          </Col>

          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onChatHandler}
              style={styles.singleContainer}
            >
              <Image
                source={require("../../images/dashboardIcon/chat_communication_icon.png")}
              />
              <Text style={styles.dashboardTitleStyle}>CHAT</Text>
            </TouchableOpacity>
          </Col>
        </Row>

        <Row>
          <Col style={styles.colStyle}>
            <TouchableOpacity
              onPress={this.onMyProfileHandler}
              style={styles.singleContainer}
            >
              <Image
                source={require("../../images/dashboardIcon/my_profile_icon.png")}
              />
              <Text style={styles.dashboardTitleStyle}>MY PROFILE</Text>
            </TouchableOpacity>
          </Col>

          {!isAccountManager && (
            <Col style={styles.colStyle}>
              <TouchableOpacity
                onPress={this.onCheckInCheckOutHandler}
                style={styles.singleContainer}
              >
                {this.state.IsCheckedIn ? (
                  <Image
                    source={require("../../images/dashboardIcon/checkOut.png")}
                  />
                ) : (
                  <Image
                    source={require("../../images/dashboardIcon/checkIn.png")}
                  />
                )}
                <Text style={styles.dashboardTitleStyle}>
                  {this.state.strCheckInStatus}
                </Text>
                {this.props.checkInState.isLoading && <LoadingChat />}
              </TouchableOpacity>
            </Col>
          )}
        </Row>
      </Grid>
    );
  }

  removeFailureNotification = () => {
    this.setState({
      strCheckInStatus: this.props.checkInState.IsCheckedIn
        ? "CHECK-OUT"
        : "CHECK-IN",
      IsCheckedIn: this.props.checkInState.IsCheckedIn,
      isPressed: false,
    });
    const body = {
      location: "dubai",
    };
    this.props.resetProjectsData(body);
    this.props.resetCheckInData(body);

    if (this.state.IsCheckedIn)
      this.props.projectDetailUpdate(this.props.checkInState.checkInResult);
  };

  renderGetprojectError() {
    if (this.props.projectsState.error) {
      let errorMessage =
        this.props.projectsState.error.message ||
        this.props.projectsState.error.ResponseStatus.Message;
      return (
        <Notification
          initialTop={0}
          duration={5000}
          success={false}
          message={errorMessage}
          handleRemove={this.removeFailureNotification}
        />
      );
    }
  }
  renderCheckInSuccessMessage() {
    if (this.props.checkInState.message) {
      return (
        <Notification
          initialTop={0}
          duration={5000}
          success={true}
          message={this.props.checkInState.message}
          handleRemove={this.removeFailureNotification}
        />
      );
    }
  }

  removeNotification = () => {};

  renderCheckInFailureMessage() {
    if (this.props.checkInState.error) {
      let errorMessage =
        this.props.checkInState.error.message ||
        this.props.checkInState.error.ResponseStatus
          ? this.props.checkInState.error.ResponseStatus.Message
          : "";
      return (
        <Notification
          initialTop={0}
          duration={5000}
          success={false}
          message={errorMessage}
          handleRemove={this.removeFailureNotification}
        />
      );
    }
  }

  renderDashboard() {
    var isPromoter =
      this.props.loginState.response.userRole === 2 ? true : false;
    if (isPromoter) {
      return <View style={{ flex: 1 }}>{this.promotersLandingscreen()}</View>;
    } else {
      return <View style={{ flex: 1 }}>{this.superVisorLandingscreen()}</View>;
    }
  }

  render() {
    if (!this.props.loginState.isLogin) return null;

    return (
      <View style={styles.mainContainer}>
        <View style={styles.dashboardView}>
          {this.renderCheckInSuccessMessage()}
          {this.renderCheckInFailureMessage()}

          {!this.props.appConfig.IsInternetConnected && (
            <Notification
              initialTop={0}
              duration={5000}
              success={false}
              message={"No Internet connection"}
              handleRemove={this.removeNotification}
            />
          )}

          {this.props.loginState.isLogin && (
            <AccountHeader hideCall={false} style={{ borderWidth: 0 }} />
          )}

          {this.renderDashboard()}
        </View>
      </View>
    );
  }
}

ProjectDashBoard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  getCurrentProjects: PropTypes.func.isRequired,
  promoterCheckIn: PropTypes.func.isRequired,
  resetProjectsData: PropTypes.func.isRequired,
  resetCheckInData: PropTypes.func.isRequired,
  promoterCheckout: PropTypes.func.isRequired,
  projectDetailUpdate: PropTypes.func.isRequired,
  getCheckedInStatus: PropTypes.func.isRequired,
  getAllUsers: PropTypes.func.isRequired,
  getAppConfig: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getProjects: (data) => dispatch(getProjects(data)),
  getCurrentProjects: (data) => dispatch(getCurrentProjects(data)),
  promoterCheckIn: (...data) => dispatch(promoterCheckIn(...data)),
  resetProjectsData: (data) => dispatch(resetProjectsData(data)),
  resetCheckInData: (data) => dispatch(resetCheckInData(data)),
  promoterCheckout: (data) => dispatch(promoterCheckout(data)),
  projectDetailUpdate: (data) => dispatch(projectDetailUpdate(data)),
  getCheckedInStatus: (data) => dispatch(getCheckedInStatus(data)),
  getAllUsers: (data) => dispatch(getAllUsers(data)),
  getAppConfig: () => dispatch(getAppConfig()),
});

const mapStateToProps = (state) => ({
  loginState: state.login,
  projectsState: state.projects,
  checkInState: state.checkIn,
  users: state.users,
  appConfig: state.appConfig,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectDashBoard);
