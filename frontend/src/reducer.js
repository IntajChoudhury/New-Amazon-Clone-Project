export const initialState = {
  basket: [],
  user: null,
};

// Selector
/* .reduce((amount, item) => item.price + amount, 0): The reduce method is used to iterate over each item in the basket array and accumulate a total amount. The first parameter of the reduce function is a callback function that takes two parameters (amount and item), and it returns the sum of the current item's price and the accumulated amount.
amount: This is the accumulator, which starts at 0 (the second parameter to reduce).
item: This represents each element in the basket array during iteration.
The result is the total sum of all the item prices in the basket. */
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      // Doing all these to avoid deleting all duplicates with same id
      // so better use index instead of product id
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) newBasket.splice(index, 1);
      else
        console.warn(
          `Can't remove product (id: ${action.id}) as it's not in the basket!`
        );

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
