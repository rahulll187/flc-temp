import {
  FLC_LOGIN_LOADING,
  FLC_LOGIN_SUCCESS,
  FLC_LOGIN_FAILED,
  FLC_LOGOUT_SUCCESS,
  FLC_LOGOUT_FAILED,
  LOGIN_RESET_STATE
} from './actions';

const initState = {
  isLoading:false,
  response: {
    DesignationName: '',
    Email: '',
    FirstName: '',
    LastName: '',
    Phone: '',
    Address: '',
    City: '',
    CountryName: '',
    State: '',
    Pincode: '',
    FilePath: '',
    userRole:0,
    tabs: [],
  },
  error:undefined,
  message:undefined,
  isLogin:false,
};




export default function reducer(state = initState, action) {

  switch (action.type) {
    case FLC_LOGIN_LOADING:
        return{
          ...state,
          isLoading:true,
          error:undefined,
        };
    case FLC_LOGIN_SUCCESS:
        return{
          ...state,
          isLoading: false,
          response: action.payload.response,
          error:undefined,
          message:action.payload.message,
          isLogin:true,
        };
    case FLC_LOGOUT_SUCCESS:
          return{
            ...state,
            isLoading:false,
            error:undefined,
            message:action.payload.message,
            isLogin:false,
          };

    case FLC_LOGIN_FAILED:
        return{
          ...state,
          isLoading:false,
          error:action.payload,
        //  message:undefined
        };
    case FLC_LOGOUT_FAILED:
          return {
            ...state,
            isLoading:false,
            error:action.payload,
          };
    case LOGIN_RESET_STATE:
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
