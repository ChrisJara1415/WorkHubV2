import usersRouter from './users.router.js'
import offersRouter from './offers.router.js'
import contractsRouter from './contracts.router.js'
import applymentsRouter from './applyments.router.js'
import { login } from '../controllers/users.controller.js'
import { Router } from 'express'

const router = Router()

router.post('/login', login)
router.use('/clientes', usersRouter)
router.use('/ofertas', offersRouter)
router.use('/contratos', contractsRouter)
router.use('/postulaciones', applymentsRouter)

export default router;