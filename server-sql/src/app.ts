import express from 'express'
import cors from 'cors'
import usersRouter from './routes/users'
import chatsRouter from './routes/chats'
import reportsRouter from './routes/reports'
import errorHandler from './middleware/errorHandler'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', usersRouter)
app.use('/chats', chatsRouter)
app.use('/reports', reportsRouter)

app.use(errorHandler)

export default app
