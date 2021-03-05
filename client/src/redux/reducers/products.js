import * as actionTypes from "../actions/types";
// import { combineReducers } from "redux";

const initialState = {
  products: [],
  isFetching: false,
  errorMessage: null,
};

const catalog = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRICE_LIST_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case actionTypes.GET_PRICE_LIST_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isFetching: false,
      };
    case actionTypes.GET_PRICE_LIST_FAIL:
      return {
        ...state,
        errorMessage: action.payload,
        isFetching: false,
      };
    default:
      return state;
  }
};

export default catalog;
// const products = (state = [], action) => {
//   switch (action.type) {
//     case actionTypes.GET_PRICE_LIST_SUCCESS:
//       return action.payload;
//     default:
//       return state;
//   }
// };

// const errorMessage = (state = null, action) => {
//   switch (action.type) {
//     case actionTypes.GET_PRICE_LIST_REQUEST:
//     case actionTypes.GET_PRICE_LIST_SUCCESS:
//       return null;
//     case actionTypes.GET_PRICE_LIST_FAIL:
//       return action.payload;
//     default:
//       return state;
//   }
// };
// const isFetching = (state = false, action) => {
//   switch (action.type) {
//     case actionTypes.GET_PRICE_LIST_REQUEST:
//       return true;
//     case actionTypes.GET_PRICE_LIST_SUCCESS:
//     case actionTypes.GET_PRICE_LIST_FAIL:
//       return false;
//     default:
//       return state;
//   }
// };

// export default combineReducers({ products, errorMessage, isFetching });
