import express from 'express'
import {
  signUp,
  signIn,
  report,
  warn,
  block,
  getUsers
} from '../controllers/userController.js'
import { auth, authAdmin } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, authAdmin, getUsers)
router.post('/signUp', signUp)
router.post('/signIn', signIn)
router.patch('/:userId/report', auth, report)
router.patch('/:userId/warn', auth, authAdmin, warn)
router.patch('/:userId/block', auth, authAdmin, block)

export default router
