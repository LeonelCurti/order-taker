import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/actions/auth";

let refreshTokenTimeout;

const setSession = (token) => {
  if (token) {
    localStorage.setItem("access_token", token);
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["x-auth-token"];
  }
};
const isExpired = (token) => {
  const expireDate = getExpirationDate(token);
  if (!expireDate) {
    return false;
  }
  return Date.now() > expireDate;
};

const startRefreshTokenTimer = (token) => {
  // console.log("starting refreshToken timer");
  const expirationDate = getExpirationDate(token);
  const delay = expirationDate - new Date().getTime();
  refreshTokenTimeout = setTimeout(silentRefresh, delay - 7000);
  // console.log(`timeoutIdcreated:${refreshTokenTimeout}`);
};

const stopRefreshTokenTimer = () => {
  if (refreshTokenTimeout) {
    // console.log(`timeoutIdDeleted:${refreshTokenTimeout}`);
    clearTimeout(refreshTokenTimeout);
  }
};


const silentRefresh = async () => {
  try {
    // console.log("executing silentRefresh");
    const res = await axios.get("/api/v1/auth/refresh-token");
    const newAccessToken = res.data.accessToken;
    setSession(newAccessToken);
    startRefreshTokenTimer(newAccessToken);
  } catch (error) {
    // console.log("SilentRefresh failed, proceed to logout");
    store.dispatch(logout()); 
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

export const jwtAuthService = {
  setSession,
  startRefreshTokenTimer,
  silentRefresh,
  stopRefreshTokenTimer,
  isExpired,
};
