import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = [...blogs].sort((a, b) => a.likes < b.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  /*
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
  */

  return (
    <div>
      {sortedBlogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </div>
  )
}

export default Blogs
