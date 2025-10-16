import { Router } from 'express'
import {createOffer, searchOffers, searchOfferById, updateOffer, deleteOffer} from '../controllers/offers.controller.js'
const router = Router()

router.get('/', searchOffers)
router.get('/:id', searchOfferById)
router.post('/', createOffer)
router.patch('/:id', updateOffer)
router.delete('/:id', deleteOffer)

export default router