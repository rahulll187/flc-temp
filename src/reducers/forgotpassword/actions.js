import justFetch from '../../utils/justFetch';

export const FLC_FORGOT_PASSWORD_LOADING = 'FLC_FORGOT_PASSWORD_LOADING';
export const FLC_FORGOT_PASSWORD_SUCCESS = 'FLC_FORGOT_PASSWORD_SUCCESS';
export const FLC_FORGOT_PASSWORD_FAILED = 'FLC_FORGOT_PASSWORD_FAILED';
export const FLC_FORGOT_PASSWORD_RESET = 'FLC_FORGOT_PASSWORD_RESET';

export const FLC_RESET_PASSWORD_SUCCESS = 'FLC_RESET_PASSWORD_SUCCESS';


export const forgotPassword = (param) =>
  (dispatch, getState) => {
    const state = getState();
    dispatch(serviceLoading(true));
    const data = {
      EmailId:param.email,
    };

    return justFetch({
      url: '/UserMobile/ForgotPassword',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }
        return dispatch(serviceSuccess(results));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(serviceFailed(error));
      })
  };


  export const resetPassword = (param) =>
    (dispatch, getState) => {
      const state = getState();
      dispatch(serviceLoading(true));
      const data = {
        EmailId:param.EmailId,
        EmailToken:param.tokenpassword,
        NewPassword:param.newpassword,
      };

      return justFetch({
        url: '/UserMobile/ResetPassword',
        method: 'POST',
        data,
      })
        .then((results) => {
          const responseStatus = results.ResponseStatus;
          if (responseStatus.Code !== 'SUCCESS') {
            throw results;
          }
          return dispatch(resetpasswordSuccess(results));
        })
        .catch((error) => {
          console.log('Error:',error);
          dispatch(serviceFailed(error));
        })
    };

  export const serviceLoading = indicator => ({
      type: 'FLC_FORGOT_PASSWORD_LOADING',
      payload: indicator
    });

  export const serviceSuccess = data => ({
      type: 'FLC_FORGOT_PASSWORD_SUCCESS',
      payload: data
    });
  export const resetpasswordSuccess = data => ({
      type: 'FLC_RESET_PASSWORD_SUCCESS',
      payload: data
    });


  export const serviceFailed = error => ({
      type: 'FLC_FORGOT_PASSWORD_FAILED',
      payload: error
    });

  export const resetForgotPasswordData = data => ({
    type: 'FLC_FORGOT_PASSWORD_RESET',
    payload: data
  });
