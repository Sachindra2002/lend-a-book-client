import axios from "axios";

import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  STOP_LOADING_UI,
  LOADING_UI,
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
  } catch (error) {
    dispatch({ type: SET_SELECTED_USER, payload: {} });
    console.log(error);
  }
};

export const setVerified = () => async (dispatch) => {};

export const setBanned = () => async (dispatch) => {};
