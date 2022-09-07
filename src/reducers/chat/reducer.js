import {
  FLC_CHAT_LOADING,
  FLC_INSERT_MESSAGE_CHAT_LOADING,
  FLC_GET_CHAT_SUCCESS,
  FLC_GET_CHAT_FAILED,
  FLC_INSERT_CHAT_SUCCESS,
  FLC_INSERT_CHAT_FAILED,
  FLC_CHAT_RESET,
  FLC_CHAT_RESET_OLD_CHAT
} from './actions';

const initState = {
  isLoading:false,
  isMessageSending:false,
  error:undefined,
  message:undefined,
  chatResult:[]
};




export default function reducer(state = initState, action) {

  switch (action.type) {
      case FLC_CHAT_LOADING:
        return{
          ...state,
          isLoading:true,
          error:undefined,
        };
        case FLC_INSERT_MESSAGE_CHAT_LOADING:
          return{
            ...state,
            isMessageSending:true,
            error:undefined,
          };
      case FLC_GET_CHAT_SUCCESS:
        return{
          ...state,
          isLoading:false,
          chatResult:action.payload.chatResult,
          error:undefined,
          message:action.payload.message,
        };

      case FLC_GET_CHAT_FAILED:
        return{
          ...state,
          isLoading:false,
          error:action.payload,
          //message:undefined
        };
        case FLC_INSERT_CHAT_SUCCESS:
          return{
            ...state,
            isMessageSending:false,
            isLoading:false,
            error:undefined,
            message:action.payload.message,
          };

        case FLC_INSERT_CHAT_FAILED:
          return{
            ...state,
            isMessageSending:false,
            isLoading:false,
            error:action.payload,
          };
      case FLC_CHAT_RESET:
      return {
        ...state,
        isLoading:false,
        error:undefined,
        message:undefined,
      }
      case FLC_CHAT_RESET_OLD_CHAT:
       return{
         initState
       }

    default:
      return state;
  }
}
