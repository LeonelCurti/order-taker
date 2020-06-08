import {
  GET_PRICE_LIST,
  ORDERS_ERROR,
  GET_MY_ORDERS,
  SET_CURRENT_ORDER,
  CLEAR_CURRENT_ORDER
} from "../actions/types";

const initialState = {
  loading: true,//not used 
  products: null,
  currentOrder:null,
  error: null,
  myOrders:null
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PRICE_LIST:
      return {
        ...state,
        products: payload,
        loading: false,
        error: null,
      };
    case GET_MY_ORDERS:
      return {
        ...state,
        myOrders: payload,
        loading: false,
        error: null,
      };
      case SET_CURRENT_ORDER:
        return {
          ...state,
          currentOrder: payload,  
        }
      case CLEAR_CURRENT_ORDER:
        return {
          ...state,
          currentOrder: null, 
        }
    case ORDERS_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
