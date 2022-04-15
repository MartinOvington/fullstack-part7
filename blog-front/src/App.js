import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import { createBlog, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useNotification } from './hooks'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const user = useSelector(({ user }) => user)
  const notification = useNotification()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs))
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappuser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      notification.createNotification('logged in', 'updateMsg')
    } catch (exception) {
      notification.createNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    notification.createNotification('logged out', 'updateMsg')
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      notification.createNotification(
        `a new blog 
        ${blogObject.title === undefined ? '' : blogObject.title} 
        by 
        ${blogObject.author === undefined ? '' : blogObject.author}`,
        'updateMsg'
      )
      dispatch(createBlog(returnedBlog))
    } catch (exception) {
      notification.createNotification('blog creation failed', 'error')
    }
  }

  const increaseLikes = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      dispatch(
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      )
    } catch (err) {
      dispatch(setBlogs(blogs.filter((n) => n.id !== id)))
      notification.createNotification(
        'was already removed from server',
        'error'
      )
    }
  }

  const deleteBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(id)
        dispatch(setBlogs(blogs.filter((b) => b.id !== id)))
        notification.createNotification('blog removed', 'updateMsg')
      }
    } catch (err) {
      dispatch(setBlogs(blogs.filter((b) => b.id !== id)))
      notification.createNotification(
        'was already removed from server',
        'error'
      )
    }
  }

  const loginForm = () => (
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

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          {user.name} is logged in
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              increaseLikes={() => increaseLikes(blog.id)}
              deleteBlog={() => deleteBlog(blog.id)}
              username={user.username}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default App
