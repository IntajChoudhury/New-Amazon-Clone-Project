import React, { useState } from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";

function Checkout() {
  const [{ basket, user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__add"
          src="https://i0.wp.com/www.eastmojo.com/wp-content/uploads/2021/10/Amazon-Great-India-Festival.jpg?w=1500&ssl=1"
          alt=""
        />

        <div>
          <h3>Hello, {user?.email}</h3>

          <h2 className="checkout__title">Your Shopping Basket</h2>

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

      <div className="checkout__right">
        <h2>The Sub total will be shown here!</h2>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
