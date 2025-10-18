import express from 'express'
import { landingPage } from '../controllers/landingPage.controller.js'

const router = express.Router()

router.get('/', landingPage)

export default router