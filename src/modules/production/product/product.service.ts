import { Product } from '../../../models'

const createProduct = async (data) => {
    const { name, price, description } = data

    const newProduct = await Product.create({
        name,
        price,
        description,
    })

    return { product: newProduct.toObject({ getters: true }) }
}

export default {
    createProduct,
}
