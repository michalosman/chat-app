import React from 'react'
import { Box, Avatar, Typography, IconButton } from '@mui/material'
import ReportIcon from '@mui/icons-material/Report'
import DeleteIcon from '@mui/icons-material/Delete'
import { getInitials, getOtherMember } from '../../../utils/functions'
import { useSelector, useDispatch } from 'react-redux'
import { deleteChat } from '../../../actions/chats'

const ChatSettings = ({ currentChat }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth)
  const otherUser = getOtherMember(currentChat.members, user._id)

  const reportUser = () => {}

  const removeChat = () => {
    dispatch(deleteChat(currentChat._id))
  }

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
            otherUser.name
          )}.svg`}
        />
        <Typography variant="h6" ml={1}>
          {otherUser.name}
        </Typography>
      </Box>
      <Box display="flex">
        <IconButton onClick={reportUser}>
          <ReportIcon />
        </IconButton>
        <IconButton onClick={removeChat}>
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default ChatSettings
