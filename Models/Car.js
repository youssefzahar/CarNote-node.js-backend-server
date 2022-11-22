const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carSchema = new Schema({
    modele: {
        type: String,
        required:true,
    },
    type: {
        type: String,
        required:true,
    },
    marque: {
        type: String,
        required:true,
    },
    immatricule: {
        type: String,
        required:true,
    },
    puissance: {
        type: Number,
        required:true,
    },
    carburant: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    owned_by: {
        type: String,
        required:true,
    },
    attribute: {
        type: String,
        required:true,
    },
    age: {
        type: Number,
        required:true,
    },
    image: {
        type: String
    }
}, {timestamps: true} )

const Car = mongoose.model('Car', carSchema)
module.exports = Car