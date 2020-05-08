import axios from "axios";

import {
  AUTH_CLEAR_ERRORS,
  AUTH_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_LOAD_USER_SUCCESS,
} from "./types";

export const register = (dataToSubmit, history) => {
  return async (dispatch) => {
    try {
      dispatch(authRequest());  
      await axios.post("/api/v1/auth/register", dataToSubmit);
      dispatch({ type: AUTH_REGISTER_SUCCESS }); 
      history.push("/login");
    } catch (err) {
      dispatch(authFailed(err));
    }
  };
};

export const login = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch(authRequest()); 
    await axios.post("/api/v1/auth/login", dataToSubmit);
    dispatch(loadUser());
  } catch (err) {
    dispatch(authFailed(err));
  }
};

export const loadUser = (isFirstLoad) => async (dispatch) => {
  try {
    dispatch(authRequest()); 
    const res = await axios.get("/api/v1/auth/me");
    dispatch({
      type: AUTH_LOAD_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    if (isFirstLoad) {
      //show no error msg at first auto log in attempt
      err.response.data.error = null;
      dispatch(authFailed(err));
    } else {
      dispatch(authFailed(err));
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(authRequest()); 
    await axios.get("/api/v1/auth/logout");
    dispatch({
      type: AUTH_LOGOUT,
    });
  } catch (err) {
    dispatch(authFailed(err));
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({
    type: AUTH_CLEAR_ERRORS,
  });
};

const authFailed = (err) => {
  return {
    type: AUTH_FAIL,
    payload: err.response.data.error,
  };
};

const authRequest=()=>{
  return {
    type: AUTH_REQUEST
  }
}

