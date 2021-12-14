/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getChat } from '../../actions/chats'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const Chat = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const chats = useSelector((state) => state.chats)
  const [currentChat, setCurrentChat] = useState(null)

  useEffect(() => {
    setCurrentChat(findCurrentChat())
  }, [chats])

  useEffect(() => {
    const chat = findCurrentChat()
    socket.emit('leave chats')

    if (chat) {
      dispatch(getChat(chat._id))
      socket.emit('join chat', chat._id)
      socket.on('receive message', () => dispatch(getChat(chat._id)))
    }
  }, [location])

  const findCurrentChat = () => {
    const chatId = location.pathname.substring(1)
    const chat = chats.find((chat) => chat._id === chatId)
    return chat
  }

  return currentChat ? (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      borderRight={1}
      borderColor={'divider'}
    >
      <ChatPanel currentChat={currentChat} />
      <Messages currentChat={currentChat} socket={socket} />
      <SendBox currentChat={currentChat} socket={socket} />
    </Box>
  ) : (
    <></>
  )
}

export default Chat
