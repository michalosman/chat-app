import React from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { chats } from '../../../utils/data'
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  scrollBox: {
    overflowY: 'scroll',
  },

  message: {
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
    marginLeft: theme.spacing(2),
    borderRadius: '10px',
    backgroundColor: '#eee',
  },

  ownMessage: {
    marginRight: theme.spacing(2),
    marginLeft: 'auto',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
}))

const Messages = () => {
  const classes = useStyles()
  const user = useSelector((state) => state.auth)

  const messages = chats[0].messages.map((message) => {
    return (
      <Box
        key={uuidv4()}
        className={`${classes.message} ${
          message.sender._id === user._id ? classes.ownMessage : ''
        }`}
        p={1}
      >
        {message.text}
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
      {messages}
      {messages}
      {messages}
      {messages}
      {messages}
      {messages}
      {messages}
      {messages}
      {messages}
      {messages}
    </Box>
  )
}

export default Messages
