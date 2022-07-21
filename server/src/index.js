import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'
import usersRouter from './routes/users.js'
import chatsRouter from './routes/chats.js'
import reportsRouter from './routes/reports.js'
import errorHandler from './error/errorHandler.js'
import connectToDB from './db.js'

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

app.use('/users', usersRouter)
app.use('/chats', chatsRouter)
app.use('/reports', reportsRouter)

app.use(errorHandler)

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`)
})

connectToDB()

io.on('connection', (socket) => {
  socket.on('subscribe chats', (userId) => {
    socket.join(userId)
  })

  socket.on('create chat', (userId) => {
    socket.to(userId).emit('chat created')
  })

  socket.on('delete chat', (userId) => {
    socket.to(userId).emit('chat deleted')
  })

  socket.on('add member', (userId) => {
    socket.to(userId).emit('member added')
  })

  socket.on('leave group', (userId) => {
    socket.to(userId).emit('member left')
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
