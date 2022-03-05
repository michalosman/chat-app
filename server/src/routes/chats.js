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
  leaveGroup,
} from '../controllers/chatController.js'
import idValidator from '../middleware/idValidator.js'

const router = express.Router()

router.use(auth)

router.get('/', getChats)
router.get('/:chatId', idValidator, getChat)

router.post('/private', createPrivateChat)
router.post('/group', createGroupChat)
router.post('/:chatId', idValidator, createMessage)

router.put('/:chatId/add-member', idValidator, addMember)
router.put('/:chatId/leave', idValidator, leaveGroup)

router.delete('/:chatId', idValidator, deleteChat)

export default router
