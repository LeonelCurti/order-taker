import * as actionTypes from "../actions/types";

const initialState = {
  myOrders: [], 
  currentOrder: null,
  loading: false,
  isSubmitting:false,
  isUpdating:false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        myOrders: payload,
        loading: false,
      };  
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: payload,
        loading: false,
      };
    case actionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        myOrders: state.myOrders.filter((order) => order._id !== payload),
        loading: false,
      };
    case actionTypes.SUBMIT_ORDER_SUCCESS:
      return {
        ...state,      
        loading: false,
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
    case actionTypes.GET_ORDERS_FAIL:
    case actionTypes.DELETE_ORDER_FAIL:
    case actionTypes.SUBMIT_ORDER_FAIL:
    case actionTypes.CREATE_ORDER_FAIL:
    case actionTypes.UPDATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
