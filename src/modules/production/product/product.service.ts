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

interface IQueryProducts {
    name?: RegExp
}

const getProducts = async (data) => {
    let { name, page, limit } = data

    page = parseInt(page)
    limit = parseInt(limit)

    const options: IQueryProducts = {}
    if (name) {
        options.name = new RegExp(name, 'i')
    }

    let products: Array<object>

    if (!page || !limit) {
        products = await Product.find(options).sort({ updatedAt: -1 })
    } else {
        // products = await Product.find(options)
        //     .sort({ updatedAt: -1 })
        //     .skip((page - 1) * limit)
        //     .limit(limit)
        products = await Product.paginate(options, {
            page: page,
            limit: limit,
            sort: {
                createdAt: -1,
            },
        })
    }

    return { products }
}

export default {
    createProduct,
    getProducts,
}
