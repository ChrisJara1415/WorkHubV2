import exp from 'express'
import { login } from '../controllers/login.controller.js'

const router = exp.Router()

router.post('/', login)

export default router