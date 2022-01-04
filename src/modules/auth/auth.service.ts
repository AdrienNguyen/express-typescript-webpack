import { User, HttpError } from '../../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../config/secrets'

export const register = async (data) => {
    const { name, email, password } = data

    const existingUser = await User.findOne({
        email: email,
    })

    if (existingUser) {
        throw new HttpError('User exists already, please login instead', 422)
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await User.create({
        email: email,
        password: hashedPassword,
        name: name,
    })

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        JWT_KEY,
        {
            expiresIn: '1h',
        },
    )

    return {
        user: {
            userId: user.id,
            email: user.email,
            token: token,
        },
    }
}

const login = async (data) => {
    const { email, password } = data

    const existingUser = await User.findOne({
        email: email,
    })

    if (!existingUser) {
        throw new HttpError('Invalid credentials, could not log you in.', 403)
    }

    console.log('AA')

    const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password,
    )

    if (!isValidPassword) {
        throw new HttpError('Invalid credentials, could not log you in.', 403)
    }

    const token = jwt.sign(
        {
            userId: existingUser.id,
            email: existingUser.email,
        },
        JWT_KEY,
        {
            expiresIn: '1h',
        },
    )

    return {
        user: {
            userId: existingUser.id,
            email: existingUser.email,
            token: token,
        },
    }
}

export default {
    register,
    login,
}
