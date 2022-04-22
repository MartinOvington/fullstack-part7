import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'

// msgType is 'error' or 'updateMsg'
const Notification = () => {
  const message = useSelector(({ notification }) => notification.message)
  const msgType = useSelector(({ notification }) => notification.msgType)

  if (message === '') {
    return null
  }

  // eslint-disable-next-line quotes
  const severity = msgType === 'error' ? 'error' : 'success'

  return (
    <Alert variant="filled" severity={severity}>
      {message}
    </Alert>
  )
}

export default Notification
