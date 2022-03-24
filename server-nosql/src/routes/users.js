import express from 'express'
import {
  signUp,
  signIn,
  warnUser,
  blockUser,
  unblockUser,
  getUsers,
  validateUser,
} from '../controllers/userController.js'
import { auth, authModerator, authAdmin } from '../middleware/auth.js'
import idValidator from '../middleware/idValidator.js'

const router = express.Router()

router.get('/', auth, authAdmin, getUsers)

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.post('/validateUser', auth, validateUser)

router.put('/warn/:userId', auth, authModerator, idValidator, warnUser)
router.put('/block/:userId', auth, authAdmin, idValidator, blockUser)
router.put('/unblock/:userId', auth, authAdmin, idValidator, unblockUser)

export default router
