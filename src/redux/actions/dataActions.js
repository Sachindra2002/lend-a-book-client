import axios from "axios";

import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  STOP_LOADING_UI,
  LOADING_UI,
  SET_BOOKS,
  SET_BOOK,
  CLEAR_ERRORS,
  SET_ERRORS,
} from "../types";

/* Get all users pending for verification */
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });

  try {
    let results = await axios.get("/users");
    dispatch({
      type: SET_USERS,
      payload: results.data.users,
    });
  } catch (error) {
    dispatch({ type: SET_USERS, payload: [] });
    console.log(error);
  }
};

/*Get single user info*/
export const getUser = (email) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    let result = await axios.get(`/user/${email}`);
    dispatch({ type: SET_SELECTED_USER, payload: result.data });
    dispatch({ type: STOP_LOADING_UI });
    console.log(result);
  } catch (error) {
    dispatch({ type: SET_SELECTED_USER, payload: {} });
    console.log(error);
  }
};

/*Set Verified*/
export const setVerified = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/user/set-verified/${id}`);
    console.log(result);
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};

/*Set Ban*/
export const setBanned = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/user/set-ban/${id}`);
    console.log(result);
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};

/* Get all Books in the database */
export const getAllBooks = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/books");
    dispatch({
      type: SET_BOOKS,
      payload: results.data.books,
    });
  } catch (error) {
    dispatch({ type: SET_BOOKS, payload: [] });
    console.log(error);
  }
};

/*Get single book info */
export const getBook = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    let result = await axios.get(`/book/${id}`);
    dispatch({ type: SET_BOOK, payload: result.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_BOOK, payload: {} });
    console.log(error);
  }
};

export const addBook = (book) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/book", book);
    await dispatch(getAllBooks());
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.isbn) return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};
