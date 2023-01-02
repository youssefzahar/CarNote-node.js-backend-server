const mongoose = require('mongoose')
const { monitorEventLoopDelay } = require('perf_hooks')
const Schema = mongoose.Schema

const favorieSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    car: {
        type: Schema.Types.ObjectId,
        ref: 'Car'
    }
}, {timestamps: true} )

const Favorie = mongoose.model('Favories', favorieSchema)
module.exports = Favorie