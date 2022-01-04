import mongoose from 'mongoose'
const Schema = mongoose.Schema

const ProductSchema = new Schema(
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

const Product = mongoose.model('Product', ProductSchema)
export default Product
