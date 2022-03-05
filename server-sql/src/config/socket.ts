import { Server } from 'socket.io'
import { CLIENT_URL } from './constants'
import server from './server'

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
  },
})

export const initializeSocket = () => {
  io.on('connection', (socket) => {
    socket.on('subscribe chats', (userId) => {
      socket.join('user' + userId)
    })

    socket.on('create chat', (userId) => {
      socket.to('user' + userId).emit('chat created')
    })

    socket.on('delete chat', (userId) => {
      socket.to('user' + userId).emit('chat deleted')
    })

    socket.on('add member', (userId) => {
      socket.to('user' + userId).emit('member added')
    })

    socket.on('leave group', (userId) => {
      socket.to('user' + userId).emit('member left')
    })

    socket.on('subscribe chat messages', (chatId) => {
      socket.join(chatId)
    })

    socket.on('unsubscribe chat messages', (chatId) => {
      socket.leave(chatId)
    })

    socket.on('send message', (chatId, message) => {
      socket.to(chatId).emit('receive message', message)
    })
  })
}
