import { combineReducers } from "redux";
import {
  persistCombineReducers,
  createTransform,
  purgeStoredState,
} from "redux-persist";
import { Platform } from "react-native";
import { reducer as formReducer } from "redux-form";

import login from "./login/reducers";
import forgotpassword from "./forgotpassword/reducers";
import projects from "./projects/reducers";
import pushNotifications from "./pushNotifications/reducer";
import notifications from "./notification/reducer";

import checkIn from "./checkIn/reducer";
import users from "./users/reducer";
import custFeedback from "./custFeedback/reducer";
import chatData from "./chat/reducer";
import appState from "./appState/reducer";

import appConfig from "./appConfig/reducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import storage from 'redux-persist/lib/storage'

const sensitiveStorageOptions = {
  sharedPreferencesName: "arowana.fieldForce",
  keychainService: "arowana.fieldForce",
};

const userDataBlacklist = createTransform(
  (state) => {
    const savedState = {
      ...state,
    };
    return savedState;
  },
  (state) => {
    const restoredState = {
      ...state,
    };

    return restoredState;
  },
  { whitelist: ["userData", "login"] }
);

const storageSettings = {
  key: "primary",
  storage: AsyncStorage,
  transforms: [userDataBlacklist],
  blacklist: ["form"], //Remvoe from store when application quites
};

// userData: combineReducers({
//   login
// }),
const appReducer = persistCombineReducers(storageSettings, {
  form: formReducer,
  login,
  forgotpassword,
  projects,
  checkIn,
  users,
  custFeedback,
  appState,
  appConfig,
  chatData,
  pushNotifications,
  notifications,
});

const rootReducer = (state, action) => {
  let thisState = state;

  if (action.type === "USER_LOGOUT") {
    const oldPushNotifications = JSON.parse(
      JSON.stringify(state.pushNotifications)
    );
    const deviceToken = oldPushNotifications.token;

    var oldPersist;
    if (state._persist) {
      oldPersist = JSON.parse(JSON.stringify(state._persist));
    }
    thisState = {};

    thisState = {
      pushNotifications: {
        token: deviceToken,
      },
    };

    thisState._persist = oldPersist;
  }

  // this fix an issue in persist store when we logout and then login!
  if (thisState && thisState._persist == undefined) {
    delete thisState._persist;
  }

  return appReducer(thisState, action);
};

export default rootReducer;
