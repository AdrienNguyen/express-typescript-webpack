import express from 'express'
import { check } from 'express-validator'
import validateInput from '../../../middleware/validate-input'

import checkAuth from '../../../middleware/check-auth'
import productController from './product.controller'

const router = express.Router()

router.get('/', productController.getProducts)

router.use(checkAuth)

router.post(
    '/',
    [check('name').isLength({ min: 6, max: 100 }), check('price').isNumeric()],
    validateInput('CREATE_PRODUCT_FAILED'),
    productController.createProduct,
)

export default router
