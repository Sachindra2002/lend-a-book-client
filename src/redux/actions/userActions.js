import axios from "axios";

import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  STOP_LOADING_UI,
} from "../types";

//Handle user registrations
export const registerUser = (user_data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/signup", user_data);
    dispatch({ type: CLEAR_ERRORS });
    history.push("/sign-in");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

//log user into the system
export const loginUser = (user_data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/login", user_data);
    setAuthorizationHeader(results.data.token);
    await dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/homepage");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

/*Get logged in user's details*/
export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    let result = await axios.get("/user");
    dispatch({
      type: SET_USER,
      payload: result.data,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

/*Log user out of the system*/
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("LendABookToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
};

/*Set authorization header*/
const setAuthorizationHeader = (token) => {
  const lendabook_token = `Bearer ${token}`;
  localStorage.setItem("LendABookToken", lendabook_token);
  axios.defaults.headers.common["Authorization"] = lendabook_token;
};
