import * as actionTypes from "../actions/types";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_PRICE_LIST_START:
      return {
        ...state,
        loading: true,
        error:null,
      };
    case actionTypes.GET_PRICE_LIST_SUCCESS:
      return {
        ...state,
        products: payload,
        loading: false,
      };
    case actionTypes.GET_PRICE_LIST_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}
