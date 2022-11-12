const mongoose = require('mongoose')
const { monitorEventLoopDelay } = require('perf_hooks')
const Schema = mongoose.Schema

const userSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    cin: {
        type: Number,
        required:true,
        unique: true
    },
    email: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    image: {
        type: String
    },
    phone_number: {
        type: String,
        required:true,
    },
    emailToken:{
        type: String
    },
    isVerified:{
        type: Boolean
    },
}, {timestamps: true} )

const User = mongoose.model('User', userSchema)
module.exports = User