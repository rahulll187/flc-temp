import justFetch from '../../utils/justFetch';

export const FLC_NOTIFICATION_LOADING = 'FLC_NOTIFICATION_LOADING';
export const FLC_GET_NOTIFICATION_LIST_SUCCESS = 'FLC_GET_NOTIFICATION_LIST_SUCCESS';
export const FLC_GET_NOTIFICATION_LIST_FAILED = 'FLC_GET_NOTIFICATION_LIST_FAILED';
export const FLC_UPDATE_NOTIFICATION_SUCCESS = 'FLC_UPDATE_NOTIFICATION_SUCCESS';
export const FLC_UPDATE_NOTIFICATION_FAILED = 'FLC_UPDATE_NOTIFICATION_FAILED';
export const FLC_NOTIFICATION_RESET = 'FLC_NOTIFICATION_RESET';

export const serviceLoading = indicator => ({
    type: 'FLC_NOTIFICATION_LOADING',
    payload: indicator
  });

export const getNotificationSuccess = indicator => ({
    type: 'FLC_GET_NOTIFICATION_LIST_SUCCESS',
    payload: indicator
  });

export const getNotificationFailed = data => ({
    type: 'FLC_GET_NOTIFICATION_LIST_FAILED',
    payload: data
  });


  export const updateNotificationSuccess = indicator => ({
      type: 'FLC_UPDATE_NOTIFICATION_SUCCESS',
      payload: indicator
    });

  export const updateNotificationFailed = data => ({
      type: 'FLC_UPDATE_NOTIFICATION_FAILED',
      payload: data
    });


export const notificationReset = data => ({
    type: 'FLC_NOTIFICATION_RESET',
    payload: data
  });

export const getNotifications = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    dispatch(serviceLoading(true));
    const data = {
      EmailId:Email
    };

    return justFetch({
      url: '/Notification/Get',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }
        const resultResponse = results.ResponseData.Notifications;
        const data = {
          response:resultResponse,
          message:responseStatus.Message
        }
        return dispatch(getNotificationSuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(getNotificationFailed(error));
      })
  };