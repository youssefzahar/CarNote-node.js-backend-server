const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entretienSchema = new Schema({
    car: {
        type: String,
        required:true,
    },
    date: {
        type: Date,
        required:true,
    },
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    }
}, {timestamps: true} )

const Entretien = mongoose.model('Entretien', entretienSchema)
module.exports = Entretien