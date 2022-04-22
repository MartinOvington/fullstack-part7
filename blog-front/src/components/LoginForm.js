import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'
import { TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const createNotification = useNotification()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      createNotification('logged in', 'updateMsg')
      dispatch(setUser(user))
      navigate('/')
    } catch (exception) {
      createNotification('wrong username or password', 'error')
    }
  }

  const padding = {
    padding: 20,
  }

  return (
    <form onSubmit={handleLogin} style={padding}>
      <div>
        <TextField
          variant="outlined"
          type="text"
          value={username}
          label="Username"
          onChange={({ target }) => setUsername(target.value)}
          data-cy="username-input"
        />
        <TextField
          variant="outlined"
          type="password"
          value={password}
          label="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-cy="password-input"
        />
      </div>
      <Button type="submit" variant="outlined">
        login
      </Button>
    </form>
  )
}

export default LoginForm
