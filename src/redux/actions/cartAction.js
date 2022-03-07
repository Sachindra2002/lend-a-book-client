import * as actionTypes from "../types";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/book/${id}`);

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      isbn: data.isbn,
      image: data.bookImage
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const addMovieToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/movie/${id}`);

  dispatch({
    type: actionTypes.ADD_MOVIE_TO_CART,
    payload: {
      isbn: data.id,
      image: data.movieImage
    },
  });

  localStorage.setItem("movie_cart", JSON.stringify(getState().movie_cart.movie_cart_items));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
