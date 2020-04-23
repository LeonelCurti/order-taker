import {
  CLEAR_ERRORS,
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
  // ACCOUNT_DELETED
} from "../actions/types";

const initialState = {
  // token: localStorage.getItem('token'),
  // loading: true,
  isAuthenticated: false,
  user: null,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {  
    case LOAD_USER:
      return {
        ...state,
        user: payload.user,
        isAuthenticated: true
      }
    case AUTH_ERROR:
      return {
        ...state,
        error: payload
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
