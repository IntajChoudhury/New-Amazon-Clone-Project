import React, { useEffect, useState } from "react";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";

function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();

  const navigate = useNavigate();

  // useStripe is used to access the Stripe instance, which is necessary for interacting with the Stripe API
  // and performing various actions related to payments.
  // useElements is used to access the Elements context, which is necessary for components like CardElement
  // to properly integrate with Stripe.js. It allows you to access the stripe.elements() instance, which is
  // used for creating and managing various Stripe elements like the card input field.
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  // useEffect(() => { ... }, [basket]);: This useEffect hook is executed when the component
  // mounts or when the basket variable changes. The dependency array [basket] indicates that
  // this effect depends on the basket variable.
  // const getClientSecret = async () => { ... }: This is an asynchronous function that
  // generates a client secret for Stripe. It sends a POST request to the server
  // (/payments/create endpoint) with the total amount of the items in the basket multiplied
  // by 100 (converted to cents, as Stripe typically works with the smallest unit of a currency).
  // The server is expected to respond with the client secret.
  // await axios({ ... }): This uses the axios library to make an asynchronous HTTP request.
  // The request is a POST request to the specified URL with the total amount in the
  // query parameters. setClientSecret(response.data.clientSecret);: Once the server responds,
  // the obtained client secret is set in the component's state using the setClientSecret
  // function, which basically tells that the user is allowed to pay now. getClientSecret();:
  // The getClientSecret function is called immediately after the component mounts or
  // when the basket variable changes.
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post(
        `/payments/create?total=${getBasketTotal(basket) * 100}`
      );
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  console.log("THE SECRET KEY >>> ", clientSecret);

  const handleChange = (event) => {
    // Listen for any changes in the Card element
    // and display any errors as the customers types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent is just payment confirmation
        // destructuring returned response obj to use props paymentIntent

        console.log(paymentIntent);
        console.log("Balle Balle");

        // using NoSQL db on firestore
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
            // created will give timestamp of when created
          });

        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({
          type: "EMPTY_BASKET",
        });

        // it won't store previous url in browser history
        // as we dont want users to go back to payment page after payments
        navigate("/orders", { replace: true });
      });
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Payment Section - Delivery Address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>

          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 react lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Payment Section - Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>

          <div className="payment__items">
            {basket?.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment Section - Payment Method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>

          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rs. "}
                />

                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {/* Errors, in case any error will be displayed */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
