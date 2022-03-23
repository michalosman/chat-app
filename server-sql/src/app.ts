import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users'
import chatsRouter from './routes/chats'
import reportsRouter from './routes/reports'
import errorHandler from './middleware/errorHandler'
import http from 'http'
import { connectToDB } from './config/db'
import { initializeSocket } from './config/socket'
import { PORT } from './config/constants'

const app = express()
const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', usersRouter)
app.use('/chats', chatsRouter)
app.use('/reports', reportsRouter)

app.use(errorHandler)

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

connectToDB()
initializeSocket(server)
