import express from 'express'
import { sendApplyment } from '../controllers/applyments.controller.js'

const router = express.Router()

// router.get('/', )
router.post('/', sendApplyment)

export default router