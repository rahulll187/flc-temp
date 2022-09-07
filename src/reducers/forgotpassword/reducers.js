import {
  FLC_FORGOT_PASSWORD_LOADING,
  FLC_FORGOT_PASSWORD_SUCCESS,
  FLC_FORGOT_PASSWORD_FAILED,
  FLC_FORGOT_PASSWORD_RESET,
  FLC_RESET_PASSWORD_SUCCESS
} from './actions';

const initState = {

  isLoading:false,
  forgotPasswordResult:undefined,
  error:undefined,
  message:undefined,
};




export default function reducer(state = initState, action) {

  switch (action.type) {

      case FLC_FORGOT_PASSWORD_LOADING:
        return{
          ...state,
          isLoading:true,
          error:undefined,
        };

      case FLC_FORGOT_PASSWORD_SUCCESS:
      case FLC_RESET_PASSWORD_SUCCESS:
        return{
          ...state,
          isLoading:false,
          forgotPasswordResult:action.payload.ResponseData,
          error:undefined,
          message:action.payload.ResponseStatus.Message,
        };

      case FLC_FORGOT_PASSWORD_FAILED:
        return{
          ...state,
          isLoading:false,
          error:action.payload,
          message:undefined
        };
      case FLC_FORGOT_PASSWORD_RESET:
      return {
        initState
      }

    default:
      return state;
  }
}
