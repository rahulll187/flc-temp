import justFetch from '../../utils/justFetch';
import { getCurrentProjects,getProjects } from '../projects/actions';

export const FLC_PROMOTERS_CHECKIN_LOADING = 'FLC_PROMOTERS_CHECKIN_LOADING';
export const FLC_PROMOTERS_CHECKIN_SUCCESS = 'FLC_PROMOTERS_CHECKIN_SUCCESS';
export const FLC_PROMOTERS_CHECKIN_FAILED = 'FLC_PROMOTERS_CHECKIN_FAILED';

export const FLC_PROMOTERS_CHECKOUT_SUCCESS = 'FLC_PROMOTERS_CHECKOUT_SUCCESS';
export const FLC_PROMOTERS_CHECKOUT_FAILED = 'FLC_PROMOTERS_CHECKOUT_FAILED';

export const FLC_GET_CHECKIN_STATUS_SUCCESS = 'FLC_GET_CHECKIN_STATUS_SUCCESS';
export const FLC_GET_CHECKIN_STATUS_FAILED = 'FLC_GET_CHECKIN_STATUS_FAILED';

export const FLC_PROMOTERS_CHECKIN_RESET = 'FLC_PROMOTERS_CHECKIN_RESET';


export const serviceLoading = indicator => ({
    type: 'FLC_PROMOTERS_CHECKIN_LOADING',
    payload: indicator
  });

export const serviceSuccess = data => ({
    type: 'FLC_PROMOTERS_CHECKIN_SUCCESS',
    payload: data
  });

export const serviceFailed = error => ({
    type: 'FLC_PROMOTERS_CHECKIN_FAILED',
    payload: error
  });

  export const serviceSuccess1 = data => ({
      type: 'FLC_PROMOTERS_CHECKOUT_SUCCESS',
      payload: data
    });

  export const serviceFailed1 = error => ({
      type: 'FLC_PROMOTERS_CHECKOUT_FAILED',
      payload: error
    });

    export const serviceSuccess2 = data => ({
        type: 'FLC_GET_CHECKIN_STATUS_SUCCESS',
        payload: data
      });

    export const serviceFailed2 = error => ({
        type: 'FLC_GET_CHECKIN_STATUS_FAILED',
        payload: error
      });

export const resetCheckInData = data => ({
  type: 'FLC_PROMOTERS_CHECKIN_RESET',
  payload: data
});

export const promoterCheckIn = (param,geolocation) =>(dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    dispatch(serviceLoading(true));
    const data = {
      EmailId:Email,
      checkInEnable: true,
      // Latitude: "12.9149556",//geolocation.latitude,
      // Longitude: "77.6223569",//geolocation.longitude
      Latitude: geolocation.latitude,
      Longitude: geolocation.longitude
    };

    return justFetch({
      url: '/CheckIn/CheckIn',
      method: 'POST',
      data,
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
        dispatch(getCurrentProjects({location:'dubai'}));
        return dispatch(serviceSuccess(data));
      })
      .catch((error) => {
        console.log('promoterCheckIn:',error);
        dispatch(serviceFailed(error));
      })
  };

  export const promoterCheckout = (param) =>(dispatch, getState) => {
      const state = getState();
      //const { Email } = state.login.loginData.loginResponse;
      const { Email } = state.login.response;
      dispatch(serviceLoading(true));
      const data = {
        EmailId:Email
      };

      return justFetch({
        url: '/CheckOut/CheckOut',
        method: 'POST',
        data,
      })
        .then((results) => {
          const responseStatus = results.ResponseStatus;
          if (responseStatus.Code !== 'SUCCESS') {
            throw results;
          }
          dispatch(serviceSuccess1(results))
          dispatch(getProjects({location:'dubai'}))
          return dispatch(getCurrentProjects({location:'dubai'}))
        })
        .catch((error) => {
          console.log('Error:',error);
          dispatch(serviceFailed1(error));
        })
    };

    export const getCheckedInStatus = (param) =>(dispatch, getState) => {
        const state = getState();
        //const { Email } = state.login.loginData.loginResponse;
        const { Email } = state.login.response;
        //dispatch(serviceLoading(true));
        const data = {
          EmailId:Email
        };

        return justFetch({
          url: '/CheckIn/CheckInStatus',
          method: 'POST',
          data,
        })
          .then((results) => {
            const responseStatus = results.ResponseStatus;
            if (responseStatus.Code !== 'SUCCESS') {
              throw results;
            }

            if(results.ResponseData.CheckInStatus === 'CHECKEDIN') {
              dispatch(getCurrentProjects({location:'dubai'}));
            }
            return dispatch(serviceSuccess2(results));
          })
          .catch((error) => {
            console.log('Error:',error);
            dispatch(serviceFailed2(error));
          })
      };
