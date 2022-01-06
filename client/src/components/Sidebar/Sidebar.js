import { Box } from '@mui/material'
import UserPanel from './UserPanel'
import UserChats from './UserChats'

const Sidebar = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="360px"
      borderRight={1}
      borderColor={'divider'}
    >
      <UserPanel />
      <UserChats />
    </Box>
  )
}

export default Sidebar
