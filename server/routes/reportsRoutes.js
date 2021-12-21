import express from 'express'
import { auth, authModerator } from '../middleware/auth.js'
import {
  addReport,
  closeReport,
  getReports,
} from '../controllers/reportController.js'

const router = express.Router()

router.use(auth)

router.get('/', authModerator, getReports)
router.post('/', addReport)
router.patch('/close/:id', authModerator, closeReport)

export default router
