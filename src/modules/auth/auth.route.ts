import express from 'express'
const router = express.Router()
import authController from './auth.controller'

router.post('/register', authController.register)

export default router
