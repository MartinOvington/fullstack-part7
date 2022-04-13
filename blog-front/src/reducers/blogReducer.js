const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BLOGS':
      return action.payload
    default:
      return state
  }
}

export default blogReducer
