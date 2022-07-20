import { Box } from '@mui/material'

import UserChats from './UserChats'
import UserPanel from './UserPanel'

function Sidebar() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="360px"
      borderRight={1}
      borderColor="divider"
    >
      <UserPanel />
      <UserChats />
    </Box>
  )
}

export default Sidebar
