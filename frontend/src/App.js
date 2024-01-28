import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function App() {
  // Destructuring state prop to {}, to use its objs directly
  const [{}, dispatch] = useStateValue();

  // Will only run once when the App component loads. If we give something inside
  // array of 2nd arg than it will load everytime when those values changes
  useEffect(() => {
    // As soon as the App loads below listener is fired evrytime
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      // Very cool feature of firebase, if user was logged in before
      // after refresh it will log user back in
      if (authUser) {
        // The user just logged in OR the user was logged in
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // The user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  // It will allow us to use Stripe API
  const promise = loadStripe(
    "pk_test_51ObgKxSIspk1rX1nwj33dLtlvwkzpusqBPVuGg5RPZxvaDSWCjezZLJrTd1HqO6GHbCB5KSmcBijvICUmz3KWSjw00V0cDxso7"
  );

  return (
    // BEM convention
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <Home />
              </div>
            }
          />

          <Route path="/login" element={<Login />} />

          <Route
            path="/checkout"
            element={
              <div>
                <Header />
                <Checkout />
              </div>
            }
          />

          <Route
            path="/payment"
            element={
              <div>
                <Header />

                {/* <Elements>: This is likely a higher-order component provided by the Stripe React library. 
                    It's used to wrap around components that need access to the Stripe context or functionality.
                    stripe={promise}: The stripe prop is being passed to the Elements component, and it's set 
                    to the value of promise. The stripe prop typically expects a Stripe instance, which is used
                    to interact with the Stripe API for processing payments. The promise variable likely holds
                    a promise that resolves to the Stripe instance once it's ready. */}
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </div>
            }
          />

          <Route
            path="/orders"
            element={
              <div>
                <Header />
                <Orders />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
