import {  
  AUTH_CLEAR_ERRORS,  
  AUTH_FAIL,  
  AUTOLOGIN_SUCCESS,
  AUTOLOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,  
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
      return {
        ...state,        
        error: null,
      };    
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,        
        error: null,
      };
    case AUTH_FAIL:
    case AUTOLOGIN_FAIL:
      return {
        ...state,        
        error: payload,
      };    
    case LOAD_USER_SUCCESS:
    case AUTOLOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,        
        error: null,
      };    
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,        
        user: null,
      };
    case AUTH_CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
