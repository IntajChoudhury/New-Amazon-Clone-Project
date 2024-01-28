import React, { useState } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  /* state represents the current state of your application, and dispatch is a function you can use to dispatch actions to update the state based on your defined reducer logic. */
  const [state, dispatch] = useStateValue();

  const addToBasket = () => {
    //dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`product glow ${isHovered ? "glow-hover" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>Rs.</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {/* Array(rating): This creates a new array with a length equal to the value of the rating variable.
          .fill(): This fills each element of the array with undefined by default. The purpose of this step is to create an array with a specific length, where each element is initially undefined.
          .map((_, i) => (<p>⭐</p>)): This maps over each element of the array, and for each element, it executes the provided function. In this case, the function takes two arguments: _ (which is a convention to indicate that the argument is not used) and i (the index of the current element). The function returns a JSX element <p>⭐</p>, which presumably represents a star. */}
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
