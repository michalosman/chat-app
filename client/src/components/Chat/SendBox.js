import { useState, useContext } from 'react'
import { useDispatch } from 'react-redux'
import SendIcon from '@mui/icons-material/Send'
import { Box, IconButton, Input } from '@mui/material'
import useStyles from '../styles'
import { sendMessage } from '../../actions/chats'
import { SocketContext } from '../../context/Socket'

const SendBox = ({ currentChat }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [message, setMessage] = useState('')
  const socket = useContext(SocketContext)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!message) return

    dispatch(sendMessage(currentChat._id, message, socket))
    setMessage('')
  }

  return (
    <Box p={2} borderTop={1} borderColor={'divider'}>
      <Box component="form" onSubmit={handleSendMessage} display="flex">
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
