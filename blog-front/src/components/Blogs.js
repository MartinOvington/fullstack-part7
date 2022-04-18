import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../reducers/blogReducer'
import { useNotification } from '../hooks'
import blogService from '../services/blogs'
import Blog from './Blog'

const Blogs = () => {
  const dispatch = useDispatch()
  const createNotification = useNotification()
  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = [...blogs].sort((a, b) => a.likes < b.likes)

  const increaseLikes = async (id) => {
    const blog = sortedBlogs.find((b) => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(id, changedBlog)
      dispatch(
        setBlogs(
          sortedBlogs.map((blog) => (blog.id !== id ? blog : returnedBlog))
        )
      )
    } catch (err) {
      dispatch(setBlogs(sortedBlogs.filter((n) => n.id !== id)))
      createNotification('was already removed from server', 'error')
    }
  }

  const deleteBlog = async (id) => {
    const blog = sortedBlogs.find((b) => b.id === id)
    try {
      if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
        await blogService.deleteBlog(id)
        dispatch(setBlogs(sortedBlogs.filter((b) => b.id !== id)))
        createNotification('blog removed', 'updateMsg')
      }
    } catch (err) {
      dispatch(setBlogs(sortedBlogs.filter((b) => b.id !== id)))
      createNotification('was already removed from server', 'error')
    }
  }

  return sortedBlogs.map((blog) => (
    <Blog
      key={blog.id}
      blog={blog}
      increaseLikes={() => increaseLikes(blog.id)}
      deleteBlog={() => deleteBlog(blog.id)}
      username={user.username}
    />
  ))
}

export default Blogs
