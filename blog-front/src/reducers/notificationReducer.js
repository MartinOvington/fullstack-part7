import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  msgType: 'error',
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    setMsgType(state, action) {
      state.msgType = action.payload
    },
    clearNotification(state) {
      state.message = ''
    },
  },
})

export const { setMessage, setMsgType, clearNotification } =
  notificationSlice.actions

export default notificationSlice.reducer
