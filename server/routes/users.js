import express from 'express'
import {
  signUp,
  signIn,
  warn,
  block,
  getUsers,
  validateRole,
} from '../controllers/userController.js'
import { auth, authModerator, authAdmin } from '../middleware/auth.js'

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.get('/validateRole', auth, validateRole)
router.get('/', auth, authAdmin, getUsers)
router.patch('/:userId/warn', auth, authModerator, warn)
router.patch('/:userId/block', auth, authAdmin, block)

export default router
