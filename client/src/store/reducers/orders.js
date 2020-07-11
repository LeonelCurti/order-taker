import * as actionTypes from "../actions/types";

const initialState = {
  myOrders: [], 
  currentOrder: null, 
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {  
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        myOrders: payload,
      };  
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: payload,
      };
    case actionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        myOrders: state.myOrders.filter((order) => order._id !== payload),  
      };
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      return {
        ...state,
      };
    case actionTypes.SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: payload,
      };
    case actionTypes.CLEAR_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: null,
      };    
    default:
      return state;
  }
}
