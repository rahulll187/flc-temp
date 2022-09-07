import {
  FLC_GET_ALL_USER_LOADING,
  FLC_GET_ALL_USER_SUCCESS,
  FLC_GET_ALL_USER_FAILED,
  FLC_GET_ALL_USER_RESET
} from './actions';

const initState = {
  isLoading:false,
  allUsers:undefined,
  error:undefined,
  message:undefined,
};




export default function reducer(state = initState, action) {

  switch (action.type) {
      case FLC_GET_ALL_USER_LOADING:
        return{
          ...state,
          isLoading:true,
          error:undefined,
        };
      case FLC_GET_ALL_USER_SUCCESS:
        return{
          ...state,
          isLoading:false,
          allUsers:action.payload.response,
          error:undefined,
          message:action.payload.message,
        };

      case FLC_GET_ALL_USER_FAILED:
        return{
          ...state,
          isLoading:false,
          error:action.payload,
          //message:undefined
        };
      case FLC_GET_ALL_USER_RESET:
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
