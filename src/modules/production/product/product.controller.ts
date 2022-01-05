import { LogInfo, LogError } from '../../../helpers/logs'
import productService from './product.service'

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body)

        req.user && (await LogInfo(req.user.email, 'CREATE_PRODUCT'))

        res.status(201).json({
            success: true,
            message: 'CREATE_PRODUCT_SUCCESSFULLY',
            content: product,
        })
    } catch (error) {
        req.user && (await LogError(req.user.email, 'CREATE_PRODUCT'))

        res.status(error.code || 400).json({
            success: false,
            message: 'CREATE_PRODUCT_FAILED',
            content: error.message,
        })
    }
}

const getProducts = async (req, res) => {
    try {
        const products = await productService.getProducts(req.query)

        res.status(201).json({
            success: true,
            message: 'GET_PRODUCTS_SUCCESSFULLY',
            content: products,
        })
    } catch (error) {
        res.status(error.code || 400).json({
            success: false,
            message: 'GET_PRODUCTS_FAILED',
            content: error.message,
        })
    }
}

export default {
    createProduct,
    getProducts,
}
