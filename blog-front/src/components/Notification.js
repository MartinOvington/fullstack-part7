import { useSelector } from 'react-redux'

// msgType is 'error' or 'updateMsg'
const Notification = () => {
  const message = useSelector(({ notification }) => notification.message)
  const msgType = useSelector(({ notification }) => notification.msgType)

  if (message === '') {
    return null
  }

  return <div className={msgType}>{message}</div>
}

export default Notification
