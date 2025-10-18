import express from 'express'
import { employer } from '../controllers/employerDash.controller.js' 

const router = express.Router()

router.get('/', employer)

export default router   