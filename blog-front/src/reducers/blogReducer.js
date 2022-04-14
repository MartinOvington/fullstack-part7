import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    incLikes(state, action) {
      const id = action.payload
      const blogToChange = state.find((b) => b.id === id)
      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      }
      return state.map((blog) => (blog.id === id ? blog : changedBlog))
    },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter((blog) => blog.id !== id)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { createBlog, incLikes, deleteBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
