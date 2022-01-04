import productService from './product.service'

const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body)

        res.status(201).json({
            success: true,
            message: 'CREATE_PRODUCT_SUCCESSFULLY',
            content: product,
        })
    } catch (error) {
        res.status(error.code || 400).json({
            success: false,
            message: 'CREATE_PRODUCT_FAILED',
            content: error.message,
        })
    }
}

export default {
    createProduct,
}
