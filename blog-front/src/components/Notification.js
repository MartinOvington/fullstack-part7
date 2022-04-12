import { useSelector } from 'react-redux'

// msgType is 'error' or 'updateMsg'
const Notification = () => {
  const message = useSelector((state) => state.message)
  const msgType = useSelector((state) => state.msgType)

  if (message === '') {
    return null
  }

  return <div className={msgType}>{message}</div>
}

export default Notification
