import express from 'express'
import { auth } from '../middleware/auth'
import {
  getChats,
  getChat,
  createPrivateChat,
  createGroupChat,
  createMessage,
  deleteChat,
  addMember,
  leaveGroup,
} from '../controllers/chatController'

const router = express.Router()

router.use(auth)

router.get('/', getChats)
router.get('/:chatId', getChat)

router.post('/private', createPrivateChat)
router.post('/group', createGroupChat)
router.post('/:chatId', createMessage)

router.put('/:chatId/add-member', addMember)
router.put('/:chatId/leave', leaveGroup)

router.delete('/:chatId', deleteChat)

export default router
