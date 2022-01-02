import { User } from '../../models'

interface IUser {
    name: string
    email: string
    password: string
}

const register = async (data) => {
    const { name, email, password }: IUser = data

    if (!name || !email || !password) {
        throw new Error('Missing data')
    }

    let user = await User.find({
        email: email,
    })

    if (user.length) {
        throw new Error('User is existed')
    }

    user = await User.create({
        email: email,
        password: password,
        name: name,
    })

    return { user }
}

export default {
    register,
}
