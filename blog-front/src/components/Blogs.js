import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'

const Blogs = () => {
  const blogs = useSelector(({ blogs }) => blogs)
  const sortedBlogs = [...blogs].sort((a, b) => a.likes < b.likes)

  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          {sortedBlogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Blogs
