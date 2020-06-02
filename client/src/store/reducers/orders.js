import {
  GET_PRICE_LIST,
  ORDERS_ERROR,
  GET_MY_ORDERS
} from "../actions/types";

const initialState = {
  loading: true,//not used 
  products: null,
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
