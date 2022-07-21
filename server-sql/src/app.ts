import cors from 'cors'
import express from 'express'
import http from 'http'

import { PORT } from './config/constants'
import connectToDB from './config/db'
import initializeSocket from './config/socket'
import errorHandler from './middleware/errorHandler'
import chatsRouter from './routes/chats'
import reportsRouter from './routes/reports'
import usersRouter from './routes/users'

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
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`)
})

connectToDB()
initializeSocket(server)
