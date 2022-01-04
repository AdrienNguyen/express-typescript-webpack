import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const Schema = mongoose.Schema

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        image: {
            type: String,
        },
    },
    {
        timestamps: true,
    },
)

productSchema.plugin(mongoosePaginate)

const Product = mongoose.model('Product', productSchema) as any
export default Product
