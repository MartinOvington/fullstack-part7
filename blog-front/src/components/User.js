/* eslint-disable no-extra-semi */
import { List, ListItem } from '@material-ui/core'
const User = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <List dense={false}>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </div>
  )
}

export default User
