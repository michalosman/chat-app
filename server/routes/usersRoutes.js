import express from 'express'
import {
  signUp,
  signIn,
  warn,
  block,
  getUsers,
  validateUser,
} from '../controllers/userController.js'
import { auth, authModerator, authAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/validateUser', auth, validateUser)
router.get('/', auth, authAdmin, getUsers)
router.patch('/warn/:userId', auth, authModerator, warn)
router.patch('/block/:userId', auth, authAdmin, block)

export default router
