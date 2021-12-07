import React from 'react'
import { Box, Typography, Avatar, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { getInitials, getOtherMember } from '../../../utils/functions'
import { makeStyles } from '@mui/styles'
import { chats } from '../../../utils/data'

const useStyles = makeStyles((theme) => ({
  scrollBox: {
    overflowY: 'scroll',
  },
}))

const Chats = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth)

  const loadChat = () => {}

  const chatBoxes = chats.map((chat) => {
    const otherUser = getOtherMember(chat.members, user._id)

    return (
      <Button
        key={chat._id}
        fullWidth
        style={{ textTransform: 'none' }}
        onClick={loadChat}
      >
        <Box display="flex" alignItems="center" width="100%" p={1}>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${getInitials(
              otherUser.name
            )}.svg`}
          />
          <Box
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            style={{ color: 'black' }}
          >
            <Typography variant="body1" ml={1}>
              {otherUser.name}
            </Typography>
            <Typography variant="body2" ml={1}>
              {chat.recentMessage.text}
            </Typography>
          </Box>
        </Box>
      </Button>
    )
  })

  return (
    <Box className={classes.scrollBox} p={2}>
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
      {chatBoxes}
    </Box>
  )
}

export default Chats
