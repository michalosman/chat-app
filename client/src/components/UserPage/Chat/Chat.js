import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'
import { useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getChat } from '../../../actions/chats'
import io from 'socket.io-client'

const socket = io('http://localhost:5000')

const Chat = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const chats = useSelector((state) => state.chats)
  const [currentChat, setCurrentChat] = useState(null)

  useEffect(() => {
    setCurrentChat(findCurrentChat())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats])

  useEffect(() => {
    const chat = findCurrentChat()

    if (chat) {
      updateChat(chat._id)
      socket.emit('leave chats')
      socket.emit('join chat', chat._id)
      socket.on('receive message', () => updateChat(chat._id))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  const findCurrentChat = () => {
    const chatId = location.pathname.substring(1)
    const chat = chats.find((chat) => chat._id === chatId)
    return chat
  }

  const updateChat = async (chatId) => {
    await dispatch(getChat(chatId))
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
