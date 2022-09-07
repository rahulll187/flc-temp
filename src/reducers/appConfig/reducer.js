import {
  APP_INTERNET_STATUS,
  FLC_APP_CONFIG_LOADING,
  FLC_APP_CONFIG_SUCCESS,
  FLC_APP_CONFIG_FAILED,
  FLC_APP_CONFIG_RESET
} from './actions';

const initState = {
  IsInternetConnected: true,
  isLoading: false,
  CheckedInStatus: false,
  NotificationCount: 0,
  error: undefined,
  message: undefined,
};

export default function reducer(state = initState, action) {

  switch (action.type) {
    case APP_INTERNET_STATUS:
      return {
        ...state,
        IsInternetConnected: action.payload
      };
    case FLC_APP_CONFIG_LOADING:
      return {
        ...state,
        isLoading: true,
        error: undefined,
      };
    case FLC_APP_CONFIG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...action.payload.response,
        error: undefined,
        message: action.payload.message,
      };
    case FLC_APP_CONFIG_FAILED:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        message: undefined
      };
    case FLC_APP_CONFIG_RESET:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        message: undefined
      };

    default:
      return state;
  }
}
