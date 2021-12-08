import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ChatSettings from './ChatSettings'
import Messages from './Messages'
import SendBox from './SendBox'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getChat } from '../../../actions/chats'
import io from 'socket.io-client'

let socket

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null)
  const location = useLocation()
  const dispatch = useDispatch()
  const chats = useSelector((state) => state.chats)

  useEffect(() => {
    //! ERROR: Doesn't set state at first page load
    setCurrentChat(
      chats.find((chat) => chat._id === location.pathname.substr(1))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, chats])

  useEffect(() => {
    if (currentChat) {
      socket = io('http://localhost:5000')
      socket.emit('joinChat', currentChat._id)
      socket.on('receivedMessage', () => dispatch(getChat(currentChat._id)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return currentChat ? (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      borderRight={1}
      borderColor={'divider'}
    >
      <ChatSettings currentChat={currentChat} />
      <Messages currentChat={currentChat} />
      <SendBox currentChat={currentChat} socket={socket} />
    </Box>
  ) : (
    <></>
  )
}

export default Chat
