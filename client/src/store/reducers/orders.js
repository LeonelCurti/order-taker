import {
  GET_PRICE_LIST,
  PRICE_LIST_ERROR,
} from "../actions/types";

const initialState = {
  loading: true,
  products: [],
  error: null,
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
    case PRICE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };    
    default:
      return state;
  }
}
