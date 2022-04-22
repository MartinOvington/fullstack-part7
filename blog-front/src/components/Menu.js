import { Link } from 'react-router-dom'
import { Button, AppBar, Toolbar, Box } from '@material-ui/core'

const Menu = ({ user, handleLogout }) => {
  const style = {
    textAlign: 'right',
  }

  const userElement = () => {
    if (user) {
      return (
        <em style={style}>
          {user.name} logged in{' '}
          <Button
            color="inherit"
            variant="outlined"
            size="small"
            onClick={handleLogout}
          >
            logout
          </Button>
        </em>
      )
    }
    return null
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Box display="flex" flexGrow={1}></Box>
        {userElement()}
      </Toolbar>
    </AppBar>
  )
}

export default Menu
