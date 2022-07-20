/* eslint-disable react-hooks/exhaustive-deps */
import { Box } from '@mui/material'
import { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchChat } from '../../actions/chats'
import { SocketContext } from '../../context/Socket'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'

function Chat() {
  const dispatch = useDispatch()
  const socket = useContext(SocketContext)
  const chats = useSelector((state) => state.chats)
  const prevChatId = useRef('')
  const { chatId } = useParams()
  const [chat, setChat] = useState(null)

  useEffect(() => {
    setChat(chats.find((chat) => chat.id === chatId))
  }, [chats])

  useEffect(() => {
    if (prevChatId.current === chatId) return
    if (!chats.find((chat) => chat.id === chatId)) return

    socket.unsubscribeChatMessages(prevChatId.current)
    prevChatId.current = chatId
    socket.subscribeChatMessages(chatId)
    dispatch(fetchChat(chatId))
  }, [chatId])

  // eslint-disable-next-line react/jsx-no-useless-fragment
  if (!chat) return <></>

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      borderRight={1}
      borderColor="divider"
    >
      <ChatPanel chat={chat} />
      <Messages chat={chat} />
      <SendBox chat={chat} />
    </Box>
  )
}

export default Chat
