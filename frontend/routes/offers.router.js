import express from 'express'
import { offers, offersDetails } from '../controllers/offers.controller.js'

const router = express.Router()

router.get('/', offers)
router.get('/:id', offersDetails)

export default router