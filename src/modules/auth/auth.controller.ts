import { LogInfo, LogError } from '../../helpers/logs'
import authService from './auth.service'

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body)

        req.body.email && LogInfo(req.body.email, 'REGISTER_SUCCESSFULLY')

        res.status(201).json({
            success: true,
            message: 'REGISTER_SUCCESSFULLY',
            content: user,
        })
    } catch (error) {
        req.body.email && LogError(req.body.email, 'REGISTER_FAILED')

        res.status(error.code || 400).json({
            success: false,
            message: 'REGISTER_FAILED',
            content: error.message,
        })
    }
}

const login = async (req, res) => {
    try {
        const user = await authService.login(req.body)

        req.body.email && LogInfo(req.body.email, 'LOGIN_SUCCESSFULLY')

        res.status(200).json({
            success: true,
            message: 'LOGIN_SUCCESSFULLY',
            content: user,
        })
    } catch (error) {
        req.body.email && LogError(req.body.email, 'REGISTER_FAILED')

        res.status(error.code || 400).json({
            success: false,
            message: 'LOGIN_FAILED',
            content: error.message,
        })
    }
}

export default {
    register,
    login,
}
