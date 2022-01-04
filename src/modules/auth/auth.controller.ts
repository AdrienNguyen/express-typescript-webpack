import authService from './auth.service'

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body)

        res.status(201).json({
            success: true,
            message: 'REGISTER_SUCCESSFULLY',
            content: user,
        })
    } catch (error) {
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

        res.status(200).json({
            success: true,
            message: 'LOGIN_SUCCESSFULLY',
            content: user,
        })
    } catch (error) {
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
