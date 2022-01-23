/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/material'
import ChatPanel from './ChatPanel'
import Messages from './Messages'
import SendBox from './SendBox'
import { fetchChat } from '../../actions/chats'
import { SocketContext } from '../../context/Socket'

const Chat = () => {
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

  if (!chat) return <></>

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      borderRight={1}
      borderColor={'divider'}
    >
      <ChatPanel chat={chat} />
      <Messages chat={chat} />
      <SendBox chat={chat} />
    </Box>
  )
}

export default Chat
