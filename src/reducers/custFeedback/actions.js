import justFetch from '../../utils/justFetch';

export const FLC_CUSTOMER_FEEDBACK_LOADING = 'FLC_CUSTOMER_FEEDBACK_LOADING';
export const FLC_CUSTOMER_FEEDBACK_SUCCESS = 'FLC_CUSTOMER_FEEDBACK_SUCCESS';
export const FLC_CUSTOMER_FEEDBACK_FAILED = 'FLC_CUSTOMER_FEEDBACK_FAILED';
export const FLC_CUSTOMER_FEEDBACK_RESET = 'FLC_CUSTOMER_FEEDBACK_RESET';

export const serviceLoading = indicator => ({
    type: 'FLC_CUSTOMER_FEEDBACK_LOADING',
    payload: indicator
  });

export const customerFeedbackSuccess = indicator => ({
    type: 'FLC_CUSTOMER_FEEDBACK_SUCCESS',
    payload: indicator
  });

export const customerFeedbackFailed = data => ({
    type: 'FLC_CUSTOMER_FEEDBACK_FAILED',
    payload: data
  });

export const customerFeedbackReset = data => ({
    type: 'FLC_CUSTOMER_FEEDBACK_RESET',
    payload: data
  });

export const submitCustFeedback = (requestBody) =>
  (dispatch, getState) => {
    const state = getState();
    dispatch(serviceLoading(true));


    return justFetch({
      url: '/FeedBack/Insert',
      method: 'POST',
      data:requestBody
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }
        const data = {
          response:results,
          message:responseStatus.Message
        }
        return dispatch(customerFeedbackSuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(customerFeedbackFailed(error));
      })
  };
