import { createSlice } from '@reduxjs/toolkit'

const likeSort = (a, b) => {
  a.likes < b.likes
}

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog).sort(likeSort)
    },
    setBlogs(state, action) {
      return action.payload.sort(likeSort)
    },
  },
})

export const { createBlog, incLikes, deleteBlog, setBlogs } = blogSlice.actions
export default blogSlice.reducer
