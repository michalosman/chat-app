import React from 'react'
import { Box } from '@mui/material'
import Sidebar from './Sidebar/Sidebar'
import Chat from './Chat/Chat'
import { BrowserRouter as Router } from 'react-router-dom'

const UserPanel = () => {
  return (
    <Router>
      <Box display="flex" height="100vh">
        <Sidebar />
        <Chat />
      </Box>
    </Router>
  )
}

export default UserPanel
