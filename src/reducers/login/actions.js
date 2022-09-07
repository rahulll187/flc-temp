import { Platform } from "react-native";

import justFetch from "../../utils/justFetch";

export const FLC_LOGIN_LOADING = "FLC_LOGIN_LOADING";
export const FLC_LOGIN_SUCCESS = "FLC_LOGIN_SUCCESS";
export const FLC_LOGIN_FAILED = "FLC_LOGIN_FAILED";
export const FLC_LOGOUT_SUCCESS = "FLC_LOGOUT_SUCCESS";
export const FLC_LOGOUT_FAILED = "FLC_LOGOUT_FAILED";

export const LOGIN_RESET_STATE = "LOGIN_RESET_STATE";

export const userLogin = (param) => (dispatch, getState) => {
  const state = getState();
  const { token } = state.pushNotifications;
  dispatch(serviceLoading(true));
  const data = {
    EmailId: param.email,
    Password: param.password,
    DeviceToken: token,
    DeviceType: Platform.OS === "android" ? "android" : "iOS",
  };
  console.log("data--", data);
  return justFetch({
    url: "/UserMobile/UserLogin",
    method: "POST",
    data,
  })
    .then((results) => {
      const responseStatus = results.ResponseStatus;
      console.log("responseStatus--", responseStatus);
      if (responseStatus.Code !== "SUCCESS") {
        throw results;
      }
      const resultResponse = results.ResponseData;
      const { DesignationName, Email, FirstName, LastName, Phone, UserImage } =
        resultResponse;
      const { Address, City, CountryName, State, Pincode } =
        resultResponse.AddressDetail;
      var tabs = [];
      var role = 0;

      if (DesignationName === "Promoter") {
        role = 2;
        tabs = [
          "Details",
          "Users",
          "Issues",
          "Items",
          "Media",
          "Sales report",
          "Competition report",
        ];
      } else if (DesignationName === "Supervisor") {
        role = 1;
        tabs = [
          "Details",
          "Users",
          "Issues",
          "Monitoring",
          "Items",
          "Media",
          "Competition report",
        ];
      } else if (DesignationName === "Account Manager") {
        role = 3;
        tabs = ["Details", "Users", "Issues", "Monitoring", "Items", "Media"];
      }
      const response = {
        DesignationName: DesignationName,
        Email: Email,
        FirstName: FirstName,
        LastName: LastName,
        Phone: Phone,
        Address: Address,
        City: City,
        CountryName: CountryName,
        State: State,
        Pincode: Pincode,
        FilePath: UserImage.length ? UserImage[0].FilePath : "",
        userRole: role,
        tabs: tabs,
      };
      const data = {
        response: response,
        message: responseStatus.Message,
      };
      return dispatch(serviceSuccess(data));
    })
    .catch((error) => {
      console.log("UserLogin Error:", error);
      dispatch(serviceFailed(error));
    });
};

export const userLogout = () => (dispatch, getState) => {
  const state = getState();
  //const { Email } = state.login.loginData.loginResponse;
  const { Email } = state.login.response;

  dispatch(serviceLoading(true));
  const data = {
    EmailId: Email,
  };

  return justFetch({
    url: "/UserMobile/UserLogout",
    method: "POST",
    data,
  })
    .then((results) => {
      const responseStatus = results.ResponseStatus;
      if (responseStatus.Code !== "SUCCESS") {
        throw results;
      }

      // const resultResponse = results.ResponseData;
      const data = {
        // loginResponse: resultResponse,
        message: responseStatus.Message,
      };

      return dispatch(logoutSuccess(data));
    })
    .catch((error) => {
      console.log("UserLogin Error:", error);
      dispatch(logoutFailed(error));
    });
};

export const serviceLoading = (indicator) => ({
  type: "FLC_LOGIN_LOADING",
  payload: indicator,
});

export const logoutSuccess = (data) => ({
  type: "FLC_LOGOUT_SUCCESS",
  payload: data,
});

export const logoutFailed = (data) => ({
  type: "FLC_LOGOUT_FAILED",
  payload: data,
});

export const serviceSuccess = (data) => ({
  type: "FLC_LOGIN_SUCCESS",
  payload: data,
});

export const serviceFailed = (error) => ({
  type: "FLC_LOGIN_FAILED",
  payload: error,
});

export const resetLoginData = (data) => ({
  type: "LOGIN_RESET_STATE",
  payload: data,
});
