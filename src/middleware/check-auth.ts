/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpError } from '../models'
import jwt from 'jsonwebtoken'
import { JWT_KEY } from '../config/secrets'

const checkAuth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            throw new HttpError('Authentication failed!', 401)
        }

        const decodedToken = jwt.verify(token, JWT_KEY)

        req.user = decodedToken

        next()
    } catch (error) {
        return next(new HttpError('Authentication failed!', 401))
    }
}

export default checkAuth
