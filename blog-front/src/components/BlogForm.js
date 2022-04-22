import { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button } from '@material-ui/core'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>Create new</h2>
        <TextField
          required
          variant="outlined"
          label="Title"
          value={blogTitle}
          onChange={handleTitleChange}
          id="blog-title-input"
          data-cy="blog-title-input"
        />
        <TextField
          variant="outlined"
          label="Author"
          value={blogAuthor}
          onChange={handleAuthorChange}
          id="blog-author-input"
          data-cy="blog-author-input"
        />
        <TextField
          variant="outlined"
          id="blog-url-input"
          label="url"
          value={blogUrl}
          onChange={handleUrlChange}
          data-cy="blog-url-input"
        />
        <br />
        <Button variant="outlined" type="submit" data-cy="create-blog-button">
          create
        </Button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
