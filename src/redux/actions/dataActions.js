import axios from "axios";
import superagent from "superagent";

import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  STOP_LOADING_UI,
  LOADING_UI,
  SET_BOOKS,
  SET_BOOK,
  SET_MOVIES,
  SET_MOVIE,
  CLEAR_ERRORS,
  SET_ERRORS,
  SET_COMMENTS,
  SET_BOOK_RESERVATIONS,
  SET_SCRAPED_BOOKS,
  SET_CSV_BOOKS,
  SET_GOOGLE_BOOKS,
  SET_MONGO_BOOKS,
  SET_CSV_MOVIES,
  SET_RESERVATIONS,
} from "../types";
import { getUserPersonalizedBooks } from "./userActions";

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
    await dispatch({ type: LOADING_UI });
    let result = await axios.get(`/book/${id}`);
    let comments = await axios.get(`/book-comments/${id}`);
    await dispatch({ type: SET_BOOK, payload: result.data });
    await dispatch({ type: SET_COMMENTS, payload: comments.data.comments });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_BOOK, payload: {} });
    console.log(error);
  }
};

/* Add an book to the system */
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

export const addBookFromCSV = (book) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/add-book", book);
    await dispatch(getAllCSVBooks());
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const addBookFromMongo = (book) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/add-book-to-mongo-sql", book);
    await dispatch(getAllCSVBooks());
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/*Toggle availability of book */
export const toggleBookAvailability = (id) => async (dispatch) => {
  try {
    await axios.get(`/book-availability/${id}`);
    dispatch(getAllBooks());
    dispatch(getBook(id));
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};

/*! Remove Book ! */
export const removeBook = (id) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.delete(`/book/${id}`);
    dispatch(getAllBooks());
    dispatch({ type: SET_BOOK, payload: null });
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.message === "Successfully deleted") return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* Get all Movies in the database */
export const getAllMovies = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/movies");
    dispatch({
      type: SET_MOVIES,
      payload: results.data.movies,
    });
  } catch (error) {
    dispatch({ type: SET_MOVIES, payload: [] });
    console.log(error);
  }
};

/* Get single Movie info */
export const getMovie = (id) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    let result = await axios.get(`/movie/${id}`);
    dispatch({ type: SET_MOVIE, payload: result.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_MOVIE, payload: {} });
    console.log(error);
  }
};

/* Add an movie to the system */
export const addMovie = (movie) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/movie", movie);
    await dispatch(getAllMovies());
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.id) return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/*Toggle availability of book */
export const toggleMovieAvailability = (id) => async (dispatch) => {
  try {
    await axios.get(`/movie-availability/${id}`);
    dispatch(getAllMovies());
    dispatch(getMovie(id));
    dispatch({ type: CLEAR_ERRORS });
  } catch (error) {
    console.log(error);
  }
};

/*! Remove Movie ! */
export const removeMovie = (id) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.delete(`/movie/${id}`);
    dispatch(getAllMovies());
    dispatch({ type: SET_MOVIE, payload: null });
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.message === "Successfully deleted") return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* add comment to a book */
export const addCommentBook = (comment) => async (dispatch) => {
  try {
    let results = await axios.post("/comment-addcomment", comment);
    dispatch(getUserPersonalizedBooks());
    dispatch(getBook());
  } catch (error) {
    console.log(error);
  }
};

export const reserveBooks = (data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/reserve", data);
    dispatch({ type: CLEAR_ERRORS });
    history.push("/homepage");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

export const reserveMovies = (data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/reserve-movies", data);
    dispatch({ type: CLEAR_ERRORS });
    history.push("/homepage");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

export const getAllBookReservations = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/book-reservations");
    dispatch({
      type: SET_BOOK_RESERVATIONS,
      payload: results.data.book_reservations,
    });
  } catch (error) {
    dispatch({ type: SET_BOOK_RESERVATIONS, payload: [] });
    console.log(error);
  }
};

/* Change reservation status */
export const changeReservationStatus = (id, status) => async (dispatch) => {
  try {
    await axios.post(`/reservation-status/${id}`, { status });
    dispatch(getAllBookReservations());
  } catch (error) {
    console.log(error);
  }
};

/* Get all scraped data for books */
export const getAllBookPrices = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/new-books");
    dispatch({
      type: SET_SCRAPED_BOOKS,
      payload: results.data.books,
    });
  } catch (error) {
    dispatch({ type: SET_SCRAPED_BOOKS, payload: [] });
    console.log(error);
  }
};

/* Get all books in CSV file */
export const getAllCSVBooks = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/purchased-books");
    dispatch({
      type: SET_CSV_BOOKS,
      payload: results.data.books,
    });
  } catch (error) {
    dispatch({ type: SET_CSV_BOOKS, payload: [] });
    console.log(error);
  }
};

/* Get all movies in CSV file */
export const getAllCSVMovies = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/purchased-movies");
    dispatch({
      type: SET_CSV_MOVIES,
      payload: results.data.movies,
    });
  } catch (error) {
    dispatch({ type: SET_CSV_MOVIES, payload: [] });
    console.log(error);
  }
};

/* Get books from google books API */
export const getBookFromGoogleBooksApi = (searchKey) => async (dispatch) => {
  let query = searchKey;
  const apiKey = "AIzaSyDOHNA4IMwTzWuGCUuJ4hea-vyPOP-giOM";
  let url =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    query +
    "&maxResults=40&key=" +
    apiKey;

  if (searchKey != null) {
    dispatch({ type: LOADING_DATA });
    try {
      let results = await superagent.get(url);
      console.log(results.body);
      dispatch({
        type: SET_GOOGLE_BOOKS,
        payload: results.body.items,
      });
    } catch (error) {
      dispatch({ type: SET_GOOGLE_BOOKS, payload: [] });
      console.log(error);
    }
  }
};

/* Get books from Secondary Database*/
export const getAllMongoBooks = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/mongo-books");
    dispatch({
      type: SET_MONGO_BOOKS,
      payload: results.data.books,
    });
  } catch (error) {
    dispatch({ type: SET_MONGO_BOOKS, payload: [] });
    console.log(error);
  }
};

/* Add Comment to a Book */
export const addComment = (data) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/add-comment", data);
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

/* Delete a comment */
export const deleteComment = (id) => async (dispatch) => {
  try {
    await axios.post(`/delete-comment/${id}`);
    dispatch(getAllBooks());
  } catch (error) {
    console.log(error);
  }
};

/* Get Bookreservations of logged in user */
export const getMyBookReservations = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/my-bookReservations");
    console.log(results.data);
    dispatch({
      type: SET_RESERVATIONS,
      payload: results.data.reservations,
    });
  } catch (error) {
    dispatch({ type: SET_RESERVATIONS, payload: [] });
    console.log(error);
  }
};
