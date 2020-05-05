import axios from "axios";

import {
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
  SET_LOADING,
  CLEAR_ERRORS,
} from "./types";

export const register = (dataToSubmit, history) => {
  return async (dispatch) => {
    try {
      setLoading();
      await axios.post("/api/v1/auth/register", dataToSubmit);

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
  } catch (err) {
    dispatch(authFailed(err));
  }
};

export const loadUser = (isFirstLoad) => async (dispatch) => {
  try {
    dispatch(setLoading());
    const res = await axios.get("/api/v1/auth/me");

    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (err) {
    if (isFirstLoad) {
      err.response.data.error = "";
      dispatch(authFailed(err));
    } else {
      dispatch(authFailed(err));
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(setLoading());
    await axios.get("/api/v1/auth/logout");

    dispatch({
      type: LOGOUT,
    });
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

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
