import axios from "axios";
import * as actionTypes from "./types";

export const register = (dataToSubmit, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.REGISTER_REQUEST });
      await axios.post("/api/v1/auth/register", dataToSubmit);
      dispatch({ type: actionTypes.REGISTER_SUCCESS });
      history.push("/login");
    } catch (err) {
      dispatch(handleFail(actionTypes.REGISTER_FAIL, err));
    }
  };
};

export const login = (dataToSubmit) => async (dispatch) => {
  try {  
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    await axios.post("/api/v1/auth/login", dataToSubmit);
    dispatch({ type: actionTypes.LOGIN_SUCCESS });
    dispatch(loadUser());
  } catch (err) {   
    dispatch(handleFail(actionTypes.LOGIN_FAIL, err));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOAD_USER_REQUEST });
    const res = await axios.get("/api/v1/auth/me");
    dispatch({
      type: actionTypes.LOAD_USER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch(handleFail(actionTypes.LOAD_USER_FAIL, err));
  }
};

export const onTryAutoLogin = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.AUTOLOGIN_REQUEST });
    const res = await axios.get("/api/v1/auth/me");
    dispatch({
      type: actionTypes.AUTOLOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTOLOGIN_FAIL,
      payload: null,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });
    await axios.get("/api/v1/auth/logout");
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
  } catch (err) {
    dispatch(handleFail(actionTypes.LOGOUT_FAIL, err));
  }
};

const handleFail = (type, error) => {
  let errorMsg = "Something went wrong.";
  if (error.response) {
    // Request made and server responded
    errorMsg = error.response.data.error || errorMsg;
  } else if (error.request) {
    // The request was made but no response was received
    errorMsg = "Cannot connect to server.";
  }else{
    // Something happened in setting up the request 
    errorMsg = "Cannot connect to server.";
  }
  return {
    type: type,
    payload: errorMsg,
  };
};
