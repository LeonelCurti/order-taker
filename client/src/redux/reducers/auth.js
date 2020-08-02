import {  
  AUTOLOGIN_SUCCESS,
  LOAD_USER_SUCCESS,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {    
    case LOAD_USER_SUCCESS:
    case AUTOLOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,    
      };    
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,        
        user: null,
      };
    default:
      return state;
  }
}
