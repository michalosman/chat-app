import React from 'react'
import { Box } from '@mui/material'
import UserSettings from './UserSettings'
import Chats from './Chats'

const Sidebar = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="360px"
      borderRight={1}
      borderColor={'divider'}
    >
      <UserSettings />
      <Chats />
    </Box>
  )
}

export default Sidebar
