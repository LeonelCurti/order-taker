import axios from "axios";
import * as actionTypes from "./types";
import { handleFail } from "../../utils/handleFail";
import { jwtAuthService } from "../../services/jwtAuthService";

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

    const accessToken = res.data.accessToken;

    jwtAuthService.setSession(accessToken);
    jwtAuthService.startRefreshTokenTimer(accessToken);
  } catch (err) {
    dispatch(handleFail(actionTypes.LOGIN_FAIL, err));
  }
};

export const onTryAutoLogin = () => async (dispatch) => {
  //When app load/reload
  const currentAccessToken = localStorage.getItem("access_token");
  if (currentAccessToken) {
    try {
      dispatch({ type: actionTypes.AUTOLOGIN_REQUEST });

      let res = await axios.get("/api/v1/auth/refresh-token");
      const newAccessToken = res.data.accessToken;
      jwtAuthService.setSession(newAccessToken);
      jwtAuthService.startRefreshTokenTimer(newAccessToken);

      res = await axios.get("/api/v1/auth/me", {
        headers: { "Cache-Control": "no-cache" },
      });
      dispatch({
        type: actionTypes.AUTOLOGIN_SUCCESS,
        payload: res.data.user,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.AUTOLOGIN_FAIL,
        payload: null,
      });
      jwtAuthService.setSession(null);
      jwtAuthService.stopRefreshTokenTimer();
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.LOGOUT_REQUEST });
    jwtAuthService.setSession(null);
    jwtAuthService.stopRefreshTokenTimer();
    await axios.get("/api/v1/auth/logout", {
      headers: { "Cache-Control": "no-cache" },
    });
  } catch (error) {
  } finally {
    dispatch({ type: actionTypes.LOGOUT_SUCCESS });
  }
};

export const clearAuthError = () => ({
  type: actionTypes.CLEAR_AUTH_ERROR
})
