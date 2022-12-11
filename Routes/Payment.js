const express = require("express");
const app = express();
// This is your test secret API key.
const stripe = require("stripe")('sk_test_51MDmEvEbHfjP9Lzb79VCDTAHz5MFshTKhUFv7dcg7VwgnqEk7ko05V12CRemSDA3huKwtFzOhvcsz7yIqjVgZ8sI00rIde2zOH');

app.use(express.static("public"));
app.use(express.json());


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