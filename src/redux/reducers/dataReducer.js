/* eslint-disable import/no-anonymous-default-export */
import {
    SET_USERS,
    LOADING_DATA,
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
      default:
        return state;
    }
  }
  