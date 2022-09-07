import {
  FLC_ITEMS_INSERT_LOADING,
  FLC_ITEMS_INSERT_SUCCESS,
  FLC_ITEMS_INSERT_FAILED,
  FLC_ITEMS_INSERT_RESET
} from './actions';

const initState = {
  isLoading:false,
  itemResult:undefined,
  error:undefined,
  message:undefined,
};




export default function reducer(state = initState, action) {

  switch (action.type) {
      case FLC_ITEMS_INSERT_LOADING:
        return{
          ...state,
          isLoading:true,
          error:undefined,
        };
      case FLC_ITEMS_INSERT_SUCCESS:
        return{
          ...state,
          isLoading:false,
          error:undefined,
          message:action.payload.message,
        };

      case FLC_ITEMS_INSERT_FAILED:
        return{
          ...state,
          isLoading:false,
          error:action.payload,
          message:undefined
        };
      case FLC_ITEMS_INSERT_RESET:
      return {
        initState
      }

    default:
      return state;
  }
}
