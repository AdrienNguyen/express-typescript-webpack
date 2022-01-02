import express from 'express'
const authRouter = express.Router()
import authController from './auth.controller'

authRouter.post('/register', authController.register)

export default authRouter
