import axios from "axios";

import {
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT
} from "./types";

export const register = (dataToSubmit, history) => {
  return async (dispatch) => {
    try {
      await axios.post("/api/v1/auth/register", dataToSubmit);
      console.log("REGISTER SUCCESS");

      history.push("/login");
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.error,
      });
    }
  };
};

export const login = (dataToSubmit, history) => async (dispatch) => {
  try {
    await axios.post("/api/v1/auth/login", dataToSubmit);

    dispatch(loadUser());
    history.push("/dashboard");
    //check if redirect should go in load user!!
    console.log("LOGIN SUCCESS");
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/v1/auth/me");

    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
    console.log("LOAD_USER SUCCESS");
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.error,
    });
  }
};

export const logout = (history) => async (dispatch) => {
  try {
    await axios.get("/api/v1/auth/logout");
    dispatch({
      type: LOGOUT      
    });
    history.push("/login");
    console.log("LOGOUT SUCCESS");
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response.data.error,
    });
  }
};
