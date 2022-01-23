import express from 'express'
import cors from 'cors'
import usersRoutes from './routes/users'
import chatsRoutes from './routes/chats'
import reportsRoutes from './routes/reports'
import errorHandler from './error/errorHandler'
import { Server } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import connectToDB from './db'

dotenv.config()
const PORT = process.env.PORT || 5000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: CLIENT_ORIGIN,
  },
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', usersRoutes)
app.use('/chats', chatsRoutes)
app.use('/reports', reportsRoutes)

app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

connectToDB()

// Socket.io
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
