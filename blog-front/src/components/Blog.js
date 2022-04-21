import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { setBlogs } from '../reducers/blogReducer'
import { useNotification } from '../hooks'

const Blog = ({ blog }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const username = useSelector(({ user }) => user.username)
  const createNotification = useNotification()
  const navigate = useNavigate()

  const increaseLikes = async () => {
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(blog.id, changedBlog)
      dispatch(
        setBlogs(blogs.map((b) => (b.id !== blog.id ? b : returnedBlog)))
      )
    } catch (err) {
      dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)))
      createNotification('was already removed from server', 'error')
    }
  }

  const deleteBlog = async () => {
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(blog.id)
        dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)))
        createNotification('blog removed', 'updateMsg')
      }
    } catch (err) {
      dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)))
      createNotification('was already removed from server', 'error')
    }
    navigate('/')
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    if (comment === '') {
      return
    }

    try {
      const returnedBlog = await blogService.createComment(blog.id, {
        comment: comment,
      })
      dispatch(
        setBlogs(blogs.map((b) => (b.id === blog.id ? returnedBlog : b)))
      )
      setComment('')
      createNotification('comment added', 'updateMsg')
    } catch (err) {
      dispatch(setBlogs(blogs.filter((b) => b.id !== blog.id)))
      createNotification('was already removed from server', 'error')
      navigate('/')
    }
  }

  if (blog === undefined) {
    return null
  }

  return (
    <div className="blog" data-cy="blog-post">
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          likes {blog.likes}
          <button onClick={increaseLikes} data-cy="like-button">
            like
          </button>
        </div>
        <div>added by {blog.user ? blog.user.name : ''}</div>
        {!blog.user || blog.user.username === username ? (
          <button onClick={deleteBlog}>remove</button>
        ) : (
          ''
        )}
      </div>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <input onChange={handleCommentChange} value={comment} />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={Math.random() * 1000}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
