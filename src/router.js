import React, { Component } from "react";
import { BackHandler, AppState } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { Router, Scene, Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import PropTypes from "prop-types";

import Login from "./containers/login";
import ForgotPassword from "./containers/forgotpassword";
import ResetNewPassword from "./containers//forgotpassword/resetnewpassword";
import ProjectDashBoard from "./containers/dashboard";

import Evaluation from "./containers/evaluation";
import Promoters from "./containers/promoters";
import Chat from "./containers/chat";
import ChatProjects from "./containers/chat/projects";
import ChatMembers from "./containers/chat/members";

import MyProfile from "./containers/myprofile";
import CustomerInfo from "./containers/customerInfo";
import Notifications from "./containers/notifications";
import GallaryAlbum from "./containers/gallary";

import ProjectsList from "./containers/projects";
import ProjectDetails from "./containers/projects/details";
import { updateInternetStatus } from "./reducers/appConfig/actions";

import {
  setDeviceToken,
  setCurrentNotification,
} from "./reducers/pushNotifications/actions";
import PushNotification from "react-native-push-notification";
import { updateAppState } from "./reducers/appState/actions";
import initPushNotifications from "./utils/initPushNotifications";

class RootRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appState: AppState.currentState,
    };
    AppState.addEventListener("change", this._handleAppStateChange);
    // NetInfo.isConnected.addEventListener(
    //   "connectionChange",
    //   this._handleConnectivityChange
    // );
  }

  resetPNBadge() {
    PushNotification.setApplicationIconBadgeNumber(0);
  }

  _handleAppStateChange = (nextAppState) => {
    console.log("_handleAppStateChange:", nextAppState);

    if (this.state.appState.match(/background/) && nextAppState === "active") {
      var { token } = this.props.pushNotifications;
    }

    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      this.resetPNBadge();
    }
    this.props.updateAppState(nextAppState);
    this.setState({ appState: nextAppState });
  };

  _handleConnectivityChange = (isConnected) => {
    console.log("handleConnectivityChange", isConnected);
    this.props.updateInternetStatus(isConnected);
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (
        Actions.currentScene === "Login" ||
        Actions.currentScene === "ProjectDashBoard"
      ) {
        BackHandler.exitApp();
      }
    });

    initPushNotifications(
      (token) => {
        this.props.setDeviceToken(token);
      },
      (incidentId, foreground, userInteraction, notificationId) => {
        this.props.setCurrentNotification(
          incidentId,
          foreground,
          userInteraction,
          notificationId
        );
      }
    );

    this.resetPNBadge();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const isLoggedIn = this.props.loginState.isLogin;

    return (
      <Router>
        <Scene key="root" initial hideNavBar>
          <Scene
            key="Login"
            component={Login}
            title="Login"
            initial={!isLoggedIn}
          />
          <Scene
            key="ForgotPassword"
            component={ForgotPassword}
            title="Forgot password"
          />
          <Scene
            key="ResetNewPassword"
            component={ResetNewPassword}
            title="Reset new password"
          />

          <Scene
            key="ProjectDashBoard"
            component={ProjectDashBoard}
            title="ProjectDashBoard"
            initial={isLoggedIn}
          />

          <Scene key="Evaluation" component={Evaluation} title="Evaluation" />
          <Scene key="Promoters" component={Promoters} title="Promoters" />
          <Scene key="Chat" component={Chat} title="Chat" />
          <Scene
            key="ChatProjects"
            component={ChatProjects}
            title="Chat / Communication"
          />
          <Scene
            key="ChatMembers"
            component={ChatMembers}
            title="Chat / Communication"
          />

          <Scene key="ProjectsList" component={ProjectsList} title="Projects" />
          <Scene
            key="ProjectDetails"
            component={ProjectDetails}
            title="Project"
          />

          <Scene key="MyProfile" component={MyProfile} title="My Profile" />
          <Scene
            key="CustomerInfo"
            component={CustomerInfo}
            title="Customer Information"
          />
          <Scene
            key="Notifications"
            component={Notifications}
            title="Notifications"
          />
          <Scene key="GallaryAlbum" component={GallaryAlbum} title="Images" />
        </Scene>
      </Router>
    );
  }
}

RootRouter.propTypes = {
  setDeviceToken: PropTypes.func.isRequired,
  setCurrentNotification: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loginState: state.login,
  pushNotifications: state.pushNotifications,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateInternetStatus,
      setDeviceToken,
      setCurrentNotification,
      updateAppState,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(RootRouter);
