import { User, HttpError } from '../../models'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../../config/secrets'
import { sendEmailForCreatedAccount } from '../../helpers/emails'

export const register = async (data) => {
    const { name, email, password } = data

    const existingUser = await User.findOne({
        email: email,
    })

    if (existingUser) {
        throw new HttpError('User exists already, please login instead', 422)
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const newUser = await User.create({
        email: email,
        password: hashedPassword,
        name: name,
    })

    const token = jwt.sign(
        {
            userId: newUser.id,
            email: newUser.email,
        },
        JWT_KEY,
        {
            expiresIn: '1h',
        },
    )

    return {
        user: {
            userId: newUser.id,
            email: newUser.email,
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

    await sendEmailForCreatedAccount(email)

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
