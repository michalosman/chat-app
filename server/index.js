import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import mongoose from 'mongoose'
import usersRoutes from './routes/users.js'
import chatsRoutes from './routes/chats.js'
import issuesRoutes from './routes/issues.js'
import issuesTypesRoutes from './routes/issuesTypes.js'

dotenv.config()

const PORT = process.env.PORT || 5000
const MONGO_URI = process.env.MONGO_URI

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use('/users', usersRoutes)
app.use('/chats', chatsRoutes)
app.use('/issues', issuesRoutes)
app.use('/issuesTypes', issuesTypesRoutes)

await mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err.message))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
