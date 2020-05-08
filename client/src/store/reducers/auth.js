import {
  AUTH_LOGOUT,
  AUTH_CLEAR_ERRORS,
  AUTH_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_FAIL,
  AUTH_LOAD_USER_SUCCESS,
} from "../actions/types";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case AUTH_LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        loading: false,
        error: null,
      };
    case AUTH_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        user: null,
      };
    default:
      return state;
  }
}
