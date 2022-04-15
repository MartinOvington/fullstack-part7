import { useDispatch } from 'react-redux'
import {
  setMessage,
  setMsgType,
  clearNotification,
} from '../reducers/notificationReducer'

export const useNotification = () => {
  const dispatch = useDispatch()

  const createNotification = (message, msgType) => {
    dispatch(setMsgType(msgType))
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return {
    createNotification,
  }
}
