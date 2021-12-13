import React from 'react'
import { Box } from '@mui/material'
import Sidebar from './Sidebar'
import Chat from './Chat'
import { BrowserRouter as Router } from 'react-router-dom'

const UserPage = () => {
  return (
    <Router>
      <Box display="flex" height="100vh">
        <Sidebar />
        <Chat />
      </Box>
    </Router>
  )
}

export default UserPage
