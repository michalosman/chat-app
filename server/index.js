import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRoutes from './routes/users.js'
import chatsRoutes from './routes/chats.js'
import reportsRoutes from './routes/reports.js'
import { Server } from 'socket.io'
import http from 'http'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', usersRoutes)
app.use('/chats', chatsRoutes)
app.use('/reports', reportsRoutes)

const MONGO_URI = process.env.MONGO_URI

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.message))

io.on('connection', (socket) => {
  socket.on('join chat', (chatId) => {
    socket.join(chatId)
  })

  socket.on('send message', (chatId) => {
    socket.to(chatId).emit('receive message', chatId)
  })

  socket.on('leave chats', () =>
    socket.rooms.forEach((roomId) => socket.leave(roomId))
  )
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
