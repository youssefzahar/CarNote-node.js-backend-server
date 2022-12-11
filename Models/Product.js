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
    id:{
        type: Number,
       // default: Math.floor(Math.random() * 100)
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
        type: String,
        default:"youssef.zahar@esprit.tn"
    },
    image: {
        type: String
    }
}, {timestamps: true} )

const Product = mongoose.model('Product', productSchema)
module.exports = Product