import axios from "axios";
import * as actionTypes from "./types";
// import * as alertActions from "./alert";
import { handleFail } from "../../utils/handleFail";
// import jwtAuthService from "../../services/jwtAuthService";
// import localStorageService from "../../services/localStorageService";

export const register = (dataToSubmit, history) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.REGISTER_REQUEST });
      await axios.post("/api/v1/auth/register", dataToSubmit);
      dispatch({ type: actionTypes.REGISTER_SUCCESS });
      history.replace("/login");
    } catch (err) {
      dispatch(handleFail(actionTypes.REGISTER_FAIL, err));
    }
  };
};

export const login = (dataToSubmit) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    const res = await axios.post("/api/v1/auth/login", dataToSubmit);
    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data.user,
    });
    setSession(res.data.accessToken);
    // const expirationDate = getExpirationDate(res.data.accesToken);
    // dispatch(checkAuthTimeout(expirationDate - new Date().getTime()));
  } catch (err) {
    dispatch(handleFail(actionTypes.LOGIN_FAIL, err));
  }
};


export const onTryAutoLogin = () => async (dispatch) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    //dispatch logout
    console.log("no token load");
  } else {
    const expirationDate = getExpirationDate(token);
    if (isExpired(expirationDate)) {
      //dispatch logout
      console.log("expired token, logout");
    } else {
      setSession(token);
      try {
        dispatch({ type: actionTypes.AUTOLOGIN_REQUEST });
        const res = await axios.get("/api/v1/auth/me", {
          headers: {
            "Cache-Control": "no-cache",
          },
        });
        dispatch({
          type: actionTypes.AUTOLOGIN_SUCCESS,
          payload: res.data.user,
        });
        // dispatch(checkAuthTimeout(expirationDate - new Date().getTime()));
      } catch (err) {
        dispatch({
          type: actionTypes.AUTOLOGIN_FAIL,
          payload: null,
        });
      }
    }
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: actionTypes.LOGOUT_REQUEST });
  setTimeout(() => {
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
    setSession(null);
  }, 700);
};

const setSession = (token) => {
  if (token) {
    localStorage.setItem("access_token", token);
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

const getExpirationDate = (token) => {
  if (!token) {
    return null;
  }
  const jwt = JSON.parse(atob(token.split(".")[1]));

  // multiply by 1000 to convert seconds into milliseconds
  return (jwt && jwt.exp && jwt.exp * 1000) || null;
};

const isExpired = (exp) => {
  if (!exp) {
    return false;
  }

  return Date.now() > exp;
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};
