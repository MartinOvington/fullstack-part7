import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)
    },
    setBlogs(state, action) {
      return action.payload
    },
  },
})

export const { createBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
