import express from 'express'
import { auth } from '../middleware/auth.js'
import {
  getChats,
  getChat,
  createPrivateChat,
  createGroupChat,
  createMessage,
  deleteChat,
  addMember,
  leaveChat,
} from '../controllers/chatController.js'

const router = express.Router()

router.use(auth)

router.get('/', getChats)
router.get('/:chatId', getChat)

router.post('/private', createPrivateChat)
router.post('/group', createGroupChat)
router.post('/:chatId', createMessage)

router.put('/:chatId/add-member', addMember)
router.put('/:chatId/leave', leaveChat)

router.delete('/:chatId', deleteChat)

export default router
