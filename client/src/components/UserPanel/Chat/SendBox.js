import React, { useState } from 'react'
import { Box, IconButton, Input } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { makeStyles } from '@mui/styles'
import { useDispatch } from 'react-redux'
import { addMessage } from '../../../actions/chats'

const useStyles = makeStyles((theme) => ({
  input: {
    backgroundColor: '#eee',
    padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
    borderRadius: '50px',
  },
}))

const SendBox = ({ currentChat, socket }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')

  // console.log(socket)

  const sendMessage = (e) => {
    e.preventDefault()
    dispatch(addMessage(currentChat._id, message))
    setMessage('')
    socket.emit('newMessage', currentChat._id)
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
        />
        <IconButton size="large" type="submit">
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

export default SendBox
