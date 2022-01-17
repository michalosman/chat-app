import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRoutes from './routes/users.js'
import chatsRoutes from './routes/chats.js'
import reportsRoutes from './routes/reports.js'
import errorHandler from './error/errorHandler.js'
import { Server } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'

dotenv.config()
const PORT = process.env.PORT || 5000
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000'
const MONGO_URI = process.env.MONGO_URI

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

// MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.message))

// Socket.io
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
