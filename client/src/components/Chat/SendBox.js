import React, { useState } from 'react'
import { Box, IconButton, Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import useStyles from '../styles'
import { useDispatch } from 'react-redux'
import { addMessage } from '../../actions/chats'

const SendBox = ({ currentChat, socket }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  const sendMessage = async (e) => {
    e.preventDefault()
    await dispatch(addMessage(currentChat._id, message))
    socket.emit('send message', currentChat._id)
    setMessage('')
  }

  return (
    <Box p={2} borderTop={1} borderColor={'divider'}>
      <Box component="form" onSubmit={sendMessage} display="flex">
        <Input
          className={classes.input}
          fullWidth
          disableUnderline
          placeholder="Aa"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <IconButton size="large" type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default SendBox
