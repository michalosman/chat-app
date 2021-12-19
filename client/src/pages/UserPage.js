import React from 'react'
import { Box } from '@mui/material'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

const UserPage = () => {
  return (
    <Router>
      <Box display="flex" height="100vh">
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route
            path=":chatId"
            element={
              <>
                <Sidebar />
                <Chat />
              </>
            }
          />
        </Routes>
      </Box>
    </Router>
  )
}

export default UserPage
