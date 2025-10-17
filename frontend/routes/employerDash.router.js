import express from 'express'
import { employer } from '../controllers/employerDash.controller' 

const router = express.Router()

router.get('/empleador', employer)

export default router