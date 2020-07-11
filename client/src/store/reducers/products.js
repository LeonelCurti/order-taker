import * as actionTypes from "../actions/types";

const initialState = {
  products: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {  
    case actionTypes.GET_PRICE_LIST_SUCCESS:
      return {
        ...state,
        products: payload,
      };
    default:
      return state;
  }
}
