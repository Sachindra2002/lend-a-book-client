import * as actionTypes from "../types";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      const item = action.payload;

      const existsItem = state.cartItems.find((x) => x.isbn === item.isbn);

      if (existsItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.isbn === existsItem.isbn ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    default:
      return state;
  }
};
