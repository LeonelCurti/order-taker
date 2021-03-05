import {
  REGISTER_REQUEST,
  LOGIN_REQUEST,
  AUTOLOGIN_REQUEST,
  LOGOUT_REQUEST,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTOLOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  AUTOLOGIN_FAIL,
  LOGIN_FAIL,
  CLEAR_AUTH_ERROR,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  errorMessage: null,
};

function authReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTOLOGIN_REQUEST:
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
        errorMessage: payload,
      };
    case REGISTER_SUCCESS:
    case AUTOLOGIN_FAIL:
      return {
        ...state,
        isLoading: false,
      };
    case AUTOLOGIN_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        isLoading: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        isLoading: false,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        errorMessage: null,
      };
    default:
      return state;
  }
}

export default authReducer;
