import justFetch from '../../utils/justFetch';
import { getProjectDetailsUpdated } from '../projects/actions';

export const FLC_ITEMS_INSERT_LOADING = 'FLC_ITEMS_INSERT_LOADING';
export const FLC_ITEMS_INSERT_SUCCESS = 'FLC_ITEMS_INSERT_SUCCESS';
export const FLC_ITEMS_INSERT_FAILED = 'FLC_ITEMS_INSERT_FAILED';
export const FLC_ITEMS_INSERT_RESET = 'FLC_ITEMS_INSERT_RESET';

export const serviceLoading = indicator => ({
    type: 'FLC_ITEMS_INSERT_LOADING',
    payload: indicator
  });

export const insertItemsSuccess = indicator => ({
    type: 'FLC_ITEMS_INSERT_SUCCESS',
    payload: indicator
  });

export const insertItemsFailed = data => ({
    type: 'FLC_ITEMS_INSERT_FAILED',
    payload: data
  });

export const insertItemsReset = data => ({
    type: 'FLC_ITEMS_INSERT_RESET',
    payload: data
  });


  export const InsertItems = (param) =>
    (dispatch, getState) => {
      const state = getState();
      //const { Email } = state.login.loginData.loginResponse;
      const { Email } = state.login.response;
      const { StoreId } = state.projects.projectDetail;
      dispatch(serviceLoading(true));
      const data = {
        EmailId:Email,
        StoreId:StoreId,
        PromoterEmailId:param.PromoterEmailId || Email,
        Products: param.products
      };

      return justFetch({
        url: '/OutOfStock/InsertOutOfStock',
        method: 'POST',
        data,
      })
        .then((results) => {
          const responseStatus = results.ResponseStatus;
          if (responseStatus.Code !== 'SUCCESS') {
            throw results;
          }

          const resultResponse = results.ResponseData;
          const data = {
            message:responseStatus.Message
          }
          dispatch(getProjectDetailsUpdated({location:'dubai'}))
          return dispatch(insertItemsSuccess(data));
        })
        .catch((error) => {
          console.log('Error:',error);
          dispatch(insertItemsFailed(error));
        })
    };
