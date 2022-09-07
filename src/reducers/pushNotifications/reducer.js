import {
  SET_DEVICE_TOKEN,
  SET_CURRENT_NOTIFICATION,
  RESET_CURRENT_NOTIFICATION
} from './actions';

export const initState = {
  token: undefined,
  incidentId: undefined,
  foreground : undefined ,
  userInteraction:undefined,
  notificationId:undefined
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case SET_DEVICE_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };
    case SET_CURRENT_NOTIFICATION:
      return {
        ...state,
        ...action.payload
      };
    case RESET_CURRENT_NOTIFICATION:
      return {
        ...state,
        incidentId: undefined,
        foreground : undefined,
        userInteraction : undefined,
        notificationId:undefined
      };
    default:
      return state;
  }
}
