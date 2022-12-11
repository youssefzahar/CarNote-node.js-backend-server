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
const EntretienRoute = require('./Routes/Entretien')
//const PaymentRoute = require('./Routes/Payment')

///////
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51MDmEvEbHfjP9Lzb79VCDTAHz5MFshTKhUFv7dcg7VwgnqEk7ko05V12CRemSDA3huKwtFzOhvcsz7yIqjVgZ8sI00rIde2zOH');

//app.use(express.static("public"));
//app.use(express.json());

//////

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

///////////////////////////////////////////////////////

const calculateOrderAmount = (items) => {
  const total = items.reduce((previous, current) => {
    return previous.price + current.price
  })
  return total;
};

app.post("/create-payment-intent", async (req, res) => {
  const  items  = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

/////////////////////////////////////////////////////

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
  app.use('/api/entretien', EntretienRoute)
  //app.use('/api/payment', PaymentRoute)





