const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')

const UserRoute = require('./Routes/User')

mongoose.connect('mongodb://localhost:27017/CarNote', {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

db.on('error',(err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Database connection established')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({extended: true}))
app.use(bodyparser.json())
app.use('/uploads',express.static('uploads'))
const Port = process.env.Port || 3000

app.listen(Port, () =>{
    console.log(`Server is running on port ${Port}`)
})

app.use('/api/user', UserRoute)