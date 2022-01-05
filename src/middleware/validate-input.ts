import { validationResult } from 'express-validator'
import { LogError } from '../helpers/logs'
import { HttpError } from '../models'

const validateInput = (message) => {
    return async (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.message = message + '_FAILED'

            req.user && (await LogError(req.user.email, message))

            return next(
                new HttpError(
                    'Invalid inputs passed, please check your data',
                    422,
                ),
            )
        }
        next()
    }
}

export default validateInput
