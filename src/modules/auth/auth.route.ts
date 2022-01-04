import express from 'express'
import { check } from 'express-validator'

import validateInput from '../../middleware/validate-input'
import authController from './auth.controller'

const router = express.Router()

router.post(
    '/register',
    [
        check('name').not().isEmpty(),
        check('email').isEmail(),
        check('password').isLength({ min: 6 }),
    ],
    validateInput('REGISTER_FAILED'),
    authController.register,
)

router.post('/login', authController.login)

export default router
