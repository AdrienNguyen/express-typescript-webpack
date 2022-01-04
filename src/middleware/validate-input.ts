import { validationResult } from 'express-validator'
import { HttpError } from '../models'

const validateInput = (message) => {
    return (req, res, next) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            res.message = message
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
