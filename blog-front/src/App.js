import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Users from './components/Users'
import Notification from './components/Notification'
import blogService from './services/blogs'
import usersService from './services/users'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import { createBlog, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import { useNotification } from './hooks'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const createNotification = useNotification()
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      dispatch(setBlogs(blogs))
    })
    usersService.getAll().then((users) => {
      dispatch(setUsers(users))
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

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div style={{ display: user === null ? '' : 'none' }}>
        <LoginForm />
      </div>
      {user ? (
        <Router>
          <div>
            <Link style={padding} to="/">
              Blogs
            </Link>
            <Link style={padding} to="/users">
              Users
            </Link>
          </div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route
              path="/"
              element={
                <div>
                  <Togglable buttonLabel="new blog" ref={blogFormRef}>
                    <BlogForm createBlog={addBlog} />
                  </Togglable>
                  <Blogs />
                </div>
              }
            />
          </Routes>
        </Router>
      ) : null}
    </div>
  )
}

export default App
