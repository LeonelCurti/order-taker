import * as actionTypes from "../actions/types";

const initialState = {
  myOrders: [],
  currentOrder: null,
  isFetching: false,
  isDeleting: false, //put loader in Orders view
  isCreatingOrder: false,
  isUpdating: false,
  isSubmitting: false,
  errorMessage: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_ORDERS_REQUEST:
      return {
        ...state,
        isFetching: true,
        errorMessage: null,
      };
    case actionTypes.GET_ORDERS_SUCCESS:
      return {
        ...state,
        myOrders: payload,
        isFetching: false,
      };
    case actionTypes.GET_ORDERS_FAIL:
      return {
        ...state,
        errorMessage: payload,
        isFetching: false,
      };

    //////////////////////////////////////
    case actionTypes.DELETE_ORDER_REQUEST:
      return {
        ...state,
        isDeleting: true,
      };
    case actionTypes.DELETE_ORDER_SUCCESS:
      return {
        ...state,
        myOrders: state.myOrders.filter((order) => order._id !== payload),
        isDeleting: false,
      };
    case actionTypes.DELETE_ORDER_FAIL:
      return {
        ...state,
        isDeleting: false,
      };
    //////////////////////////////////////
    case actionTypes.CREATE_ORDER_REQUEST:
      return {
        ...state,
        isCreatingOrder: true,
        errorMessage: null, ///////ojo test
      };
    case actionTypes.CREATE_ORDER_SUCCESS:
      return {
        ...state,
        currentOrder: payload,
        isCreatingOrder: false,
      };
    case actionTypes.CREATE_ORDER_FAIL:
      return {
        ...state,
        isCreatingOrder: false,
      };

    //////////////////////////////////////
    case actionTypes.SUBMIT_ORDER_REQUEST:
      return {
        ...state,
        isSubmitting: true,
      };
    case actionTypes.SUBMIT_ORDER_SUCCESS:
    case actionTypes.SUBMIT_ORDER_FAIL:
      return {
        ...state,
        isSubmitting: false,
      };
    //////////////////////////////////////
    case actionTypes.UPDATE_ORDER_REQUEST:
      return {
        ...state,
        isUpdating: true,
        errorMessage: null,
      };
    case actionTypes.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        isUpdating: false,
      };
    case actionTypes.UPDATE_ORDER_FAIL:
      return {
        ...state,
        isUpdating: false,
        errorMessage: payload,
      };
    //////////////////////////////////////
    case actionTypes.SET_CURRENT_ORDER:
      return {
        ...state,
        currentOrder: payload,
      };
    default:
      return state;
  }
}
