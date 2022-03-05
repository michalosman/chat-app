import http from 'http'
import app from '../app'
import { PORT } from '../config/constants'
import { connectToDB } from './db'
import { initializeSocket } from './socket'

const server = http.createServer(app)

connectToDB()
initializeSocket()

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

export default server
