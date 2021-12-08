import express from 'express'
import { auth } from '../middleware/auth.js'
import {
  getChats,
  getChat,
  addChat,
  addMessage,
  deleteChat,
} from '../controllers/chatController.js'

const router = express.Router()

router.use(auth)

router.get('/', getChats)
router.get('/:chatId', getChat)
router.post('/', addChat)
router.post('/:chatId', addMessage)
router.delete('/:chatId', deleteChat)

export default router
