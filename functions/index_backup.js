// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

//Using Firebase Cloud Function for backend

const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51ObgKxSIspk1rX1nLgLQa1SYSesym97k0WaKi7CTxZSziMgUX6X8fOHqMvWi9kGwqw78UKByk3ZmXoVxD81TyevN00RpGbTzw5"
);

// API

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API routes
app.get("/", (request, response) => response.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment request received BOOM!!! for amount >>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  // OK - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// Listen command
// exports.api = functions.https.onRequest(app);
// Using local backend port to test
app.listen(5001, () => {
  console.log("Server is listening at http://localhost:5001");
});

// EXPLANATION OF EVERYTHING ABOVE-
/* 
#
#
# Example end point 'http://127.0.0.1:5001/challenge-809dc/us-central1/api' for 
  Listen command to run on local host, in terminal (firebase emulators:start)    
*/
