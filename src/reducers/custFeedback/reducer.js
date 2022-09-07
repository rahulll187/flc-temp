import {
  FLC_CUSTOMER_FEEDBACK_LOADING,
  FLC_CUSTOMER_FEEDBACK_SUCCESS,
  FLC_CUSTOMER_FEEDBACK_FAILED,
  FLC_CUSTOMER_FEEDBACK_RESET
} from './actions';

const initState = {
  isLoading:false,
  custFeedback:undefined,
  error:undefined,
  message:undefined,
};

export default function reducer(state = initState, action) {

  switch (action.type) {
      case FLC_CUSTOMER_FEEDBACK_LOADING:
        return{
          ...state,
          isLoading:true,
          error:undefined,
        };
      case FLC_CUSTOMER_FEEDBACK_SUCCESS:
        return{
          ...state,
          isLoading:false,
          custFeedback:action.payload.response,
          error:undefined,
          message:action.payload.message,
        };

      case FLC_CUSTOMER_FEEDBACK_FAILED:
        return{
          ...state,
          isLoading:false,
          error:action.payload,
          message:undefined
        };
      case FLC_CUSTOMER_FEEDBACK_RESET:
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
