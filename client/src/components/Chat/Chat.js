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
  const [currentChat, setCurrentChat] = useState(null)

  useEffect(() => {
    setCurrentChat(chats.find((chat) => chat._id === chatId))
  }, [chats])

  useEffect(() => {
    if (prevChatId.current === chatId) return
    if (!chats.find((chat) => chat._id === chatId)) return

    socket.unsubscribeChat(prevChatId.current)
    prevChatId.current = chatId

    socket.subscribeChat(chatId)
    dispatch(fetchChat(chatId))
  }, [chatId])

  if (!currentChat) return <></>

  return (
    <Box
      display="flex"
      flexDirection="column"
      flex={1}
      borderRight={1}
      borderColor={'divider'}
    >
      <ChatPanel currentChat={currentChat} />
      <Messages currentChat={currentChat} />
      <SendBox currentChat={currentChat} />
    </Box>
  )
}

export default Chat
