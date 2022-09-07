import {
  UPDATE_APP_STATE,
} from './actions';

export const initState = {
  current: '',
};

export default function reducer(state = initState, action) {
  switch (action.type) {
    case UPDATE_APP_STATE:
      return {
        current: action.payload
      };
    
    default:
      return state;
  }
}
