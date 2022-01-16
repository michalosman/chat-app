import io from 'socket.io-client'
import { createContext } from 'react'
import { useDispatch } from 'react-redux'
import { fetchChats, receiveMessage } from '../actions/chats'

export const SocketContext = createContext(null)

const SocketProvider = ({ children }) => {
  const socket = io(process.env.REACT_APP_SERVER_URL)
  const dispatch = useDispatch()

  const subscribeChats = (userId) => {
    socket.emit('subscribe chats', userId)
    socket.on('chat created', () => dispatch(fetchChats()))
    socket.on('chat deleted', () => dispatch(fetchChats()))
    socket.on('member added', () => dispatch(fetchChats()))
    socket.on('member left', () => dispatch(fetchChats()))
  }

  const createChat = (userId) => {
    socket.emit('create chat', userId)
  }

  const deleteChat = (userId) => {
    socket.emit('delete chat', userId)
  }

  const addMember = (userId) => {
    socket.emit('add member', userId)
  }

  const leaveGroup = (userId) => {
    socket.emit('leave group', userId)
  }

  const subscribeChatMessages = (chatId) => {
    socket.emit('subscribe chat messages', chatId)
    socket.on('receive message', (message) =>
      dispatch(receiveMessage(chatId, message))
    )
  }

  const unsubscribeChatMessages = (chatId) => {
    socket.off('receive message')
    socket.emit('unsubscribe chat messages', chatId)
  }

  const sendMessage = (chatId, message) => {
    socket.emit('send message', chatId, message)
  }

  return (
    <SocketContext.Provider
      value={{
        subscribeChats,
        createChat,
        deleteChat,
        addMember,
        leaveGroup,
        subscribeChatMessages,
        unsubscribeChatMessages,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
