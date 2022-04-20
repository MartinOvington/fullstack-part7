import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import blogService from './services/blogs'
import usersService from './services/users'
import Togglable from './components/Toggleable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import { createBlog, setBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { setUsers } from './reducers/usersReducer'
import { useNotification } from './hooks'
import { Routes, Route, useMatch } from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const users = useSelector(({ users }) => users)
  const blogs = useSelector(({ blogs }) => blogs)
  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')
  const userParam = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null
  const blogParam = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null
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

  return (
    <div>
      <Menu user={user} handleLogout={handleLogout} />
      <h2>blogs</h2>
      <Notification />
      <div style={{ display: user === null ? '' : 'none' }}>
        <LoginForm />
      </div>
      {user ? (
        <div>
          <Routes>
            <Route path="/blogs/:id" element={<Blog blog={blogParam} />} />
            <Route path="/users/:id" element={<User user={userParam} />} />
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
        </div>
      ) : null}
    </div>
  )
}

export default App
