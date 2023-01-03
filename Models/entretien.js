const mongoose = require('mongoose')
const Schema = mongoose.Schema

const entretienSchema = new Schema({
    date: {
        type: Date,
       // required:true,
    },
    title: {
        type: String,
        required:true,
    },
    owned_by: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required:true,
    }
}, {timestamps: true} )

const Entretien = mongoose.model('Entretien', entretienSchema)
module.exports = Entretien