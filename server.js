const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyparser = require('body-parser')
const UserRoute = require('./Routes/User')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require("swagger-ui-express")
const dotenv = require('dotenv')
const CarRoute = require('./Routes/Car')
const ProductRoute = require('./Routes/Product')
const Product = require('./Models/Product')


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

app.get('/api/products', (req, res) => {
  res.json(Product)
})


const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Library API",
        version: "1.0.0",
        description: "A simple Express Library API",
        termsOfService: "http://example.com/terms/",
        contact: {
          name: "API Support",
          url: "http://www.exmaple.com/support",
          email: "support@example.com",
        },
      },
  
      servers: [
        {
          url: "http://localhost:3000",
          description: "My API Documentation",
        },
      ],
    },
    apis: ["./Routes/*.js"],
  };
  
  const specs = swaggerJSDoc(options);

  app.use('/swagger/api', swaggerUi.serve, swaggerUi.setup(specs))
  app.use('/api/user', UserRoute)
  app.use('/api/car', CarRoute)
  app.use('/api/product', ProductRoute)



