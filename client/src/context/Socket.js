import { createContext } from 'react'
import { useDispatch } from 'react-redux'
import { fetchChat } from '../actions/chats'
import io from 'socket.io-client'

export const SocketContext = createContext(null)

const SocketProvider = ({ children }) => {
  const socket = io(process.env.REACT_APP_SERVER_URL)
  const dispatch = useDispatch()

  const subscribeChat = (chatId) => {
    socket.emit('join chat', chatId)
    socket.on('receive message', () => {
      dispatch(fetchChat(chatId))
    })
  }

  const unsubscribeChat = (chatId) => {
    socket.emit('leave chat', chatId)
  }

  const sendMessage = (chatId) => {
    socket.emit('send message', chatId)
  }

  return (
    <SocketContext.Provider
      value={{ socket, subscribeChat, unsubscribeChat, sendMessage }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export default SocketProvider
