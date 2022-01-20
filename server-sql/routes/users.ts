import express from 'express'
import {
  signUp,
  signIn,
  warnUser,
  blockUser,
  unblockUser,
  getUsers,
  validateUser,
} from '../controllers/userController'
import { auth, authModerator, authAdmin } from '../middleware/auth'

const router = express.Router()

router.get('/', auth, authAdmin, getUsers)

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/validateUser', auth, validateUser)

router.put('/warn/:userId', auth, authModerator, warnUser)
router.put('/block/:userId', auth, authAdmin, blockUser)
router.put('/unblock/:userId', auth, authAdmin, unblockUser)

export default router
