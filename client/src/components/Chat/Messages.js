import React from 'react'
import { Box } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'
import useStyles from '../styles'

const Messages = ({ currentChat }) => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth)

  const messageBoxes = currentChat.messages
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((message) => {
      return (
        <Box
          key={uuidv4()}
          className={`${classes.message} ${
            message.sender._id === user._id ? classes.ownMessage : ''
          }`}
          p={1}
        >
          {message.text}
          {/* <Typography
            className={`${classes.messageTime} ${
              message.sender._id === user._id ? classes.ownMessageTime : ''
            }`}
          >
            {formatTime(message.createdAt)}
          </Typography> */}
        </Box>
      )
    })

  return (
    <Box
      className={classes.scrollBox}
      display="flex"
      flexDirection="column-reverse"
      flex={1}
    >
      {messageBoxes}
    </Box>
  )
}

export default Messages
