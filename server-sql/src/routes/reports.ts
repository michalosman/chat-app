import express from 'express'

import {
  closeReport,
  createReport,
  getReports,
} from '../controllers/reportController'
import { auth, authModerator } from '../middleware/auth'

const router = express.Router()

router.use(auth)

router.get('/', authModerator, getReports)
router.post('/', createReport)
router.put('/close/:reportId', authModerator, closeReport)

export default router
