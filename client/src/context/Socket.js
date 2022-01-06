import io from 'socket.io-client'
import { createContext } from 'react'
import { useDispatch } from 'react-redux'
import { fetchChats, receiveMessage } from '../actions/chats'

export const SocketContext = createContext(null)

const SocketProvider = ({ children }) => {
  const socket = io(process.env.REACT_APP_SERVER_URL)
  const dispatch = useDispatch()

  const subscribeOwnChats = (userId) => {
    socket.emit('join app', userId)
    socket.on('chats changed', () => dispatch(fetchChats()))
  }

  const createChat = (userId) => {
    socket.emit('create chat', userId)
  }

  const deleteChat = (userId) => {
    socket.emit('delete chat', userId)
  }

  const subscribeChat = (chatId) => {
    socket.emit('join chat', chatId)
    socket.on('receive message', (message) => {
      dispatch(receiveMessage(chatId, message))
    })
  }

  const unsubscribeChat = (chatId) => {
    socket.off('receive message')
    socket.emit('leave chat', chatId)
  }

  const sendMessage = (chatId, message) => {
    socket.emit('send message', chatId, message)
  }

  return (
    <SocketContext.Provider
      value={{
        subscribeOwnChats,
        createChat,
        deleteChat,
        subscribeChat,
        unsubscribeChat,
        sendMessage,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
