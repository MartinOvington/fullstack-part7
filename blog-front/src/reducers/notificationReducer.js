const initialState = {
  message: '',
  msgType: 'error',
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return {
        message: action.data,
        msgType: state.msgType,
      }
    case 'SET_MSGTYPE':
      return {
        message: state.message,
        msgType: action.data,
      }
    case 'CLEAR_NOTIFICATION':
      return {
        message: '',
        msgType: state.msgType,
      }
    default:
      return state
  }
}

export const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    data: message,
  }
}

export const setMsgType = (msgType) => {
  return {
    type: 'SET_MSGTYPE',
    data: msgType,
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

export default notificationReducer
