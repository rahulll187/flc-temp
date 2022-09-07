import justFetch from '../../utils/justFetch'

export const FLC_APP_CONFIG_LOADING = 'FLC_APP_CONFIG_LOADING'
export const FLC_APP_CONFIG_SUCCESS = 'FLC_APP_CONFIG_SUCCESS'
export const FLC_APP_CONFIG_FAILED = 'FLC_APP_CONFIG_FAILED'
export const FLC_APP_CONFIG_RESET = 'FLC_APP_CONFIG_RESET'
export const APP_INTERNET_STATUS = 'APP_INTERNET_STATUS'

export const updateInternetStatus = data => ({
  type: 'APP_INTERNET_STATUS',
  payload: data
});

export const serviceLoading = indicator => ({
  type: 'FLC_APP_CONFIG_LOADING',
  payload: indicator
});

export const apConfigSuccess = indicator => ({
  type: 'FLC_APP_CONFIG_SUCCESS',
  payload: indicator
});

export const apConfigFailed = data => ({
  type: 'FLC_APP_CONFIG_FAILED',
  payload: data
});

export const apConfigReset = data => ({
  type: 'FLC_APP_CONFIG_RESET',
  payload: data
});


export const getAppConfig = (param) =>
  (dispatch, getState) => {
    const state = getState()
    const { Email } = state.login.response
    dispatch(serviceLoading(true))
    const data = {
      EmailID: Email,
    };

    return justFetch({
      url: 'UserMobile/AppConfig',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus
        if (responseStatus.Code !== 'SUCCESS') {
          throw results
        }

        const data = {
          response: results.ResponseData,
          message: responseStatus.Message
        }
        return dispatch(apConfigSuccess(data))
      })
      .catch((error) => {
        console.log('Error:', error)
        dispatch(apConfigFailed(error))
      })
  };
