import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNotification } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { useNavigate } from 'react-router-dom'

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

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          data-cy="username-input"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          data-cy="password-input"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm
