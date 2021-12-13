import express from 'express'
import { auth, authModerator } from '../middleware/auth.js'
import { addReport, closeReport } from '../controllers/reportController.js'

const router = express.Router()

router.use(auth)

router.post('/', addReport)
router.patch('/close/:id', authModerator, closeReport)

export default router
