/* eslint-disable import/no-anonymous-default-export */
import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  SET_BOOKS,
  SET_BOOK,
  SET_MOVIES,
  SET_MOVIE,
  SET_USER_BOOKS,
  SET_USER_MOVIES,
} from "../types";

const initialState = {
  users: [],
};

export default function (state = initialState, action) {
  //let index;

  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case SET_BOOK:
      return {
        ...state,
        book: action.payload,
      };
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case SET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };
    case SET_USER_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case SET_USER_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
