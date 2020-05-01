import axios from "axios";

import { LOAD_USER, AUTH_ERROR, LOGOUT, SET_LOADING } from "./types";

export const register = (dataToSubmit, history) => {
  return async (dispatch) => {
    try {
      setLoading();
      await axios.post("/api/v1/auth/register", dataToSubmit);
      console.log("REGISTER SUCCESS");
      history.push("/login");
    } catch (err) {
      dispatch(authFailed(err));
    }
  };
};

export const login = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.post("/api/v1/auth/login", dataToSubmit);

    dispatch(loadUser());
    console.log("LOGIN SUCCESS");
  } catch (err) {
    dispatch(authFailed(err));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/v1/auth/me");

    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
    console.log("LOAD_USER SUCCESS");
  } catch (err) {
    dispatch(authFailed(err));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.get("/api/v1/auth/logout");
    dispatch({
      type: LOGOUT,
    });
    console.log("LOGOUT SUCCESS");
  } catch (err) {
    dispatch(authFailed(err));
  }
};

export const authFailed = (err) => {
  return {
    type: AUTH_ERROR,
    payload: err.response.data.error,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
