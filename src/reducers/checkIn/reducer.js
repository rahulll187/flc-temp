import {
  FLC_PROMOTERS_CHECKIN_LOADING,
  FLC_PROMOTERS_CHECKIN_SUCCESS,
  FLC_PROMOTERS_CHECKIN_FAILED,
  FLC_PROMOTERS_CHECKOUT_SUCCESS,
  FLC_PROMOTERS_CHECKOUT_FAILED,
  FLC_GET_CHECKIN_STATUS_SUCCESS,
  FLC_GET_CHECKIN_STATUS_FAILED,
  FLC_PROMOTERS_CHECKIN_RESET
} from './actions';

const initState = {
  IsCheckedIn:false,
  isLoading:false,
  checkInResult:undefined,
  checkOutResult:undefined,
  checkInStatusResult:undefined,
  error:undefined,
  message:undefined,
};

export default function reducer(state = initState, action) {

  switch (action.type) {

      case FLC_PROMOTERS_CHECKIN_LOADING:
        return {
          ...state,
          isLoading:true,
          error:undefined,
        };
      case FLC_PROMOTERS_CHECKIN_SUCCESS:
        return{
          ...state,
          isLoading:false,
          IsCheckedIn:true,
          checkInResult:action.payload.response,
          error:undefined,
          message:action.payload.message,
        };
      case FLC_PROMOTERS_CHECKIN_FAILED:
        return{
          ...state,
          isLoading:false,
          IsCheckedIn:false,
          error:action.payload,
          message:undefined
        };
        case FLC_PROMOTERS_CHECKOUT_SUCCESS:
          return{
            ...state,
            isLoading:false,
            IsCheckedIn:false,
            checkOutResult:action.payload.ResponseData,
            checkInResult:undefined,
            error:undefined,
            message:action.payload.ResponseStatus.Message,
          };
        case FLC_PROMOTERS_CHECKOUT_FAILED:
          return{
            ...state,
            isLoading:false,
            IsCheckedIn:false,
            error:action.payload,
            message:undefined
          };

          case FLC_GET_CHECKIN_STATUS_SUCCESS:
            return{
              ...state,
              isLoading:false,
              checkInStatusResult:action.payload.ResponseData,
              error:undefined,
              // message:action.payload.ResponseStatus.Message,
            };
          case FLC_GET_CHECKIN_STATUS_FAILED:
            return{
              ...state,
              isLoading:false,
              error:action.payload,
              // message:undefined
            };

      case FLC_PROMOTERS_CHECKIN_RESET:
      return {
        ...state,
        isLoading:false,
        error:undefined,
        message:undefined
      }
    default:
      return state;
  }
}
