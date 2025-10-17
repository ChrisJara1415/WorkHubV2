import express from 'express'
import { offers } from '../controllers/offers.controller.js'

const router = express.Router()

router.get('/ofertas', offers)

export default router