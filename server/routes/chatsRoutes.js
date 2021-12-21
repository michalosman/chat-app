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
router.delete('/:chatId', deleteChat)
router.post('/:chatId', addMessage)

export default router
