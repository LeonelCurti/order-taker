import {
  LOAD_USER,
  AUTH_ERROR,
  LOGOUT,
  SET_LOADING
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
    case LOAD_USER:
      return {
        ...state,
        user: payload.user,
        loading:false,
        isAuthenticated: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LOGOUT:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      } 
    default:
      return state;
  }
}
