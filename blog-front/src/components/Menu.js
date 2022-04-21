import { Link } from 'react-router-dom'

const Menu = ({ user, handleLogout }) => {
  const color = {
    backgroundColor: '#cccccc',
  }

  const padding = {
    padding: 5,
  }

  const userElement = () => {
    if (user) {
      return (
        <span>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </span>
      )
    }
    return null
  }

  return (
    <div style={color}>
      <Link style={padding} to="/">
        Blogs
      </Link>
      <Link style={padding} to="/users">
        Users
      </Link>
      {userElement()}
    </div>
  )
}

export default Menu
