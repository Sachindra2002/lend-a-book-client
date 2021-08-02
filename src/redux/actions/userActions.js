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
    dispatch({type: LOADING_UI});

    try{
        let results = await axios.post("/signup", user_data);
        dispatch({type: CLEAR_ERRORS});
        history.push("/")
    }catch (error){
        dispatch({
            type: SET_ERRORS,
            payload: error.response?.data,
        });
    }
};
