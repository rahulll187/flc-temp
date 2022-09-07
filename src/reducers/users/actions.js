import justFetch from '../../utils/justFetch';

export const FLC_GET_ALL_USER_LOADING = 'FLC_GET_ALL_USER_LOADING';
export const FLC_GET_ALL_USER_SUCCESS = 'FLC_GET_ALL_USER_SUCCESS';
export const FLC_GET_ALL_USER_FAILED = 'FLC_GET_ALL_USER_FAILED';
export const FLC_GET_ALL_USER_RESET = 'FLC_GET_ALL_USER_RESET';

export const serviceLoading = indicator => ({
    type: 'FLC_GET_ALL_USER_LOADING',
    payload: indicator
  });

export const getAllUsersSuccess = indicator => ({
    type: 'FLC_GET_ALL_USER_SUCCESS',
    payload: indicator
  });

export const getAllUsersFailed = data => ({
    type: 'FLC_GET_ALL_USER_FAILED',
    payload: data
  });

export const getAllUsersReset = data => ({
    type: 'FLC_GET_ALL_USER_RESET',
    payload: data
  });

export const getAllUsers = (param) =>
  (dispatch, getState) => {
    const state = getState();
    //const { Email } = state.login.loginData.loginResponse;
    const { Email } = state.login.response;
    dispatch(serviceLoading(true));
    const data = {
      EmailId:Email
    };

    return justFetch({
      url: '/UserMobile/GetAllPromoters',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        const resultResponse = results.ResponseData.Promoters;
        let arrUsers = [];
        for(var i = 0 ; i <resultResponse.length ; i++){
          const {CountryName,Email,FirstName,LastName,Phone,Designation} = resultResponse[i];
          let UserImage = '';
          if(resultResponse[i].UserImage.length)
             UserImage = resultResponse[i].UserImage[0].FilePath;
          arrUsers.push({
            name: FirstName + ' ' + LastName,
            designation: Designation,
            citizanship:CountryName,
            emailId:Email,
            mobileNumber:Phone,
            profilePicture:UserImage,
            index: i
          })
        }

        const data = {
          response:arrUsers,
          message:responseStatus.Message
        }

        return dispatch(getAllUsersSuccess(data));
      })
      .catch((error) => {
        console.log('Error:',error);
        dispatch(getAllUsersFailed(error));
      })
  };
