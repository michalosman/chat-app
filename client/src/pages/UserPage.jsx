import { Box } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Chat from '../components/Chat'
import Sidebar from '../components/Sidebar'

function UserPage() {
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
