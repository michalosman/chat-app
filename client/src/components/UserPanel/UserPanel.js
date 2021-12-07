import React from 'react'
import { Box } from '@mui/material'
import Sidebar from './Sidebar/Sidebar'
import Chat from './Chat/Chat'

const UserPanel = () => {
  return (
    <Box display="flex" height="100vh">
      <Sidebar />
      <Chat />
    </Box>
  )
}

export default UserPanel
