import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Notification from './components/Notification'
import blogService from './services/blogs'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { createBlog, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { useNotification } from './hooks'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const createNotification = useNotification()

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

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      createNotification(
        `a new blog 
        ${blogObject.title === undefined ? '' : blogObject.title} 
        by 
        ${blogObject.author === undefined ? '' : blogObject.author}`,
        'updateMsg'
      )
      dispatch(createBlog(returnedBlog))
    } catch (exception) {
      createNotification('blog creation failed', 'error')
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(setUser(null))
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    createNotification('logged out', 'updateMsg')
  }

  const blogFormRef = useRef()

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div style={{ display: user === null ? '' : 'none' }}>
        <LoginForm />
      </div>
      {user ? (
        <div>
          {user.name + ' logged in'}
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <Blogs />
        </div>
      ) : null}
    </div>
  )
}

export default App
