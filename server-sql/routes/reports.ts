import express from 'express'
import { auth, authModerator } from '../middleware/auth.js'
import {
  createReport,
  closeReport,
  getReports,
} from '../controllers/reportController.js'

const router = express.Router()

router.use(auth)

router.get('/', authModerator, getReports)
router.post('/', createReport)
router.put('/close/:reportId', authModerator, closeReport)

export default router
