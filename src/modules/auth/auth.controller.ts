import authService from './auth.service'

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body)

        res.status(201).json({
            success: true,
            messages: ['REGISTER_SUCCESSFULLY'],
            content: user,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            messages: ['REGISTER_FAILED'],
            content: error.message,
        })
    }
}

export default {
    register,
}
