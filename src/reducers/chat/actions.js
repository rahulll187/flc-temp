import justFetch from '../../utils/justFetch';

export const FLC_CHAT_LOADING = 'FLC_CHAT_LOADING';
export const FLC_INSERT_MESSAGE_CHAT_LOADING = 'FLC_INSERT_MESSAGE_CHAT_LOADING';

export const FLC_GET_CHAT_SUCCESS = 'FLC_GET_CHAT_SUCCESS';
export const FLC_GET_CHAT_FAILED = 'FLC_GET_CHAT_FAILED';

export const FLC_INSERT_CHAT_SUCCESS = 'FLC_INSERT_CHAT_SUCCESS';
export const FLC_INSERT_CHAT_FAILED = 'FLC_INSERT_CHAT_FAILED';

export const FLC_CHAT_RESET = 'FLC_CHAT_RESET';

export const FLC_CHAT_RESET_OLD_CHAT = 'FLC_CHAT_RESET_OLD_CHAT';



export const serviceLoading1 = indicator => ({
  type: 'FLC_INSERT_MESSAGE_CHAT_LOADING',
  payload: indicator
});

export const serviceLoading = indicator => ({
  type: 'FLC_CHAT_LOADING',
  payload: indicator
});

export const getChatHistorySuccess = indicator => ({
  type: 'FLC_GET_CHAT_SUCCESS',
  payload: indicator
});

export const getChatHistoryFailed = data => ({
  type: 'FLC_GET_CHAT_FAILED',
  payload: data
});

export const insertChatSuccess = indicator => ({
  type: 'FLC_INSERT_CHAT_SUCCESS',
  payload: indicator
});

export const insertChatFailed = data => ({
  type: 'FLC_INSERT_CHAT_FAILED',
  payload: data
});


export const resetChatHistory = data => ({
  type: 'FLC_CHAT_RESET',
  payload: data
});

export const resetOldChat = data => ({
  type: 'FLC_CHAT_RESET_OLD_CHAT',
  payload: data
});

export const getChatHistory = (param) =>
  (dispatch, getState) => {
    const state = getState()
    const { Email } = state.login.response
    const { StoreId } = state.projects.projectDetail

    dispatch(serviceLoading(true))

    let data

    if (param.ChatTypeId === 2) {
      data = {
        FromID: Email,
        ChatTypeId: param.ChatTypeId,
        StoreId: StoreId
      }
    } else {
      data = {
        FromID: Email,
        ToID: param.toEmailId,
        ChatTypeId: param.ChatTypeId,
        StoreId: StoreId
      }
    }

    return justFetch({
      url: '/Chat/Get',
      method: 'POST',
      data,
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus;
        if (responseStatus.Code !== 'SUCCESS') {
          throw results;
        }

        const data = {
          chatResult: results.ResponseData.Messages,
          message: responseStatus.Message
        }
        return dispatch(getChatHistorySuccess(data));
      })
      .catch((error) => {
        console.log('Error:', error);
        dispatch(getChatHistoryFailed(error));
      })
  };


export const InsertChatMessage = (param) =>
  (dispatch, getState) => {
    const state = getState()
    const { Email } = state.login.response
    const { StoreId } = state.projects.projectDetail

    dispatch(serviceLoading1(true))

    let data

    if (param.ChatTypeId === 2) {
      data = {
        FromID: Email,
        ChatTypeId: param.ChatTypeId,
        StoreId: StoreId,
        message: param.message
      }
    } else {
      data = {
        FromID: Email,
        ToID: param.toEmailId,
        ChatTypeId: param.ChatTypeId,
        StoreId: StoreId,
        message: param.message
      }
    }


    return justFetch({
      url: '/Chat/Insert',
      method: 'POST',
      data
    })
      .then((results) => {
        const responseStatus = results.ResponseStatus
        if (responseStatus.Code !== 'SUCCESS') {
          throw results
        }

        const data = {
          message: responseStatus.Message
        }

        dispatch(getChatHistory(param))
        return dispatch(insertChatSuccess(data))
      })
      .catch((error) => {
        console.log('Error:', error)
        dispatch(insertChatFailed(error))
      })
  };
