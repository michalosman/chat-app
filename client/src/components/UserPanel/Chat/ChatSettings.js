import React from 'react'
import { Box, Avatar, Typography, IconButton } from '@mui/material'
import ReportIcon from '@mui/icons-material/Report'
import DeleteIcon from '@mui/icons-material/Delete'
import { getInitials } from '../../../utils/functions'

const ChatSettings = () => {
  const reportUser = () => {}
  const deleteChat = () => {}

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      p={2}
      borderBottom={1}
      borderColor={'divider'}
    >
      <Box display="flex" alignItems="center">
        <Avatar
          src={`https://avatars.dicebear.com/api/initials/${getInitials(
            'Other User'
          )}.svg`}
        />
        <Typography variant="h6" ml={1}>
          Other User
        </Typography>
      </Box>
      <Box display="flex">
        <IconButton onClick={reportUser}>
          <ReportIcon />
        </IconButton>
        <IconButton onClick={deleteChat}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatSettings
