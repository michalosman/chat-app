import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import ChatSettings from './ChatSettings'
import Messages from './Messages'
import SendBox from './SendBox'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Chat = () => {
  const [currentChat, setCurrentChat] = useState(null)
  const location = useLocation()
  const chats = useSelector((state) => state.chats)

  useEffect(() => {
    setCurrentChat(
      chats.find((chat) => chat._id === location.pathname.substr(1))
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, chats])

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
      <SendBox currentChat={currentChat} />
    </Box>
  ) : (
    <></>
  )
}

export default Chat
