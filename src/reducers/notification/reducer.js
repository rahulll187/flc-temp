import {
  FLC_NOTIFICATION_LOADING,
  FLC_GET_NOTIFICATION_LIST_SUCCESS,
  FLC_GET_NOTIFICATION_LIST_FAILED,
  FLC_UPDATE_NOTIFICATION_SUCCESS,
  FLC_UPDATE_NOTIFICATION_FAILED,
  FLC_NOTIFICATION_RESET
} from './actions';

const initState = {
  isLoading:false,
  arrNotificationResult:[],
  error:undefined,
  message:undefined,
};

export default function reducer(state = initState, action) {

  switch (action.type) {
      case FLC_NOTIFICATION_LOADING:
        return{
          ...state,
          isLoading:true,
          error:undefined,
        };
      case FLC_GET_NOTIFICATION_LIST_SUCCESS:
        return{
          ...state,
          isLoading:false,
          arrNotificationResult:action.payload.response,
          error:undefined,
          message:action.payload.message,
        };
      case FLC_UPDATE_NOTIFICATION_SUCCESS:
        return {
          ...state,
          isLoading:false,
          error:undefined,
          message:action.payload.message,
        };
      case FLC_UPDATE_NOTIFICATION_FAILED:
      return {
        ...state,
        isLoading:false,
        error:action.payload,
        message:undefined
      };

      case FLC_GET_NOTIFICATION_LIST_FAILED:
        return{
          ...state,
          isLoading:false,
          error:action.payload,
          //message:undefined
        };
      case FLC_NOTIFICATION_RESET:
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
