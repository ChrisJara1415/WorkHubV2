import express from 'express'
import { landingPage, offers } from '../controllers/landingPage.controller.js'

const router = express.Router()

router.get('/', landingPage)
router.get('/ofertas', offers)

export default router