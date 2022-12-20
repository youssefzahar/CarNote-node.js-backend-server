const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    title: {
        type: String,
        required:true,
    },
    stock: {
        type: Number,
        required:true,
    },
    prix: {
        type: Number,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    owned_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    }
}, {timestamps: true} )

const Product = mongoose.model('Product', productSchema)
module.exports = Product